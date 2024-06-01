import Menu from "./Menu.ts";

// TODO: clean this code up to a utility function
export default (monitor: number = 0) =>
  Widget.Window({
    monitor: monitor,
    class_name: "powermenu",
    name: `powermenu${monitor}`,
    anchor: ["top", "left", "bottom", "right"],
    layer: "top",
    visible: false,
    child: Widget.Box({
      vertical: true,
      hexpand: true,
      vexpand: true,
      children: [
        Widget.Box({
          hexpand: true,
          vexpand: true,
          vertical: false,
          children: [
            Widget.Box({
              css: "padding: 1px;",
              vertical: true,
              vpack: "start",
              hpack: "start",
              children: [Menu(monitor)],
            }),
            Widget.EventBox({
              hexpand: true,
              vexpand: true,
              on_primary_click: () => App.toggleWindow(`powermenu${monitor}`),
            }),
          ],
        }),
        Widget.EventBox({
          hexpand: true,
          vexpand: true,
          on_primary_click: () => App.toggleWindow(`powermenu${monitor}`),
        }),
      ],
    }),
  });
