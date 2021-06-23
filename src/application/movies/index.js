import MovieResource from "./movie";
import TMDBService, { createPaginationJson } from "@/application/tmdb";

export default function MovieService() {
    const moviesClient = TMDBService().setSuffix("/movie");

    const createMoviesRequest =
        (path) =>
        async (page = 1) => {
            const response = await moviesClient
                .get(path)
                .setQuery({ page })
                .fetch();
            return createPaginationJson(response.body, MovieResource).results;
        };

    const getUpcoming = createMoviesRequest("/upcoming");
    const getPopular = createMoviesRequest("/popular");
    const getTopRated = createMoviesRequest("/top_rated");
    const getNowPlaying = createMoviesRequest("/now_playing");

    const getMostPopular = async () => {
        const popularMovies = await getPopular();

        /**
         * @param {typeof popularMovies[i]} mostPopular
         * @param {typeof popularMovies[i]} movie
         */
        const searchMostPopularMovie = (mostPopular, movie) => {
            const popularity = mostPopular ? mostPopular.popularity : 0;

            if (popularity < movie.popularity) {
                mostPopular = movie;
            }

            return mostPopular;
        };

        return popularMovies.reduce(searchMostPopularMovie, null);
    };
    
    const getMovieDetails = async (uuid) =>
        MovieResource((await moviesClient.get(`/${uuid}`).fetch()).body);

    return {
        getMostPopular,
        getPopular,
        getTopRated,
        getUpcoming,
        getNowPlaying,
        getMovieDetails,
    };
}
