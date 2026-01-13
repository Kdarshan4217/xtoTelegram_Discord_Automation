
// const { fetchLatestTweets } = require('./twitter');
// const { readStoredTweets, saveStoredTweets } = require('./storage');
// const { filterNewTweets } = require('./filter');
// const { sendToTelegram } = require('./telegram');
// const { sendToDiscord } = require('./discord');

// const USERNAME = 'ayodhya_pati';
// const FETCH_LIMIT = 2;

// async function run() {
//   console.log('Checking tweets...');


//   const fetchedTweets = await fetchLatestTweets(USERNAME, FETCH_LIMIT);
//   if (!fetchedTweets.length) {
//     console.log('No tweets fetched.');
//     return;
//   }

//   const storedTweets = await readStoredTweets();


//   const newTweets = filterNewTweets(fetchedTweets, storedTweets);
//   if (!newTweets.length) {
//     console.log('No new tweets.');
//   } else {

//     for (const tweet of newTweets) {
//       storedTweets.push({
//         id: tweet.id,
//         text: tweet.text,
//         telegram: false,
//         discord: false,
//         createdAt: new Date().toISOString(),
//       });
//     }

//     await saveStoredTweets(storedTweets);
//     console.log(`Saved ${newTweets.length} tweets to local storage.`);
//   }


//   for (const record of storedTweets) {
//     try {
//       if (!record.telegram) {
//         await sendToTelegram(record);
//         record.telegram = true;
//         console.log('Sent to Telegram:', record.id);
//       }

//       if (!record.discord) {
//         await sendToDiscord(record);
//         record.discord = true;
//         console.log('Sent to Discord:', record.id);
//       }
//     } catch (err) {
//       console.error('Send failed for:', record.id);
//     }
//   }


//   await saveStoredTweets(storedTweets);
// }

// run().catch(err => {
//   console.error('App crashed:', err);
// });




















//total running before automation add
// require('dotenv').config();

// const { fetchLatestTweets } = require('./twitter');
// const { readStoredTweets, saveStoredTweets } = require('./storage');
// const { filterNewTweets } = require('./filter');
// const { sendToTelegram } = require('./telegram');
// const { sendToDiscord } = require('./discord');

// const USERNAME = 'ayodhya_pati';
// const FETCH_LIMIT = 4;


// //Fetching code as well as runnning code 
// async function run() {
//   console.log('🔍 Checking tweets...');

//   // 1️⃣ Fetch tweets
//   const fetchedTweets = await fetchLatestTweets(USERNAME, FETCH_LIMIT);
//   if (!fetchedTweets.length) {
//     console.log(' No tweets fetched.');
//     return;
//   }

//   // 2️⃣ Read local JSON
//   const storedTweets = await readStoredTweets();

//   // 3️⃣ Filter new tweets
//   const newTweets = filterNewTweets(fetchedTweets, storedTweets);
//   if (!newTweets.length) {
//     console.log('ℹ No new tweets.');
//     return;
//   }

//   // 4️⃣ STORE FIRST (THIS IS WHAT YOU WANT)
//   for (const tweet of newTweets) {
//     storedTweets.push({
//       id: tweet.id,
//       text: tweet.text,
//       telegram: false,
//       discord: false,
//       storedAt: new Date().toISOString(),
//     });

//     console.log(` Stored in JSON → ${tweet.id}`);
//   }

//   // Save immediately
//   await saveStoredTweets(storedTweets);
//   console.log(' All new tweets saved to local JSON');

//   // 5️⃣ SEND FROM LOCAL STORAGE
//   for (const record of storedTweets) {
//     try {
//       if (!record.telegram) {
//         await sendToTelegram(record);
//         record.telegram = true;
//         console.log(` Sent to Telegram → ${record.id}`);
//       }

//       if (!record.discord) {
//         await sendToDiscord(record);
//         record.discord = true;
//         console.log(` Sent to Discord → ${record.id}`);
//       }
//     } catch (err) {
//       console.error(` Send failed → ${record.id}`);
//     }
//   }

//   // 6️⃣ Update JSON after sending
//   await saveStoredTweets(storedTweets);
//   console.log(' JSON updated with send status');
// }






