
export default function TMDBConfig() {
    return {
        API_URL: () => import.meta.env.VITE_TMDB_API_URL,
        API_TOKEN: () => import.meta.env.VITE_TMDB_API_TOKEN,
        API_IMG_URL: () => import.meta.env.VITE_TMDB_API_IMG_URL,
    }
}