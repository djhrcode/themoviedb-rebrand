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
import Icon from "@/components/atoms/icon";
import RatingBadge from "../../rating-badge";

export default function PosterCardComponent({
    image,
    title,
    year,
    releaseDate,
    rating,
    className,
    ...rest
}) {
    return (
        <Card.Hoverable
            maxWidth="280px"
            minWidth="260px"
            className={classNames(styles["poster-card"], className)}
            {...rest}
        >
            <img className={styles["poster-card__image"]} src={image}></img>
            <Text.ExtraLarge.Bold maxLines={1} className="mt-4">
                {title}
            </Text.ExtraLarge.Bold>
            <Text.Regular.Normal>{releaseDate}</Text.Regular.Normal>

            <Flexbox.JustifyStart.AlignCenter className="mt-4">
                <Button.Small.Ghost className="">
                    <Icon name="mdi-information-outline" right></Icon>
                    See info
                </Button.Small.Ghost>
                {/* <Button.Small.Ghost icon className="mr-2">
                    <Icon name="mdi-star-outline"></Icon>
                </Button.Small.Ghost>
                <Button.Small.Ghost icon className="mr-2">
                    <Icon name="mdi-play-circle-outline"></Icon>
                </Button.Small.Ghost>
                <Button.Small.Ghost icon className="mr-2">
                    <Icon name="mdi-information-outline"></Icon>
                </Button.Small.Ghost> */}

                <RatingBadge className="ml-auto" value={rating}></RatingBadge>
            </Flexbox.JustifyStart.AlignCenter>
        </Card.Hoverable>
    );
}

PosterCardComponent.propTypes = {
    title: PropTypes.string,
    year: PropTypes.string,
    releaseDate: PropTypes.string,
    rating: PropTypes.number,
    image: PropTypes.string,
};
