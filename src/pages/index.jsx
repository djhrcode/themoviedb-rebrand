import React from "react";
import Button from "../components/atoms/button";
import Flexbox from "../components/atoms/flexbox";
import Heading from "../components/atoms/heading";
import Text from "../components/atoms/text";

export default function HomePage() {
    return (
        <Flexbox.Row.Full.AlignStretch.NoWrap>
            <Flexbox.Full.Row.JustifySpaceBetween>
                <Flexbox.Column.AlignStart>
                    <Heading.H1.Large>Tenet (2018)</Heading.H1.Large>
                    <Text.ExtraLarge>
                        During the 1980s, a failed stand-up comedian is driven
                        insane and turns to a life of crime and chaos in Gotham
                        City while becoming an infamous psychopathic crime
                        figure.
                    </Text.ExtraLarge>
                    <Button.Large>See movie info</Button.Large>
                </Flexbox.Column.AlignStart>
            </Flexbox.Full.Row.JustifySpaceBetween>

            <Flexbox.Full.Row></Flexbox.Full.Row>
            {/* <div style={{ display: "flex" }}>
                <Button.ExtraLarge>Hello button</Button.ExtraLarge>
                <Button.Ghost.Large>Hello button</Button.Ghost.Large>
                <Button>Hello button</Button>
                <Button.Small>Hello button</Button.Small>
                <Button.ExtraSmall>Hello button</Button.ExtraSmall>
            </div> */}
        </Flexbox.Row.Full.AlignStretch.NoWrap>
    );
}
