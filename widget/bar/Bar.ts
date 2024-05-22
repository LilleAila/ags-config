import Time from "./items/time";

// TODO: define these things in separate file?
const start = [Time()];
const center = [];
const end = [];

export default (monitor: number) =>
  Widget.Window({
    monitor: monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    anchor: ["top", "right", "bottom"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      startWidget: Widget.Box({
        vpack: "start",
        hpack: "center",
        hexpand: false,
        vexpand: true,
        children: start,
      }),
      centerWidget: Widget.Box({
        vpack: "center",
        hpack: "center",
        hexpand: false,
        vexpand: true,
        children: center,
      }),
      endWidget: Widget.Box({
        vpack: "end",
        hpack: "center",
        hexpand: false,
        vexpand: true,
        children: end,
      }),
    }),
  });
