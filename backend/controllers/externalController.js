import asyncHandler from '../middleware/asyncHandler.js';

const getCountries = asyncHandler(async (req, res) => {
  try {
    const response = await fetch('https://apiv2.allsportsapi.com/football?met=Countries&APIkey=e0dd5acfa95fb7ad93a9fdce2ca90417ef7e577094f271f15115d09df030b1e7', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

const getLeagues = asyncHandler(async (req, res) => {
  try {
    const response = await fetch('https://apiv2.allsportsapi.com/football?met=Leagues&APIkey=e0dd5acfa95fb7ad93a9fdce2ca90417ef7e577094f271f15115d09df030b1e7', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data); // Log the response data to verify its structure
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

export {
    getCountries,getLeagues
};
