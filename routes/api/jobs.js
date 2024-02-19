const router = require('express').Router();
const {google} = require('googleapis');
const {formatJobsArrayOfArraysToObjectArray, formatJobObjectToJobsArray, formatJobsArrayToObjectArray} = require('../../client/js/helpers/format-helper.js');
const {sortArrayOfObjects} = require('../../client/js/helpers/sort-helper.js');

const spreadsheetId = process.env.SHEET_ID;
const tableName = 'jobs';

const authGoogleApi = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'secret.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({version: 'v4', auth: {client}});
  return {googleSheets, auth};
};

const findById = (id, list) => {
  return list.find(item => item[0] === id);
};

router.get('/', async (req, res) => {
  let values = null;

  try {
    const {googleSheets, auth} = await authGoogleApi();

    // Get metadata about spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: tableName
    });

    getRows.data.values.shift(); // Remove headers
    values = getRows.data.values;
  } catch (e) {
    res.send(500);
  }

  const formattedValues = formatJobsArrayOfArraysToObjectArray(values);
  const sortedValues = sortArrayOfObjects(formattedValues);

  res.send(sortedValues);
});

router.get('/:id', async (req, res) => {

  let values = null;

  try {
    const {googleSheets, auth} = await authGoogleApi();
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: tableName, 
    });
    
    values = getRows?.data?.values;
  } catch (e) {
    console.error('Error fetching data from Google Sheets:', e.message);
    return res.status(500).send('Internal Server Error');
  }

  if (!values) {
    console.error('No data received from Google Sheets');
    return res.status(500).send('Internal Server Error');
  }

  const {id} = req.params;
  values.shift();
  const target = findById(id, values);

  if (!target) {
    console.error(`Row with ID ${id} not found`);
    return res.status(404).send('Not Found');
  }

  const formattedTarget = formatJobsArrayToObjectArray(target);
  formattedTarget.id = id;

  res.send(formattedTarget);
});

router.post('/', async (req, res) => {
  const data = req?.body;
  if (!data || data === undefined) res.sendStatus(500);

  try {
    const dataAsArray = formatJobObjectToJobsArray(data);

    const {googleSheets, auth} = await authGoogleApi();

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: tableName,
      valueInputOption: 'RAW',
      resource: {
        values: [dataAsArray]
      }
    });

    res.sendStatus(200);
  } catch (e) {
    console.error('Error posting data in Google Sheets:', e.message);
    res.status(500).send('Internal Server Error');
  }
});

router.patch('/:id', async (req, res) => {
  const {id} = req.params;
  const newData = req.body;

  try {
    const {googleSheets, auth} = await authGoogleApi();
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: tableName
    });

    const values = getRows?.data?.values;

    if (!values) {
      console.error('No data received from Google Sheets');
      return res.status(500).send('Internal Server Error | Values');
    }

    const targetRowIndex = values.findIndex(row => row[0] === id);

    if (targetRowIndex === -1) {
      console.error(`Row with ID ${id} not found`);
      return res.status(404).send('Not Found');
    }

    const formattedData = formatJobObjectToJobsArray(newData);

    const updateResponse = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${tableName}!A${targetRowIndex + 1}`,
      valueInputOption: 'RAW',
      resource: {
        values: [formattedData],
      },
    });

    if (updateResponse.status === 200) {
      res.send(newData);
    }
  } catch (e) {
    console.error('Error updating data in Google Sheets:', e.message);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  if (!id) res.status(400).send('No id');

  let values = null;

  try {
    const {googleSheets, auth} = await authGoogleApi();
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: tableName, 
    });
    
    values = getRows?.data?.values || [];

    const targetRowIndex = values.findIndex(row => row[0] === id);
    if (targetRowIndex === -1) return res.status(404).send('Row not found');

    const formattedData = formatJobObjectToJobsArray({id: ''});

    // Perform batch update to remove row
    const updateResponse = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${tableName}!A${targetRowIndex + 1}`,
      valueInputOption: 'RAW',
      resource: {
        values: [formattedData],
      },
    });

    if (updateResponse.status === 200) {
      res.sendStatus(204);
    }
  } catch (e) {
    console.error('Error deleting row from Google Sheets:', e.message);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
