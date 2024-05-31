const Button = (icon: string, click: any, tooltip: string) =>
  Widget.Button({
    class_name: "powermenu-button",
    child: Widget.Icon({ icon: icon, size: 48 }),
    onClicked: click,
    hexpand: false,
    vexpand: false,
    hpack: "center",
    vpack: "center",
    "tooltip-text": tooltip,
  });

const lock = () => Utils.exec("loginctl lock-session");
const suspend = () => Utils.exec("systemctl suspend");
const poweroff = () => Utils.exec("systemctl poweroff");
const reboot = () => Utils.exec("systemctl reboot");
const logout = () => Utils.exec("hyprctl dispatch exit");

const buttons = [
  Button("lock-symbolic", lock, "Lock"),
  Button("system-suspend-symbolic", suspend, "Suspend"),
  Button("system-shutdown-symbolic", poweroff, "Power off"),
  Button("system-reboot-symbolic", reboot, "Reboot"),
  Button("application-exit-symbolic", logout, "Log out"),
];

export default (monitor: number = 0) => {
  App.config({
    closeWindowDelay: {
      [`powermenu${monitor}`]: 150,
    },
  });
  //globalThis[`show_powermenu${monitor}`] = Variable(false);
  return Widget.Revealer({
    class_name: "powermenu-wrapper",
    transition: "slide_right",
    transitionDuration: 150,
    //reveal_child: globalThis[`show_powermenu${monitor}`].bind(),
    reveal_child: false,
    setup: (self) => {
      self.hook(
        App,
        (self, windowName, visible) => {
          if ((windowName = `powermenu${monitor}`)) {
            self.reveal_child = visible;
          }
        },
        "window-toggled",
      );
    },
    child: Widget.Box({
      class_name: "powermenu-menu",
      children: buttons,
      vertical: true,
      hexpand: false,
      vexpand: false,
    }),
  });
};
