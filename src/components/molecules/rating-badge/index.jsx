import React from "react";
import classNames from "classnames";
import Text from "@/components/atoms/text";
import Flexbox from "@/components/atoms/flexbox";
import styles from "./style.module.css";

const ValuesGradient = {
    0: "bad",
    40: "regular",
    80: "good",
};

const GradientKeyPoints = Object.keys(ValuesGradient);

export default function RatingBadge({ value = 0, className, ...rest }) {
    const integerRating = value * 10;

    const keyPoint = GradientKeyPoints.reduce((carry, keyPoint) => {
        if (keyPoint <= integerRating) return parseInt(keyPoint);

        return parseInt(carry);
    }, 0);

    const gradient = ValuesGradient[keyPoint];

    console.log("Gradient", gradient)

    return (
        <Flexbox.Column
            className={classNames(
                styles["rating-badge"],
                styles[`rating-badge--${gradient}`],
                className
            )}

            style={{ 
                "--rating-value-1": `${integerRating}%`,
                "--rating-value-2": `${integerRating > 80 ? 100 : integerRating + 20}%`,
            }}
        >
            <Flexbox.Column.Full
                className={classNames(styles["rating-badge__content"])}
            >
                <span>
                    {integerRating}
                    <span
                        className={classNames(
                            styles["rating-badge__percentage"]
                        )}
                    >
                        %
                    </span>
                </span>
            </Flexbox.Column.Full>
        </Flexbox.Column>
    );
}
