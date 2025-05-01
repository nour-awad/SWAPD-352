const axios = require('axios');

const LAUNCH_LIBRARY_URL = 'https://ll.thespacedevs.com/2.0.0/launch/upcoming/';

/**
 * @param {Object} options - Filter options
 * @param {string} options.status - Launch status filter (e.g., 'Go', 'TBD', 'Hold')
 * @param {string} options.startDate - Start date filter in ISO format (YYYY-MM-DD)
 * @param {string} options.endDate - End date filter in ISO format (YYYY-MM-DD)
 * @param {number} options.limit - Maximum number of results to return (default: 10)
 * @returns {Promise<Array>} - Array of upcoming launches
 */
async function getUpcomingLaunches(options = {}) {
  try {
    const params = {
      limit: options.limit || 10,
      offset: options.offset || 0
    };

    if (options.status) {
      params.status = options.status;
    }
    
    if (options.startDate) {
      params.net__gte = options.startDate;
    }
    
    if (options.endDate) {
      params.net__lte = options.endDate;
    }
    
    const response = await axios.get(LAUNCH_LIBRARY_URL, { params });
    
    return response.data.results.map(launch => ({
      id: launch.id,
      name: launch.name,
      status: launch.status.name,
      vehicle: launch.rocket.configuration.name,
      mission: launch.mission ? launch.mission.name : 'No mission details',
      launchDate: launch.net,
      launchServiceProvider: launch.launch_service_provider.name,
      padLocation: `${launch.pad.name}, ${launch.pad.location.name}`
    }));
  } catch (error) {
    console.error('Error fetching upcoming launches:', error.message);
    throw new Error(`Failed to fetch upcoming launches: ${error.message}`);
  }
}

module.exports = {
  getUpcomingLaunches
}; 