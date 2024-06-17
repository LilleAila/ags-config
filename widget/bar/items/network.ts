const network = await Service.import("network");

export default () =>
  Widget.Box({
    vpack: "center",
    hpack: "center",
    hexpand: true,
    class_name: "bar-item network",
    child: Widget.Stack({
      children: {
        disconnected: Widget.Box({
          children: [
            Widget.Icon({ icon: "network-wireless-disconnected-symbolic" }),
          ],
        }),
        wifi: Widget.Box({
          vertical: true,
          children: [
            Widget.Icon({ icon: network.wifi.bind("icon_name") }),
            Widget.Label({
              wrap: true,
              label: network.wifi.bind("ssid").as((v) => v!),
              maxWidthChars: 1,
            }),
          ],
        }),
        wired: Widget.Box({
          children: [Widget.Icon({ icon: network.wired.bind("icon_name") })],
        }),
      },
      transition: "slide_up_down",
      shown: network
        .bind("connectivity")
        .as((v) =>
          v == "none"
            ? "disconnected"
            : network.primary == "wifi"
            ? "wifi"
            : "wired",
        ),
    }),
  });
