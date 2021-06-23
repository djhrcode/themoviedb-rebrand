import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";

const IconSizes = {
    XLarge: "xl",
    Large: "lg",
    Medium: "md",
    Small: "sm",
    Inherit: "inherit",
};

export default function Icon({
    right = false,
    left = false,
    size = IconSizes.Inherit,
    name,
    children,
    className,
}) {
    const styleClasses = {
        [styles.icon]: true,
        [styles[`icon--${size}`]]: true,
        [styles[`icon--left`]]: left,
        [styles[`icon--right`]]: right,
    };

    return (
        <i className={classNames("mdi", name, styleClasses, className)}>
            {children}
        </i>
    );
}
