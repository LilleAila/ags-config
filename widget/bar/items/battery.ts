const battery = await Service.import("battery");

function batteryTime(tr: number): string {
  const hours = Math.floor(tr / 3600);
  const minutes = Math.floor((tr % 3600) / 60);
  if (hours > 0 || minutes > 0)
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  else return "";
}

export default () =>
  Widget.Box({
    visible: battery.bind("available"),
    vpack: "center",
    hpack: "center",
    hexpand: true,
    class_name: "bar-item battery",
    child: Widget.CircularProgress({
      class_name: "battery-progress",
      hexpand: true,
      start_at: 0.75,
      value: battery.bind("percent").as((p) => p / 100),
    }).hook(battery, (self) => {
      self.toggleClassName("charging", battery.charging);
      self.toggleClassName("warning", battery.percent <= 25);
      self.toggleClassName("critical", battery.percent <= 10);

      self.tooltip_text = `${battery.percent}%${
        battery.time_remaining > 0
          ? ` - ${batteryTime(battery.time_remaining)} until ${
              battery.charging ? "full" : "empty"
            }`
          : ""
      }`;
    }),
  });
