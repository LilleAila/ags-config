const { query } = await Service.import("applications");
import { RevealerWindow } from "lib/widgets";

const AppLauncher = (windowName: string) => {
  const AppItem = (app: any) =>
    Widget.Button({
      class_name: "app-item",
      on_clicked: () => {
        App.closeWindow(windowName);
        app.launch();
      },
      attribute: { app },
      child: Widget.Box({
        children: [
          Widget.Icon({
            icon: app.icon_name || "",
            size: 42,
          }),
          Widget.Label({
            class_name: "title",
            label: app.name,
            xalign: 0,
            vpack: "center",
            truncate: "end",
          }),
        ],
      }),
    });

  let applications = query("").map(AppItem);

  const list = Widget.Box({
    vertical: true,
    class_name: "app-list",
    children: applications,
  });

  function repopulate() {
    applications = query("").map(AppItem);
    list.children = applications;
  }

  const entry = Widget.Entry({
    hexpand: true,
    class_name: "app-entry",

    on_accept: () => {
      const results = applications.filter((item) => item.visible);
      if (results[0]) {
        App.toggleWindow(windowName);
        results[0].attribute.app.launch();
      }
    },

    on_change: ({ text }) =>
      applications.forEach((item) => {
        item.visible = item.attribute.app.match(text ?? "");
      }),
  });

  return Widget.Box({
    vertical: true,
    class_name: "applauncher",
    children: [
      entry,
      Widget.Scrollable({
        hscroll: "never",
        class_name: "app-scroll",
        child: list,
        hexpand: true,
      }),
    ],

    setup: (self) =>
      self.hook(App, (_, windowName, visible) => {
        if (windowName !== windowName) return;

        if (visible) {
          repopulate();
          entry.text = "";
          entry.grab_focus();
        }
      }),
  });
};

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
