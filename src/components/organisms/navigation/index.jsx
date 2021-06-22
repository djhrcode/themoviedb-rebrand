import React from "react";
import classNames from "classnames";
import TMDBLogo from "@/tmdb-logo.png";
import Button from "@/components/atoms/button";
import Link from "@/components/atoms/link";
import Flexbox from "@/components/atoms/flexbox";
import NavLink from "@/components/molecules/nav-link";
import styles from "./style.module.css";

export default function NavigationComponent({ children, className, ...rest }) {
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
