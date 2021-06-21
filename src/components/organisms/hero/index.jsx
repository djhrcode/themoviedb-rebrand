import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.css";
import Flexbox from "../../atoms/flexbox";
import Grid from "../../atoms/grid";
import Button from "../../atoms/button";
import Heading from "../../atoms/heading";
import Text from "../../atoms/text";
import Container from "../../atoms/container";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function Hero({
    heading,
    text,
    buttonText,
    buttonIcon,
    backdropImage,
    headingComponent,
    textComponent,
    buttonComponent,
}) {
    backdropImage =
        backdropImage ||
        "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/2Fk3AB8E9dYIBc2ywJkxk8BTyhc.jpg";

    useEffect(() => {
        const player = new Plyr("#player", { autoplay: true });
    });

    return (
        <Flexbox.Column.Full
            className={styles.hero}
            style={{
                "--hero-bg-image": `url(${backdropImage})`,
            }}
        >
            <Container.Fluid>
                <Grid cols={1} md={2} className={styles["hero__grid"]}>
                    <Flexbox.Column.AlignStart
                        className={styles["hero__content"]}
                    >
                        <Heading.H1.ExtraLarge
                            className={classNames(
                                styles["hero__heading"],
                                "mb-6"
                            )}
                        >
                            Tenet (2018)
                        </Heading.H1.ExtraLarge>
                        <Text.ExtraLarge
                            className={classNames(styles["hero__text"], "mb-6")}
                        >
                            During the 1980s, a failed stand-up comedian is
                            driven insane and turns to a life of crime and chaos
                            in Gotham City while becoming an infamous
                            psychopathic crime figure.
                        </Text.ExtraLarge>
                        <Button.ExtraLarge
                            className={classNames(
                                styles["hero__button"],
                                "mb-6"
                            )}
                        >
                            See info
                        </Button.ExtraLarge>
                    </Flexbox.Column.AlignStart>
                </Grid>
            </Container.Fluid>
            <Flexbox.AlignStretch
                className={styles["hero__backdrop"]}
            ></Flexbox.AlignStretch>
        </Flexbox.Column.Full>
    );
}

Hero.propTypes = {
    heading: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    buttonIcon: PropTypes.string,
    headingComponent: PropTypes.element,
    textComponent: PropTypes.element,
    buttonComponent: PropTypes.element,
};
