import React, { useEffect, useState } from "react";
import Container from "@/components/atoms/container";
import HeroComponent from "@/components/organisms/hero";
import MovieService from "@/application/movies";
import Movie from "@/domain/movies/movie";
import PosterCardComponent from "@/components/molecules/cards/poster";

export default function HomePage() {
    const [mostPopular, setMostPopular] = useState(Movie());

    const fetchMostPopular = async () => {
        const mostPopular = await MovieService().getMostPopular();

        console.log("Most Popular Movie:", mostPopular);
        setMostPopular(mostPopular);
    };

    useEffect(() => {
        if (mostPopular.isEmpty) fetchMostPopular();

        console.log("Backdrop image", mostPopular.backdropImage);
    });

    return (
        <>
            <HeroComponent
                headingText={mostPopular.title}
                descriptionText={mostPopular.description}
                backdropImage={mostPopular.backdropImage}
                buttonText={"See movie info"}
            ></HeroComponent>
            <PosterCardComponent
                title={mostPopular.title}
                year={mostPopular.year}
                image={mostPopular.posterImage}
                releaseDate={mostPopular.releaseDate}
            ></PosterCardComponent>
            <Container></Container>
        </>
    );
}
