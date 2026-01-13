function filterNewTweets(fetchedTweets, storedTweets) {
  const postedIds = new Set(storedTweets.map(t => t.id));
  return fetchedTweets.filter(tweet => !postedIds.has(tweet.id));
}

module.exports = { filterNewTweets };
