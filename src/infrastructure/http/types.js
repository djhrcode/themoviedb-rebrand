/**
 * @typedef {"string" | "number" | "boolean" | "function" | "bigint" | "symbol" | "undefined" | "object"} PrimitiveType
 */

/**
 * @template T
 * @typedef {(data: object, types: TypesSerializer) => T} ResourceFactoryCallback
 */

/**
 * @template T
 * @typedef {{(data: object) => T, collection: (data: any[]) => T[] } } ResourceFactory
 */

/**
 * @template T
 * @typedef {(data: any[]) => T[]} ResourceCollectionFactory
 */

/**
 *
 * @param {*} value
 * @param {PrimitiveType} type
 * @returns
 */
const isTypeof = (value, type) => typeof value === type;

const isString = (value) => isTypeof(value, "string");

const isBoolean = (value) => isTypeof(value, "boolean");

const isNumber = (value) =>
    !isNaN(parseInt(value)) || isTypeof(value, "number");

const isInstanceOf = (typeConstructor, value) =>
    value instanceof typeConstructor;

// const isResource = (typeResource, value) =>

const throwInvalidTypeError = (expected, given) => {
    throw TypeError(`Invalid type: expected ${expected} but got ${given}`);
};

/**
 * @template T
 * @typedef {T?} Nullable 
 */

/**
 * 
 * @template T
 * @param {T} [value] 
 * @returns {Nullable<T>}
 */
const nullable = (value) => value;

/**
 * @returns {string} 
 */
const parseString = (value) => value.toString();

const parseBoolean = (value) => !!value;

const Validations = {
    string: (value) => isTypeof(value, "string"),

    int: (value) => isNumber(value),

    float: (value) => isNumber(value),

    boolean: (value) => isBoolean(value),
};

/**
 * @typedef {Types} TypesSerializer
 */
const Types = {
    string(value) {
        return isString(value) && parseString(value);
    },

    int(value, nullable = false) {
        return isNumber(value) && parseInt(value);
    },

    float(value) {
        return isNumber(value) && parseFloat(value);
    },

    boolean(value) {
        return isBoolean(value) && parseBoolean(value);
    },

    /**
     *
     * @template T
     * @param {(data) => T} ResourceFactory
     * @param {any} value
     * @returns {T}
     */
    resource(ResourceFactory, value) {
        return ResourceFactory(value);
    },

    /**
     *
     * @template T
     * @param {ResourceFactory<T>} ResourceFactory
     * @param {any[]} value
     * @returns {Array<T>}
     */
    collection(ResourceFactory, value) {
        return ResourceFactory.collection(value);
    },

    /**
     *
     * @template T
     * @param {new () => T} type
     * @param {any} value
     * @returns {T}
     */
    instanceof(type, value) {
        return isInstanceOf(type, value) && value;
    },
};

/**
 * @template T
 * @param {ResourceFactoryCallback<T>} resourceFactory
 * @returns {ResourceCollectionFactory<T>}
 */
export const createCollection = (resourceFactory) => (data) =>
    data.map((data) => resourceFactory(data, Types));

/**
 * Creates a ResourceFactory to serialize json data
 *
 * @template T
 * @param {ResourceFactoryCallback<T>} resourceFactory
 * @returns {ResourceFactory<T>}
 */
export const createResource = (resourceFactory) => {
    const factory = (data) => resourceFactory(data, Types);

    factory.collection = createCollection(resourceFactory);

    return factory;
};

/****************************************************
 * 
 * Example of how to use createResource function
 * using the serializer with dependency injection

const User = createResource((data, serializer) => ({
    name: serializer.string(data.name),
    email: serializer.string(data.email),
    age: serializer.number(data.age),
}))

const Movie = createResource((data, serializer) => ({
    hello: serializer.string(data.hello),
    birthdate: serializer.float(data.date),
    collection: serializer.collection(User, date.actors),
    author: serializer.resource(User, data.user),
    task: serializer.instanceof(Task, data.task),
}));

****************************************************/
