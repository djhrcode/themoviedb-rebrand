import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";
import { decorateComponentProps } from "../../../infrastructure/jsx/props";

export default function Container({
    isFluid = false,
    children,
    className,
    ...rest
}) {
    return (
        <div
            className={classNames(
                {
                    [styles["container--fluid"]]: isFluid,
                    [styles.container]: true,
                },
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
}

Container.Fluid = decorateComponentProps(Container, { isFluid: true });
