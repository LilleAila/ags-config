import Volume from "./Volume.ts";

export default (monitor: number) =>
  Widget.Window({
    monitor: monitor,
    class_name: "osd",
    name: `osd${monitor}`,
    layer: "overlay",
    click_through: true,
    anchor: ["top", "right", "bottom", "left"],
    child: Widget.Box({
      vertical: true,
      vpack: "end",
      hpack: "center",
      children: [
        // When both show, they will be above each other
        // It's not a bug, it's a feature!
        // Volume
        Volume(),
        // Microphone
        Volume(true),
      ],
    }),
  });
