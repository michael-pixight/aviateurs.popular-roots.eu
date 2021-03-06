/*
 * Two Dimensional Slider for Touchfolio theme.  
 * 
 * Copyright 2012 Dmitry Semenov. http://dimsemenov.com
 * 
 * You must not use this slider outside the Touchfolio theme. Slider is based on commercial RoyalSlider script.
 *
 */;
(function ($) {
    function TwoDimSlider(d, f) {
        var g = navigator.userAgent.toLowerCase(),
            self = this,
            br = jQuery.browser,
            isMozilla = br.mozilla,
            isMobileWebkit, isWebkit = br.webkit,
            isIOS = g.match(/(iphone|ipod|ipad)/),
            isAndroid = g.indexOf('android') > -1,
            isChrome = g.indexOf('chrome') > -1,
            isMac = (navigator.appVersion.indexOf("Mac") != -1);
        self._az = isChrome;
        self._by = tdSliderVars;
        self.sliderRoot = $(d);
        self._cx = self.sliderRoot.find('.slider-wrapper');
        self._dw = false;
        self._ev = false;
        self.onTransitionStart = function () {};
        self.onTransitionComplete = function () {};
        self._fu;
        self._gt;
        self._hs;
        self._ir;
        self._jq;
        self._kp = false;
        self._lo = 'none';
        self._mn = false;
        self._az1 = false;
        self._by1 = false;
        self._cx1 = false;
        self.moved;
        self.startX;
        self.startY;
        self.pointX;
        self.pointY;
        self.changedX;
        self.changedY;
        self.firstLoaded = false;
        self.directionLocked;
        self.x = 0;
        self.y = 0;
        self.loadingTimeout;
        self.settings = $.extend({}, $.fn.twoDimSlider.defaults, f);
        self._ev1 = self._fu1 = !isChrome ? Modernizr.csstransforms3d : false;
        self._gt1 = 'onorientationchange' in window ? 'orientationchange.tds resize.tds' : 'resize.tds';
        if (window.navigator.msPointerEnabled) {
            if ('ontouchstart' in window || 'createTouch' in document) {
                self.hasTouch = false
            }
            self._hs1 = 'MSPointerDown.tds';
            self._ir1 = 'MSPointerMove.tds';
            self._jq1 = 'MSPointerUp.tds ';
            self._kp1 = self._jq1;
            self._lo1 = self._hs1
        } else if ('ontouchstart' in window || 'createTouch' in document) {
            self.hasTouch = true;
            self._hs1 = 'touchstart.tds';
            self._ir1 = 'touchmove.tds';
            self._jq1 = 'touchend.tds ';
            self._kp1 = 'touchcancel.tds';
            self._lo1 = 'touchstart'
        } else {
            self.hasTouch = false;
            self._mn1;
            self._az2;
            var g = $.browser;
            if (g.msie || g.opera) {
                self._mn1 = self._az2 = "move"
            } else if (g.mozilla) {
                self._mn1 = "-moz-grab";
                self._az2 = "-moz-grabbing"
            } else if (isMac && isWebkit) {
                self._mn1 = "-webkit-grab";
                self._az2 = "-webkit-grabbing"
            } else {}
            this._by2();
            self._hs1 = 'mousedown.tds';
            self._ir1 = 'mousemove.tds';
            self._jq1 = 'mouseup.tds';
            self._kp1 = 'mouseup.tds';
            self._lo1 = 'click'
        }
        if (!self.hasTouch) {
            self._cx2 = true;
            self._dw2 = 'click'
        } else {
            self._cx2 = true;
            self._dw2 = 'touchstart'
        }
        var h = '<div class="slider-wrapper"><div class="drag-container">',
            directions = ['center', 'top', 'right', 'bottom', 'left'];
        $.each(directions, function () {
            h += '<div class="block ' + this + '"><div class="block-inside"></div></div>'
        });
        h += '</div></div>';
        h += '<div class="video-overlay"><div class=" video-close-button"><a href="javascript:void();" class="hidden-video underlined">' + self._by.closeVideo + '</a></div><div class="video-container"></div></div>';
        if (self._cx2) {}
        h += '<div class="slider-controls">';
        if (self._cx2) {
            h += '<div class="arrow-left disabled-arrow"><a  href="javascript:void(0);" class="icon-bg"><span class="icon"></span><span class="info-text">' + (self._by.prevAlbum) + '</span></a></div>' + '<div class="arrow-right"><a href="javascript:void(0);" class="icon-bg"><span class="icon"></span><span class="info-text">' + (self._by.nextAlbum) + '</span></a></div>'
        }
        var j = self._ev2().listurl;
        if (j) {
            h += '<div class="back-to-list-button"><a class="close-gallery-button underlined" href="' + j + '">' + self._by.backToList + '</a></div>'
        }
        h += '<div class="slider-album-indicator">';
        h += '<div class="album-info-text">' + '<a href="javascript:void(0);" title="Info" class="album-name-indicator underlined"></a>' + '<span class="item-count-indicator"></span>' + '</div>';
        h += '</div>';
        h += '</div>';
        self._fu2 = self.sliderRoot.find('.gallery-posts-navigation');
        self._gt2 = false;
        if (self._fu2.length > 0) {
            self._gt2 = true
        }
        self.sliderRoot.append(h);
        self._cx = self.sliderRoot.find('.slider-wrapper');
        self.videoOverlay = self.sliderRoot.find('.video-overlay');
        self.videoContainer = self.videoOverlay.find('.video-container');
        self.currVideoImg = '';
        self.isVideoPlaying = false;
        self._hs2 = self.videoOverlay.find('.video-close-button');
        self._hs2.bind('click', function (e) {
            self.stopAndCloseVideo()
        });
        self._ir2 = false;
        var k = self._cx;
        self._jq2 = k.find('.drag-container');
        self._kp2 = k.find('.top');
        self._lo2 = k.find('.left');
        self._mn2 = k.find('.center');
        self._az3 = k.find('.right');
        self._by3 = k.find('.bottom');
        self._cx3 = false;
        self.loadQueue;
        self.imageLoader;
        self._dw3;
        self._ev3;
        self._fu3;
        self._gt3 = false;
        self._hs3 = 0;
        self._ir3 = true;
        self._jq3 = 0;
        self._kp3 = 0;
        self._lo3 = 0;
        self._mn3 = 0;
        if (self.settings.disableContextMenu) {
            self.sliderRoot.bind('contextmenu', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false
            })
        }
        if (self.hasTouch) {
            self._az4 = 0.5;
            self.settings.autoOpenDescription = false
        } else {
            self._az4 = 0.2
        }
        if (self._ev1) {
            if (isMozilla) {
                self.browserSufix = '-moz-';
                self._by4 = self._cx4 = '-moz-transform';
                self.transitionEndEvent = 'transitionend.tds';
                if (self._fu1) {
                    self._dw4 = 'translate3d(';
                    self._ev4 = 'px, ';
                    self._fu4 = 'px, 0px)'
                } else {
                    self._dw4 = 'translate(';
                    self._ev4 = 'px, ';
                    self._fu4 = 'px)'
                }
            } else if (isWebkit && self._fu1) {
                self.browserSufix = '-webkit-';
                self._by4 = self._cx4 = '-webkit-transform';
                self.transitionEndEvent = 'webkitTransitionEnd.tds';
                if (self._fu1) {
                    if (!isChrome) {
                        self._jq2.children().css({
                            '-webkit-transform': 'translateZ(0)',
                            '-webkit-perspective': '1000',
                            '-webkit-backface-visibility': 'hidden'
                        })
                    }
                    self._jq2.css({
                        '-webkit-transform': 'translateZ(0px)',
                        '-webkit-perspective': '1000',
                        '-webkit-backface-visibility': 'hidden'
                    });
                    self._dw4 = 'translate3d(';
                    self._ev4 = 'px, ';
                    self._fu4 = 'px, 0px)'
                } else {
                    self._dw4 = 'translate(';
                    self._ev4 = 'px, ';
                    self._fu4 = 'px)'
                }
            } else {
                self.browserSufix = (/trident/i).test(navigator.userAgent) ? '-ms-' : 'opera' in window ? '-o-' : '';
                self._by4 = self._cx4 = self.browserSufix + 'transform';
                self.transitionEndEvent = self.browserSufix + 'transitionend.tds';
                self._dw4 = 'translate(';
                self._ev4 = 'px, ';
                self._fu4 = 'px)'
            }
        } else {
            self._cx4 = 'left';
            self._by4 = 'top';
            self._dw4 = '';
            self._ev4 = '';
            self._fu4 = '';
            self._gt4 = ''
        }
        self._hs4 = self.sliderRoot.find('.slider-controls');
        self._ir4 = false;
        self._jq4 = false;
        self._kp4 = $('.main-header');
        self._lo4 = self._kp4.find('.menus-container');
        self._lo4 = self._kp4.find('.menus-container');
        self.albumsArr = [];
        self.currAlbum;
        self._mn4 = self._hs4.find('.slider-album-indicator');
        self._az5 = self._mn4.find('.album-info-text');
        self._by5 = self._mn4.find('.album-name-indicator');
        self._cx5 = self._mn4.find('.item-count-indicator');
        self._dw5 = $('<div class="album-info-block text-block"><div class="album-info-text"></div></div>').appendTo('body');
        var l;
        self._mn4.bind('click', function () {
            self._ev5()
        });
        if (self.settings.appendGalleriesToMenu) {
            var m = self.sliderRoot.find('.two-dim-album'),
                album, albumsMenu = '<ul id="gallery-menu" class="menu">',
                id;
            m.each(function (i, a) {
                album = $(a).data('start-item', 0);
                id = album.attr('data-album-id');
                albumsMenu += '<li data-id="' + id + '" class="menu-item"><a href="#' + id + '">' + album.find('.album-title').text() + '</a></li>';
                self.albumsArr.push(album)
            });
            albumsMenu += '</ul>'
        } else {
            self.sliderRoot.find('.two-dim-album').each(function (i, a) {
                self.albumsArr.push($(a).data('start-item', 0))
            })
        }
        if (!self.albumsArr.length > 0) {
            alert('Gallery error :(. No albums and images found');
            return
        }
        var n = 0;
        var o = window.location.hash;
        if (o) {
            o = o.replace(/^#/, '');
            n = self.getAlbumIdByIdAtt(o)
        }
        self.currAlbum = self.albumsArr[n];
        self.currAlbumId = n;
        self.numAlbums = self.albumsArr.length;
        if (self._cx2) {
            self._jq5 = self.sliderRoot.find('.arrow-left').click(function (e) {
                e.preventDefault();
                self.prev()
            });
            self._kp5 = self.sliderRoot.find('.arrow-right').click(function (e) {
                e.preventDefault();
                self.next()
            })
        }
        self._az6 = self._kp4.find('.primary-menu > .current-menu-item');
        if (self.settings.appendGalleriesToMenu && self.numAlbums > 1) {
            if (self._az6.index() != 0) {
                self._az6.before('<span class="menu-sep project-menu-sep">&mdash;</span>')
            }
            albumsMenu += '<span class="menu-sep project-menu-sep">&mdash;</span>';
            self._az6.append(albumsMenu);
            self._by6 = self._az6.find("#gallery-menu").find("li");
            self._by6.click(function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var a = self.getAlbumIdByIdAtt($(this).attr('data-id'));
                self._cx6(a, 'y', 500, true, true)
            })
        }
        self.currAlbumItems = self.currAlbum.find('.two-dim-item');
        self.currItemId = 0;
        self.currAlbumNumItems = self.currAlbumItems.length;
        self.currAlbumScaleMode = self.currAlbum.data('img-scale');
        var p;
        $(window).bind(self._gt1, function () {
            if (p) {
                clearTimeout(p)
            }
            p = setTimeout(function () {
                self.updateSliderSize()
            }, 35)
        });
        self.updateSliderSize();
        self.updateContents();
        self._cx.bind(self._hs1, function (e) {
            self._dw6(e)
        });
        if (self.settings.keyboardNavEnabled) {
            $(document).keydown(function (e) {
                if (!self._by1 && !self._az1) {
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        self.prev()
                    } else if (e.keyCode === 39) {
                        e.preventDefault();
                        self.next()
                    } else if (e.keyCode === 40) {
                        e.preventDefault();
                        self.nextAlbum()
                    } else if (e.keyCode === 38) {
                        e.preventDefault();
                        self.prevAlbum()
                    } else if (e.keyCode === 73) {
                        self._ev5()
                    }
                }
            })
        }
        $('body').bind('mouseleave', function (e) {
            if (self._by1) {
                self._ev6(e)
            }
        });
        if (!self.hasTouch) {
            self.sliderRoot.bind('mousewheel', function (e, a, b, c) {
                if (a < 0) {
                    self.next()
                } else if (a > 0) {
                    self.prev()
                }
            })
        }
        self._fu6 = false;
        self._gt6 = false;
        self._hs6;
        self._ir6();
        if (self.hasTouch) {
            $.idleTimer(self.hasTouch ? 4000 : 2000, document, {
                events: 'mousemove touchend mouseup'
            });
            $(document).bind("idle.idleTimer", function () {
                if (!self._ir4) {
                    self._jq6()
                }
            })
        } else {} if (self.settings.autoOpenDescription) {
            if (self.sliderWidth > 900) {
                self._mn6();
                self._az7(self._mn4);
                self.albumsArr[self.currAlbumId].data('sawInfo', true)
            }
        }
    }
    TwoDimSlider.prototype = {
        getAlbumIdByIdAtt: function (a) {
            var b = this,
                albums = b.albumsArr;
            for (var i = 0; i < albums.length; i++) {
                if (albums[i].attr('data-album-id') === a) {
                    return i
                }
            }
            return 0
        },
        _jq7: function () {
            $(window).unbind('hashchange.tds')
        },
        _kp7: function () {
            var a = this;
            a._lo7(a.albumsArr[a.currAlbumId].attr('data-album-id'))
        },
        _ir6: function () {
            var c = this;
            $(window).bind('hashchange.tds', function (e) {
                var a = location.hash;
                a = a.replace(/^#/, '');
                var b = c.getAlbumIdByIdAtt(a);
                c._cx6(b, 'y', 500)
            })
        },
        _lo7: function (a) {
            var b = this;
            b._jq7();
            window.location.hash = a;
            if (b._hs6) {
                clearTimeout(b._hs6)
            }
            b._hs6 = setTimeout(function () {
                b._ir6()
            }, 60)
        },
        _mn7: function (a) {
            var b = this,
                newPos, axis, increment, moveDist = Math.max(b._az8, 130) / 3;
            b._jq = 200;

            function allAnimComplete() {
                b._az1 = false
            }
            function firstAnimComplete() {
                b._az1 = false;
                b._by8(newPos, '', axis, false, true, allAnimComplete)
            }
            if (a === 'bottom') {
                newPos = b._mn3 * b.sliderHeight;
                axis = 'y';
                increment = -moveDist
            } else if (a === 'top') {
                newPos = b._mn3 * b.sliderHeight;
                axis = 'y';
                increment = moveDist
            } else if (a === 'right') {
                newPos = b._lo3 * b.sliderWidth;
                axis = 'x';
                increment = -moveDist
            } else if (a === 'left') {
                newPos = b._lo3 * b.sliderWidth;
                axis = 'x';
                increment = moveDist
            }
            if (b._gt2) {
                var c;
                if (a === 'left' || a === 'top') {
                    c = b._fu2.find('a[rel=next]').attr('href')
                } else {
                    c = b._fu2.find('a[rel=prev]').attr('href')
                }
                if (c) {
                    window.location.href = c;
                    return
                }
            }
            b._by8(newPos + increment, '', axis, false, true, firstAnimComplete)
        },
        _cx6: function (a, b, c, d, e, f) {
            var g = this,
                blockLink, newPos, album;
            if (g._by1 || g._az1) {
                return false
            }
            if (g.isVideoPlaying) {
                g.stopAndCloseVideo()
            }
            if (b === 'y' && d) {
                g._gt3 = true
            } else {
                g._gt3 = false
            }
            if (b === 'x') {
                if (a === 'next') {
                    if (!g._dw && g.currItemId + 1 >= g.currAlbumNumItems) {
                        g._mn7('right');
                        return false
                    }
                    g._cx8();
                    g._lo3 = g._jq3 - 1;
                    g._dw8(g.currAlbumId, g.currItemId + 1);
                    blockLink = g._az3;
                    g._az3 = g._lo2;
                    g._lo2 = g._mn2;
                    g._mn2 = blockLink;
                    newPos = g._lo3 * g.sliderWidth;
                    g._jq = c;
                    g._by8(newPos, 'next', 'x', false, e)
                } else if (a === 'prev') {
                    if (!g._dw && g.currItemId - 1 < 0) {
                        g._mn7('left');
                        return false
                    }
                    g._cx8();
                    g._lo3 = g._jq3 + 1;
                    g._dw8(g.currAlbumId, g.currItemId - 1);
                    blockLink = g._mn2;
                    g._mn2 = g._lo2;
                    g._lo2 = g._az3;
                    g._az3 = blockLink;
                    newPos = g._lo3 * g.sliderWidth;
                    g._jq = c;
                    g._by8(newPos, 'prev', 'x', false, e)
                } else {
                    var h = parseInt(a, 10);
                    if (h === g.currItemId + 1) {
                        g._cx6('next', 'x', c)
                    } else if (h === g.currAlbumId - 1) {
                        g._cx6('prev', 'x', c)
                    } else {
                        if (h > g.currItemId) {
                            g._lo3 = g._jq3 - 1;
                            g._dw8(g.currAlbumId, currItemId);
                            blockLink = g._az3;
                            g._az3 = g._lo2;
                            g._lo2 = g._mn2;
                            g._mn2 = blockLink;
                            newPos = g._lo3 * g.sliderWidth;
                            g._jq = c;
                            g._mn2.find('img').css('visibility', 'hidden');
                            g._by8(newPos, 'next', 'x', true, e)
                        } else if (h < g.currItemId) {
                            g._mn3 = g._kp3 + 1;
                            g._dw8(g.currAlbumId, currItemId);
                            blockLink = g._mn2;
                            g._mn2 = g._lo2;
                            g._lo2 = g._az3;
                            g._az3 = blockLink;
                            newPos = g._mn3 * g.sliderHeight;
                            g._jq = c;
                            g._mn2.find('img').css('visibility', 'hidden');
                            g._by8(newPos, 'prev', 'x', true, e)
                        }
                    }
                }
            } else {
                if (a === 'next') {
                    if (!g._ev && g.currAlbumId + 1 >= g.numAlbums) {
                        if (!f) {
                            g._mn7('bottom')
                        } else {
                            g._mn7('right')
                        }
                        return false
                    }
                    g._cx8();
                    g._mn3 = g._kp3 - 1;
                    g._dw8(g.currAlbumId + 1, 0);
                    album = g._ev8(g.currAlbumId);
                    g.currItemId = album.data('start-item');
                    blockLink = g._by3;
                    g._by3 = g._kp2;
                    g._kp2 = g._mn2;
                    g._mn2 = blockLink;
                    newPos = g._mn3 * g.sliderHeight;
                    g._jq = c;
                    g._by8(newPos, 'next', 'y', false, e)
                } else if (a === 'prev') {
                    if (!g._ev && g.currAlbumId - 1 < 0) {
                        if (!f) {
                            g._mn7('top')
                        } else {
                            g._mn7('left')
                        }
                        return false
                    }
                    g._cx8();
                    g._mn3 = g._kp3 + 1;
                    g._dw8(g.currAlbumId - 1, 0);
                    album = g._ev8(g.currAlbumId);
                    g.currItemId = album.data('start-item');
                    blockLink = g._mn2;
                    g._mn2 = g._kp2;
                    g._kp2 = g._by3;
                    g._by3 = blockLink;
                    newPos = g._mn3 * g.sliderHeight;
                    g._jq = c;
                    g._by8(newPos, 'prev', 'y', false, e)
                } else {
                    var i = parseInt(a, 10);
                    if (i === g.currAlbumId + 1) {
                        g._cx6('next', 'y', c, d, e)
                    } else if (i === g.currAlbumId - 1) {
                        g._cx6('prev', 'y', c, d, e)
                    } else {
                        if (i > g.currAlbumId) {
                            g._mn3 = g._kp3 - 1;
                            g._dw8(i, 0);
                            album = g._ev8(g.currAlbumId);
                            g.currItemId = album.data('start-item');
                            blockLink = g._by3;
                            g._by3 = g._kp2;
                            g._kp2 = g._mn2;
                            g._mn2 = blockLink;
                            newPos = g._mn3 * g.sliderHeight;
                            g._jq = c;
                            g._fu8(g._mn2, album.data('bg'), g.currAlbumId);
                            g._mn2.find('.play-button-container').remove();
                            g._mn2.find('img').css('visibility', 'hidden');
                            g._by8(newPos, 'next', 'y', true, e)
                        } else if (i < g.currAlbumId) {
                            g._mn3 = g._kp3 + 1;
                            g._dw8(i, 0);
                            album = g._ev8(g.currAlbumId);
                            g.currItemId = album.data('start-item');
                            blockLink = g._mn2;
                            g._mn2 = g._kp2;
                            g._kp2 = g._by3;
                            g._by3 = blockLink;
                            newPos = g._mn3 * g.sliderHeight;
                            g._jq = c;
                            g._fu8(g._mn2, album.data('bg'), g.currAlbumId);
                            g._mn2.find('.play-button-container').remove();
                            g._mn2.find('img').css('visibility', 'hidden');
                            g._by8(newPos, 'prev', 'y', true, e)
                        }
                    }
                }
            }
            g._gt8(b)
        },
        next: function () {
            var a = this;
            if (!a._ir2) {
                a._ir2 = true;
                if (a.currItemId + 1 >= a.currAlbumNumItems && a.currAlbumId < a.numAlbums - 1) {
                    a._cx6('next', 'y', this.settings.transitionSpeed, true, true)
                } else {
                    a._cx6('next', 'x', this.settings.transitionSpeed, true, true)
                }
                a._ir2 = false
            }
        },
        prev: function () {
            var a = this;
            if (!a._ir2) {
                a._ir2 = true;
                if (!a._dw && a.currItemId - 1 < 0 && a.currAlbumId != 0) {
                    a._cx6('prev', 'y', this.settings.transitionSpeed, true, true)
                } else {
                    a._cx6('prev', 'x', this.settings.transitionSpeed, true, true)
                }
                a._ir2 = false
            }
        },
        nextItem: function () {
            this._cx6('next', 'x', this.settings.transitionSpeed, true, true)
        },
        prevItem: function () {
            this._cx6('prev', 'x', this.settings.transitionSpeed, true, true)
        },
        nextAlbum: function () {
            this._cx6('next', 'y', this.settings.transitionSpeed, true, true)
        },
        prevAlbum: function () {
            this._cx6('prev', 'y', this.settings.transitionSpeed, true, true)
        },
        _fu8: function (a, b, c) {
            if (a.data('bg-album-id') !== c) {
                a.data('bg-album-id', c);
                a.css('background', b)
            }
        },
        _dw6: function (e) {
            var a = this;
            if (a._az1) {
                e.preventDefault();
                return false
            }
            if (a._by1) {
                if (a.hasTouch) {
                    a._cx1 = true
                }
                return
            } else {
                if (a.hasTouch) {
                    a._cx1 = false
                }
            }
            if (a._ev1) {
                a._jq2.css((a.browserSufix + 'transition-duration'), '0s')
            }
            a._hs8();
            a._by1 = true;
            var b;
            if (a.hasTouch) {
                var c = e.originalEvent.touches;
                if (c && c.length > 0) {
                    b = c[0];
                    if (c.length > 1) {
                        a._cx1 = true
                    }
                } else {
                    return false
                }
            } else {
                b = e;
                e.preventDefault()
            }
            $(document).bind(a._ir1, function (e) {
                a._ir8(e)
            });
            $(document).bind(a._jq1, function (e) {
                a._ev6(e)
            });
            a._kp = false;
            a._lo = '';
            a.moved = false;
            a.pointX = a._hs = a.startX = b.pageX;
            a.pointY = a._ir = a.startY = b.pageY;
            a.changedX = 0;
            a.changedY = 0;
            a.horDirection = 0;
            a.verDirection = 0;
            a.directionLocked = false;
            a._fu = (e.timeStamp || (new Date().getTime()));
            a._gt = 0;
            if (a.hasTouch) {
                a._cx.bind(a._kp1, function (e) {
                    a._ev6(e)
                })
            }
        },
        _ir8: function (e) {
            var a = this,
                point;
            if (a.hasTouch) {
                var b = e.originalEvent.touches;
                if (b) {
                    if (b.length > 1) {
                        return false
                    } else {
                        point = b[0]
                    }
                } else {
                    return false
                }
                e.preventDefault()
            } else {
                point = e;
                e.preventDefault()
            }
            var c = (e.timeStamp || (new Date().getTime())),
                deltaX = point.pageX - a.pointX,
                deltaY = point.pageY - a.pointY;
            a.changedX += Math.abs(deltaX);
            a.changedY += Math.abs(deltaY);
            if (a.changedY < 10 && a.changedX < 7) {
                return
            }
            var d = a.x + deltaX,
                newY = a.y + deltaY;
            a.moved = true;
            a.pointX = point.pageX;
            a.pointY = point.pageY;
            var f = a._lo;
            if (f === 'x') {
                if (deltaX !== 0) {
                    a.horDirection = deltaX > 0 ? 1 : -1
                }
            } else if (f === 'y') {
                if (deltaY !== 0) {
                    a.verDirection = deltaY > 0 ? 1 : -1
                }
            } else {
                if (a.changedY > a.changedX) {
                    a._kp = true;
                    a._lo = 'y';
                    a.verDirection = deltaY > 0 ? 1 : -1
                } else {
                    a._lo = 'x';
                    a.horDirection = deltaX > 0 ? 1 : -1
                }
            }
            if (a._kp) {
                if (!a._ev) {
                    if (a.currAlbumId <= 0) {
                        if (point.pageY - this.startY > 0) {
                            newY = a.y + deltaY * a._az4
                        }
                    }
                    if (a.currAlbumId >= a.numAlbums - 1) {
                        if (point.pageY - this.startY < 0) {
                            newY = a.y + deltaY * a._az4
                        }
                    }
                }
                a._jq8(newY, 'y');
                if (c - a._fu > 200) {
                    a._fu = c;
                    a._ir = point.pageY
                }
            } else {
                if (!a._dw) {
                    if (a.currItemId <= 0) {
                        if (point.pageX - this.startX > 0) {
                            d = a.x + deltaX * a._az4
                        }
                    }
                    if (a.currItemId >= a.currAlbumNumItems - 1) {
                        if (point.pageX - this.startX < 0) {
                            d = a.x + deltaX * a._az4
                        }
                    }
                }
                a._jq8(d, 'x');
                if (c - a._fu > 200) {
                    a._fu = c;
                    a._hs = point.pageX
                }
            }
            return false
        },
        _ev6: function (e) {
            var d = this,
                point = d.hasTouch ? e.originalEvent.changedTouches[0] : e,
                totalMovePos, totalMoveDist, accDist, duration, v0, newPos, newDist, newDuration, blockLink;
            d._by1 = false;
            $(document).unbind(d._ir1);
            $(document).unbind(d._jq1);
            if (d.hasTouch) {
                d._cx.unbind(d._kp1)
            }
            d._by2();
            if (!d.moved && !d._cx1) {
                if (d._ir4) {
                    d._cx8();
                    return
                }
                if (d.hasTouch) {
                    if (d._ir3) {
                        d._jq6()
                    } else {
                        d._kp6()
                    }
                    return
                } else {
                    if (!$(e.target).hasClass('play-button-icon')) {
                        d.next()
                    }
                    return
                }
            }
            duration = Math.max(30, (e.timeStamp || (new Date().getTime()))) - d._fu;

            function getCorrectSpeed(a) {
                if (a < 200) {
                    return 200
                } else if (a > 500) {
                    return 500
                }
                return a
            }
            function returnToCurrent(a, b, c) {
                if (a === 'x') {
                    newPos = d._jq3 * d.sliderWidth
                } else {
                    newPos = d._kp3 * d.sliderHeight
                }
                newDist = Math.abs(d[a] - newPos);
                d._jq = newDist / c;
                if (b) {
                    d._jq += 250
                }
                d._jq = getCorrectSpeed(d._jq);
                d._by8(newPos, false, a)
            }
            var f = 0;
            if (d._kp) {
                var g = 'y',
                    pPos = point.pageY,
                    sPos = d.startY,
                    axPos = d._ir,
                    axCurrItem = d.currAlbumId,
                    axNumItems = d.numAlbums,
                    dir = d.verDirection,
                    sliderSize = d.sliderHeight,
                    axMainItemId = d._kp3,
                    loop = d._ev,
                    changeHash = true,
                    distOffset = 50
            } else {
                var g = 'x',
                    pPos = point.pageX,
                    sPos = d.startX,
                    axPos = d._hs,
                    axCurrItem = d.currItemId,
                    axNumItems = d.currAlbumNumItems,
                    dir = d.horDirection,
                    sliderSize = d.sliderWidth,
                    axMainItemId = d._jq3,
                    loop = d._dw,
                    changeHash = false,
                    distOffset = 0
            }
            totalMovePos = pPos - sPos;
            totalMoveDist = Math.abs(totalMovePos);
            accDist = pPos - axPos;
            v0 = (Math.abs(accDist)) / duration;
            if (dir === 0 || axNumItems <= 1) {
                returnToCurrent(g, true, v0);
                return false
            }
            if (!loop) {
                if (axCurrItem <= 0) {
                    if (dir > 0) {
                        returnToCurrent(g, true, v0);
                        return false
                    }
                } else if (axCurrItem >= axNumItems - 1) {
                    if (dir < 0) {
                        returnToCurrent(g, true, v0);
                        return false
                    }
                }
            }
            if (sPos + f < pPos) {
                if (dir < 0) {
                    returnToCurrent(g, false, v0);
                    return false
                }
                d._cx6('prev', g, getCorrectSpeed(Math.abs(d[g] - (axMainItemId + 1) * sliderSize) / v0), changeHash)
            } else if (sPos - f > pPos) {
                if (dir > 0) {
                    returnToCurrent(g, false, v0);
                    return false
                }
                d._cx6('next', g, getCorrectSpeed(Math.abs(d[g] - (axMainItemId - 1) * sliderSize) / v0), changeHash)
            } else {
                returnToCurrent(g, false, v0)
            }
            return false
        },
        _kp8: function (a, b, c, d) {
            var e = this,
                item, album = e._ev8(c);
            if (d === 'start-item') {
                d = album.data('start-item')
            }
            item = e._lo8(c, d);
            if (!item) {
                b.addClass('last-block')
            } else {
                if (b.hasClass('last-block')) {
                    b.removeClass('last-block')
                }
                var f = item.data('img-scale');
                if (!f) {
                    f = album.data('img-scale');
                    item.data('img-scale', f)
                }
                a.push({
                    block: b,
                    item: item,
                    bgColor: album.data('bg'),
                    albumId: c
                })
            }
        },
        _by8: function (b, c, d, e, f, g) {
            var h = this,
                moveProp;
            h.onTransitionStart.call(h);
            h._az1 = true;
            h[d] = b;
            if (d === 'x') {
                moveProp = h._cx4
            } else {
                moveProp = h._by4
            }
            function animationComplete() {
                var a, loadArr = [],
                    album;
                if (c) {
                    if (d === 'x') {
                        h._kp8(loadArr, h._mn2, h.currAlbumId, h.currItemId);
                        h._jq3 = h._lo3;
                        if (c === 'next') {
                            h._az3.css('left', (-h._jq3 * 100 + 100) + '%');
                            h._kp8(loadArr, h._az3, h.currAlbumId, h.currItemId + 1)
                        } else if (c === 'prev') {
                            h._lo2.css('left', (-h._jq3 * 100 - 100) + '%');
                            h._kp8(loadArr, h._lo2, h.currAlbumId, h.currItemId - 1)
                        }
                        h._kp2.css('left', (-h._jq3 * 100) + '%');
                        h._by3.css('left', (-h._jq3 * 100) + '%');
                        album = h._ev8(h.currAlbumId);
                        album.data('start-item', h.currItemId);
                        h._kp8(loadArr, h._by3, h.currAlbumId + 1, 'start-item');
                        h._kp8(loadArr, h._kp2, h.currAlbumId - 1, 'start-item')
                    } else {
                        album = h._ev8(h.currAlbumId);
                        h.currItemId = album.data('start-item');
                        h._kp8(loadArr, h._mn2, h.currAlbumId, h.currItemId);
                        h._kp8(loadArr, h._az3, h.currAlbumId, h.currItemId + 1);
                        h._kp3 = h._mn3;
                        if (c === 'next') {
                            h._by3.css('top', (-h._kp3 * 100 + 100) + '%');
                            h._kp8(loadArr, h._by3, h.currAlbumId + 1, 'start-item');
                            if (e) {
                                h._kp8(loadArr, h._kp2, h.currAlbumId - 1, 'start-item')
                            }
                        } else {
                            h._kp2.css('top', (-h._kp3 * 100 - 100) + '%');
                            h._kp8(loadArr, h._kp2, h.currAlbumId - 1, 'start-item');
                            if (e) {
                                h._kp8(loadArr, h._by3, h.currAlbumId + 1, 'start-item')
                            }
                        }
                        h._lo2.css('top', (-h._kp3 * 100) + '%');
                        h._az3.css('top', (-h._kp3 * 100) + '%');
                        h._kp8(loadArr, h._lo2, h.currAlbumId, h.currItemId - 1)
                    }
                    h._mn8(loadArr)
                }
                if (h._gt3) {
                    h._kp7()
                }
                setTimeout(function () {
                    h._az1 = false;
                    h.onTransitionComplete.call(h);
                    if (h._gt3) {
                        h._by2()
                    }
                    if (h.settings.autoOpenDescription && h.sliderWidth > 900) {
                        if (!h._mn) {
                            if (h.currItemId === 0 && !h.albumsArr[h.currAlbumId].data('sawInfo')) {
                                h._mn6();
                                h.albumsArr[h.currAlbumId].data('sawInfo', true)
                            } else {
                                h._byn1(h._mn4)
                            }
                        }
                    } else {
                        h._byn1(h._mn4)
                    }
                }, 30)
            }
            var i = {};
            if (isNaN(h._jq)) {
                h._jq = 400
            }
            if (!h._ev1) {
                i[moveProp] = b;
                h._jq2.animate(i, h._jq, f ? h.settings.easeInOutEasing : 'easeOutSine')
            } else {
                i[(h.browserSufix + 'transition-duration')] = h._jq + 'ms';
                i[(h.browserSufix + 'transition-property')] = (h.browserSufix + 'transform');
                i[(h.browserSufix + 'transition-timing-function')] = ((f != undefined) ? h.settings.css3easeInOutEasing : 'cubic-bezier(0.390, 0.575, 0.565, 1.000)');
                h._jq2.css(i);
                h._jq2.css(moveProp, h._dw4 + h.x + h._ev4 + h.y + h._fu4)
            }
            if (g) {
                h.loadingTimeout = setTimeout(function () {
                    g.call()
                }, h._jq + 50)
            } else {
                h.loadingTimeout = setTimeout(function () {
                    animationComplete()
                }, h._jq + 50)
            }
        },
        _jq8: function (a, b) {
            var c = this;
            if (c._ev1) {
                if (b === 'y') {
                    c.y = a;
                    c._jq2.css(c._by4, c._dw4 + c.x + c._ev4 + c.y + c._fu4)
                } else {
                    c.x = a;
                    c._jq2.css(c._cx4, c._dw4 + c.x + c._ev4 + c.y + c._fu4)
                }
            } else {
                if (b === 'y') {
                    c.y = a;
                    c._jq2.css(c._by4, c.y)
                } else {
                    c.x = a;
                    c._jq2.css(c._cx4, c.x)
                }
            }
        },
        updateSliderSize: function () {
            var a = this,
                winWidth = window.innerWidth || document.body.clientWidth,
                winHeight = window.innerHeight || document.body.clientHeight,
                wrapWidth = a._cx.width(),
                wrapHeight = a._cx.height();
            if (wrapWidth != a.sliderWidth || wrapHeight != a.sliderHeight) {
                a.sliderWidth = wrapWidth;
                a.sliderHeight = wrapHeight;
                a._az8 = 1;
                a._evn4 = 1;
                if (a.sliderWidth < 600) {
                    a._mn = true;
                    a.sliderRoot.addClass('smaller-collapsed-slider')
                } else {
                    a._mn = false;
                    a.sliderRoot.removeClass('smaller-collapsed-slider')
                }
                if (winWidth >= 850) {
                    a._hs3 = '2';
                    if (!a._ir3) {
                        a._kp6()
                    }
                } else if (winWidth < 850) {
                    if (winWidth > 700) {
                        a._hs3 = '1'
                    } else {
                        a._hs3 = '0'
                    }
                }
                if (a._ev1) {
                    a._jq2.css((a.browserSufix + 'transition-duration'), '0s')
                }
                var b = [a._mn2, a._lo2, a._az3, a._by3, a._kp2];
                var c;
                var d;
                for (var i = 0; i < b.length; i++) {
                    c = b[i].find('img');
                    if (c) {
                        a._fun5(c, c.data('img-width'), c.data('img-height'))
                    }
                }
                a._jq8(a._jq3 * a.sliderWidth, 'x');
                a._jq8(a._kp3 * a.sliderHeight, 'y');
                if (a.isVideoPlaying) {
                    var e = a.videoContainer.find('.video-player'),
                        sizeObj = a._fun5('', a.settings.maxVideoWidth, a.settings.maxVideoHeight, true);
                    e.css({
                        'margin-left': sizeObj.left,
                        'margin-top': sizeObj.top,
                        'width': sizeObj.width,
                        'height': sizeObj.height
                    });
                    e.removeAttr('width')
                }
            }
        },
        updateContents: function () {
            var a = this,
                currItem = a.currAlbumItems.eq(a.currItemId),
                loadArr = [];
            a._kp8(loadArr, a._mn2, a.currAlbumId, a.currItemId);
            a._kp8(loadArr, a._az3, a.currAlbumId, a.currItemId + 1);
            a._kp8(loadArr, a._lo2, a.currAlbumId, a.currItemId - 1);
            a._kp8(loadArr, a._by3, a.currAlbumId + 1, 0);
            a._kp8(loadArr, a._kp2, a.currAlbumId - 1, 0);
            a._mn8(loadArr);
            var b = a._ev8(a.currAlbumId);
            b.data('start-item', a.currItemId);
            a._gt8()
        },
        _lo8: function (a, b) {
            var c = this,
                item;
            if (a < 0) {
                if (!c._ev) {
                    return false
                }
                a = c.numAlbums - 1
            } else if (a >= this.numAlbums) {
                if (!c._ev) {
                    return false
                }
                a = 0
            }
            var d = this.albumsArr[a];
            if (d) {
                var e = d.find('.two-dim-item');
                if (e) {
                    var f = e.length;
                    if (f <= 0) {
                        return 0
                    }
                    if (b < 0) {
                        if (!c._dw) {
                            return false
                        }
                        b = f - 1
                    } else if (b >= f) {
                        if (!c._dw) {
                            return false
                        }
                        b = 0
                    }
                    item = e.eq(b)
                }
                item.find('img').data('img-scale', d.data('img-scale'))
            }
            return item
        },
        _dw8: function (a, b) {
            var c = this;
            c._dw3 = c.currAlbumId;
            c._ev3 = c.currAlbumNumItems;
            c._fu3 = c.currItemId;
            if (a < 0) {
                a = c.numAlbums - 1
            } else if (a >= c.numAlbums) {
                a = 0
            }
            c.currAlbumId = a;
            var d = c.albumsArr[a];
            if (d) {
                var e = d.find('.two-dim-item');
                if (e) {
                    var f = e.length;
                    if (f <= 0) {
                        return 0
                    }
                    c.currAlbumNumItems = f;
                    if (b < 0) {
                        b = f - 1
                    } else if (b >= f) {
                        b = 0
                    }
                }
                c.currItemId = b
            } else {
                alert('Album is empty:' + a + ' id:' + b)
            }
        },
        _gt8: function (a) {
            var b = this;

            function updateCurrImage() {
                b._cx5.text('' + (b.currItemId + 1) + ' of ' + b.currAlbumNumItems)
            }
            if (a === 'y') {
                if (b.numAlbums > 1) {
                    if (b.currAlbumId >= 0) {
                        if (b.settings.appendGalleriesToMenu) {
                            b._by6.removeClass('current-album-menu-item');
                            b._by6.eq(b.currAlbumId).addClass('current-album-menu-item')
                        }
                        if (!b._mn) {
                            b._az7(b._mn4)
                        }
                        setTimeout(function () {
                            b._cx5.text('' + (b.currItemId + 1) + ' of ' + b.currAlbumNumItems);
                            b._by5.text(b.albumsArr[b.currAlbumId].find('.album-title').text())
                        }, 400);
                        b._gtn6();
                        b._cxn2()
                    }
                }
            } else if (a === 'x') {
                updateCurrImage();
                b._cxn2()
            } else {
                if (b._by6) {
                    var c = b._by6.eq(b.currAlbumId);
                    c.addClass('current-album-menu-item')
                }
                b._gtn6();
                b._by5.text(b.albumsArr[b.currAlbumId].find('.album-title').text());
                updateCurrImage();
                b._cxn2()
            }
        },
        _cxn2: function () {
            var a = this;
            if (a._cx2) {
                if (a._jq5.hasClass('disabled-arrow')) {
                    a._jq5.removeClass('disabled-arrow')
                }
                if (a._kp5.hasClass('disabled-arrow')) {
                    a._kp5.removeClass('disabled-arrow')
                }
                if (a.currItemId <= 0) {
                    if (a.currAlbumId > 0) {
                        if (!a._jq5.hasClass('prev-album-arrow')) {
                            a._jq5.addClass('prev-album-arrow').find('.info-text').addClass('info-text-visible')
                        }
                    } else {
                        if (a._gt2 && a._fu2.find('a[rel=next]').attr('href')) {
                            a._jq5.addClass('prev-album-arrow').find('.info-text').addClass('info-text-visible')
                        } else {
                            a._jq5.addClass('disabled-arrow').find('.info-text').removeClass('info-text-visible')
                        }
                    }
                } else {
                    if (a._jq5.hasClass('prev-album-arrow')) {
                        a._jq5.removeClass('prev-album-arrow').find('.info-text').removeClass('info-text-visible')
                    }
                }
                if (a.currItemId >= a.currAlbumNumItems - 1) {
                    if (a.currAlbumId < a.numAlbums - 1) {
                        if (!a._kp5.hasClass('next-album-arrow')) {
                            a._kp5.addClass('next-album-arrow').find('.info-text').addClass('info-text-visible')
                        }
                    } else {
                        if (a._gt2 && a._fu2.find('a[rel=prev]').attr('href')) {
                            a._kp5.addClass('next-album-arrow').find('.info-text').addClass('info-text-visible')
                        } else {
                            a._kp5.addClass('disabled-arrow').find('.info-text').removeClass('info-text-visible')
                        }
                    }
                } else {
                    if (a._kp5.hasClass('next-album-arrow')) {
                        a._kp5.removeClass('next-album-arrow').find('.info-text').removeClass('info-text-visible')
                    }
                }
            }
        },
        _gtn6: function () {},
        _ev8: function (a) {
            if (a < 0) {
                a = this.numAlbums - 1
            } else if (a >= this.numAlbums) {
                a = 0
            }
            return this.albumsArr[a]
        },
        _mn8: function (a) {
            var b = this;
            if (a) {
                var c, img, newImgSrc, currBlock, hasVideo, newData;
                for (var i = 0; i < a.length; i++) {
                    c = a[i];
                    currBlock = c.block;
                    newData = c.item.data();
                    if (c.item) {
                        img = currBlock.find('img');
                        hasVideo = Boolean(newData.videoUrl !== undefined);
                        if (!hasVideo) {
                            currBlock.find('.play-button-container').remove()
                        }
                        newImgSrc = c.item.find('a').attr('href');
                        if (img.attr('src') !== newImgSrc) {
                            img.css('visibility', 'hidden')
                        } else {
                            if (!c.block.hasClass('loading')) {
                                img.css('visibility', 'visible')
                            }
                        }
                        b._fu8(currBlock, c.bgColor, c.albumId)
                    } else {
                        a.splice(i, 1);
                        i--
                    }
                }
                b.isLoading = true
            }
            b.loadQueue = a;
            b._hsn7()
        },
        _irn8: function (b) {
            var c = this;
            return function () {
                var a = b.img,
                    clickedItemData = b.loadDataItem.item.data(),
                    blockInside = b.block.find('.block-inside'),
                    hasVideo = Boolean(clickedItemData.videoUrl !== undefined);
                if (!a.data('blocked-by-loop')) {
                    a.css({
                        visibility: 'visible'
                    })
                }
                if (hasVideo) {
                    if (!blockInside.find('.play-button-container').length > 0) {
                        blockInside.append('<a class="play-button-container"><span class="play-button"><i class="play-icons-wrap"><u class="play-button-icon"></u><u class="play-video-loading-icon"></u></i></snan></a>');
                        blockInside.find('.play-button-container').bind('click', function (e) {
                            if (!c.moved) {
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                c._ir3 = true;
                                c._jqn9(b, blockInside)
                            } else {
                                return false
                            }
                        })
                    }
                } else {
                    if (blockInside.find('.play-button-container').length > 0) {
                        blockInside.find('img').css('cursor', 'inherit').unbind('click');
                        blockInside.find('.play-button-container').unbind('click');
                        blockInside.find('.play-button-container').remove()
                    }
                }
                b.block.removeClass('loading');
                b.block.find('.preloader-container').remove();
                a.unbind('error.tds');
                a.unbind('load.tds');
                if (!c.firstLoaded && c.settings.firstImageLoadedCallback) {
                    c.settings.firstImageLoadedCallback.call(c);
                    c.firstLoaded = true
                }
                if (c.loadQueue.length > 1) {
                    c.loadQueue.shift();
                    c._hsn7()
                } else {
                    c.isLoading = false
                }
            }
        },
        _hsn7: function () {
            var a = this;
            var b = a.loadQueue[0];
            if (!b) {
                return
            }
            var c = b.item;
            if (c) {
                var d = b.block,
                    currImg = d.find('img').eq(0),
                    path = c.find('a').attr('href'),
                    bWidth = c.attr('data-img-width'),
                    bHeight = c.attr('data-img-height');
                if (currImg.length <= 0) {
                    hasImage = false;
                    currImg = $('<img />');
                    currBlockPath = ''
                } else {
                    hasImage = true;
                    currBlockPath = currImg.attr('src')
                }
                currImg.data({
                    'img-width': bWidth,
                    'img-height': bHeight,
                    'img-scale': c.data('img-scale')
                });
                if (currBlockPath === path) {
                    if (!d.hasClass('loading')) {
                        if (a.loadQueue.length > 1) {
                            a.loadQueue.shift();
                            a._hsn7()
                        } else {
                            a.isLoading = false
                        }
                    }
                    return
                }
                if (!a.imageLoader || a.imageLoader.attr('src') != path) {
                    d.addClass('loading');
                    d.append('<div class="preloader-container"><div class="preloader-spinner"></div></div>');
                    currImg.css('visibility', 'hidden').bind('load.tds', a._irn8({
                        type: 'loaded',
                        loadDataItem: b,
                        block: d,
                        img: currImg
                    })).bind('error.tds', a._irn8({
                        type: 'error',
                        loadDataItem: b,
                        block: d,
                        img: currImg
                    })).attr({
                        'src': path,
                        'alt': c.find('a').text()
                    });
                    if (!hasImage) {
                        currImg.appendTo(d.find('.block-inside'))
                    }
                    a._fun5(currImg, bWidth, bHeight)
                } else {
                    a._fun5(currImg, bWidth, bHeight);
                    a._irn8({
                        type: 'loaded',
                        item: c,
                        block: d
                    })
                }
            }
        },
        _fun5: function (a, b, c, d) {
            var e = this;
            imgScaleMode = !d ? a.data('img-scale') : 'fit-if-smaller';
            if (!d) {
                b = parseInt(b, 10);
                c = parseInt(c, 10)
            }
            if (!d) {
                var f;
                if (imgScaleMode !== 'fill') {
                    f = e._hs3 + 'em'
                } else {
                    f = '0'
                }
                var g = a.parent('.block-inside').css('margin', f);
                e.imgWrapWidth = g.width();
                e.imgWrapHeight = g.height()
            } else {
                e.imgWrapWidth = e.videoContainer.width();
                e.imgWrapHeight = e.videoContainer.height()
            }
            var h = 0,
                containerWidth = e.imgWrapWidth,
                containerHeight = e.imgWrapHeight,
                imgAlignCenter = true,
                hRatio, vRatio, ratio, nWidth, nHeight;
            if (imgScaleMode === 'fit-if-smaller') {
                if (b > containerWidth || c > containerHeight) {
                    imgScaleMode = 'fit'
                }
            }
            if (imgScaleMode === 'fill' || imgScaleMode === 'fit') {
                hRatio = containerWidth / b;
                vRatio = containerHeight / c;
                if (imgScaleMode == "fill") {
                    ratio = hRatio > vRatio ? hRatio : vRatio
                } else if (imgScaleMode == "fit") {
                    ratio = hRatio < vRatio ? hRatio : vRatio
                } else {
                    ratio = 1
                }
                nWidth = parseInt(b * ratio, 10);
                nHeight = parseInt(c * ratio, 10)
            } else {
                nWidth = b;
                nHeight = c
            }
            if (imgAlignCenter) {
                if (a) {
                    a.css({
                        'margin-left': Math.floor((containerWidth - nWidth) / 2),
                        'margin-top': Math.floor((containerHeight - nHeight) / 2),
                        'width': nWidth,
                        'height': nHeight
                    })
                } else {
                    return {
                        width: nWidth,
                        height: nHeight,
                        left: Math.floor((containerWidth - nWidth) / 2),
                        top: Math.floor((containerHeight - nHeight) / 2)
                    }
                }
            } else {
                if (a) {
                    a.css({
                        'width': nWidth,
                        'height': nHeight
                    })
                } else {
                    return {
                        width: nWidth,
                        height: nHeight,
                        left: 0,
                        top: 0
                    }
                }
            }
        },
        _by2: function () {
            if (!this.hasTouch) {
                if (this._mn1) {
                    this._cx.css('cursor', this._mn1)
                } else {
                    this._cx.removeClass('grabbing-cursor');
                    this._cx.addClass('grab-cursor')
                }
            }
        },
        _hs8: function () {
            if (!this.hasTouch) {
                if (this._az2) {
                    this._cx.css('cursor', this._az2)
                } else {
                    this._cx.removeClass('grab-cursor');
                    this._cx.addClass('grabbing-cursor')
                }
            }
        },
        _jqn9: function (a, b) {
            var c = this;
            if (c.isVideoPlaying) {
                return false
            }
            var d = a.loadDataItem.item.data();
            if (d.videoUrl !== undefined) {
                var e = d.videoUrl,
                    videoId;
                if (e.match(/youtu\.be/i) || e.match(/youtube\.com\/watch/i)) {
                    videoId = c._kpn10(e);
                    if (videoId) {
                        c.isVideoPlaying = true;
                        e = 'http://www.youtube.com/embed/' + videoId + '?rel=1';
                        if (c.settings.autoplayVideo) {
                            e += "&autoplay=1&showinfo=0"
                        }
                        b.find('.play-button').addClass('play-button-loading');
                        c._byn1Video(a.loadDataItem.block);
                        var f = $('<iframe class="video-player" src ="' + e + '" frameborder="no"></iframe>');
                        c.videoOverlay.css('display', 'block');
                        var g = c._fun5('', c.settings.maxVideoWidth, c.settings.maxVideoHeight, true);
                        f.css({
                            'margin-left': g.left,
                            'margin-top': g.top,
                            'width': g.width,
                            'height': g.height
                        });
                        c._hs2.removeClass('hidden-video');
                        c.videoContainer.append(f)
                    } else {
                        alert('Incorrect YouTube URL syntax')
                    }
                } else if (e.match(/vimeo\.com/i)) {
                    videoId = c._mnn12(e);
                    c.isVideoPlaying = true;
                    e = 'http://player.vimeo.com/video/' + videoId + '?title=0&amp;byline=0&amp;portrait=0';
                    if (c.settings.autoplayVideo) e += "&autoplay=1";
                    b.find('.play-button').addClass('play-button-loading');
                    c._byn1Video(a.loadDataItem.block);
                    var f = $('<iframe class="video-player" src ="' + e + '" frameborder="no"></iframe>');
                    c.videoOverlay.css('display', 'block');
                    var g = c._fun5('', c.settings.maxVideoWidth, c.settings.maxVideoHeight, true);
                    f.css({
                        'margin-left': g.left,
                        'margin-top': g.top,
                        'width': g.width,
                        'height': g.height
                    });
                    c._hs2.removeClass('hidden-video');
                    c.videoContainer.append(f)
                } else {
                    alert('Incorrect video URL: ' + e)
                }
            }
        },
        stopAndCloseVideo: function () {
            var a = this;
            a._hs2.addClass('hidden-video');
            a.videoOverlay.css('display', 'none');
            a.videoContainer.find('iframe').remove();
            var b = a._mn2.find('img');
            if (b.length > 0) {
                b.animate({
                    'opacity': 1
                }, 400, 'easeOutSine')
            }
            a._mn2.find('.play-button-loading').removeClass('play-button-loading');
            a.isVideoPlaying = false;
            a._kp6()
        },
        _byn1Video: function (a) {
            var b = this;
            if (b._ir4) {
                b._ev5()
            }
            var c = a.find('img');
            if (c.length > 0) {
                c.animate({
                    'opacity': 0
                }, 400, 'easeOutSine')
            }
            b._jq6()
        },
        _kp6: function () {
            var a = this;
            if (!a._ir3) {
                a._byn1(a._kp4);
                a._ir3 = true;
                a._byn1(a._hs4)
            }
        },
        _jq6: function () {
            var a = this;
            if (a._ir3) {
                if (a._ir4) {
                    a._ev5()
                }
                if (a._kp4.hasClass('collapsed-gallery-page-menu')) {
                    a._az7(a._kp4)
                }
                a._az7(a._hs4);
                a._ir3 = false
            }
        },
        _az7: function (a, b) {
            setTimeout(function () {
                a.stop().animate({
                    opacity: 0
                }, 300, function () {
                    a.css('display', 'none');
                    if (b) {
                        b.call()
                    }
                })
            }, 0)
        },
        _byn1: function (a, b) {
            a.stop().css('display', 'block');
            setTimeout(function () {
                a.animate({
                    opacity: 1
                }, 300, function () {
                    if (b) {
                        b.call()
                    }
                })
            }, 0)
        },
        _mnn12: function (a) {
            var b = /\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
            var c = a.match(b);
            if (c) {
                return c[2]
            } else {
                return false
            }
        },
        _kpn10: function (a) {
            var b = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var c = a.match(b);
            if (c && c[7].length == 11) {
                return c[7]
            } else {
                return false
            }
        },
        _mn6: function () {
            var b = this,
                albumBlock;
            if (!b._ir4) {
                if (b._dw5.data('curr-album-id') !== b.currAlbumId) {
                    var c = b.albumsArr[b.currAlbumId].find('.album-meta');
                    var d = '<div class="info-container">' + c.html();
                    var f = c.find('.album-title a');
                    var g = f.attr('href');
                    f = f.html();
                    var h = b._lo8(b.currAlbumId, 0).find('a').attr('href');
                    d += '<div class="bottom-bar clearfix"><div class="share-project">';
                    d += '<a href="http://pinterest.com/pin/create/button/?url=' + g + '&media=' + h + '&description=' + f + '" class="pin-it-btn"></a>';
                    d += '<a class="facebook-share-btn" href="http://www.facebook.com/sharer/sharer.php?u=' + g + '">';
                    d += '</a>';
                    d += '<a href="javascript:void(0);" class="close-project">' + b._by.closeProjectInfo + '</a>';
                    d += '</div>';
                    d += '</div>';
                    b._dw5.html(d);
                    var i = b._dw5.find('.album-title a');
                    i.replaceWith(i.text());
                    var j = b._dw5.find('.close-project');
                    j.bind('click', function (e) {
                        e.preventDefault();
                        b._cx8()
                    });
                    b._dw5.find('.pin-it-btn, .facebook-share-btn').click(function (e) {
                        e.preventDefault();
                        var a = window.open($(this).attr('href'), 'signin', 'width=665,height=300')
                    });
                    if (typeof (FB) != 'undefined' && FB != null) {
                        FB.XFBML.parse(b._dw5.get(0))
                    }
                    b._dw5.data('curr-album-id', b.currAlbumId)
                }
                b._byn1(b._dw5);
                b._az7(b._mn4);
                b._ir4 = true
            }
        },
        _cx8: function () {
            var a = this;
            if (a._ir4) {
                a._cx3 = true;
                a._az7(a._dw5, function () {
                    a._cx3 = false
                });
                a._byn1(a._mn4);
                a._ir4 = false
            }
        },
        _ev5: function () {
            var a = this,
                albumBlock;
            if (a._ir4) {
                a._cx8()
            } else {
                a._mn6()
            }
        },
        _by1n14: function () {
            var a = this,
                winWidth = window.innerWidth || document.body.clientWidth;
            if (a._cx1n15) {
                a._dw1n16 = true;
                if (winWidth > 600) {
                    a._kp4.css('width', '50%')
                } else {
                    a._kp4.css('width', '100%')
                }
            }
        },
        _ev2: function () {
            var a = window.location.href.split('?')[1];
            if (!a) {
                return {}
            }
            var b = a.split('&');
            var c = {};
            for (var i = 0, len = b.length; i < len; i++) {
                var d = b[i].split('=');
                c[d[0]] = d[1]
            }
            return c
        }
    };
    $.fn.twoDimSlider = function (b) {
        return this.each(function () {
            var a = new TwoDimSlider($(this), b);
            $(this).data('twoDimSlider', a)
        })
    };
    $.fn.twoDimSlider.defaults = {
        keyboardNavEnabled: true,
        transitionSpeed: 600,
        autoplayVideo: true,
        maxVideoWidth: 800,
        maxVideoHeight: 600,
        openInfoBlockAtStart: false,
        disableContextMenu: false,
        easeInOutEasing: 'easeInOutSine',
        css3easeInOutEasing: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
        firstImageLoadedCallback: false,
        appendGalleriesToMenu: false,
        autoOpenDescription: Boolean(tdSliderVars.autoOpenProjectDesc)
    };
    $.fn.twoDimSlider.settings = {}
})(jQuery);


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */ (function ($) {
    var c = ['DOMMouseScroll', 'mousewheel'];
    if ($.event.fixHooks) {
        for (var i = c.length; i;) {
            $.event.fixHooks[c[--i]] = $.event.mouseHooks
        }
    }
    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = c.length; i;) {
                    this.addEventListener(c[--i], handler, false)
                }
            } else {
                this.onmousewheel = handler
            }
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var i = c.length; i;) {
                    this.removeEventListener(c[--i], handler, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    $.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    });

    function handler(a) {
        var b = a || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            returnValue = true,
            deltaX = 0,
            deltaY = 0;
        a = $.event.fix(b);
        a.type = "mousewheel";
        if (b.wheelDelta) {
            delta = b.wheelDelta / 120
        }
        if (b.detail) {
            delta = -b.detail / 3
        }
        deltaY = delta;
        if (b.axis !== undefined && b.axis === b.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta
        }
        if (b.wheelDeltaY !== undefined) {
            deltaY = b.wheelDeltaY / 120
        }
        if (b.wheelDeltaX !== undefined) {
            deltaX = -1 * b.wheelDeltaX / 120
        }
        args.unshift(a, delta, deltaX, deltaY);
        return ($.event.dispatch || $.event.handle).apply(this, args)
    }
})(jQuery);



