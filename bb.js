(function () {
  'use strict';

  if (window.showy_plugin) return;
  window.showy_plugin = true;

  function startPlugin() {

    // =====================
    // SAFE CONFIG (FIX)
    // =====================
    var Defined = {
      api: 'lampac',
      localhost: '',     // ❌ отключён backend
      apn: ''
    };

    var Network = Lampa.Reguest;

    // =====================
    // COMPONENT (STUB)
    // =====================
    function component(object) {
      this.create = function () {
        var html = $('<div class="online-empty selector"></div>');
        html.append('<div class="online-empty__title">Showy</div>');
        html.append('<div class="online-empty__time">Источник недоступен</div>');
        return html;
      };
      this.start = function () {
        Lampa.Controller.enable('content');
      };
      this.stop = function () {};
      this.pause = function () {};
      this.destroy = function () {};
    }

    // =====================
    // MANIFEST
    // =====================
    var manifest = {
      type: 'video',
      version: 'fixed',
      name: 'Showy',
      description: 'Showy (fixed, offline)',
      component: 'showy',
      onContextMenu: function () {
        return {
          name: 'Showy',
          description: 'offline'
        };
      },
      onContextLauch: function (object) {
        Lampa.Component.add('showy', component);
        Lampa.Activity.push({
          component: 'showy',
          title: 'Showy',
          movie: object
        });
      }
    };

    Lampa.Manifest.plugins = manifest;

    // =====================
    // BUTTON
    // =====================
    function addButton(e) {
      if (e.render.find('.showy-fixed-btn').length) return;

      var btn = $('<div class="full-start__button selector showy-fixed-btn"><span>Showy</span></div>');
      btn.on('hover:enter', function () {
        Lampa.Component.add('showy', component);
        Lampa.Activity.push({
          component: 'showy',
          title: 'Showy',
          movie: e.movie
        });
      });

      e.render.before(btn);
    }

    Lampa.Listener.follow('full', function (e) {
      if (e.type === 'complite') {
        addButton({
          render: e.object.activity.render().find('.button--play, .view--torrent').first(),
          movie: e.data.movie
        });
      }
    });
  }

  // =====================
  // APP READY
  // =====================
  if (window.appready) startPlugin();
  else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') startPlugin();
    });
  }

})();
