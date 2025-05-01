const axios = require('axios');
const { getAstronomyPictureOfDay } = require('../services/nasaService');

jest.mock('axios');

describe('NASA Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAstronomyPictureOfDay returns properly formatted data', async () => {
    const mockResponse = {
      data: {
        title: 'Test APOD Image',
        explanation: 'This is a test explanation',
        date: '2023-05-15',
        url: 'https://apod.nasa.gov/test-image.jpg',
        media_type: 'image',
        hdurl: 'https://apod.nasa.gov/test-image-hd.jpg'
      }
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);
    
    const result = await getAstronomyPictureOfDay();
    
    expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod', {
      params: { api_key: expect.any(String) }
    });
    
    expect(result).toEqual({
      title: 'Test APOD Image',
      explanation: 'This is a test explanation',
      date: '2023-05-15',
      url: 'https://apod.nasa.gov/test-image.jpg',
      mediaType: 'image',
      hdurl: 'https://apod.nasa.gov/test-image-hd.jpg'
    });
  });

  test('getAstronomyPictureOfDay with date parameter', async () => {
    const mockResponse = {
      data: {
        title: 'Specific Date Image',
        explanation: 'This is a specific date explanation',
        date: '2022-01-01',
        url: 'https://apod.nasa.gov/specific-date.jpg',
        media_type: 'image',
        hdurl: 'https://apod.nasa.gov/specific-date-hd.jpg'
      }
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);
    
    const result = await getAstronomyPictureOfDay('2022-01-01');
    
    expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod', {
      params: { 
        api_key: expect.any(String),
        date: '2022-01-01'
      }
    });
    
    expect(result.date).toBe('2022-01-01');
  });

  test('getAstronomyPictureOfDay handles errors properly', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    await expect(getAstronomyPictureOfDay()).rejects.toThrow(`Failed to fetch Astronomy Picture of the Day: ${errorMessage}`);
  });
}); 