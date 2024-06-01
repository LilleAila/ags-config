const { query } = await Service.import("applications");

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
    class_name: "app-list",
    children: applications.bind(),
  });

  function repopulate() {
    applications.value = query("").map(AppItem);
  }

  const entry = Widget.Entry({
    hexpand: false,
    vexpand: true,
    class_name: "app-entry",

    on_accept: () => {
      const results = applications.value.filter((item) => item.visible);
      if (results[0]) {
        App.toggleWindow(windowName);
        results[0].attribute.app.launch();
      }
    },

    on_change: ({ text }) =>
      applications.value.forEach((item) => {
        item.visible = item.attribute.app.match(text ?? "");
      }),
  });

  return Widget.Box({
    vertical: true,
    class_name: "applauncher",
    children: [
      //entry,
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
