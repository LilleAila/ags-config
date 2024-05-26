import Time from "./items/time";
import Workspaces from "./items/workspaces";
import Tray from "./items/tray";
import Idle from "./items/idle";
import Battery from "./items/battery";
import Power from "./items/power.ts";

// TODO: define these things in separate file?
const start = [
  //
  Power(),
  Idle(),
  Tray(),
];
const center = [
  //
  Workspaces(),
];
const end = [
  //
  Battery(),
  Time(),
];

export default (monitor: number) =>
  Widget.Window({
    monitor: monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    anchor: ["top", "left", "bottom"],
    exclusivity: "exclusive",
    layer: "overlay",
    child: Widget.CenterBox({
      css: "min-width: 2px; min-height: 2px;",
      vertical: true,
      class_name: "bar-wrapper",
      startWidget: Widget.Box({
        class_name: "bar-box bar-start",
        vpack: "start",
        hpack: "center",
        hexpand: false,
        vertical: true,
        children: start,
      }),
      centerWidget: Widget.Box({
        class_name: "bar-box bar-center",
        vpack: "center",
        hpack: "center",
        hexpand: false,
        vertical: true,
        children: center,
      }),
      endWidget: Widget.Box({
        class_name: "bar-box bar-end",
        vpack: "end",
        hpack: "center",
        hexpand: false,
        vertical: true,
        children: end,
      }),
    }),
  });
