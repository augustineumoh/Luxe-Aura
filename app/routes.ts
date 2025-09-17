import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("hro", "./hro.tsx"),
    route("mainpage","./mainpage.tsx")

] satisfies RouteConfig;
