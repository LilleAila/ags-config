import Time from "./items/time";
import Workspaces from "./items/workspaces";

// TODO: define these things in separate file?
const start = [
  //
];
const center = [
  //
  Workspaces(),
];
const end = [
  //
  Time(),
];

export default (monitor: number) =>
  Widget.Window({
    monitor: monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    anchor: ["top", "left", "bottom"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      css: "min-width: 2px; min-height: 2px;",
      vertical: true,
      class_name: "bar-wrapper",
      startWidget: Widget.Box({
        class_name: "bar-box bar-start",
        vpack: "start",
        hpack: "center",
        hexpand: false,
        children: start,
      }),
      centerWidget: Widget.Box({
        class_name: "bar-box bar-center",
        vpack: "center",
        hpack: "center",
        hexpand: false,
        children: center,
      }),
      endWidget: Widget.Box({
        class_name: "bar-box bar-end",
        vpack: "end",
        hpack: "center",
        hexpand: false,
        children: end,
      }),
    }),
  });
