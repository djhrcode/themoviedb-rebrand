import { resolveImageSize } from ".";

/**
 * @typedef {object} BackdropImage
 * @property {string} small
 * @property {string} medium
 * @property {string} large
 * @property {string} xlarge
 * @property {string} original
 */

/**
 * @return {BackdropImage}
 */
export default function BackdropImageResource(image) {
    return {
        get small() {
            return resolveImageSize(`w300`, image);
        },

        get medium() {
            return resolveImageSize(`w780`, image);
        },

        get large() {
            return resolveImageSize(`w1280`, image);
        },

        get xlarge() {
            return resolveImageSize(`w1920_and_h1080_multi_faces`, image);
        },

        get original() {
            return resolveImageSize(`original`, image);
        },
    };
}
