const { it, describe, expect } = require('@jest/globals');

jest.mock('../src/services/weatherApi');
const { queryForecast } = require('../src/weather');
const { fetchPlaces, fetchWeather } = require('../src/services/weatherApi');
const { queriedForecast, queriedLocation } = require('./fixtures/weatherApi.json');
const { queryForecastResponse } = require('./fixtures/weather.json');

describe('testando função queryForecast', () => {
  it('retorna o objeto correto', async () => {
    fetchPlaces.mockResolvedValueOnce(queriedLocation);
    fetchWeather.mockResolvedValueOnce(queriedForecast);

    const returnedForecast = await queryForecast({ query: 'brasília' });

    expect(returnedForecast).toEqual(queryForecastResponse);
  });

  it('retorna o erro correto quando falha', async () => {
    fetchPlaces.mockRejectedValueOnce('Nao foi possivel encontrar o lugar');
    const expectedError = new Error('Nao foi possivel encontrar o lugar');

    try {
      await queryForecast({ query: 'brasília' })
    } catch (err) {
      expect(err).toEqual(expectedError);
    }

  });

  it('quando a fetchPlaces falha, nao chama a fetchWeather', async () => {
    fetchWeather.mockClear();
    fetchPlaces.mockRejectedValueOnce('Nao foi possivel encontrar o lugar');

    try {
      await queryForecast({ query: 'brasília' })
    } catch (err) {
      expect(fetchWeather).toHaveBeenCalled();
    }
  });
});
