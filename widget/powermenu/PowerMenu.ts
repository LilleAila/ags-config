import Menu from "./Menu.ts";
import { RevealerWindow } from "lib/widgets";

export default (monitor: number = 0) =>
  RevealerWindow(
    monitor,
    `powermenu${monitor}`,
    "left-top",
    Menu(),
    150,
    "slide_right",
    { class_name: "powermenu", margins: [8, 8, 8, 8] },
    { vertical: true, vpack: "start", hpack: "start" },
  );
