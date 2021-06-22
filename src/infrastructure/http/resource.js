import createHttpClient from ".";

const createPaginationRequest = (httpClient, initialPage = 1) => {
    const paginationState = { page: initialPage, lastPage: Infinity };

    const resetPagination = () => (paginationState.page = initialPage);
    const createRequest = () => createHttpClient.fromClient(httpClient);

    const fetchPage = (page) =>
        createRequest().get("").setQuery({ page: page });

    const paginationHasFinished = () =>
        paginationState.page > paginationState.lastPage;

    const fetchNextPage = () => {
        return fetchPage(paginationState.page++);
    };

    return {
        initialize() {
            return resetPagination() && fetchNextPage();
        },

        nextPage() {
            console.log(paginationState);
            return fetchNextPage();
        },

        getPage(page) {
            return fetchPage(page);
        },

        setLastPage(page) {
            return (paginationState.lastPage = page) && this;
        },
    };
};

const createHttpResource = (httpClient, pathName) => {
    const resourceClient = createHttpClient
        .fromClient(httpClient)
        .setSuffix(pathName);

    const { put, post, ...otherMethodsAndProperties } = resourceClient;

    const httpInstance = {
        setSuffix: (suffix) => resourceClient.setSuffix(suffix) && httpInstance,

        setQuery: (query) => resourceClient.setQuery(query) && httpInstance,

        setData: (data) => resourceClient.setData(data) && httpInstance,

        setHeader: (header, value) =>
            resourceClient.setHeader(header, value) && httpInstance,

        base: () => createHttpClient.fromClient(resourceClient),

        pagination: () => createPaginationRequest(resourceClient),

        collection: () => resourceClient.get(``),

        get: (id) => resourceClient.get(`/${id}`),

        create: (data) => resourceClient.post(``, data),

        update: (id, data) => resourceClient.put(`/${id}`, data),

        delete: (id) => resourceClient.delete(`/${id}`),
    };

    return httpInstance;
};

export default createHttpResource;
