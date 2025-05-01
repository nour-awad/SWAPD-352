# Space Explorer

A Node.js application that connects to various space-related APIs to retrieve and display information about astronomy, the International Space Station, and upcoming space launches.

## Features

### NASA Astronomy Picture of the Day

- Retrieves the current day's featured astronomy image
- Displays image title, explanation, and date
- Handles various media types (images, videos)

### ISS Location Tracker

- Fetches the real-time position of the International Space Station
- Updates location data every 10 seconds
- Displays latitude, longitude, and timestamp for each update

### Upcoming Space Launches

- Lists details of upcoming space launches from around the world
- Displays mission name, vehicle, and launch date
- Allows filtering by launch status or date range

## Project Structure

```
space-explorer/
├── .gitignore            # Git ignore file for node modules, env vars, etc.
├── package.json          # Dependencies and scripts configuration
├── README.md             # This file
└── src/                  # Source code
    ├── index.js          # Main application entry point
    ├── services/         # API service integrations
    │   ├── nasaService.js    # NASA APOD API integration
    │   ├── issService.js     # ISS Location tracking service
    │   └── launchService.js  # Launch Library API integration
    ├── utils/            # Utility functions
    │   └── formatter.js      # Date and coordinate formatting utilities
    └── tests/            # Unit tests
        ├── nasaService.test.js   # Tests for NASA service
        ├── issService.test.js    # Tests for ISS service
        ├── launchService.test.js # Tests for Launch service
        └── formatter.test.js     # Tests for formatter utilities
```

## Code Details

### NASA APOD Service

- Uses axios to fetch data from NASA's API
- Implements error handling for API failures
- Formats response data for easy consumption

### ISS Location Service

- Connects to Open Notify API to get ISS position
- Uses interval-based polling for regular updates
- Provides location tracking management functions

### Launch Library Service

- Fetches upcoming launches with filtering options
- Formats complex launch data into standardized objects
- Handles edge cases like missing mission information

### Utilities

- Provides formatting for timestamps, coordinates, and dates
- Converts raw API data into human-readable formats

## Installation

1. Clone the repository:

```
git clone <repository-url>
cd space-explorer
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory with your NASA API key:

```
NASA_API_KEY=your_api_key_here
```

Note: You can use `DEMO_KEY` for testing, but it has rate limits.

## Usage

Run the application:

```
npm start
```

This will demonstrate all three API integrations in sequence:

1. Display the NASA Astronomy Picture of the Day
2. Show a list of upcoming space launches
3. Track the ISS location for 3 updates (30 seconds)

## Testing

The project includes comprehensive test coverage for all services:

```
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report
```

Current test coverage: 98.24% statements, 95.65% branches, 100% functions

## Example Output

### NASA APOD

```
===== NASA Astronomy Picture of the Day =====

Title: Messier 106
Date: 2023-05-15
Media Type: image
URL: https://apod.nasa.gov/apod/image/2305/M106_HubbleMiller_1080.jpg

Explanation: M106 is a nearby spiral galaxy with a bright active galactic nucleus powered by matter falling into a supermassive black hole...
```

### ISS Tracker

```
===== ISS Location Tracker =====

Starting ISS location tracking (updates every 10 seconds)...

Update #1 at 5/15/2023, 10:30:45 AM
ISS Current Location: 45.1234° N, 75.5678° W
Raw coordinates: Lat 45.1234, Long -75.5678

Update #2 at 5/15/2023, 10:30:55 AM
ISS Current Location: 42.9876° N, 78.1234° W
Raw coordinates: Lat 42.9876, Long -78.1234
```

### Upcoming Launches

```
===== Upcoming Space Launches =====

Found 5 upcoming launches:

1. SpaceX Falcon 9 - Starlink 5-1
   Mission: Starlink 5-1
   Vehicle: Falcon 9
   Launch Date: 5/20/2023
   Status: Go
   Launch Provider: SpaceX
   Location: Space Launch Complex 40, Cape Canaveral, FL

2. Rocket Lab Electron - Test Mission
   Mission: No mission details
   Vehicle: Electron
   Launch Date: 6/15/2023
   Status: TBD
   Launch Provider: Rocket Lab
   Location: Launch Complex 1A, Mahia Peninsula, New Zealand
```

## API References

- [NASA API Documentation](https://api.nasa.gov/)
- [Launch Library 2 API Documentation](https://thespacedevs.com/llapi)
- [Open Notify ISS Location API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with ❤️ using Node.js.
