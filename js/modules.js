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

(($) => {
    $.fn.videoControls = (options) => {
        this.each((e) => {
            let defaults = {}
            let settings = $.extend({}, defaults, options);

            let elem = $(this);

            let video = $('.video');
            let controls = $('.controls');
            let pp_large = $('.pp-large');
            let play = $('.play');
            let volume = $('.volume');
            let videoSettings = $('.video-settings');
            let range = $('.range');
            let current = $('.current');
            let duration = $('.duration');
            let time_teaser = $('.time-teaser');
            let volDiv = $('.vol-div');
            let volSlider = $('.vol-slider');
            let pbrDiv = $('.pbr-div');
            let pbr = $('.pbr');
            let timeBubble = $('.time-bubble');
            let parent = elem.parent.filter('.video-container');


            if (video.currentTime === 0) {
                pp_large.html("<i class='material-icons'>play_arrow</i>");
                pp_large.show();
                time_teaser.hide();
                pp_large.on('click', (e) => {
                    play.html('<i class="material-icons">pause</i>');
                    video.play();
                    pp_large.hide();
                    controls.show();
                });
            }

            parent.on('mousemove', (e) => {
                controls.show();
                time_teaser.hide();
            }).on('mouseout', (e) => {
                controls.hide();
                time_teaser.show();
            });

            play.on('click', (e) => {
                if (video.paused) {
                    video.play();
                    play.html('<i class="material-icons">pause</i>');
                    pp_large.hide();
                } else {
                    video.pause();
                    play.html('<i class="material-icons">play_arrow</i>');
                    pp_large.show();
                }
            });

            $(this).on('click', (e) => {
                if (video.paused) {
                    video.play();
                    play.html('<i class="material-icons">pause</i>');
                    pp_large.hide();
                } else {
                    video.pause();
                    play.html('<i class="material-icons">play_arrow</i>');
                    pp_large.show();
                }
            });

            range.on('change', (e) => {
                video.currentTime = video.duration * (range.val() / 100);
            });

            $(this).on('loadedmetadata', (e) => {
                let dur_mins;
                dur_mins = Math.floor(video.duration / 60);
                let dur_secs = Math.floor(video.duration - dur_mins % 60);

                if (dur_secs < 10) {
                    dur_secs = '0' + dur_secs;
                }

                duration.html(dur_mins + ':' + dur_secs);
            });

            $(this).on('timeupdate', (e) => {
                let nt = video.currentTime * (100 / video.duration);
                range.val(nt);

                let curr_mins = Math.floor(video.currentTime / 60);
                let curr_secs = Math.floor(video.currentTime - curr_mins * 60);
                let dur_mins = Math.floor(video.duration / 60);
                let dur_secs = Math.floor(video.duration - dur_mins * 60);

                if (curr_secs < 10) {
                    curr_secs = '0' + curr_secs;
                }

                if (dur_secs < 10) {
                    dur_secs = '0' + dur_secs;
                }
                current.text(curr_mins + ':' + curr_secs);
                duration.text(dur_mins + ':' + dur_secs);
                time_teaser.text(curr_mins + ':' + curr_secs);
            });

            const readableTime = (time) => {
                let mins = "0" + Math.floor(time / 60);
                let secs = "0" + Math.floor(time - mins * 60);
                time = mins.slice(-2) + ':' + secs.slice(-2);

                return time;
            }

            $(range).on('mouseover', (e) => {
                let cursorPos = (e.clientX - (range.getBoundingClientRect().left)) / (range.offsetWidth);
                let seekTime = cursorPos * video.duration;

                if (seekTime) {
                    timeBubble.html(readableTime(seekTime));
                    let left = e.clientX - range.getBoundingClientRect().left - 10;
                    timeBubble.css('left', left + 'px');
                    timeBubble.css('display', 'block');

                    if (left >= 400) {
                        timeBubble.css('left', (left - 20) + "px");
                    }
                }
            }).on('mouseout', (e) => {
                timeBubble.css('display', 'none');
            });

            volSlider.on('change', (e) => {
                video.volume = volSlider.val() / 100;
                let vol = video.volume;
                if (vol === 0) {
                    volume.html('<i class="material-icons">volume_off</i>');
                } else if (vol === 0.3) {
                    volume.html('<i class="material-icons">volume_down</i>');
                } else if (vol === 0.6) {
                    volume.html('<i class="material-icons">volume_up</i>');
                } else {
                    volume.html('<i class="material-icons">volume_up</i>');
                }
            })

            volume.on('click', (e) => {
                if (video.muted) {
                    video.muted = false;
                    volume.html('<i class="material-icons">volume_up</i>');
                    video.volume = 1;
                    volSlider.prop('value', '100')
                } else {
                    video.muted = true;
                    volume.html('<i class="material-icons">volume_off</i>');
                    video.volume = 0;
                    volSlider.prop('value', '0')
                }
            })

            settings.on('click', (e) => {
                pbrDiv.toggle();
            });

            pbr.on('click', (e) => {
                let data = $(this).data('pbr');
                $(this).siblings().removeClass('pbr');
                $(this).addClass('pbr');

                video.playbackRate = data;
                settings.text(data + 'x');
                pbrDiv.hide();
            });
        });
        return this;
    }
})(jQuery);
