const router = require('express').Router();
const {google} = require('googleapis');

const spreadsheetId = process.env.SHEET_ID;

const authGoogleApi = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'secret.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });

  console.log('------------auth', auth);

  const client = await auth.getClient();
  console.log('------------client', auth);
  const googleSheets = google.sheets({version: 'v4', auth: {client}});
  return {googleSheets, auth};
};

router.get('/', async (req, res) => {
  const options = req?.query;
  console.log('---------------options', options);
  const {googleSheets, auth} = await authGoogleApi();

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  console.log('options', options);

  res.send(metaData);
});

module.exports = router;
