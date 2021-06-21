import classNames from "classnames";
import React from "react";
import Flexbox from "../flexbox";

export default function Container({ children, className, ...rest }) {
    return (
        <Flexbox.Column.Full
            className={classNames("container mx-auto h-full", className)}
        >{children}</Flexbox.Column.Full>
    );
}
