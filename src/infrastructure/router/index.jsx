import React from "react";
import { Route, useLocation } from "react-router-dom";
import { RoutesTree } from "./composer";
import { routes } from "./routes";
import { TemplateHandler } from "./template";

export const AppRouter = () => {
    const location = useLocation();
    const dialogRouteBackground =
        location.state && location.state.dialogRouteBackground;

    return (
        <>
            <RoutesTree routes={routes} />

            {dialogRouteBackground && <Route path="/movies/:resource"></Route>}
        </>
    );
};
