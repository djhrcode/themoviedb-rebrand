import React, { useState } from "react";
import Flexbox from "../components/atoms/flexbox";
import NavigationBar from "../components/organisms/navigation-bar";

export default function MainTemplate({ children }) {
    const [value, setValue] = useState(0);

    return (
        <div className="application">
            <NavigationBar></NavigationBar>
            <Flexbox.Column.AlignStretch className="container mx-auto">
                {children}
            </Flexbox.Column.AlignStretch>
        </div>
    );
}
