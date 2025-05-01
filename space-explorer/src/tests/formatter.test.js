const { formatTimestamp, formatCoordinates, formatDate } = require('../utils/formatter');

describe('Formatter Utils Tests', () => {
  test('formatTimestamp formats ISO timestamp to locale string', () => {
    // Create a specific date for testing
    const isoTimestamp = '2023-05-15T10:30:45.000Z';
    
    const result = formatTimestamp(isoTimestamp);
    
    expect(typeof result).toBe('string');
    
    const date = new Date('2023-01-01T12:00:00Z');
    const spy = jest.spyOn(date, 'toLocaleString').mockReturnValue('Mocked Locale String');
    
    const originalDate = global.Date;
    global.Date = jest.fn(() => date);
    global.Date.UTC = originalDate.UTC;
    global.Date.parse = originalDate.parse;
    global.Date.now = originalDate.now;
    
    expect(formatTimestamp('2023-01-01T12:00:00Z')).toBe('Mocked Locale String');
    
    global.Date = originalDate;
    spy.mockRestore();
  });

  test('formatCoordinates formats latitude and longitude', () => {
    expect(formatCoordinates('45.1234', '75.5678')).toBe('45.1234° N, 75.5678° E');
    
    expect(formatCoordinates('-33.8688', '-151.2093')).toBe('33.8688° S, 151.2093° W');
    
    expect(formatCoordinates('0', '0')).toBe('0° N, 0° E');
    
    expect(formatCoordinates(45.1234, 75.5678)).toBe('45.1234° N, 75.5678° E');
  });

  test('formatDate formats date string to locale date', () => {
    const dateString = '2023-05-15T10:30:45.000Z';
    
    const result = formatDate(dateString);
    
    expect(typeof result).toBe('string');
    
    const mockDate = new Date('2023-01-01');
    const spy = jest.spyOn(mockDate, 'toLocaleDateString').mockReturnValue('1/1/2023');
    
    const originalDate = global.Date;
    global.Date = jest.fn(() => mockDate);
    global.Date.UTC = originalDate.UTC;
    global.Date.parse = originalDate.parse;
    global.Date.now = originalDate.now;
    
    expect(formatDate('2023-01-01')).toBe('1/1/2023');
    
    global.Date = originalDate;
    spy.mockRestore();
  });
}); 