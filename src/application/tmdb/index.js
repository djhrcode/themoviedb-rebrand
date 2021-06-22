import createHttpClient from "@/infrastructure/http";
import { createResource } from "@/infrastructure/http/types";
import TMDBConfig from "./config";

export default function TMDBService() {
    return createHttpClient(TMDBConfig().API_URL()).setHeader(
        "Authorization",
        `Bearer ${TMDBConfig().API_TOKEN()}`
    );
}

/**
 * @template T
 * @param {object} data
 * @param {import("../../infrastructure/http/types").ResourceFactory<T>} Resource
 */
export const createPaginationJson = (data, Resource) => {
    const Paginated = createResource((data, serializer) => ({
        page: serializer.int(data.page),
        results: serializer.collection(Resource, data.results),
        total_pages: serializer.int(data.total_pages),
        total_results: serializer.int(data.total_results),
    }));

    return Paginated(data);
};
