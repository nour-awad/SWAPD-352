require('dotenv').config();
const { getAstronomyPictureOfDay } = require('./services/nasaService');
const { getISSLocation, startISSLocationTracking } = require('./services/issService');
const { getUpcomingLaunches } = require('./services/launchService');
const { formatTimestamp, formatCoordinates, formatDate } = require('./utils/formatter');

async function demonstrateNasaAPOD() {
  console.log('\n===== NASA Astronomy Picture of the Day =====\n');
  try {
    const apod = await getAstronomyPictureOfDay();
    console.log(`Title: ${apod.title}`);
    console.log(`Date: ${apod.date}`);
    console.log(`Media Type: ${apod.mediaType}`);
    console.log(`URL: ${apod.url}`);
    console.log(`\nExplanation: ${apod.explanation}`);
  } catch (error) {
    console.error('APOD Demo Error:', error.message);
  }
}

function demonstrateISSTracking() {
  console.log('\n===== ISS Location Tracker =====\n');
  console.log('Starting ISS location tracking (updates every 10 seconds)...');
  
  let count = 0;
  const trackingId = startISSLocationTracking((location) => {
    count++;
    console.log(`\nUpdate #${count} at ${formatTimestamp(location.timestamp)}`);
    console.log(`ISS Current Location: ${formatCoordinates(location.latitude, location.longitude)}`);
    console.log(`Raw coordinates: Lat ${location.latitude}, Long ${location.longitude}`);
    
    if (count >= 3) {
      console.log('\nStopping ISS tracking demonstration.');
      clearInterval(trackingId);
    }
  }, 10000);
}

async function demonstrateLaunchLibrary() {
  console.log('\n===== Upcoming Space Launches =====\n');
  try {
    const upcomingLaunches = await getUpcomingLaunches({ limit: 5 });
    
    if (upcomingLaunches.length === 0) {
      console.log('No upcoming launches found.');
      return;
    }
    
    console.log(`Found ${upcomingLaunches.length} upcoming launches:\n`);
    
    upcomingLaunches.forEach((launch, index) => {
      console.log(`${index + 1}. ${launch.name}`);
      console.log(`   Mission: ${launch.mission}`);
      console.log(`   Vehicle: ${launch.vehicle}`);
      console.log(`   Launch Date: ${formatDate(launch.launchDate)}`);
      console.log(`   Status: ${launch.status}`);
      console.log(`   Launch Provider: ${launch.launchServiceProvider}`);
      console.log(`   Location: ${launch.padLocation}`);
      console.log('');
    });

  } catch (error) {
    console.error('Launch Library Demo Error:', error.message);
  }
}

async function runDemonstrations() {
  try {
    await demonstrateNasaAPOD();
    await demonstrateLaunchLibrary();
    demonstrateISSTracking();
  } catch (error) {
    console.error('Error in demonstrations:', error);
  }
}

runDemonstrations(); 