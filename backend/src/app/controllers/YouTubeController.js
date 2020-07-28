const YouTubeService = require('../services/YouTube');
const { getVideoDuraion, secondsToMinutes } = require('../../utils/videoDataTools');

class YouTubeController {

  async search(req, res) {
    try {
      const { searchTerm } = req.body;

      YouTubeService.search(searchTerm)
        .then(results => {

          let videoIds = results.items.map(item => item.id.videoId);

          YouTubeService.videoDetails(videoIds)
            .then(allvideos => {

              let videos = [];
              let total = 0;

              allvideos.items.map(video => {
                video.duration = getVideoDuraion(video.contentDetails.duration);
                total += Math.floor(video.duration * 60);
                videos.push(video);
              });

              let totalMinutes = secondsToMinutes(total);

              return res.status(200).json({ videos, totalMinutes })
            })
            .catch(error => {
              return res.status(400).json({ message: error })
            })
        })
        .catch(error => {
          return res.status(400).json({ message: error })
        });
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }
}

module.exports = new YouTubeController();