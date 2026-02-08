(function () {
  if (window.test_plugin_loaded) return;
  window.test_plugin_loaded = true;

  if (window.appready) alert('PLUGIN LOADED');
  else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') alert('PLUGIN LOADED');
    });
  }
})();
