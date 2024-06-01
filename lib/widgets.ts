const ClickSpace = (window: string) =>
  Widget.EventBox({
    hexpand: true,
    vexpand: true,
    on_primary_click: () => App.toggleWindow(window),
  });

export function CloseOnClickAway(window: string, content: any, layout: string) {
  switch (layout) {
    case "left-top":
      // Needs two ClickSpaces - one to the right and one below the content.
      // The few pixels above and to the left are not important to include
      return Widget.Box({
        vertical: true,
        hexpand: true,
        vexpand: true,
        children: [
          Widget.Box({
            hexpand: true,
            vexpand: false,
            vertical: false,
            children: [content, ClickSpace(window)],
          }),
          ClickSpace(window),
        ],
      });
    case "left-bottom":
      return Widget.Box({
        vertical: true,
        hexpand: true,
        vexpand: true,
        children: [
          ClickSpace(window),
          Widget.Box({
            hexpand: true,
            vexpand: false,
            vertical: false,
            children: [content, ClickSpace(window)],
          }),
        ],
      });
    default:
      print(`Invalid layout ${layout}!`);
      break;
  }
}

export function RevealerWindow(
  monitor: number,
  name: string,
  layout: string,
  content: any,
  transitionDuration: number,
  transitionName: any, // is a string but not actualy a string
  extraOptions: any = {},
  extraContainerOptions: any = {},
) {
  App.config({
    closeWindowDelay: {
      [name]: transitionDuration,
    },
  });
  return Widget.Window({
    monitor: monitor,
    name: name,
    anchor: ["top", "left", "bottom", "right"],
    layer: "top",
    visible: false,
    ...extraOptions,
    child: CloseOnClickAway(
      name,
      Widget.Box({
        css: "padding: 1px;",
        ...extraContainerOptions,
        child: Widget.Revealer({
          class_name: "powermenu-wrapper",
          transition: transitionName,
          transitionDuration: transitionDuration,
          reveal_child: false,
          setup: (self) => {
            self.hook(
              App,
              (self, windowName, visible) => {
                if (windowName == name) {
                  self.reveal_child = visible;
                }
              },
              "window-toggled",
            );
          },
          child: content,
        }),
      }),
      layout,
    ),
  });
}
