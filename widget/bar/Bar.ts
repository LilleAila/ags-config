import Time from "./items/time";
import Workspaces from "./items/workspaces";
import Tray from "./items/tray";
import Battery from "./items/battery";
import Power from "./items/power.ts";
import Launcher from "./items/launcher.ts";

export default (monitor: number) => {
  const start = [
    //
    Power(monitor),
    Launcher(monitor), // TODO: move somewhere else, maybe bottom?
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
  return Widget.Window({
    monitor: monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    anchor: ["top", "left", "bottom"],
    exclusivity: "exclusive",
    layer: "top", // so it gets hidden in fullscreen
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
};
