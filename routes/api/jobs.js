const router = require('express').Router();
const {google} = require('googleapis');

const spreadsheetId = process.env.SHEET_ID;
const tableName = 'example';

const authGoogleApi = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'secret.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({version: 'v4', auth: {client}});
  return {googleSheets, auth};
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

module.exports = router;
