
// running 
const axios = require('axios');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require('./config');

async function sendToTelegram(tweet) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const message = `New Tweet'

${tweet.text}

 https://twitter.com/i/status/${tweet.id}`;

  try {
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
  } catch (err) {
    console.error(' Telegram error:', err.message);
  }
}

module.exports = { sendToTelegram };










// const axios = require('axios');

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// async function sendToTelegram(tweet) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

//   const message = `🕊 New Tweet

// ${tweet.text}

// 🔗 https://twitter.com/i/status/${tweet.id}`;

//   try {
//     await axios.post(url, {
//       chat_id: TELEGRAM_CHAT_ID,
//       text: message,
//       disable_web_page_preview: true,
//     });
//   } catch (err) {
//     console.error('Telegram error:', err.response?.data || err.message);
//     throw err;
//   }
// }

// module.exports = { sendToTelegram };
