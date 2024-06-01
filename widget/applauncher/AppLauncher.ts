const { query } = await Service.import("applications");
import { RevealerWindow } from "lib/widgets";

const AppLauncher = () =>
  Widget.Box({
    vertical: true,
    class_name: "applauncher",
    children: [Widget.Label({ label: "test" })],
  });

export default (monitor: number = 0) =>
  RevealerWindow(
    monitor,
    `applauncher${monitor}`,
    "left-top",
    AppLauncher(),
    150,
    "slide_right",
    {
      class_name: "applauncher_window",
      keymode: "exclusive",
      setup: (self: any) => {
        self.keybind("Escape", () => App.closeWindow(`applauncher${monitor}`));
      },
    },
    { vertical: true, vpack: "end", hpack: "start" },
  );
