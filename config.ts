import Bar from "widget/bar/Bar";
import OSD from "widget/osd/OSD";
import PowerMenu from "widget/powermenu/PowerMenu";
import AppLauncher from "widget/applauncher/AppLauncher";
import Notifications from "widget/notifications/Notifications";
import { forMonitors, togglePopup } from "lib/utils";

App.config({
  style: App.configDir + "/style.css",
  windows: [
    ...forMonitors(Bar),
    ...forMonitors(OSD),
    ...forMonitors(PowerMenu),
    ...forMonitors(AppLauncher),
    ...forMonitors(Notifications),
  ],
});

// Make the function accessible from ags -r to be used in hyprland
globalThis.togglePopup = togglePopup;
