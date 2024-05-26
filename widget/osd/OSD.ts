import Volume from "./Volume.ts";

export default (monitor: number) =>
  Widget.Window({
    monitor: monitor,
    class_name: "osd",
    name: `osd${monitor}`,
    layer: "overlay",
    click_through: true,
    anchor: ["top", "right", "bottom", "left"],
    margins: [48, 48, 48, 48],
    child: Widget.Box({
      vertical: true,
      vpack: "end",
      hpack: "center",
      children: [
        // Volume
        Volume(),
      ],
    }),
  });