import React from "react";
import { RoutesTree } from "./composer";
import { routes } from "./routes";
import { TemplateHandler } from "./template";

export const AppRouter = () => {
    return <RoutesTree routes={routes} />;
};
