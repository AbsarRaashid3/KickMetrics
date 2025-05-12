import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const pollLiveMatches = async (io) => {
  try {
    const res = await axios.get('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-apisports-key': process.env.FOOTBALL_API_KEY
      }
    });

    const matches = res.data.response;

    matches.forEach(match => {
      const home = match.teams.home.name;
      const away = match.teams.away.name;
      const score = match.goals;

      const message = `${home} ${score.home} - ${score.away} ${away}`;
      
      // Send notification
      io.emit('newNotification', {
        title: 'Live Match Update',
        message
      });
    });
  } catch (error) {
    console.error('Error polling live matches:', error.message);
  }
};
