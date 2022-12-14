import React, { forwardRef, useImperativeHandle, useRef } from "react";
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

/**
 * @typedef {DefaultProps} DefaultPropsType
 */
const DefaultProps = {
    justify: PossibleJustifications.Center,
    align: PossibleAlignments.Center,
    direction: PossibleDirections.Row,
    wrap: PossibleWraps.Wrap,
    basis: PossibleBasis.Auto,
    wrapReverse: false,
    directionReverse: false,
};

/**
 * @param {DefaultPropsType & React.HTMLAttributes} param0
 */
const Flexbox = forwardRef(
    (
        {
            justify = DefaultProps.justify,
            align = DefaultProps.align,
            direction = DefaultProps.direction,
            wrap = DefaultProps.wrap,
            basis = DefaultProps.basis,
            wrapReverse = DefaultProps.wrapReverse,
            directionReverse = DefaultProps.directionReverse,
            children,
            className,
            ...rest
        } = DefaultProps,
        elementRef
    ) => {
        const flexboxElementRef = useRef(null);

        const reverseModifier = directionReverse ? "-reverse" : "";
        const directionModifier = `${direction}${reverseModifier}`;
        const wrapModifier = `${wrap}${wrapReverse ? "-reverse" : ""}`;

        useImperativeHandle(elementRef, () => {
            return flexboxElementRef.current;
        });

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
                ref={flexboxElementRef}
                {...rest}
            />
        );
    }
);

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

export default Flexbox;
