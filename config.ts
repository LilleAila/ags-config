import Bar from "widget/bar/Bar";
import OSD from "widget/osd/OSD";
import { forMonitors } from "lib/utils";

App.config({
  style: App.configDir + "/style.css",
  windows: [
    ...forMonitors(Bar),
    ...forMonitors(OSD),
    //
  ],
});