// //this is just for test code for telegram 
// // async function run() {
// //   console.log('🧪 LOCAL TEST MODE: Sending from JSON only');

// //   // 1️⃣ Read local JSON only
// //   const storedTweets = await readStoredTweets();

// //   if (!storedTweets.length) {
// //     console.log(' No data in local JSON');
// //     return;
// //   }

// //   // 2️⃣ Send ONLY unsent Telegram records
// //   for (const record of storedTweets) {
// //     try {
// //       if (!record.telegram) {
// //         await sendToTelegram(record);
// //         record.telegram = true;
// //         console.log(`Sent to Telegram → ${record.id}`);
// //       } else {
// //         console.log(`Already sent → ${record.id}`);
// //       }
// //     } catch (err) {
// //       console.error(`Telegram send failed → ${record.id}`);
// //     }
// //   }

// //   // 3️⃣ Save updated status
// //   await saveStoredTweets(storedTweets);
// //   console.log('📦 JSON updated after Telegram test');
// // }


// run().catch(err => {
//   console.error(' App crashed:', err);
// });






require('dotenv').config();
const cron = require('node-cron');

const { fetchLatestTweets } = require('./twitter');
const { readStoredTweets, saveStoredTweets } = require('./storage');
const { filterNewTweets } = require('./filter');
const { sendToTelegram } = require('./telegram');
const { sendToDiscord } = require('./discord');

const USERNAME = 'ayodhya_pati';
const FETCH_LIMIT = 4;

let isRunning = false; // prevent overlapping runs

async function run() {
  if (isRunning) {
    console.log('Previous run still in progress, skipping...');
    return;
  }

  isRunning = true;
  console.log('Checking tweets...');

  try {
    // 1️⃣ Fetch tweets
    const fetchedTweets = await fetchLatestTweets(USERNAME, FETCH_LIMIT);
    if (!fetchedTweets.length) {
      console.log('No tweets fetched.');
      return;
    }

    // 2️⃣ Read local JSON
    const storedTweets = await readStoredTweets();

    // 3️⃣ Filter new tweets
    const newTweets = filterNewTweets(fetchedTweets, storedTweets);
    if (!newTweets.length) {
      console.log('No new tweets.');
      return;
    }

    // 4️⃣ STORE FIRST
    for (const tweet of newTweets) {
      storedTweets.push({
        id: tweet.id,
        text: tweet.text,
        telegram: false,
        discord: false,
        storedAt: new Date().toISOString(),
      });

      console.log(`Stored in JSON → ${tweet.id}`);
    }

    // Save immediately
    await saveStoredTweets(storedTweets);
    console.log('All new tweets saved to local JSON');

    // 5️⃣ SEND FROM LOCAL STORAGE
    for (const record of storedTweets) {
      try {
        if (!record.telegram) {
          await sendToTelegram(record);
          record.telegram = true;
          console.log(`Sent to Telegram → ${record.id}`);
        }

        if (!record.discord) {
          await sendToDiscord(record);
          record.discord = true;
          console.log(`Sent to Discord → ${record.id}`);
        }
      } catch (err) {
        console.error(`Send failed → ${record.id}`);
      }
    }

    // 6️⃣ Update JSON after sending
    await saveStoredTweets(storedTweets);
    console.log('JSON updated with send status\n');

  } catch (err) {
    console.error('App error:', err);
  } finally {
    isRunning = false;
  }
}

// Run once immediately
run();

// ⏱ AUTO-RUN every 1 minute
cron.schedule('* * * * *', async () => {
  console.log('Auto-run triggered');
  await run();
});


console.log('ENV TEST');
console.log('TWITTER:', process.env.TWITTER_BEARER_TOKEN ? 'OK' : 'MISSING');
console.log('TELEGRAM BOT:', process.env.TELEGRAM_BOT_TOKEN ? 'OK' : 'MISSING');
console.log('CHAT ID:', process.env.TELEGRAM_CHAT_ID);
console.log(
  'DISCORD WEBHOOK:',
  process.env.DISCORD_WEBHOOK_URL ? 'OK' : 'MISSING'
);

