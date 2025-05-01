const axios = require('axios');
const { getISSLocation, startISSLocationTracking, stopISSLocationTracking } = require('../services/issService');

jest.mock('axios');

jest.useFakeTimers();

describe('ISS Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getISSLocation returns properly formatted data', async () => {
    const mockResponse = {
      data: {
        iss_position: {
          latitude: '45.1234',
          longitude: '-75.5678'
        },
        timestamp: 1652592000 
      }
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);
    
    const result = await getISSLocation();
    
    expect(axios.get).toHaveBeenCalledWith('http://api.open-notify.org/iss-now.json');
    
    expect(result).toEqual({
      latitude: '45.1234',
      longitude: '-75.5678',
      timestamp: expect.any(String)
    });
    
    expect(new Date(result.timestamp).getTime()).toBe(mockResponse.data.timestamp * 1000);
  });

  test('getISSLocation handles errors properly', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    await expect(getISSLocation()).rejects.toThrow(`Failed to fetch ISS location: ${errorMessage}`);
  });

  test('startISSLocationTracking sets up interval and returns interval ID', () => {
    const mockSetInterval = jest.spyOn(global, 'setInterval').mockReturnValueOnce(123);
    
    const mockLocation = {
      latitude: '45.1234',
      longitude: '-75.5678',
      timestamp: new Date().toISOString()
    };
    
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        iss_position: {
          latitude: '45.1234',
          longitude: '-75.5678'
        },
        timestamp: Math.floor(Date.now() / 1000)
      }
    });
    
    const mockCallback = jest.fn();
    
    const result = startISSLocationTracking(mockCallback, 5000);
    
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);
    
    expect(result).toBe(123);
    
    mockSetInterval.mockRestore();
  });

  test('startISSLocationTracking callback handles errors', async () => {
    let intervalCallback;
    jest.spyOn(global, 'setInterval').mockImplementation((callback, interval) => {
      intervalCallback = callback;
      return 456;
    });
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    axios.get.mockRejectedValueOnce({}).mockRejectedValueOnce(new Error('Interval error'));
    
    const mockCallback = jest.fn();
    startISSLocationTracking(mockCallback, 5000);
    
    await intervalCallback();
    
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(mockCallback).not.toHaveBeenCalled();
    
    consoleErrorSpy.mockRestore();
  });

  test('stopISSLocationTracking calls clearInterval', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    
    stopISSLocationTracking(123);
    
    expect(clearIntervalSpy).toHaveBeenCalledWith(123);
  });
}); 