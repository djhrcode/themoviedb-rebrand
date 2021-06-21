import React from "react";
import classNames from "classnames";
import styles from "./style.module.css";
import { decorateComponentProps } from "../../../infrastructure/jsx/props";

const PossibleDirections = {
    Row: "row",
    Column: "column",
};

const PossibleAlignments = {
    End: "end",
    Center: "center",
    Start: "start",
    Stretch: "stretch",
};

const PossibleJustifications = {
    ...PossibleAlignments,
    SpaceBetween: "space-between",
    SpaceEvenly: "space-evenly",
    SpaceAround: "space-around",
};

const PossibleBasis = {
    Auto: "auto",
    Full: "full",
    Min: "min",
    Max: "max",
};

const PossibleWraps = {
    NoWrap: "nowrap",
    Wrap: "wrap",
};

export default function Flexbox({
    justify = PossibleJustifications.Center,
    align = PossibleAlignments.Center,
    direction = PossibleDirections.Row,
    wrap = PossibleWraps.Wrap,
    basis = PossibleBasis.Auto,
    wrapReverse = false,
    directionReverse = false,
    children,
    className,
    ...rest
}) {
    const directionModifier = `${direction}${
        directionReverse ? "-reverse" : ""
    }`;
    const wrapModifier = `${wrap}${wrapReverse ? "-reverse" : ""}`;

    return (
        <div
            className={classNames(
                styles.flexbox,
                styles[`flexbox--basis-${basis}`],
                styles[`flexbox--align-${align}`],
                styles[`flexbox--${wrapModifier}`],
                styles[`flexbox--${directionModifier}`],
                styles[`flexbox--justify-${justify}`],
                className
            )}
            children={children}
            {...rest}
        />
    );
}

Flexbox.Full = decorateComponentProps(Flexbox, {
    basis: PossibleBasis.Full,
});

Flexbox.Row = decorateComponentProps(Flexbox, {
    direction: PossibleDirections.Row,
});
Flexbox.Column = decorateComponentProps(Flexbox, {
    direction: PossibleDirections.Column,
});
Flexbox.RowReverse = decorateComponentProps(Flexbox, {
    directionReverse: true,
    direction: PossibleDirections.Row,
});
Flexbox.ColumnReverse = decorateComponentProps(Flexbox, {
    directionReverse: true,
    direction: PossibleDirections.Column,
});

Flexbox.Wrap = decorateComponentProps(Flexbox, {
    wrap: PossibleWraps.Wrap,
});
Flexbox.NoWrap = decorateComponentProps(Flexbox, {
    wrap: PossibleWraps.NoWrap,
});
Flexbox.WrapReverse = decorateComponentProps(Flexbox, {
    wrapReverse: true,
    wrap: PossibleWraps.Wrap,
});

Flexbox.AlignEnd = decorateComponentProps(Flexbox, {
    align: PossibleAlignments.End,
});
Flexbox.AlignCenter = decorateComponentProps(Flexbox, {
    align: PossibleAlignments.Center,
});
Flexbox.AlignStart = decorateComponentProps(Flexbox, {
    align: PossibleAlignments.Start,
});
Flexbox.AlignStretch = decorateComponentProps(Flexbox, {
    align: PossibleAlignments.Stretch,
});

Flexbox.JustifyEnd = decorateComponentProps(Flexbox, {
    justify: PossibleJustifications.End,
});
Flexbox.JustifyCenter = decorateComponentProps(Flexbox, {
    justify: PossibleJustifications.Center,
});
Flexbox.JustifyStart = decorateComponentProps(Flexbox, {
    justify: PossibleJustifications.Start,
});
Flexbox.JustifyStretch = decorateComponentProps(Flexbox, {
    justify: PossibleJustifications.Stretch,
});
Flexbox.JustifySpaceBetween = decorateComponentProps(Flexbox, {
    justify: PossibleJustifications.SpaceBetween,
});
Flexbox.JustifySpaceEvenly = decorateComponentProps(Flexbox, {
    justify: PossibleJustifications.SpaceEvenly,
});
Flexbox.JustifySpaceAround = decorateComponentProps(Flexbox, {
    justify: PossibleJustifications.SpaceAround,
});
