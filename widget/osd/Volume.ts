const audio = await Service.import("audio");

// Either "speaker" and "volume" or "microphone" and "input-microphone"
export default (microphone: boolean = false) => {
  const type = microphone ? "microphone" : "speaker";
  const icon_name = microphone ? "input-microphone" : "volume";
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
        value: audio[type].bind("volume"),
        child: Widget.Icon({
          class_name: "indicator-icon",
        }).hook(audio[type], (self) => {
          const vol = audio[type]["is-muted"] ? 0 : audio[type].volume * 100;
          const icon = (
            [
              [101, "overamplified"],
              [67, "high"],
              [34, "medium"],
              [1, "low"],
              [0, "muted"],
            ] as Array<[number, string]>
          ).find(([threshold]) => threshold <= vol)?.[1];

          self.icon = `audio-${icon_name}-${icon}-symbolic`;
        }),
      }).hook(audio[type], (self) => {
        self.toggleClassName("muted", audio[type]["is-muted"]);
      }),
    }),
  }).hook(
    audio,
    (() => {
      // These variables are global
      let counter = 0;
      let volume = audio[type].volume;
      let muted = audio[type].is_muted;
      let first_run = true; // This runs before volume is initialized.
      // That means that the volume variable will always be 0 in the first run of the functoin
      return (self) => {
        if (audio[type].volume == volume && audio[type].is_muted == muted)
          return;
        volume = audio[type].volume;
        muted = audio[type].is_muted;
        if (first_run) return (first_run = false);
        counter++;
        self.reveal_child = true;
        Utils.timeout(2000, () => {
          // so that only the last timeout actually does something
          if (--counter === 0) self.reveal_child = false;
        });
      };
    })(),
    `${type}-changed`,
  );
};
