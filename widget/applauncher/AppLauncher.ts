const { query } = await Service.import("applications");

const AppLauncher = () =>
  Widget.Revealer({
    transition: "slide_right",
    transitionDuration: 250,
    reveal_child: true,
    child: Widget.Box({
      vertical: true,
      class_name: "applauncher",
    }),
  });

export default (monitor: number = 0) =>
  Widget.Window({
    monitor: monitor,
    name: `applauncher${monitor}`,
    class_name: "applauncher",
    visible: false,
    //keymode: "exclusive",
    child: Widget.Box({ child: AppLauncher() }),
  });
