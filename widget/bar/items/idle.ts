const icon = Variable("night-light-disabled-symbolic");
const tooltip = Variable("Idle enabled");
const toggle = () => {
  const state = Utils.exec("matcha -t -b waybar");
  const enabled = state.match(/Enabled/g);
  icon.value = enabled
    ? "night-light-symbolic"
    : "night-light-disabled-symbolic";
  tooltip.value = enabled ? "Staying awake" : "Idle enabled";
};

export default () =>
  Widget.Box({
    class_name: "idle-inhibit bar-item",
    vpack: "center",
    hexpand: true,
    tooltip_text: tooltip.bind(),
    child: Widget.Button({
      //hexpand: false,
      vexpand: false,
      class_name: "idle-button",
      on_clicked: toggle,
      child: Widget.Icon({
        class_name: "inhibit_icon",
        icon: icon.bind(),
      }),
    }),
  });
