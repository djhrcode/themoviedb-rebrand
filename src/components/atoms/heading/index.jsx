import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import style from "./style.module.css";
import { decorateComponentProps } from "../../../infrastructure/jsx/props";

const HeadingElements = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
};

const HeadingSizes = {
    SuperLarge: "h1",
    ExtraLarge: "h2",
    Large: "h3",
    Medium: "h4",
    Small: "h5",
    ExtraSmall: "h6",
};

export default function Heading({
    element = HeadingElements.H1,
    size,
    children,
}) {
    size = size || element;

    const Element = element;

    return (
        <Element
            className={classNames(style.heading, style[`heading--${size}`])}
            children={children}
        />
    );
}

Heading.H1 = decorateComponentProps(Heading, { element: HeadingElements.H1 })
Heading.H2 = decorateComponentProps(Heading, { element: HeadingElements.H2 })
Heading.H3 = decorateComponentProps(Heading, { element: HeadingElements.H3 })
Heading.H4 = decorateComponentProps(Heading, { element: HeadingElements.H4 })
Heading.H5 = decorateComponentProps(Heading, { element: HeadingElements.H5 })
Heading.H6 = decorateComponentProps(Heading, { element: HeadingElements.H6 })
Heading.SuperLarge = decorateComponentProps(Heading, { size: HeadingSizes.SuperLarge })
Heading.ExtraLarge = decorateComponentProps(Heading, { size: HeadingSizes.ExtraLarge })
Heading.Large = decorateComponentProps(Heading, { size: HeadingSizes.Large })
Heading.Medium = decorateComponentProps(Heading, { size: HeadingSizes.Medium })
Heading.Small = decorateComponentProps(Heading, { size: HeadingSizes.Small })
Heading.ExtraSmall = decorateComponentProps(Heading, { size: HeadingSizes.ExtraSmall })

Heading.Sizes = HeadingSizes;
Heading.Elements = HeadingElements;

Heading.propTypes = {
    element: PropTypes.oneOf(Object.values(HeadingElements)).isRequired,
    size: PropTypes.oneOf(Object.values(HeadingSizes)),
};
