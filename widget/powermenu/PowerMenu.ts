import Menu from "./Menu.ts";

export default (monitor: number = 0) =>
  Widget.Window({
    monitor: monitor,
    class_name: "powermenu",
    name: `powermenu${monitor}`,
    anchor: ["top", "left", "bottom", "right"],
    layer: "top",
    visible: false,
    child: Widget.EventBox({
      hexpand: true,
      vexpand: true,
      on_primary_click: () => App.toggleWindow(`powermenu${monitor}`),
      //on_primary_click: () =>
      //  (globalThis[`show_powermenu${monitor}`].value = false),
      child: Widget.Box({
        css: "padding: 1px;",
        vertical: true,
        vpack: "start",
        hpack: "start",
        children: [Menu(monitor)],
      }),
    }),
  });