/* Modernizr 2.5.2 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-csstransforms3d-teststyles-testprop-testallprops-prefixes-domprefixes
 */;
window.Modernizr = function (a, b, c) {
    function y(a) {
        i.cssText = a
    }
    function z(a, b) {
        return y(l.join(a + ";") + (b || ""))
    }
    function A(a, b) {
        return typeof a === b
    }
    function B(a, b) {
        return !!~ ("" + a).indexOf(b)
    }
    function C(a, b) {
        for (var d in a) if (i[a[d]] !== c) return b == "pfx" ? a[d] : !0;
        return !1
    }
    function D(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : A(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }
    function E(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.substr(1),
            e = (a + " " + n.join(d + " ") + d).split(" ");
        return A(b, "string") || A(b, "undefined") ? C(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), D(e, b, c))
    }
    var d = "2.5.2",
        e = {}, f = b.documentElement,
        g = "modernizr",
        h = b.createElement(g),
        i = h.style,
        j, k = {}.toString,
        l = " -webkit- -moz- -o- -ms- ".split(" "),
        m = "Webkit Moz O ms",
        n = m.split(" "),
        o = m.toLowerCase().split(" "),
        p = {}, q = {}, r = {}, s = [],
        t = s.slice,
        u, v = function (a, c, d, e) {
            var h, i, j, k = b.createElement("div"),
                l = b.body,
                m = l ? l : b.createElement("body");
            if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : g + (d + 1), k.appendChild(j);
            return h = ["&#173;", "<style>", a, "</style>"].join(""), k.id = g, m.innerHTML += h, m.appendChild(k), l || f.appendChild(m), i = c(k, a), l ? k.parentNode.removeChild(k) : m.parentNode.removeChild(m), !! i
        }, w = {}.hasOwnProperty,
        x;
    !A(w, "undefined") && !A(w.call, "undefined") ? x = function (a, b) {
        return w.call(a, b)
    } : x = function (a, b) {
        return b in a && A(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = t.call(arguments, 1),
            e = function () {
                if (this instanceof e) {
                    var a = function () {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(t.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(t.call(arguments)))
            };
        return e
    });
    var F = function (a, c) {
        var d = a.join(""),
            f = c.length;
        v(d, function (a, c) {
            var d = b.styleSheets[b.styleSheets.length - 1],
                g = d ? d.cssRules && d.cssRules[0] ? d.cssRules[0].cssText : d.cssText || "" : "",
                h = a.childNodes,
                i = {};
            while (f--) i[h[f].id] = h[f];
            e.csstransforms3d = (i.csstransforms3d && i.csstransforms3d.offsetLeft) === 9 && i.csstransforms3d.offsetHeight === 3
        }, f, c)
    }([, ["@media (", l.join("transform-3d),("), g, ")", "{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")], [, "csstransforms3d"]);
    p.csstransforms3d = function () {
        var a = !! E("perspective");
        return a && "webkitPerspective" in f.style && (a = e.csstransforms3d), a
    };
    for (var G in p) x(p, G) && (u = G.toLowerCase(), e[u] = p[G](), s.push((e[u] ? "" : "no-") + u));
    return y(""), h = j = null, e._version = d, e._prefixes = l, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) {
        return C([a])
    }, e.testAllProps = E, e.testStyles = v, e
}(this, this.document);


/*!
 * jQuery idleTimer plugin
 * version 0.9.100511
 * by Paul Irish.
 *   http://github.com/paulirish/yui-misc/tree/
 * MIT license
 * Copyright (c) 2009 Nicholas C. Zakas
 * adapted from YUI idle timer by nzakas:
 *   http://github.com/nzakas/yui-misc/
 */ (function ($) {
    $.idleTimer = function (f, g, h) {
        h = $.extend({
            startImmediately: true,
            idle: false,
            enabled: true,
            timeout: 30000,
            events: 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove'
        }, h);
        g = g || document;
        var i = function (a) {
            if (typeof a === 'number') {
                a = undefined
            }
            var b = $.data(a || g, 'idleTimerObj');
            b.idle = !b.idle;
            var c = (+new Date()) - b.olddate;
            b.olddate = +new Date();
            if (b.idle && (c < h.timeout)) {
                b.idle = false;
                clearTimeout($.idleTimer.tId);
                if (h.enabled) $.idleTimer.tId = setTimeout(i, h.timeout);
                return
            }
            var d = jQuery.Event($.data(g, 'idleTimer', b.idle ? "idle" : "active") + '.idleTimer');
            $(g).trigger(d)
        }, stop = function (a) {
            var b = $.data(a, 'idleTimerObj') || {};
            b.enabled = false;
            clearTimeout(b.tId);
            $(a).off('.idleTimer')
        }, handleUserEvent = function (e) {
            var a = $.data(this, 'idleTimerObj');
            clearTimeout(a.tId);
            if (a.enabled) {
                if (a.idle) {
                    i(this)
                }
                a.tId = setTimeout(i, a.timeout)
            }
        };
        var j = $.data(g, 'idleTimerObj') || {};
        j.olddate = j.olddate || +new Date();
        if (typeof f === "number") {
            h.timeout = f
        } else if (f === 'destroy') {
            stop(g);
            return this
        } else if (f === 'getElapsedTime') {
            return (+new Date()) - j.olddate
        }
        $(g).on($.trim((h.events + ' ').split(' ').join('.idleTimer ')), handleUserEvent);
        j.idle = h.idle;
        j.enabled = h.enabled;
        j.timeout = h.timeout;
        if (h.startImmediately) {
            j.tId = setTimeout(i, j.timeout)
        }
        $.data(g, 'idleTimer', "active");
        $.data(g, 'idleTimerObj', j)
    };
    $.fn.idleTimer = function (a, b) {
        if (!b) {
            b = {}
        }
        if (this[0]) {
            $.idleTimer(a, this[0], b)
        }
        return this
    }
})(jQuery);