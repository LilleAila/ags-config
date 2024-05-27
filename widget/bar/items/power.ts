export default (monitor: number = 0) =>
  Widget.Box({
    class_name: "open-powermenu",
    vpack: "center",
    hexpand: true,
    tooltip_text: "Open powermenu",
    child: Widget.Button({
      vexpand: false,
      onClicked: () => App.toggleWindow(`powermenu${monitor}`),
      class_name: "powermenu-button",
      child: Widget.Icon({
        hexpand: true,
        icon: "system-shutdown-symbolic",
      }),
    }),
  });