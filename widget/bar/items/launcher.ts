import { togglePopup } from "lib/utils";

export default (monitor: number = 0) =>
  Widget.Box({
    class_name: "open-launcher",
    vpack: "center",
    hpack: "center",
    hexpand: true,
    tooltip_text: "Open launcher",
    child: Widget.Button({
      hexpand: false,
      //onClicked: () => App.toggleWindow(`applauncher${monitor}`),
      onClicked: () => togglePopup(`applauncher${monitor}`),
      class_name: "launcher-button",
      child: Widget.Icon({
        icon: "view-grid-symbolic",
      }),
    }),
  });
