export const mockSearchState = { currentSearch: "lodash" }

export const mockDefaultState = {
    fetchingDone: false,
    hasError: false,
    errorMessage: null,
    sizeStats: [],
};

export const mockLoadingState = {
    search: mockSearchState,
    packageStats: {
        fetchingDone: false,
        hasError: false,
        errorMessage: null,
        sizeStats: []
    }
};

export const mockErrorState = {
    search: mockSearchState,
    packageStats: {
        fetchingDone: true,
        hasError: true,
        errorMessage: "Error message from state",
        sizeStats: []
    }
};

export const mockSuccessState = {
    search: mockSearchState,
    packageStats: {
        fetchingDone: true,
        hasError: false,
        errorMessage: null,
        sizeStats: [
            {
                version: "1.1.1",
                minifiedSizeInKb: 3.2,
                gzipSizeInKb: 2.4,
            },
            {
                version: "2.2.1",
                minifiedSizeInKb: 2.1,
                gzipSizeInKb: 1.2,
            },
        ]
    }
};