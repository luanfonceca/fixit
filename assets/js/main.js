/*
  Highlights by HTML5 UP
  html5up.net | @n33co
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

  skel.breakpoints({
    large: '(max-width: 1680px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  $(function() {

    var $window = $(window),
      $body = $('body'),
      $html = $('html');

    // Disable animations/transitions until the page has loaded.
      $html.addClass('is-loading');

      $window.on('load', function() {
        window.setTimeout(function() {
          $html.removeClass('is-loading');
        }, 0);
      });

    // Touch mode.
      if (skel.vars.mobile) {

        var $wrapper;

        // Create wrapper.
          $body.wrapInner('<div id="wrapper" />');
          $wrapper = $('#wrapper');

          // Hack: iOS vh bug.
            if (skel.vars.os == 'ios')
              $wrapper
                .css('margin-top', -25)
                .css('padding-bottom', 25);

          // Pass scroll event to window.
            $wrapper.on('scroll', function() {
              $window.trigger('scroll');
            });

        // Scrolly.
          $window.on('load.hl_scrolly', function() {

            $('.scrolly').scrolly({
              speed: 1500,
              parent: $wrapper,
              pollOnce: true
            });

            $window.off('load.hl_scrolly');

          });

        // Enable touch mode.
          $html.addClass('is-touch');

      }
      else {

        // Scrolly.
          $('.scrolly').scrolly({
            speed: 1500
          });

      }

    // Fix: Placeholder polyfill.
      $('form').placeholder();

    // Prioritize "important" elements on medium.
      skel.on('+medium -medium', function() {
        $.prioritize(
          '.important\\28 medium\\29',
          skel.breakpoint('medium').active
        );
      });

    // Header.
      var $header = $('#header'),
        $headerTitle = $header.find('header'),
        $headerContainer = $header.find('.container');

      // Make title fixed.
        if (!skel.vars.mobile) {

          $window.on('load.hl_headerTitle', function() {

            skel.on('-medium !medium', function() {

              $headerTitle
                .css('position', 'fixed')
                .css('height', 'auto')
                .css('top', '50%')
                .css('left', '0')
                .css('width', '100%')
                .css('margin-top', ($headerTitle.outerHeight() / -2));

            });

            skel.on('+medium', function() {

              $headerTitle
                .css('position', '')
                .css('height', '')
                .css('top', '')
                .css('left', '')
                .css('width', '')
                .css('margin-top', '');

            });

            $window.off('load.hl_headerTitle');

          });

        }

      // Scrollex.
        skel.on('-small !small', function() {
          $header.scrollex({
            terminate: function() {

              $headerTitle.css('opacity', '');

            },
            scroll: function(progress) {

              // Fade out title as user scrolls down.
                if (progress > 0.5)
                  x = 1 - progress;
                else
                  x = progress;

                $headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));

            }
          });
        });

        skel.on('+small', function() {

          $header.unscrollex();

        });

    $('#contact-form').submit(function(e) {
      e.preventDefault();

      $.ajax({
        url: 'http://formspree.io/fixitbrazil@gmail.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        success: function(data) {
          $.simplyToast('Mensagem enviada!', 'success');
        },
        error: function(err) {
          $.simplyToast('Erro ao enviar mensagem!', 'danger');
        }
      });
    });

  });

})(jQuery);