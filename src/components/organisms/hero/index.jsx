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
import Icon from "@/components/atoms/icon";

const ButtonComponent = ({ children }) =>
    children ? (
        <Flexbox.Row>
            <Button.Accent.ExtraLarge
                className={classNames(styles["hero__button"], "mb-6 mr-6")}
            >
                <Icon name="mdi-motion-play-outline" right />
                Watch trailer
            </Button.Accent.ExtraLarge>
            <Button.Primary.ExtraLarge
                className={classNames(styles["hero__button"], "mb-6")}
            >
                <Icon name="mdi-information-outline" right />
                See info
            </Button.Primary.ExtraLarge>
        </Flexbox.Row>
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
        <Flexbox.Row.AlignCenter className="mb-4">
            <Heading.H1.ExtraLarge
                className={classNames(styles["hero__heading"])}
                children={children}
            >
            </Heading.H1.ExtraLarge>
        </Flexbox.Row.AlignCenter>
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
                <Flexbox.Column.AlignStart
                    className={classNames(styles["hero__content"])}
                >
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
            <>
                <Flexbox.AlignStretch
                    className={styles["hero__gradient"]}
                ></Flexbox.AlignStretch>
                <Flexbox.AlignStretch
                    className={styles["hero__backdrop"]}
                ></Flexbox.AlignStretch>
            </>
        ) : null;

    return (
        <HeroStructure
            style={heroStyles}
            heading={<HeadingArea />}
            text={<TextArea />}
            button={<ButtonArea />}
            backdrop={<BackdropArea />}
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
