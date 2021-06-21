import React, { useState } from "react";
import Flexbox from "../components/atoms/flexbox";
import NavigationBar from "../components/organisms/navigation-bar";

export default function MainTemplate({ children }) {
    const [value, setValue] = useState(0);

    console.log(import.meta.env);

    return (
        <div className="application">
            <NavigationBar></NavigationBar>
            {children}
        </div>
    );
}
