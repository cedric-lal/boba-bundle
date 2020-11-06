export const mockSuccessPayload = [
  {
    version: '4.17.20',
    minifiedSizeInKb: '74.2',
    gzipSizeInKb: '25.5',
  },
  {
    version: '4.17.19',
    minifiedSizeInKb: '74.2',
    gzipSizeInKb: '25.5',
  },
  {
    version: '4.17.18',
    minifiedSizeInKb: '74.2',
    gzipSizeInKb: '25.5',
  },
  {
    version: '3.10.1',
    minifiedSizeInKb: '53.5',
    gzipSizeInKb: '19.3',
  },
];

const mockErrorPayload = {
  errorMessage: 'Mock error message',
};

export const fetchSuccess = async () => {
  console.log('Ïm calling fetch success mock');
  return {
    status: 200,
    payload: mockSuccessPayload,
  };
};

export const fetchError = async () => {
  console.log('Ïm calling fetch error mock');
  return {
    status: 400,
    payload: mockErrorPayload,
  };
};
