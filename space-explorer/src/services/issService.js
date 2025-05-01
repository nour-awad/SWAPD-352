const axios = require('axios');

const ISS_LOCATION_URL = 'http://api.open-notify.org/iss-now.json';

/**
 * Fetches the current location of the International Space Station
 * @returns {Promise<Object>} - ISS location data including latitude, longitude, and timestamp
 */
async function getISSLocation() {
  try {
    const response = await axios.get(ISS_LOCATION_URL);
    
    return {
      latitude: response.data.iss_position.latitude,
      longitude: response.data.iss_position.longitude,
      timestamp: new Date(response.data.timestamp * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error fetching ISS location:', error.message);
    throw new Error(`Failed to fetch ISS location: ${error.message}`);
  }
}

/**
 * Starts polling for ISS location updates
 * @param {Function} callback - Function to call with location updates
 * @param {number} interval - Polling interval in milliseconds (default: 10000ms)
 * @returns {number} - Interval ID that can be used to clear the interval
 */
function startISSLocationTracking(callback, interval = 10000) {
  getISSLocation()
    .then(location => callback(location))
    .catch(error => console.error(error));
  
  const intervalId = setInterval(async () => {
    try {
      const location = await getISSLocation();
      callback(location);
    } catch (error) {
      console.error(error);
    }
  }, interval);
  
  return intervalId;
}

/**
 * Stops polling for ISS location updates
 * @param {number} intervalId - Interval ID returned by startISSLocationTracking
 */
function stopISSLocationTracking(intervalId) {
  clearInterval(intervalId);
}

module.exports = {
  getISSLocation,
  startISSLocationTracking,
  stopISSLocationTracking
}; 