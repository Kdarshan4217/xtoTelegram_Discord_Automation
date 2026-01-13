
//running code 
const axios = require('axios');
const cheerio = require('cheerio');

const MIRRORS = [
  'https://nitter.net',
  'https://nitter.poast.org',
  'https://nitter.privacydev.net',
  'https://nitter.fdn.fr'
];

async function fetchLatestTweets(username, limit = 2) {
  for (const base of MIRRORS) {
    try {
      const url = `${base}/${username}`;
      console.log(`Trying mirror: ${url}`);

      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const tweets = [];

      $('.timeline-item').each((_, el) => {
        if (tweets.length >= limit) return;

        const text = $(el).find('.tweet-content').text().trim();
        const link =
          $(el).find('a.tweet-link').attr('href') ||
          $(el).find('a[href*="/status/"]').attr('href');

        if (!text || !link) return;

        const match = link.match(/status\/(\d+)/);
        if (!match) return;

        tweets.push({
          id: match[1],
          text,
        });
      });

      if (tweets.length > 0) {
        console.log(`Fetched ${tweets.length} tweets from ${base}`);
        return tweets;
      }
    } catch (err) {
      console.log(`Mirror failed: ${base}`);
    }
  }

  return [];
}

module.exports = { fetchLatestTweets };




// const axios = require('axios');
// const xml2js = require('xml2js');

// const MIRRORS = [
//   'https://nitter.net',
//   'https://nitter.poast.org',
//   'https://nitter.privacydev.net',
//   'https://nitter.fdn.fr'
// ];

// async function fetchLatestTweets(username, limit = 2) {
//   for (const base of MIRRORS) {
//     try {
//       const url = `${base}/${username}/rss`;
//       console.log(`Trying RSS: ${url}`);

//       const response = await axios.get(url, {
//         headers: { 'User-Agent': 'Mozilla/5.0' },
//         timeout: 10000,
//       });

//       const parsed = await xml2js.parseStringPromise(response.data, {
//         explicitArray: false,
//       });

//       const items = parsed?.rss?.channel?.item;
//       if (!items) continue;

//       const tweets = (Array.isArray(items) ? items : [items])
//         .slice(0, limit)
//         .map(item => {
//           const match = item.link.match(/status\/(\d+)/);
//           return {
//             id: match ? match[1] : null,
//             text: item.title,
//           };
//         })
//         .filter(t => t.id && t.text);

//       if (tweets.length > 0) {
//         console.log(`Fetched ${tweets.length} tweets from ${base}`);
//         return tweets;
//       }
//     } catch {
//       console.log(`RSS failed: ${base}`);
//     }
//   }

//   return [];
// }

// module.exports = { fetchLatestTweets };
