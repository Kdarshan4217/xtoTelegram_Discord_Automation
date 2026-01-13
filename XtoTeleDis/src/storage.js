
// running code 
const fs = require('fs/promises');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../data/postedTweets.json');

async function readStoredTweets() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveStoredTweets(data) {
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
}

module.exports = {
  readStoredTweets,
  saveStoredTweets,
};



// const fs = require('fs/promises');
// const path = require('path');

// const FILE_PATH = path.join(__dirname, '../data/postedTweets.json');

// async function readStoredTweets() {
//   try {
//     const data = await fs.readFile(FILE_PATH, 'utf8');
//     return JSON.parse(data);
//   } catch {
//     return [];
//   }
// }

// async function saveStoredTweets(data) {
//   await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
// }

// function findStoredTweetById(storedTweets, id) {
//   return storedTweets.find(t => t.id === id);
// }

// module.exports = {
//   readStoredTweets,
//   saveStoredTweets,
//   findStoredTweetById,
// };
