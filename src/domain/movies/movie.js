/**
 * @typedef {object} Movie
 * @property {number} uuid
 * @property {string} year
 * @property {string} titleWithYear
 * @property {string} title
 * @property {string} description
 * @property {string} popularity
 * @property {string} backdropImage
 * @property {string} posterImage
 * @property {number} voteAverage
 * @property {number} voteCount
 * @property {boolean} isEmpty
 */

/**
 * @return {Movie}
 */
function Movie({
    uuid = null,
    year = null,
    description = null,
    title = null,
    popularity = null,
    voteAverage = null,
    voteCount = null,
    isEmpty = true,
    releaseDate = null,
    posterImage = null,
    backdropImage = null,
} = {}) {
    return {
        get uuid() {
            return uuid;
        },
        get year() {
            return year;
        },
        get title() {
            return title;
        },
        get description() {
            return description;
        },
        get popularity() {
            return popularity;
        },
        get voteAverage() {
            return voteAverage;
        },
        get voteCount() {
            return voteCount;
        },
        get releaseDate() {
            return releaseDate;
        },
        get backdropImage() {
            return backdropImage;
        },
        get posterImage() {
            return posterImage;
        },
        get isEmpty() {
            return isEmpty;
        },
        get titleWithYear() {
            return `${title} ${year ? `(${year})` : ""}`;
        },
    };
}

export default Movie;
