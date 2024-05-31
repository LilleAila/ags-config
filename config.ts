import Bar from "widget/bar/Bar";
import OSD from "widget/osd/OSD";
import PowerMenu from "widget/powermenu/PowerMenu";
import AppLauncher from "widget/applauncher/AppLauncher";
import { forMonitors } from "lib/utils";

App.config({
  style: App.configDir + "/style.css",
  closeWindowDelay: {
    powermenu0: 150,
  },
  windows: [
    ...forMonitors(Bar),
    ...forMonitors(OSD),
    ...forMonitors(PowerMenu),
    AppLauncher(0),
    //
  ],
});
