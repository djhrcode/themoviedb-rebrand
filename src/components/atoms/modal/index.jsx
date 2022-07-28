import classNames from "classnames";
import React, { useState, forwardRef } from "react";
import { decorateComponentProps } from "@/infrastructure/jsx/props";
import styles from "./style.module.css";

export default function Modal({
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
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const hide = () => setIsHidden(true);
    const display = () => setIsHidden(false);

    const open = () => display() && setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(!isOpen);


    const elementStyles = {
        ...style,

        "--card-max-width": maxWidth,
        "--card-min-width": minWidth,
        "--card-width": width,
        "--card-max-height": maxHeight,
        "--card-min-height": minHeight,
        "--card-height": height,
    };

    const onModalTransitionEnd = () => {

    }

    return (
        <div
            style={elementStyles}
            className={classNames(
                {
                    [styles.modal]: true,
                    [styles[`modal--opened`]]: isOpen,
                    [styles[`modal--closed`]]: !isOpen,
                    [styles[`modal--hidden`]]: isHidden,
                },
                className
            )}
            onTransitionEnd={onModalTransitionEnd}
            {...rest}
        >
            <div className={styles["modal__content"]}>{children}</div>
            <div className={styles["modal__overlay"]}></div>
        </div>
    );
}

/**
 * @template T
 * @param {T} Element
 * @returns {React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<T>>}
 */
const decorateWithRef = (Element) => {
    return forwardRef((props) => {
        return <Element></Element>
    })
}

const Decorated = decorateWithRef(Modal);

<Decorated ref=""  ></Decorated>