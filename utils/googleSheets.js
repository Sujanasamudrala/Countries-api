const { google } = require('googleapis');

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

async function logCountryAction(action, country) {
  try {
    const sheets = await getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E', // adjust if your sheet/tab is named differently
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          action.toUpperCase(),
          country.name || '',
          country.region || '',
          'API'
        ]]
      }
    });

    console.log(`Logged to Google Sheets: ${action} - ${country.name}`);
  } catch (err) {
    console.error('Google Sheets log error:', err.message);
  }
}

module.exports = logCountryAction;