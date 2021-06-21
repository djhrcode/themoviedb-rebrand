import React from "react";
import Flexbox from "../../atoms/flexbox";
import classNames from "classnames";
import styles from "./style.module.css";
import Button from "../../atoms/button";
import TMDBLogo from "../../../tmdb-logo.png";
import NavLink from "../../molecules/nav-link";
import Link from "../../atoms/link";

export default function NavigationBar({ children, className, ...rest }) {
    return (
        <Flexbox.JustifySpaceBetween
            className={classNames(styles.navigation, className)}
            {...rest}
        >
            <Flexbox>
                <Link to="/">
                    <img
                        src={TMDBLogo}
                        width="150"
                        style={{ marginRight: "2rem" }}
                    />
                </Link>
                <NavLink exact to="/movies">
                    Movies
                </NavLink>
                <NavLink exact to="/tv">
                    TV Shows
                </NavLink>
            </Flexbox>
            <Flexbox>
                <Button.Small.Ghost className="mr-2">
                    Sign up
                </Button.Small.Ghost>
                <Button.Small>Sign in</Button.Small>
            </Flexbox>
        </Flexbox.JustifySpaceBetween>
    );
}
