import { resolveImageSize } from ".";

/**
 * @typedef {object} PosterImage
 * @property {string} small
 * @property {string} medium
 * @property {string} large
 * @property {string} xlarge
 * @property {string} original
 */

/**
 * @return {PosterImage}
 */
export default function PosterImageResource(image) {
    return {
        get small() {
            return resolveImageSize(`w185`, image);
        },
        get medium() {
            return resolveImageSize(`w500`, image);
        },
        get large() {
            return resolveImageSize(`w780`, image);
        },
        get xlarge() {
            return resolveImageSize(`w1280`, image);
        },
        get original() {
            return resolveImageSize(`original`, image);
        },
    };
}
