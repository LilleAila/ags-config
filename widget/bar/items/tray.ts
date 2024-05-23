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

export default () =>
  Widget.Box({
    class_name: "bar-item tray",
    vertical: true,
    hexpand: true,
    hpack: "center",
  }).bind("children", systemtray, "items", (i) =>
    i
      // .filter(({ id }) => !ignore.value.includes(id))
      .map(SysTrayItem),
  );
