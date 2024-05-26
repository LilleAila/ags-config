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
  Button("lock-symbolic", lock, "Lock (l)"),
  Button("system-suspend-symbolic", suspend, "Suspend (s)"),
  Button("system-shutdown-symbolic", poweroff, "Power off (p)"),
  Button("system-reboot-symbolic", reboot, "Reboot (r)"),
  Button("application-exit-symbolic", logout, "Log out (e)"),
];

export default () =>
  // Hyprland layerrules instead
  //Widget.Revealer({
  //  class_name: "powermenu-wrapper",
  //  transition: "slide_right",
  //  transitionDuration: 250,
  //  reveal_child: true,
  Widget.Box({
    class_name: "powermenu-menu",
    children: buttons,
    vertical: true,
    hexpand: false,
    vexpand: false,
  });
//});
