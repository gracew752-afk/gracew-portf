// Add ?debug=1 to any URL to see the clickable hotspot areas
// outlined in pink, with labels, for calibrating their position
// over the designed images.
if (new URLSearchParams(window.location.search).has("debug")) {
  document.body.classList.add("debug");
}
