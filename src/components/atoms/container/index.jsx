import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";
import { decorateComponentProps } from "../../../infrastructure/jsx/props";
import Flexbox from "../flexbox";

export default function Container({
    isFluid = false,
    children,
    className,
    ...rest
}) {
    return (
        <Flexbox.Column.Full
            className={classNames(
                {
                    [styles["container--fluid"]]: isFluid,
                },
                styles.container,
                className
            )}
            {...rest}
        >
            {children}
        </Flexbox.Column.Full>
    );
}

Container.Fluid = decorateComponentProps(Container, { isFluid: true });
