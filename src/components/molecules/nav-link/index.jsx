import classNames from "classnames";
import React from "react";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import Link from "../../atoms/link";
import Text from "../../atoms/text";

export default function NavLink({ to, className, children, ...rest }) {
    return (
        <Link
            isNavigation
            className={classNames(styles["nav-link"], className)}
            {...{ ...rest, to }}
        >
            <Text children={children} />
        </Link>
    );
}

Link.propTypes = {
    isExternal: PropTypes.bool,
    inNewTab: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
