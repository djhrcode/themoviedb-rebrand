import superagent from "superagent";
import suffix from "superagent-suffix";
import prefix from "superagent-prefix";

/**
 *
 * @param {string|null} baseUrl
 * @returns
 */
const createHttpClient = (baseUrl = null, config = null) => {
    const globalConfig = config ?? {
        baseUrl: baseUrl,
        headers: {},
        data: {},
        suffix: "",
        query: {},
    };

    /**
     *
     * @param {import('superagent').SuperAgentRequest} instance
     * @param {{[key: string]: string}} headers
     * @returns {import('superagent').SuperAgentRequest}
     */
    const applyHeader = (instance, header, value) => {
        return Array.isArray(header)
            ? instance.set(header[0], header[1])
            : instance.set(header, value);
    };

    /**
     *
     * @param {import('superagent').SuperAgentRequest} instance
     * @param {{[key: string]: string}} headers
     * @returns {import('superagent').SuperAgentRequest}
     */
    const applyHeaders = (instance, headers) =>
        Object.entries(headers).reduce(applyHeader, instance);

    /**
     *
     * @param {import('superagent').SuperAgentRequest} instance
     * @param {{[key: string]: string}} query
     * @returns {import('superagent').SuperAgentRequest}
     */
    const applyQuery = (instance, query) => instance.query(query);

    /**
     *
     * @param {import('superagent').SuperAgentRequest} instance
     * @param {string} suffix
     * @returns {import('superagent').SuperAgentRequest}
     */
    const applySuffix = (instance, value) => instance.use(suffix(value));

    /**
     *
     * @param {import('superagent').SuperAgentRequest} instance
     * @param {string} suffix
     * @returns {import('superagent').SuperAgentRequest}
     */
    const applyPrefix = (instance, value) => instance.use(prefix(value));

    const applyGlobalConfig = (instance) => {
        applyHeaders(instance, globalConfig.headers);
        applySuffix(instance, globalConfig.suffix);
        applyQuery(instance, globalConfig.query);
    };

    const createClient = (url, method = "GET") => superagent(method, url);

    /**
     * Creates a new instance of RequestContract to interact with
     *
     * @param {string} url
     * @param {string} method
     */
    const createRequest = (url, method = "GET") => {
        const isBaseUrl = !!globalConfig.baseUrl;
        const mainUrl = isBaseUrl ? globalConfig.baseUrl : url;
        const requestInstance = createClient(mainUrl, method);

        applyGlobalConfig(requestInstance);

        if (isBaseUrl) applySuffix(requestInstance, url);

        /**
         * Defines public methods to interact with Request instance
         *
         * @typedef {requestContract} RequestInterface
         */
        const requestContract = {
            /**
             * Sets the header to be sent with the request
             *
             * @param {string} key Define header's name
             * @param {string} value Defina header's value
             * @returns {RequestInterface}
             */
            setHeader: (key, value) => {
                applyHeader(requestInstance, key, value);
                return requestContract;
            },

            /**
             * Sets the body of the request from the given data
             *
             * @param {{[key: string]: string}} data
             * @returns {RequestInterface}
             */
            setData: (data) => {
                requestInstance.send(data);
                return requestContract;
            },

            /**
             * Sets the given suffix to the request's path
             *
             * @param {string} suffix
             * @returns {RequestInterface}
             */
            setSuffix: (suffix) => {
                applySuffix(requestInstance, suffix);
                return requestContract;
            },

            /**
             * Sets the query parameters to be sent with the request
             *
             * @param {{[key: string]: string}} query
             * @returns {RequestInterface}
             */
            setQuery: (query) => {
                applyQuery(requestInstance, query)
                return requestContract;
            },

            fetch: async () => await requestInstance,
        };

        return requestContract;
    };

    /**
     * @typedef {httpClientContract} HttpClientInterface
     */
    const httpClientContract = {
        get: (url) => createRequest(url, "GET"),

        post: (url, data = {}) => createRequest(url, "POST").setData(data),

        put: (url, data = {}) => createRequest(url, "PUT").setData(data),

        delete: (url) => createRequest(url, "DELETE"),

        setHeader(header, value) {
            globalConfig.headers[header] = value;
            return httpClientContract;
        },

        setQuery(query) {
            globalConfig.query = { ...globalConfig.query, ...query };
            return httpClientContract;
        },

        setData(data) {
            globalConfig.data = { ...globalConfig.data, ...data };
            return httpClientContract;
        },

        setSuffix(suffix) {
            globalConfig.suffix += suffix;
            return httpClientContract;
        },

        getGlobalConfig() {
            return globalConfig;
        },
    };

    return httpClientContract;
};

createHttpClient.fromClient = (httpClient) =>
    createHttpClient(null, httpClient.getGlobalConfig());

export default createHttpClient;
