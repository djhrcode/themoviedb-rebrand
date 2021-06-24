import Flexbox from "@/components/atoms/flexbox";
import Text from "@/components/atoms/text";
import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

const SwitchSizes = {
    ExtraLarge: "xl",
    Large: "lg",
    Medium: "md",
    Small: "sm",
};

// function Tab() {
//     return
// }

function Tab({ onClick, isActive, children, className, index, ...rest }) {
    const tabElement = useRef(null);

    return (
        <div
            ref={tabElement}
            id={`tabs__tab-${index}`}
            onClick={(event) => onClick(event, tabElement.current, index)}
            className={classNames(
                {
                    [styles["tabs__tab"]]: true,
                    [styles["tabs__tab--active"]]: isActive,
                },
                `tabs__tab-${index}`
            )}
            {...rest}
        >
            <Text.Span.Bold>{children}</Text.Span.Bold>
        </div>
    );
}

/**
 *
 * @param {number} index
 * @param {any} value
 * @param {any[]} items
 */
const onChangeCallback = (index, value, items) => {};

export default function Tabs({
    active: activeProp = 0,
    tabs: tabsProp,
    onChange = onChangeCallback,
    children,
    className,
    ...rest
}) {
    const [initialized, setInitialized] = useState(false);
    const [active, setActive] = useState(null);
    const [tabs] = useState(tabsProp);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [thumbWidth, setThumbWidth] = useState(0);

    const isIndexActive = (index) => active === index;
    /**
     * @type {React.Ref<HTMLDivElement>}
     */
    const tabsElement = useRef(null);
    const tabsThumbElement = useRef(null);

    const onChangeCallback = () => onChange(active, tabs[active], tabs);

    /**
     * Calculates element coords relative to tabs element
     *
     * @param {HTMLDivElement} tabElement
     */
    const calculateRelativeCoords = (tabElement) => {
        if (!tabElement)
            throw new TypeError("Argument tabElement must be a DOM element");

        const {
            bottom: relativeBottomCoord,
            right: relativeRightCoord,
            top: relativeTopCoord,
            left: relativeLeftCoord,
        } = tabsElement.current.getBoundingClientRect();

        const {
            width,
            height,
            bottom: elementBottomCoord,
            right: elementRightCoord,
            top: elementTopCoord,
            left: elementLeftCoord,
        } = tabElement.getBoundingClientRect();

        return {
            width,
            height,
            y: elementTopCoord - relativeTopCoord,
            x: elementLeftCoord - relativeLeftCoord,
            top: elementTopCoord - relativeTopCoord,
            right: elementRightCoord - relativeRightCoord,
            left: elementLeftCoord - relativeLeftCoord,
            bottom: elementBottomCoord - relativeBottomCoord,
        };
    };

    const activeIndexIsNotSetted = () => active === null;

    const getTabElementIndexClass = (index) => `tabs__tab-${index}`;

    const getTabElementByIndex = (index) => {
        const tabsComponent = tabsElement.current;
        const tabClass = getTabElementIndexClass(index);
        const tabElement = tabsComponent.querySelector(`.${tabClass}`);

        if (!tabElement)
            throw new Error(`Couldn't find <Tab/> element by index ${index}`);

        return tabElement;
    };

    const setTabActiveByIndex = (index) => {
        const tabElement = getTabElementByIndex(index);
        const tabElementCoords = calculateRelativeCoords(tabElement);

        setActive(index);
        setThumbPosition(tabElementCoords.left);
        setThumbWidth(tabElementCoords.width);
    };

    const initializeTabsComponent = () => {
        if (activeIndexIsNotSetted()) return setTabActiveByIndex(activeProp);

        setInitialized(true);
    };

    const useUnlessNotInitialized = (callback, dependency) => {
        useEffect(() => {
            initialized ? callback() : null;
        }, dependency);
    };

    useEffect(() => initializeTabsComponent());
    useUnlessNotInitialized(onChangeCallback, [active]);

    return (
        <div ref={tabsElement} className={classNames(styles.tabs)}>
            <div
                ref={tabsThumbElement}
                style={{
                    "--tabs-thumb-left": `${thumbPosition}px`,
                    "--tabs-thumb-width": `${thumbWidth}px`,
                }}
                className={styles["tabs__thumb"]}
            ></div>

            {tabs.map((item, key) => (
                <Tab
                    index={key}
                    key={key}
                    isActive={isIndexActive(key)}
                    onClick={() => setTabActiveByIndex(key)}
                >
                    {item}
                </Tab>
            ))}
        </div>
    );
}

Tabs.propTypes = {
    tabs: (props, propName, componentName) => {
        if (propName in props && props[propName].length < 2)
            throw new Error(
                `Invalid prop "${propName}" supplied to "${componentName}". Must have at least 2 values.`
            );
    },
    active: PropTypes.number,
};
