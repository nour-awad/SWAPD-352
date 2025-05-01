function formatTimestamp(isoTimestamp) {
  const date = new Date(isoTimestamp);
  return date.toLocaleString();
}

/**
 * @param {string|number} lat - Latitude
 * @param {string|number} lon - Longitude
 * @returns {string} - Formatted coordinates
 */
function formatCoordinates(lat, lon) {
  const latitude = parseFloat(lat).toFixed(4);
  const longitude = parseFloat(lon).toFixed(4);
  
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lonDirection = longitude >= 0 ? 'E' : 'W';
  
  return `${Math.abs(latitude)}° ${latDirection}, ${Math.abs(longitude)}° ${lonDirection}`;
}

/**
 * @param {string} dateString - Date string in any valid format
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

module.exports = {
  formatTimestamp,
  formatCoordinates,
  formatDate
}; 