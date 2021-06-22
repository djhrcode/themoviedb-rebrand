import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.css";
import Flexbox from "@/components/atoms/flexbox";
import Grid from "@/components/atoms/grid";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import Text from "@/components/atoms/text";
import Container from "@/components/atoms/container";

const ButtonComponent = ({ children }) =>
    children ? (
        <Button.ExtraLarge
            className={classNames(styles["hero__button"], "mb-6")}
            children={children}
        />
    ) : null;

const TextComponent = ({ children }) =>
    children ? (
        <Text.ExtraLarge
            maxLines={2}
            className={classNames(styles["hero__text"], "mb-10")}
            children={children}
        />
    ) : null;

const HeadingComponent = ({ children }) =>
    children ? (
        <Heading.H1.ExtraLarge
            className={classNames(styles["hero__heading"], "mb-4")}
            children={children}
        />
    ) : null;

const HeroStructure = ({
    heading,
    text,
    button,
    backdrop,
    className,
    ...rest
}) => (
    <Flexbox.Column.Full className={styles.hero} {...rest}>
        <Container.Fluid>
            <Grid cols={1} md={2} className={styles["hero__grid"]}>
                <Flexbox.Column.AlignStart className={styles["hero__content"]}>
                    {heading}
                    {text}
                    {button}
                </Flexbox.Column.AlignStart>
            </Grid>
        </Container.Fluid>
        {backdrop}
    </Flexbox.Column.Full>
);

export default function HeroComponent({
    headingText,
    descriptionText,
    buttonText,
    backdropImage,
    headingComponent,
    textComponent,
    buttonComponent,
}) {
    const heroStyles = {
        "--hero-bg-image": `url(${backdropImage})`,
    };

    const HeadingArea = () =>
        headingComponent ?? <HeadingComponent>{headingText}</HeadingComponent>;

    const TextArea = () =>
        textComponent ?? <TextComponent>{descriptionText}</TextComponent>;

    const ButtonArea = () =>
        buttonComponent ?? <ButtonComponent>{buttonText}</ButtonComponent>;

    const BackdropArea = () =>
        backdropImage ? (
            <Flexbox.AlignStretch
                className={styles["hero__backdrop"]}
            ></Flexbox.AlignStretch>
        ) : null;

    return (
        <HeroStructure
            style={heroStyles}
            heading={<HeadingArea></HeadingArea>}
            text={<TextArea></TextArea>}
            button={<ButtonArea></ButtonArea>}
            backdrop={<BackdropArea></BackdropArea>}
        ></HeroStructure>
    );
}

HeroComponent.propTypes = {
    heading: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    buttonIcon: PropTypes.string,
    headingComponent: PropTypes.element,
    textComponent: PropTypes.element,
    buttonComponent: PropTypes.element,
};
