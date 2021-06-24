import React, { useEffect, useState } from "react";
import Container from "@/components/atoms/container";
import HeroComponent from "@/components/organisms/hero";
import MovieService from "@/application/movies";
import Movie from "@/domain/movies/movie";
import CarouselComponent from "@/components/organisms/carousel";

export default function HomePage() {
    const [mostPopular, setMostPopular] = useState(Movie());
    const [mostPopularList, setMostPopularList] = useState([]);
    const [nowPlayingList, setNowPlayingList] = useState([]);

    const fetchMostPopular = async () => {
        const mostPopular = await MovieService().getMostPopular();
        const mostPopularList = await MovieService().getPopular();
        const nowPlayingList = await MovieService().getNowPlaying();

        console.log("Most Popular Movie:", mostPopular);
        setMostPopular(mostPopular);
        setMostPopularList(mostPopularList);
        setNowPlayingList(nowPlayingList);
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
            <CarouselComponent
                title="Most popular"
                items={mostPopularList}
                className="relative z-10"
            ></CarouselComponent>
            <CarouselComponent
                title="Now playing"
                items={nowPlayingList}
                className="relative z-10"
            ></CarouselComponent>
            <Container></Container>
        </>
    );
}
