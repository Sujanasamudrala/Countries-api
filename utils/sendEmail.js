const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendCountryNotification(action, country) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.NOTIFY_EMAIL,
      subject: `Country ${action}: ${country.name}`,
      html: `
        <h2>Country ${action}</h2>
        <p><strong>Name:</strong> ${country.name}</p>
        <p><strong>Region:</strong> ${country.region || 'N/A'}</p>
        <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
        <p><strong>Population:</strong> ${country.population || 'N/A'}</p>
        <p>Action: <strong>${action.toUpperCase()}</strong> at ${new Date().toLocaleString()}</p>
      `
    });
    console.log(`Email sent for ${action}: ${country.name}`);
  } catch (err) {
    console.error('Resend email error:', err.message);
  }
}

module.exports = sendCountryNotification;