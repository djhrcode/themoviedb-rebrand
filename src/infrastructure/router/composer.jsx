import React from "react";
import PropTypes from "prop-types";
import {
    Redirect,
    Route,
    Switch,
    useLocation,
    useRouteMatch,
} from "react-router-dom";
import { registerTemplate, useTemplate } from "./template";

/**
 * @typedef {import("./routes").AppRoute} AppRoute
 */

/**
 * @typedef {{ nested: boolean } & AppRoute} RouteComposerProps
 * @property {boolean} nested
 */

/**
 * @typedef {import("react").FunctionComponent<RouteComposerProps>} AppRouteComponent
 */

/**
 * @param {AppRoute} props
 * @param {number} index
 * @param {boolean} nested
 */
export const composeRoute = (props, index, nested) => {
    return <RouteComposer key={index} nested={nested} {...props} />;
};
/**
 *
 * @type {AppRouteComponent}
 */
const RouteComposer = (props) => {
    const { routes, nested, redirect, template: Template } = props;
    const { path, link } = useRouteMatch();
    const routeProps = { ...props };

    if (routes) {
        routeProps.component = () => (
            <RoutesTree routes={routes} nested={true} />
        );
    }

    if (redirect) {
        routeProps.component = () => <Redirect to={redirect} />;
    }

    if (nested) {
        routeProps.path = `${path}${props.path}`;
    }

    return Template ? (
        <Template>
            <Route {...routeProps} />
        </Template>
    ) : (
        <Route {...routeProps} />
    );
};

RouteComposer.propTypes = {
    path: PropTypes.string.isRequired,
    routes: PropTypes.array,
    nested: PropTypes.bool,
    redirect: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

/**
 * RoutesTree component props type
 *
 * @typedef {object} RoutesTreeProps
 * @property {Array<AppRoute>} routes
 * @property {boolean} nested
 */

/**
 * Defines a routes tree from array of {AppRoute} types
 *
 * @type {import("react").FunctionComponent<RoutesTreeProps>}
 */
export const RoutesTree = ({ routes, nested = false }) => {
    const location = useLocation();
    const dialogRouteBackground =
        location.state && location.state.dialogRouteBackground;

    const composedRoutes = routes.map((route, index) =>
        composeRoute(route, index, nested)
    );

    if (nested) {
        return <>{composedRoutes}</>;
    }

    return (
        <Switch location={dialogRouteBackground || location}>
            {composedRoutes}
        </Switch>
    );
};
