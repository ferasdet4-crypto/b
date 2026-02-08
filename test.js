(function () {
  'use strict';

  if (window.test_plugin_ok) return;
  window.test_plugin_ok = true;

  function start() {
    Lampa.Manifest.plugins = {
      type: 'other',
      name: 'TestPlugin',
      version: '1.0',
      description: 'Test plugin'
    };

    console.log('TEST PLUGIN LOADED');
  }

  if (window.appready) start();
  else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') start();
    });
  }
})();
