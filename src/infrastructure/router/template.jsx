import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

export const templates = {};

export const TemplateContext = React.createContext(null);

export const registerTemplate = (Template, name = null) => {
    name = name || Template.name;
    templates[name] = Template;
};

export const useTemplate = (Template, name = null) => {
    const { template, setTemplate } = useContext(TemplateContext);

    console.log(setTemplate, Template);

    useEffect(() => {
        if (template !== Template)
            setTemplate(Template)
    })

    // if (template !== Template)
    // setTemplate(Template);

    // setTemplate(null);
};

export const TemplateComponent = ({ children }) => {
    const { template: Template } = useContext(TemplateContext);

    return Template ? (
        <Template children={children}></Template>
    ) : (
        <>{children}</>
    );
};

export const TemplateHandler = ({ children }) => {
    const [template, setTemplate] = useState(null);

    const setCurrentTemplate = (template) => setTemplate(template);

    return (
        <TemplateContext.Provider
            value={{ template, setTemplate: setCurrentTemplate }}
        >
            <TemplateComponent>{children}</TemplateComponent>
        </TemplateContext.Provider>
    );
};
