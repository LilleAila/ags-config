const { query } = await Service.import("applications");

const AppLauncher = () =>
  Widget.Box({
    vertical: true,
    class_name: "applauncher",
  });

export default (monitor: number = 0) =>
  Widget.Window({
    monitor: monitor,
    name: `applauncher${monitor}`,
    class_name: "applauncher",
    visible: false,
    //keymode: "exclusive",
    child: AppLauncher(),
  });
