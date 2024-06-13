// TODO: rewrite something like this: https://github.com/SimonBrandner/dotfiles/blob/main/config/ags/app_launcher/AppLauncher.ts
const { query } = await Service.import("applications");

// Simple fuzzy search
const matchesTerm = (name: string, term: string) => {
  const regexString = term.split("").join(".*?");
  const regex = new RegExp(regexString, "i");

  return regex.test(name);
};

export default (windowName: string) => {
  const AppItem = (app: any) =>
    Widget.Button({
      vexpand: true,
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
            size: 32,
          }),
          Widget.Label({
            class_name: "app-title",
            label: app.name,
            xalign: 0,
            vpack: "center",
            truncate: "end",
          }),
        ],
      }),
    });

  let applications = Variable(query("").map(AppItem));

  const list = Widget.Box({
    vertical: true,
    vpack: "start",
    class_name: "app-list",
    children: applications.bind(),
  });

  function repopulate() {
    applications.value = query("").map(AppItem);
  }

  const entry = Widget.Entry({
    hexpand: false,
    vexpand: false,
    class_name: "app-entry",
    placeholder_text: "Search for an app...",

    on_accept: () => {
      const results = applications.value.filter((item) => item.visible);
      if (results[0]) {
        App.toggleWindow(windowName);
        results[0].attribute.app.launch();
      }
    },

    on_change: ({ text }) =>
      applications.value.forEach((item) => {
        item.visible = matchesTerm(item.attribute.app.name, text ?? "");
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
        //overlayScrolling: true,
        child: list,
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
