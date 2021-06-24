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
import PosterCardComponent from "@/components/molecules/cards/poster";
import Tabs from "@/components/molecules/tabs";

export default function CarouselComponent({
    title,
    items = [],
    className,
    ...rest
}) {
    return (
        <Flexbox.Column.Full className={classNames(className)} {...rest}>
            <Container.Fluid className="pb-0">
                <Flexbox.Row.Full.JustifyStart className="mb-0">
                    <Heading.H6>{title}</Heading.H6>
                    <Tabs
                        onChange={(...args) =>
                            console.log("On tabs active changed", ...args)
                        }
                        tabs={["hello", "world"]}
                    ></Tabs>
                </Flexbox.Row.Full.JustifyStart>
            </Container.Fluid>
            <Container.Fluid className="overflow-hidden p-0">
                <Flexbox.Row.JustifyStart.AlignStart.NoWrap
                    justify="start"
                    className="overflow-x-auto p-8"
                >
                    {items.map((item, index) => (
                        <PosterCardComponent
                            key={index}
                            className="mr-6"
                            title={item.title}
                            image={item.posterImage}
                            releaseDate={item.releaseDate}
                        ></PosterCardComponent>
                    ))}
                </Flexbox.Row.JustifyStart.AlignStart.NoWrap>
            </Container.Fluid>
        </Flexbox.Column.Full>
    );
}

CarouselComponent.propTypes = {
    items: PropTypes.array,
    heading: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    buttonIcon: PropTypes.string,
    headingComponent: PropTypes.element,
    textComponent: PropTypes.element,
    buttonComponent: PropTypes.element,
};
