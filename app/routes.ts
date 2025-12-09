import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("hro", "./hro.tsx"),
    route("mainpage","./mainpage.tsx"),
    route ("perfume", "./perfume.tsx"),
    route("jewery", "./jewery.tsx"),
    route("fragrance_story", "./fragrance_story.tsx"),
    route("jewelry_story","./jewelry_story.tsx"),
    route("jewelry_carousel","./jewelry_carousel.tsx"),
    route("shop_all","./shop_all.tsx"),
    route("new_product","./new_product.tsx")

] satisfies RouteConfig;
