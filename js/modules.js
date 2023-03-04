/** eslint-env jquery */
/** eslint no-undef: "error" */
/** eslint no-unused-vars: "error" */
/** eslint no-undef: "error" */
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

        div.animate({
            top: settings.afterTop
        }, "fast", () => {
            setTimeout(() => {
                div.animate({
                    top: settings.beforeTop
                })
            }, settings.duration)
        })

        this.on('click', (e) => {
            e.preventDefault();
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

        let settings = $.extend({}, defaults, options);

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
            e.preventDefault();
            let defaults = {
                btn: null,
                menu: null
            }

            let settings = $.extend({}, defaults, options);

        })

        let div = this;

    }
})(jQuery);
