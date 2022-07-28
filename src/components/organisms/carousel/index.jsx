import React, {
    forwardRef,
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.css";
import Flexbox from "@/components/atoms/flexbox";
import Grid from "@/components/atoms/grid";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import Text from "@/components/atoms/text";
import Container from "@/components/atoms/container";
import PosterCardComponent from "@/components/molecules/cards/poster";
import Tabs from "@/components/molecules/tabs";
import Icon from "@/components/atoms/icon";

const CarouselButton = forwardRef(
    ({ onClick, direction: directionProp }, buttonContainerElement) => {
        const [direction, setDirection] = useState(directionProp);
        const [hidden, setHidden] = useState(false);

        const isDirection = (value) => direction === value;

        useImperativeHandle(buttonContainerElement, () => ({
            hide: () => setHidden(true),
            show: () => setHidden(false),
            toggle: () => setHidden(!hidden),
            isHidden: () => hidden,
        }));

        return (
            <Flexbox.Column
                className={classNames(styles["carousel__button-container"], {
                    [styles["carousel__button-container--right"]]:
                        isDirection("right"),
                    [styles["carousel__button-container--left"]]:
                        isDirection("left"),
                    [styles["carousel__button-container--hidden"]]: hidden,
                })}
            >
                <Button.Icon onClick={onClick}>
                    <Icon name={`mdi-arrow-${direction}`}></Icon>
                </Button.Icon>
            </Flexbox.Column>
        );
    }
);

export default function CarouselComponent({
    title,
    items = [],
    className,
    ...rest
}) {
    const [sliderPosition, setSliderPosition] = useState(0);

    /**
     * @type {React.Ref<HTMLDivElement>}
     */
    const sliderElementReference = useRef(null);
    const leftButtonContainer = useRef(null);
    const rightButtonContainer = useRef(null);

    const getCurrentSliderElement = () => {
        const { current: sliderDivElement } = sliderElementReference;

        if (!sliderDivElement)
            throw new Error("Slider element ref was not found");

        return sliderDivElement;
    };

    const getCurrentSliderPosition = () => getCurrentSliderElement().scrollLeft;

    const sliderHorizontalScroll = (movement, behavior = "smooth") => {
        getCurrentSliderElement().scrollTo({
            behavior,
            left: getCurrentSliderPosition() + movement,
        });
    };

    const moveHorizontalScroll = (direction = "right") => {
        const movement = getCurrentSliderElement().offsetWidth * 0.8;
        const movementDirection = direction === "left" ? -movement : movement;

        sliderHorizontalScroll(movementDirection);
    };

    /**
     *
     * @param {React.MouseEvent<HTMLDivElement>} event
     */
    const onScrollSliderElement = (event) => {
        const {
            scrollLeft: horizontalScrollPosition,
            scrollWidth: scrollableWidth,
            offsetWidth: elementWidth,
        } = getCurrentSliderElement();

        if (horizontalScrollPosition <= 0) {
            console.log(
                "Reached the initial point",
                leftButtonContainer.current,
                rightButtonContainer.current
            );

            return leftButtonContainer.current.hide();
        }

        if (horizontalScrollPosition + elementWidth >= scrollableWidth) {
            console.log(
                "Reached the final point",
                leftButtonContainer.current,
                rightButtonContainer.current
            );

            return rightButtonContainer.current.hide();
        }

        if (leftButtonContainer.current.isHidden())
            leftButtonContainer.current.show();
        if (rightButtonContainer.current.isHidden())
            rightButtonContainer.current.show();
    };

    const timeoutDelay = async (delay) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), delay);
        });
    };

    /**
     *
     * @param {WheelEvent} event
     */
    const onScrollWheelMoved = async (event) => {
        if (!event.shiftKey) return;

        console.log("On wheel moved", event);
        event.preventDefault();

        console.log(event.deltaY, event.deltaX);

        const amount = Math.abs(event.deltaY);
        const isNegative = event.deltaY < 0;

        for (let i = 0; i < amount; i++) {
            await timeoutDelay(0);
            sliderHorizontalScroll(isNegative ? -1 : 1, "auto");
        }
    };

    const onTouchMove = async (event) => {
        console.log("On touch moved", event);
    };

    useEffect(() => {
        onScrollSliderElement();

        getCurrentSliderElement().addEventListener(
            "scroll",
            onScrollSliderElement
        );

        getCurrentSliderElement().addEventListener("touchmove", onTouchMove);

        getCurrentSliderElement().addEventListener("wheel", onScrollWheelMoved);
        return () => {
            getCurrentSliderElement().removeEventListener(
                "touchmove",
                onTouchMove
            );
            getCurrentSliderElement().removeEventListener(
                "scroll",
                onScrollSliderElement
            );
            getCurrentSliderElement().removeEventListener(
                "wheel",
                onScrollWheelMoved
            );
        };
    });

    return (
        <Flexbox.Column.Full className={classNames(className)} {...rest}>
            <Container.Fluid className="pb-0">
                <Flexbox.Row.Full.JustifyStart className="mb-0">
                    <Heading.H6 className="mr-8">{title}</Heading.H6>
                    <Tabs
                        onChange={(...args) =>
                            console.log("On tabs active changed", ...args)
                        }
                        tabs={["Movies", "TV Shows"]}
                    ></Tabs>
                    <Button.Small.Ghost className="ml-auto">
                        See all
                        <Icon name="mdi-arrow-right" left></Icon>
                    </Button.Small.Ghost>
                </Flexbox.Row.Full.JustifyStart>
            </Container.Fluid>
            <Container.Fluid className="overflow-hidden relative p-0">
                <Flexbox
                    ref={sliderElementReference}
                    direction="row"
                    align="start"
                    wrap="nowrap"
                    justify="start"
                    className="overflow-x-hidden p-8"
                >
                    {items.map((item, index) => (
                        <PosterCardComponent
                            key={index}
                            className="mr-6"
                            title={item.title}
                            image={item.posterImage}
                            releaseDate={item.releaseDate}
                            rating={item.voteAverage}
                        ></PosterCardComponent>
                    ))}
                </Flexbox>

                <CarouselButton
                    ref={leftButtonContainer}
                    direction="left"
                    onClick={() => moveHorizontalScroll("left")}
                ></CarouselButton>
                <CarouselButton
                    ref={rightButtonContainer}
                    direction="right"
                    onClick={() => moveHorizontalScroll("right")}
                ></CarouselButton>
            </Container.Fluid>
        </Flexbox.Column.Full>
    );
}

CarouselComponent.propTypes = {
    items: PropTypes.array,
    heading: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    buttonIcon: PropTypes.string,
    headingComponent: PropTypes.element,
    textComponent: PropTypes.element,
    buttonComponent: PropTypes.element,
};
