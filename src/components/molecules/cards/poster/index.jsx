import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.css";
import Flexbox from "@/components/atoms/flexbox";
import Grid from "@/components/atoms/grid";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import Text from "@/components/atoms/text";
import Container from "@/components/atoms/container";
import Card from "@/components/atoms/card";

export default function PosterCardComponent({
    image,
    title,
    year,
    releaseDate,
    rating,
}) {
    return (
        <Card maxWidth="280px">
            <img className={styles["poster-card__image"]} src={image}></img>
            <Heading.H6 className="mt-4">{title}</Heading.H6>
            <Text.Regular.Large>{releaseDate}</Text.Regular.Large>
            <Button className="mt-4">Movie info</Button>
        </Card>
    );
}

PosterCardComponent.propTypes = {
    title: PropTypes.string,
    year: PropTypes.string,
    releaseDate: PropTypes.string,
    rating: PropTypes.string,
    image: PropTypes.string,
};
