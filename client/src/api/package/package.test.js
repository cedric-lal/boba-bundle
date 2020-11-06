import { search } from './package';
import * as MockPackageApi from './package.mock';
import fetchMock from 'fetch-mock';
import apiBaseURL from '../apiConfig';

afterEach(() => {
  fetchMock.restore();
});

test('return success state from api', () => {
  fetchMock.getOnce(
    apiBaseURL + 'api/search?package=lodash',
    MockPackageApi.fetchSuccess
  );

  const expectedRes = {
    status: 200,
    payload: MockPackageApi.mockSuccessPayload,
  };

  return search('lodash').then((res) => {
    expect(res).toEqual(expectedRes);
  });
});

test('return error state from api', () => {
  fetchMock.getOnce(
    apiBaseURL + 'api/search?package=react',
    MockPackageApi.fetchError
  );

  const expectedRes = {
    status: 400,
    payload: { errorMessage: MockPackageApi.mockErrorMessage },
  };

  return search('react').then((res) => {
    expect(res).toEqual(expectedRes);
  });
});
