import GLib from "gi://GLib?version=2.0";
const audio = await Service.import("audio");

export default () => {
  const revealer = Widget.Revealer({
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
  }).hook(
    audio,
    (() => {
      // These variables are global
      let counter = 0;
      let volume = audio.speaker.volume;
      let first_run = true; // This runs before volume is initialized.
      // That means that the volume variable will always be 0 in the first run of the functoin
      return (self) => {
        if (audio.speaker.volume == volume) return;
        volume = audio.speaker.volume;
        if (first_run) return (first_run = false);
        counter++;
        self.reveal_child = true;
        Utils.timeout(2000, () => {
          // so that only the last timeout actually does something
          if (--counter === 0) self.reveal_child = false;
        });
      };
    })(),
    "speaker-changed",
  );
  return revealer;
};
