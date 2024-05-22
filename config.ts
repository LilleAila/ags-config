import Bar from "widget/bar/Bar";
import { forMonitors } from "lib/utils";

App.config({
  style: App.configDir + "/style.css",
  windows: [
    ...forMonitors(Bar),
    //
  ],
});
