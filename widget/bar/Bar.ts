import Time from "./items/time";

// TODO: define these things in separate file?
const start = [Time()];
const center = [];
const end = [];

export default (monitor: number) =>
  Widget.Window({
    monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    anchor: ["top", "bottom", "right"],
    child: Widget.CenterBox({
      startWidget: Widget.Box({
        hexpand: true,
        children: start,
      }),
      centerWidget: Widget.Box({
        hpack: "center",
        children: center,
      }),
      endWidget: Widget.Box({
        hexpand: true,
        children: end,
      }),
    }),
  });
