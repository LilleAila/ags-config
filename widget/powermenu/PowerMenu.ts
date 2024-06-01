import Menu from "./Menu.ts";
import { CloseOnClickAway } from "lib/widgets";

export default (monitor: number = 0) =>
  Widget.Window({
    monitor: monitor,
    class_name: "powermenu",
    name: `powermenu${monitor}`,
    anchor: ["top", "left", "bottom", "right"],
    layer: "top",
    visible: false,
    child: CloseOnClickAway(
      `powermenu${monitor}`,
      Widget.Box({
        css: "padding: 1px;",
        vertical: true,
        vpack: "start",
        hpack: "start",
        children: [Menu(monitor)],
      }),
      "left-top",
    ),
  });
