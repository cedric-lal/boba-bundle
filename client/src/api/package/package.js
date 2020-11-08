import apiBaseURL from '../apiConfig';

/**
 * Call the API to retrieve package size information
 * @param {string} packageName
 * @returns {[{version: string, minifiedSizeInKb: string, gzipSizeInKb: string}]} search api response json
 */
export const search = async (packageName) => {
  const trimmedPkgName = packageName.replace(/\s/g, ''); // Remove all whitespace characters
  return fetch(apiBaseURL + 'api/search?package=' + trimmedPkgName).then(
    async (res) => {
      return {
        status: res.status,
        payload: await res.json(),
      };
    }
  );
};
