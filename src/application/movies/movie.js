import Movie from "@/domain/movies/movie";
import { formatDate, resolveDateYear } from "@/infrastructure/date";
import { createResource } from "@/infrastructure/http/types";
import BackdropImageResource from "../images/backdrop";
import PosterImageResource from "../images/poster";

const MovieResource = createResource((data, serializer) =>
    Movie({
        isEmpty: false,
        uuid: serializer.string(data.id),
        title: serializer.string(data.title),
        description: serializer.string(data.overview),
        popularity: serializer.int(data.popularity),
        voteAverage: serializer.int(data.vote_average),
        voteCount: serializer.int(data.vote_count),
        releaseDate: formatDate(serializer.string(data.release_date)),
        year: resolveDateYear(serializer.string(data.release_date)),
        posterImage: PosterImageResource(serializer.string(data.poster_path))
            .xlarge,
        backdropImage: BackdropImageResource(
            serializer.string(data.backdrop_path)
        ).xlarge,
    })
);

export default MovieResource;
