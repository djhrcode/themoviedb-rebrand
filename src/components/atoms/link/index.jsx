import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";
import { Link as RouterLink, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const LinkElements = {
    NavLink,
    Hyperlink: "a",
    Link: RouterLink,
};

export default function Link({
    isExternal = false,
    inNewTab = false,
    isNavigation = false,
    to,
    children,
    className,
    ...rest
}) {
    const getRouterLink = () =>
        isNavigation ? LinkElements.NavLink : LinkElements.Link;

    const getLinkElement = () =>
        isExternal ? LinkElements.Hyperlink : getRouterLink();

    const LinkElement = getLinkElement();

    const restLinkProps = {
        ...rest,
        ...(isExternal ? { href: to } : { to }),
        ...(inNewTab ? { target: "_blank" } : {}),
        ...(isNavigation ? { activeClassName: styles["link--active"] } : {}),
    };

    return (
        <LinkElement
            className={classNames(
                {
                    [styles.link]: true,
                    [styles["link--navigation"]]: isNavigation,
                },
                className
            )}
            children={children}
            {...restLinkProps}
        />
    );
}

Link.propTypes = {
    isExternal: PropTypes.bool,
    inNewTab: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
