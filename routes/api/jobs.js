const router = require('express').Router();
const {google} = require('googleapis');
const {formatArrayOfArraysToObject} = require('../../client/js/helpers/format-helper.js');
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

  let headers = null;
  let values = null;

  try {
    const {googleSheets, auth} = await authGoogleApi();

    // Get metadata about spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: tableName
    });

    headers = getRows.data.values.shift();
    values = getRows.data.values;
  } catch (e) {
    res.send(500);
  }

  const formattedValues = formatArrayOfArraysToObject([headers, ...values]);
  const sortedValues = sortArrayOfObjects(formattedValues);

  res.send({headers, data: sortedValues});
});

router.get('/:id', async (req, res) => {

  let values = null;

  try {
    const {googleSheets, auth} = await authGoogleApi();
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: tableName
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
  const headers = values.shift();
  const target = findById(id, values);

  if (!target) {
    console.error(`Row with ID ${id} not found`);
    return res.status(404).send('Not Found');
  }

  const formattedTarget = formatArrayOfArraysToObject([headers, target]);

  res.send({id, headers, data: formattedTarget});
});

router.post('/', async (req, res) => {

  const {data} = req.body;
  if (!data) res.status(500);

  try {
    const {googleSheets, auth} = await authGoogleApi();

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: tableName,
      valueInputOption: 'RAW',
      resource: {
        values: [data]
      }
    });

    res.status(200);
  } catch (e) {
    res.status(500);
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

    const updateResponse = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${tableName}!A${targetRowIndex + 1}`,
      valueInputOption: 'RAW',
      resource: {
        values: [Object.values(newData)],
      },
    });

    // const updatedData = updateResponse.data.updatedData;

    const headers = values.shift();
    const formattedValues = formatArrayOfArraysToObject([headers, ...values]);

    res.send({ id, headers, data: formattedValues });
  } catch (e) {
    console.error('Error updating data in Google Sheets:', e.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
