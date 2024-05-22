import Time from "./items/time";

// TODO: define these things in separate file?
const start = [Time()];
const center = [Time()];
const end = [Time()];

export default (monitor: number) =>
  Widget.Window({
    monitor: monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    anchor: ["top", "left", "bottom"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      css: "min-width: 2px; min-height: 2px;",
      hexpand: false,
      hpack: "center",
      class_name: "bar-wrapper",
      startWidget: Widget.Box({
        class_name: "bar-box bar-start",
        vpack: "start",
        hpack: "center",
        hexpand: false,
        vexpand: true,
        children: start,
      }),
      centerWidget: Widget.Box({
        class_name: "bar-box bar-center",
        vpack: "center",
        hpack: "center",
        hexpand: false,
        vexpand: true,
        children: center,
      }),
      endWidget: Widget.Box({
        class_name: "bar-box bar-end",
        vpack: "end",
        hpack: "center",
        hexpand: false,
        vexpand: true,
        children: end,
      }),
    }),
  });
