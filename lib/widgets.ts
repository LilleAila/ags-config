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
    default:
      print(`Invalid layout ${layout}!`);
      break;
  }
}
