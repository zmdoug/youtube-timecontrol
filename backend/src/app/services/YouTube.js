const fetch = require('node-fetch');
const { YOUTUBE_API_KEY } = process.env;

class YouTubeService {

  async search(searchTerm) {
    return fetch(encodeURI(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${searchTerm.replace(' ', '+')}&order=date&part=id,snippet`))
      .then(result => result.json())
      .then(result => {
        if (result.error) return Promise.reject(result.error);
        return result;
      });
  }

  async videoDetails(videoIds) {
    return fetch(encodeURI(`https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&order=date&part=id,snippet,contentDetails,player`))
      .then(result => result.json())
      .then(result => {
        if (result.error) return Promise.reject(result.error);
        return result;
      });
  }
}

module.exports = new YouTubeService();