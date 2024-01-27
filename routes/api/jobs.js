const router = require('express').Router();
const {google} = require('googleapis');
const {formatArrayOfArraysToObject} = require('../../client/js/helpers/format-helper.js');

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
  const {googleSheets, auth} = await authGoogleApi();

  // Get metadata about spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: tableName
  });

  res.send(getRows);
});

router.get('/:id', async (req, res) => {
  const {googleSheets, auth} = await authGoogleApi();

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: tableName
  });

  const values = getRows?.data?.values;

  if (!values) {
    res.status(500);
  }

  const {id} = req.params;
  const headers = values.shift();
  const target = findById(id, values);

  if(!target) {
    res.status(500);
  }

  const formattedTarget = formatArrayOfArraysToObject([headers, target]);

  res.send({id, headers, data: formattedTarget});
});

module.exports = router;
