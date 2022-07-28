import { Component, FunctionComponent } from "react";
import HomePage from "../../pages/index.jsx";
import MoviesPage from "../../pages/movies/index.jsx";
import TvShowsPage from "../../pages/tv/index.jsx";
import MainTemplate from "../../templates/main.jsx";
import { useTemplate } from "./template.jsx";

/**
 * @typedef {() => Component | FunctionComponent} RouteRenderFunction
 */

/**
 * @typedef AppRoute
 * @property {string|string[]} path
 * @property {boolean} [exact]
 * @property {Component | FunctionComponent} [component]
 * @property {RouteRenderFunction} [render]
 * @property {Array<AppRoute>} [routes]
 * @property {string} [redirect]
 */

/**
 * @type {Array<AppRoute>}
 */
export const routes = [
    {
        path: "",
        template: MainTemplate,
        routes: [
            {
                path: "",
                exact: true,
                component: HomePage,
            },
            {
                path: "tv",
                routes: [
                    {
                        path: "/",
                        exact: true,
                        component: TvShowsPage,
                    },
                    {
                        path: "/:resource",
                        exact: true,
                        component: TvShowsPage,
                    },
                ],
            },
            {
                path: "movies",
                routes: [
                    {
                        path: "/",
                        exact: true,
                        component: MoviesPage,
                    },
                    {
                        path: "/:resource",
                        exact: true,
                        component: MoviesPage,
                    },
                ],
            },
            // {
            //     path: "/:tv-show",
            //     exact: true,
            //     component: TVShowsDetailPage,
            // },
        ],
    },
];
