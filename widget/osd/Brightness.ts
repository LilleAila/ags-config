import brightness from "./BrightnessService.ts";

export default () => {
  return Widget.Revealer({
    transition: "slide_up",
    transitionDuration: 250,
    reveal_child: false,
    child: Widget.Box({
      class_name: "indicator volume",
      child: Widget.CircularProgress({
        class_name: "indicator-progress",
        hexpand: true,
        start_at: 0.75,
        value: brightness.bind("screen_value"),
        child: Widget.Icon({
          class_name: "indicator-icon",
        }).hook(brightness, (self) => {
          const bright = brightness.screen_value * 100;
          const icon = (
            [
              [75, "high"],
              [35, "medium"],
              [0, "low"],
            ] as Array<[number, string]>
          ).find(([threshold]) => threshold <= bright)?.[1];

          self.icon = `display-brightness-${icon}-symbolic`;
        }),
      }),
    }),
  }).hook(
    brightness,
    (() => {
      let counter = 0;
      let bright = brightness.screen_value;
      return (self) => {
        if (brightness.screen_value == bright) return;
        bright = brightness.screen_value;
        counter++;
        self.reveal_child = true;
        Utils.timeout(2000, () => {
          // so that only the last timeout actually does something
          if (--counter === 0) self.reveal_child = false;
        });
      };
    })(),
    `screen-changed`,
  );
};
