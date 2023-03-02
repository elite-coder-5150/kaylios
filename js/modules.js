(($) => {
    $.fn.notify = (options) => {
        let defaults = {
            beforeTop: "105%",
            afterTop: "90%",
            value: 'Hi',
            action: null,
            duration: 3000
        }

        let settings = $.extend({}, defaults, options);

        this.children().filter('open').html(settings.value);

        let div = this;

        this.animate({
            top: settings.afterTop
        }, "fast", () => {
            setTimeout(() => {
                div.animate({
                    top: settings.beforeTop
                })
            }, settings.duration)
        })

        this.on('click', (e) => {
            if (settings.action != null)
                window.location.href = settings.action;

            div.animate({
                top: settings.beforeTop
            });
        });

        return this;
    }
})(jQuery);

(($) => {
    $.fn.toggleMenu = (options) => {
        let div = this;
        let defaults = {
            menu: $('.options')
        }

        settings = $.extend({}, defaults, options);

        this.on('click', (e) => {
            e.preventDefault();
            settings.menu.toggle();
            div.toggleClass('show-more-toggle');
        });
    }
})(jQuery);

(($) => {
    $.fn.toggleMenu = (options) => {
        this.each((e) => {
            let defaults = {
                btn: null,
                menu: null
            }

        })
    }
})(jQuery);
