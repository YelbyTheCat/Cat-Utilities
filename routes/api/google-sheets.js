const router = require('express').Router();
const {google} = require('googleapis');

const spreadsheetId = process.env.SHEET_ID;

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
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  res.send(metaData);
});

module.exports = router;
