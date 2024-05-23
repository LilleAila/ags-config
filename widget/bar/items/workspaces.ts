import GLib from "gi://GLib?version=2.0";
const hyprland = await Service.import("hyprland");
const active_specialisation = GLib.getenv("NIXOS_ACTIVE_SPECIALISATION");

export default () =>
  Widget.Box({
    class_name: `bar-item workspaces specialisation-${active_specialisation}`,
    vertical: true,
    hexpand: true,
    hpack: "center",
    children: [...Array(10)].map((_, i) => {
      const id = i + 1;
      return Widget.Button({
        class_name: "workspace",
        attribute: id,

        // Stop it from extending beyond min-height and min-width:
        hexpand: false,
        vexpand: false,
        hpack: "center",
        vpack: "center",

        on_clicked: () => hyprland.message(`dispatch workspace ${id}`),
        setup: (self) =>
          self.hook(hyprland, () => {
            self.toggleClassName("active", hyprland.active.workspace.id === id);
            self.toggleClassName(
              "occupied",
              (hyprland.getWorkspace(id)?.windows || 0) > 0,
            );
            self.toggleClassName(
              "mon0",
              (hyprland.getWorkspace(id)?.monitorID || 0) == 0,
            );
            self.toggleClassName(
              "mon1",
              (hyprland.getWorkspace(id)?.monitorID || 0) == 1,
            );
          }),
      });
    }),
  });
