import Gtk from "gi://Gtk?version=3.0";
import Gdk from "gi://Gdk";
import GLib from "gi://GLib?version=2.0";
const popups = ["powermenu", "applauncher"];

export function range(length: number, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

export function _forMonitors(fn: (monitor: number) => any) {
  const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(n, 0).flatMap(fn);
}

// If i don't do this, lsp gets mad
export function forMonitors(widget: (monitor: number) => Gtk.Window) {
  return _forMonitors(widget);
}

export function closeAllPopups() {
  for (const popup of popups)
    _forMonitors((monitor) => App.closeWindow(`${popup}${monitor}`));
}

export function togglePopup(window: string) {
  for (const popup of popups)
    _forMonitors((monitor) => {
      const windowName = `${popup}${monitor}`;
      if (windowName == window) App.toggleWindow(windowName);
      else App.closeWindow(windowName);
    });
}
