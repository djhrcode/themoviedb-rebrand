import classNames from "classnames";
import React from "react";
import { decorateComponentProps } from "@/infrastructure/jsx/props";
import styles from "./style.module.css";

export default function Card({
    isFluid = false,
    children,
    className,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    style,
    ...rest
}) {
    const elementStyles = {
        ...style,

        "--card-max-width": maxWidth,
        "--card-min-width": minWidth,
        "--card-width": width,
        "--card-max-height": maxHeight,
        "--card-min-height": minHeight,
        "--card-height": height,
    };

    return (
        <div
            style={elementStyles}
            className={classNames(styles.card, className)}
            {...rest}
        >
            {children}
        </div>
    );
}

Card.Fluid = decorateComponentProps(Card, { isFluid: true });
