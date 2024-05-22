const start = [];

export default (monitor: number) =>
  Widget.Window({
    monitor,
    class_name: "bar",
    name: `bar${monitor}`,
    anchor: ["top", "right", "left"],
    child: Widget.CenterBox({
      startWidget: Widget.Box({
        hexpand: true,
        children: [],
      }),
      centerWidget: Widget.Box({
        hpack: "center",
        children: [],
      }),
      endWidget: Widget.Box({
        hexpand: true,
        children: [],
      }),
    }),
  });
