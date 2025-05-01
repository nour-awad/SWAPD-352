const axios = require('axios');
const { getUpcomingLaunches } = require('../services/launchService');

jest.mock('axios');

describe('Launch Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getUpcomingLaunches returns properly formatted data', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            id: '1234',
            name: 'SpaceX Falcon 9 - Starlink 5-1',
            status: {
              name: 'Go'
            },
            rocket: {
              configuration: {
                name: 'Falcon 9'
              }
            },
            mission: {
              name: 'Starlink 5-1'
            },
            net: '2023-05-20T12:30:00Z',
            launch_service_provider: {
              name: 'SpaceX'
            },
            pad: {
              name: 'Space Launch Complex 40',
              location: {
                name: 'Cape Canaveral, FL'
              }
            }
          },
          {
            id: '5678',
            name: 'Rocket Lab Electron - Test Mission',
            status: {
              name: 'TBD'
            },
            rocket: {
              configuration: {
                name: 'Electron'
              }
            },
            mission: null, 
            net: '2023-06-15T00:00:00Z',
            launch_service_provider: {
              name: 'Rocket Lab'
            },
            pad: {
              name: 'Launch Complex 1A',
              location: {
                name: 'Mahia Peninsula, New Zealand'
              }
            }
          }
        ]
      }
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);
    
    const result = await getUpcomingLaunches();
    expect(axios.get).toHaveBeenCalledWith('https://ll.thespacedevs.com/2.0.0/launch/upcoming/', {
      params: { limit: 10, offset: 0 }
    });
    
    expect(result).toHaveLength(2);
    
    expect(result[0]).toEqual({
      id: '1234',
      name: 'SpaceX Falcon 9 - Starlink 5-1',
      status: 'Go',
      vehicle: 'Falcon 9',
      mission: 'Starlink 5-1',
      launchDate: '2023-05-20T12:30:00Z',
      launchServiceProvider: 'SpaceX',
      padLocation: 'Space Launch Complex 40, Cape Canaveral, FL'
    });
    
    expect(result[1].mission).toBe('No mission details');
  });

  test('getUpcomingLaunches applies filters correctly', async () => {
    const mockResponse = {
      data: {
        results: []
      }
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);
    
    const options = {
      status: 'Go',
      startDate: '2023-06-01',
      endDate: '2023-07-01',
      limit: 5
    };
    
    await getUpcomingLaunches(options);
        expect(axios.get).toHaveBeenCalledWith('https://ll.thespacedevs.com/2.0.0/launch/upcoming/', {
      params: {
        limit: 5,
        offset: 0,
        status: 'Go',
        net__gte: '2023-06-01',
        net__lte: '2023-07-01'
      }
    });
  });

  test('getUpcomingLaunches handles errors properly', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    await expect(getUpcomingLaunches()).rejects.toThrow(`Failed to fetch upcoming launches: ${errorMessage}`);
  });
}); 