import { RevealerWindow } from "lib/widgets";
import AppLauncher from "./Launcher.ts";

export default (monitor: number = 0) =>
  RevealerWindow(
    monitor,
    `applauncher${monitor}`,
    "left-top",
    AppLauncher(`applauncher${monitor}`),
    150,
    "slide_right",
    {
      class_name: "applauncher-window",
      keymode: "exclusive",
      setup: (self: any) => {
        self.keybind("Escape", () => App.closeWindow(`applauncher${monitor}`));
      },
      margins: [8, 8, 8, 8],
    },
    { vertical: true, vpack: "start", hpack: "start" },
  );
