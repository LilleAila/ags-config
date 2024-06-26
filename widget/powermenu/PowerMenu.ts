import { RevealerWindow } from "lib/widgets";
import { closeAllPopups } from "lib/utils";
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

const lock = async () => {
  closeAllPopups();
  await Utils.execAsync("bash -c 'sleep 0.5; loginctl lock-session'");
};
const suspend = () => Utils.exec("systemctl suspend");
const poweroff = () => Utils.exec("systemctl poweroff");
const reboot = () => Utils.exec("systemctl reboot");
const logout = () => Utils.exec("hyprctl dispatch exit");

const Menu = () => {
  const buttons = [
    Button("lock-symbolic", lock, "Lock (l)"),
    Button("system-suspend-symbolic", suspend, "Suspend (s)"),
    Button("system-shutdown-symbolic", poweroff, "Power off (p)"),
    Button("system-reboot-symbolic", reboot, "Reboot (r)"),
    Button("application-exit-symbolic", logout, "Log out (q)"),
  ];

  return Widget.Box({
    class_name: "powermenu-menu",
    children: buttons,
    vertical: true,
    hexpand: false,
    vexpand: false,
  });
};

export default (monitor: number = 0) =>
  RevealerWindow(
    monitor,
    `powermenu${monitor}`,
    "left-top",
    Menu(),
    150,
    "slide_right",
    {
      class_name: "powermenu",
      margins: [8, 8, 8, 8],
      keymode: "exclusive",
      setup: (self: any) => {
        self.keybind("Escape", () => App.closeWindow(`powermenu${monitor}`));
        self.keybind("l", lock);
        self.keybind("s", suspend);
        self.keybind("p", poweroff);
        self.keybind("q", logout); // "quit"
        self.keybind("r", reboot);
      },
    },
    { vertical: true, vpack: "start", hpack: "start" },
  );
