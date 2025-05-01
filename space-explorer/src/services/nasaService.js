const axios = require('axios');
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

/**
 * @param {string} date - Optional date in YYYY-MM-DD format
 * @returns {Promise<Object>} - APOD data including title, explanation, date and image URL
 */

async function getAstronomyPictureOfDay(date = null) {
  try {
    const params = {
      api_key: NASA_API_KEY,
    };
    
    if (date) {
      params.date = date;
    }
    
    const response = await axios.get(NASA_APOD_URL, { params });
    return {
      title: response.data.title,
      explanation: response.data.explanation,
      date: response.data.date,
      url: response.data.url,
      mediaType: response.data.media_type,
      hdurl: response.data.hdurl
    };
  } catch (error) {
    console.error('Error fetching NASA APOD:', error.message);
    throw new Error(`Failed to fetch Astronomy Picture of the Day: ${error.message}`);
  }
}

module.exports = {
  getAstronomyPictureOfDay
}; 