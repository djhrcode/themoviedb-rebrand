import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./style.module.css";
import { decorateComponentProps } from "../../../infrastructure/jsx/props";

const ButtonMorphs = {
    Link,
    Button: "button",
};

const ButtonSizes = {
    ExtraLarge: "xl",
    Large: "lg",
    Normal: "base",
    Small: "sm",
    ExtraSmall: "xs",
};

const ButtonTypes = {
    Cta: "cta",
    Outline: "outline",
    Ghost: "ghost",
};

const ButtonColors = {
    Primary: "primary",
    Secondary: "secondary",
};

const isLinkButton = ({ to }) => !!to;

export default function Button({
    type = ButtonTypes.Cta,
    color = ButtonColors.Primary,
    size = ButtonSizes.Normal,
    children,
    className,
    ...rest
}) {
    const ButtonElement = isLinkButton(rest)
        ? ButtonMorphs.Link
        : ButtonMorphs.Button;

    return (
        <ButtonElement
            className={classNames(
                styles.button,
                styles[`button--${size}`],
                styles[`button--${type}`],
                styles[`button--${color}`],
                className
            )}
            {...rest}
        >
            <span className={styles[`button__content`]}>{children}</span>
        </ButtonElement>
    );
}

Button.Sizes = ButtonSizes;
Button.Colors = ButtonColors;
Button.Types = ButtonTypes;

Button.propTypes = {
    size: PropTypes.oneOf(Object.values(ButtonSizes)),
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
    color: PropTypes.oneOf(Object.values(ButtonColors)),
};

Button.ExtraLarge = decorateComponentProps(Button, {
    size: Button.Sizes.ExtraLarge,
});
Button.Large = decorateComponentProps(Button, { size: Button.Sizes.Large });
Button.Normal = decorateComponentProps(Button, { size: Button.Sizes.Normal });
Button.Small = decorateComponentProps(Button, { size: Button.Sizes.Small });
Button.ExtraSmall = decorateComponentProps(Button, {
    size: Button.Sizes.ExtraSmall,
});
Button.Cta = decorateComponentProps(Button, { type: Button.Types.Cta });
Button.Outline = decorateComponentProps(Button, { type: Button.Types.Outline });
Button.Ghost = decorateComponentProps(Button, { type: Button.Types.Ghost });
Button.Primary = decorateComponentProps(Button, {
    color: Button.Colors.Primary,
});
Button.Secondary = decorateComponentProps(Button, {
    color: Button.Colors.Secondary,
});
