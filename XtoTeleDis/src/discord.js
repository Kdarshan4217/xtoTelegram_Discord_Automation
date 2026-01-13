// running
const axios = require('axios');
const { DISCORD_WEBHOOK_URL } = require('./config');

async function sendToDiscord(tweet) {
  if (!DISCORD_WEBHOOK_URL) return;

  const content = ` **New Tweet**

${tweet.text}

🔗 https://twitter.com/i/status/${tweet.id}`;

  try {
    await axios.post(DISCORD_WEBHOOK_URL, { content });
  } catch (err) {
    console.error(' Discord error:', err.message);
  }
}

module.exports = { sendToDiscord };
