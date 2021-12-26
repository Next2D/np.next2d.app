"use strict";

import "@next2d/player";
import "@next2d/framework";

import { App } from "./App";
import { config } from "./config/Config";
import { packages } from "./Packages";

if (document.readyState === "loading") {

    const initialize = (event) =>
    {
        event.target.removeEventListener("DOMContentLoaded", initialize);
        new App(config, packages).gotoView();
    };

    window.addEventListener("DOMContentLoaded", initialize);

} else {

    new App(config, packages).gotoView();

}
