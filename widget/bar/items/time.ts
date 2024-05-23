const date = Variable("", {
  poll: [1000, 'date +"%H\n%M"'],
});

export default () =>
  Widget.Label({
    class_name: "bar-item time",
    label: date.bind(),
    //hpack: "center",
    hexpand: true,
  });
