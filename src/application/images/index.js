import TMDBConfig from "../tmdb/config";

export const resolveImageSize = (size, image) =>
    `${TMDBConfig().API_IMG_URL()}/${size}${image}`;
