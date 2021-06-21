import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { decorateComponentProps } from "../../../infrastructure/jsx/props";

const PossibleElements = {
    Span: "span",
    Paragraph: "p",
    Div: "div",
};

const PossibleSizes = {
    ExtraLarge: "xl",
    Large: "lg",
    Normal: "base",
    Small: "sm",
    ExtraSmall: "xs",
};

const PossibleWeights = {
    Bold: "bold",
    Regular: "regular",
};

export default function Text({
    size = PossibleSizes.Normal,
    element = PossibleElements.Paragraph,
    weight = PossibleWeights.Regular,
    className,
    ...rest
}) {
    const Element = element;

    return (
        <Element
            className={classNames(
                styles.text,
                styles[`text--${weight}`],
                styles[`text--${size}`],
                className
            )}
            {...rest}
        />
    );
}

Text.ExtraLarge = decorateComponentProps(Text, {
    size: PossibleSizes.ExtraLarge,
});
Text.Large = decorateComponentProps(Text, { size: PossibleSizes.Large });
Text.Normal = decorateComponentProps(Text, { size: PossibleSizes.Normal });
Text.Small = decorateComponentProps(Text, { size: PossibleSizes.Small });
Text.ExtraSmall = decorateComponentProps(Text, {
    size: PossibleSizes.ExtraSmall,
});

Text.Span = decorateComponentProps(Text, { element: PossibleElements.Span });
Text.Paragraph = decorateComponentProps(Text, {
    element: PossibleElements.Paragraph,
});
Text.Div = decorateComponentProps(Text, { element: PossibleElements.Div });

Text.Bold = decorateComponentProps(Text, { weight: PossibleWeights.Bold });
Text.Regular = decorateComponentProps(Text, {
    weight: PossibleWeights.Regular,
});

Text.propTypes = {
    isExternal: PropTypes.bool,
    inNewTab: PropTypes.bool,
    size: PropTypes.oneOf(Object.values(PossibleSizes)),
    element: PropTypes.oneOf(Object.values(PossibleElements)),
    weight: PropTypes.oneOf(Object.values(PossibleWeights)),
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
