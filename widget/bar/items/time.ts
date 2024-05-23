const date = Variable("", {
  poll: [1000, 'date +"%H\n%M"'],
});
const full_date = Variable("", {
  poll: [1000, 'date +"%A %d. %B %Y, Uke %V"'],
});

export default () =>
  Widget.Label({
    class_name: "bar-item time",
    label: date.bind(),
    //hpack: "center",
    hexpand: true,
    tooltip_text: full_date
      .bind()
      .transform((text) => text.charAt(0).toUpperCase() + text.slice(1)),
  });
