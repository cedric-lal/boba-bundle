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

export const mockErrorMessage = 'Mock error message';

export const fetchSuccess = {
  status: 200,
  body: mockSuccessPayload,
};

export const fetchError = {
  status: 400,
  body: { errorMessage: mockErrorMessage },
};
