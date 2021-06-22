import { createResource } from "../../infrastructure/http/types";

/**
 * @typedef {object} Movie
 * @property {() => number} uuid
 * @property {() => string} year
 * @property {() => string} titleWithYear
 * @property {() => string} title
 * @property {() => string} description
 * @property {() => number} voteAverage
 * @property {() => number} voteCount
 * @property {() => boolean} isEmpty
 */

/**
 * @return {Movie}
 */
function Date({
    uuid = null,
    year = null,
    description = null,
    title = null,
    voteAverage = null,
    voteCount = null,
    isEmpty = true,
} = {}) {
    return {
        uuid: () => uuid,
        year: () => year,
        title: () => title,
        description: () => description,
        voteAverage: () => voteAverage,
        voteCount: () => voteCount,
        releaseDate: () => releaseDate,
        isEmpty: () => isEmpty,
        titleWithYear: () => `${title} ${"("+year+")" ?? ""}`,
    };
}

export default Movie;
