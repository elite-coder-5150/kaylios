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

// plugin for hover over description
(($) => {
    $.fn.description = (options) => {
        this.each((e) => {
            let elem = $(this);
            let value = null;
            let defaults = {
                extraTop: null,
                extraLeft: null,
                text: null
            }
            const hoverDiv = $('#hover-div');
            let settings = $.extend({}, defaults, options);
            hoverDiv.remove()

            if (hoverDiv.length === 0) {
                $('body').append('<div id="hover-div"></div>');
            }

            elem.on('mouseover', (e) => {
                if (settings.text == null) {
                    let value = elem.data('description');
                } else if (settings.text === "innerHTML") {
                    let value = elem.text();
                }

                hoverDiv.text(value);

                let top = elem.offset().top;
                let left = elem.offset().left;

                let width = elem.width() / 2;
                let dwidth = hoverDiv.width() / 2;

                let padding = parseInt(elem.css('padding-left'));
                let dpadding = parseInt(hoverDiv.css('padding-left'));

                let height = parseInt(elem.outerHeight());
                let dheight = parseInt(hoverDiv.outerHeight());

                hoverDiv.css({
                    left: left + width - dwidth - padding + dpadding + settings.extraLeft,
                    display: 'block"'
                })

                if (top < (dheight + 16)) {
                    hoverDiv
                        .removeClass('before')
                        .addClass('after')
                        .css('top', top - 10 - settings.extraTop)
                } else {
                    hoverDiv
                        .removeClass('after')
                        .addClass('before')
                        .css('top', top - dheight - 10 - settings.extraTop)
                }
            }).on('mouseleave', (e) => {
                hoverDiv.css('display', 'none');
            });
        });

        return this;
    }
})(jQuery);

// plugin for toggle post options
(($) => {
    $.fn.togglePost = (options) => {
        this.each((e) => {
            let elem = $(this);
            let time = elem.find('.time');
            let opt_menu = elem.find('.options-menu');
            let defaults = {};
            let settings = $.extend({}, defaults, options);

            elem.on('mouseover', (e) => {
                time.hide();
                opt_menu.show();
            }).on('mouseleave', (e) => {
                time.show();
                opt_menu.hide();
            });
        });

        return this;
    }
})(jQuery);

// plugin for comment toggle
(($) => {
    $.fn.toggleComment = (options) => {
        this.each((e) => {
            let defaults = {}
            let settings = $.extend({}, defaults, options);

            let elem = $(this);

            // i could also use show and hide classes
            elem.on('click', (e) => {
                elem.removeClass('textarea-toggle');
            })

            elem.on('blur', (e) => {
                elem.addClass('textarea-toggle');
            });
            return this;
        })
    }
})(jQuery);

// plugin for toggling extra options for post
(($) => {
    $.fn.togglePostOptions = (options) => {

        let elem = $(this);
        let defaults = {}
        let settings = $.extend({}, defaults, options);

        let div = $('.options');
        elem.on('click', (e) => {
            elem.toggleClass('show-more-toggle');
            div.slideToggle('fast');

            $('.post-options').toggleClass('post-options-toggle');
        });
    }
})(jQuery);
