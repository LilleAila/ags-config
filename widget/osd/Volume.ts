const audio = await Service.import("audio");

export default () =>
  Widget.Revealer({
    transition: "slide_up",
    transitionDuration: 250,
    reveal_child: false,
    child: Widget.Box({
      hexpand: true,
      vexpand: false,
      hpack: "center",
      vpack: "center",
      class_name: "indicator volume",
      child: Widget.CircularProgress({
        class_name: "indicator-progress",
        hexpand: true,
        start_at: 0.75,
        value: audio["speaker"].bind("volume"),
        //rounded: true,
        child: Widget.Icon({
          class_name: "indicator-icon",
        }).hook(audio.speaker, (self) => {
          const vol = audio.speaker["is-muted"]
            ? 0
            : audio.speaker.volume * 100;
          const icon = (
            [
              [101, "overamplified"],
              [67, "high"],
              [34, "medium"],
              [1, "low"],
              [0, "muted"],
            ] as Array<[number, string]>
          ).find(([threshold]) => threshold <= vol)?.[1];

          self.icon = `audio-volume-${icon}-symbolic`;
        }),
      }).hook(audio.speaker, (self) => {
        self.toggleClassName("muted", audio.speaker["is-muted"]);
      }),
    }),
  });
