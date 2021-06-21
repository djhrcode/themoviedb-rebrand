import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ColumnsClasses = {
    Base: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
    },
    Sm: {
        1: "sm:grid-cols-1",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3",
        4: "sm:grid-cols-4",
        5: "sm:grid-cols-5",
        6: "sm:grid-cols-6",
        7: "sm:grid-cols-7",
        8: "sm:grid-cols-8",
        9: "sm:grid-cols-9",
        10: "sm:grid-cols-10",
        11: "sm:grid-cols-11",
        12: "sm:grid-cols-12",
    },
    Md: {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
        5: "md:grid-cols-5",
        6: "md:grid-cols-6",
        7: "md:grid-cols-7",
        8: "md:grid-cols-8",
        9: "md:grid-cols-9",
        10: "md:grid-cols-10",
        11: "md:grid-cols-11",
        12: "md:grid-cols-12",
    },
    Lg: {
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        5: "lg:grid-cols-5",
        6: "lg:grid-cols-6",
        7: "lg:grid-cols-7",
        8: "lg:grid-cols-8",
        9: "lg:grid-cols-9",
        10: "lg:grid-cols-10",
        11: "lg:grid-cols-11",
        12: "lg:grid-cols-12",
    },
    Xl: {
        1: "xl:grid-cols-1",
        2: "xl:grid-cols-2",
        3: "xl:grid-cols-3",
        4: "xl:grid-cols-4",
        5: "xl:grid-cols-5",
        6: "xl:grid-cols-6",
        7: "xl:grid-cols-7",
        8: "xl:grid-cols-8",
        9: "xl:grid-cols-9",
        10: "xl:grid-cols-10",
        11: "xl:grid-cols-11",
        12: "xl:grid-cols-12",
    },
    Xxl: {
        1: "2xl:grid-cols-1",
        2: "2xl:grid-cols-2",
        3: "2xl:grid-cols-3",
        4: "2xl:grid-cols-4",
        5: "2xl:grid-cols-5",
        6: "2xl:grid-cols-6",
        7: "2xl:grid-cols-7",
        8: "2xl:grid-cols-8",
        9: "2xl:grid-cols-9",
        10: "2xl:grid-cols-10",
        11: "2xl:grid-cols-11",
        12: "2xl:grid-cols-12",
    },
};

const PossibleColumns = Object.keys(ColumnsClasses.Base).map((columns) =>
    parseInt(columns)
);

export default function Grid({
    cols = 1,
    sm,
    md,
    lg,
    xl,
    xxl,
    className,
    children,
    ...rest
}) {
    return (
        <div
            className={classNames(
                "grid",
                {
                    [ColumnsClasses.Base[cols]]: true,
                    [ColumnsClasses.Sm[sm]]: !!sm,
                    [ColumnsClasses.Md[md]]: !!md,
                    [ColumnsClasses.Lg[lg]]: !!lg,
                    [ColumnsClasses.Xl[xl]]: !!xl,
                    [ColumnsClasses.Xxl[xxl]]: !!xxl,
                },
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
}

Grid.propTypes = {
    cols: PropTypes.oneOf(PossibleColumns),
    sm: PropTypes.oneOf(PossibleColumns),
    md: PropTypes.oneOf(PossibleColumns),
    lg: PropTypes.oneOf(PossibleColumns),
    xl: PropTypes.oneOf(PossibleColumns),
    xxl: PropTypes.oneOf(PossibleColumns),
};
