import React, { useState } from "react";
import NavigationComponent from "@/components/organisms/navigation";

export default function MainTemplate({ children }) {
    const [value, setValue] = useState(0);

    console.log(import.meta.env);

    return (
        <div className="application">
            <NavigationComponent></NavigationComponent>
            {children}
        </div>
    );
}
