import Gdk from "gi://Gdk";
const systemtray = await Service.import("systemtray");

const SysTrayItem = (item) =>
  Widget.Button({
    class_name: "tray-item",
    child: Widget.Icon({ icon: item.bind("icon") }),
    tooltip_markup: item.bind("tooltip_markup"),
    setup: (self) => {
      const menu = item.menu;
      if (!menu) return;

      const id = item.menu?.connect("popped-up", () => {
        self.toggleClassName("active");
        menu.connect("notify::visible", () => {
          self.toggleClassName("active", menu.visible);
        });
        menu.disconnect(id);
      });

      if (id) self.connect("destroy", () => item.menu?.disconnect(id));
    },

    on_primary_click: (btn) =>
      item.menu?.popup_at_widget(
        btn,
        Gdk.Gravity.SOUTH,
        Gdk.Gravity.NORTH,
        null,
      ),

    on_secondary_click: (btn) =>
      item.menu?.popup_at_widget(
        btn,
        Gdk.Gravity.SOUTH,
        Gdk.Gravity.NORTH,
        null,
      ),
  });

export default () => {
  const revealer = Widget.Revealer({
    transition: "slide_down",
    transitionDuration: 250,
    reveal_child: false,
    child: Widget.Box({
      class_name: "tray",
      vertical: true,
      hexpand: true,
      hpack: "center",
    }).bind("children", systemtray, "items", (i) =>
      i
        // .filter(({ id }) => !ignore.value.includes(id))
        .map(SysTrayItem),
    ),
  });

  const revealer_icon = Variable("pan-down-symbolic");

  const reveal_button = Widget.Button({
    class_name: "show-tray-button",
    tooltip_text: "Show system tray",
    on_clicked: () => {
      revealer.reveal_child = !revealer.reveal_child;
      revealer_icon.value = revealer.reveal_child
        ? "pan-up-symbolic"
        : "pan-down-symbolic";
    },
    child: Widget.Icon({ icon: revealer_icon.bind(), size: 20 }),
  });

  return Widget.Box({
    class_name: "bar-item tray-wrapper",
    vertical: true,
    children: [
      reveal_button,
      revealer,
      //
    ],
  });
};
