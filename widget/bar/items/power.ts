export default (monitor: number = 0) =>
  Widget.Box({
    class_name: "open-powermenu",
    vpack: "center",
    hpack: "center",
    hexpand: true,
    tooltip_text: "Open powermenu",
    child: Widget.Button({
      hexpand: false,
      onClicked: () => App.toggleWindow(`powermenu${monitor}`),
      class_name: "powermenu-button",
      child: Widget.Icon({
        icon: "system-shutdown-symbolic",
      }),
    }),
  });
