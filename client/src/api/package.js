/**
 * Call the API to retrieve package size information
 * @param {string} packageName 
 * @returns {[{version: string, minifiedSizeInKb: string, gzipSizeInKb: string}]} search api response json
 */
export const search = async (packageName) => {
  return fetch(
    "http://localhost:9000/api/search?package=" + packageName
  ).then(async (res) => {
    return {
      status: res.status,
      payload: await res.json()
    }
  });
};