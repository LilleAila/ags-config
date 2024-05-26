import Menu from "./Menu.ts";

export default (monitor: number = 0) =>
  Widget.Window({
    monitor: monitor,
    class_name: "powermenu",
    name: `powermenu`,
    anchor: ["top", "left"],
    layer: "top",
    visible: false,
    child: Widget.Box({
      vertical: true,
      vpack: "start",
      hpack: "start",
      children: [Menu()],
    }),
  });
