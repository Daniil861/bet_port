(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".slot") || document.querySelector(".game")) if (+sessionStorage.getItem("money") >= 50) {
        document.querySelector(".block-bet__coins").textContent = 50;
        sessionStorage.setItem("current-bet", 50);
    } else {
        document.querySelector(".block-bet__coins").textContent = 0;
        sessionStorage.setItem("current-bet", 0);
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function add_remove_className(block, className) {
        if (document.querySelector(block).classList.contains(className)) document.querySelector(block).classList.remove(className); else document.querySelector(block).classList.add(className);
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.textContent = +sessionStorage.getItem("money") + count));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    if (document.querySelector(".main__body") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main__body").classList.add("_active");
    if (document.querySelector(".slot__body") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".slot__body").classList.add("_active");
    var minTime = 1e3;
    var maxTime = 2500;
    var casino1 = document.querySelector("#slot1");
    var casino2 = document.querySelector("#slot2");
    var casino3 = document.querySelector("#slot3");
    var casino4 = document.querySelector("#slot4");
    var casino5 = document.querySelector("#slot5");
    if (casino1 && casino2 && casino3 && casino4 && casino5) {
        let a, b, c, d, e;
        var mcasino1 = new SlotMachine(casino1, {
            active: 3,
            delay: 800,
            onComplete: function(active) {
                a = this.active;
                clean_bet();
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 800,
            onComplete: function(active) {
                b = this.active;
                clean_bet();
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 6,
            delay: 800,
            onComplete: function(active) {
                c = this.active;
                clean_bet();
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino4 = new SlotMachine(casino4, {
            active: 4,
            delay: 800,
            onComplete: function(active) {
                d = this.active;
                clean_bet();
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        var mcasino5 = new SlotMachine(casino5, {
            active: 5,
            delay: 800,
            onComplete: function(active) {
                e = this.active;
                clean_bet();
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    let bet = current_bet();
                    add_money(100 * bet, ".check", 1e3, 2e3);
                }
            }
        });
        function gameSlot() {
            mcasino1.shuffle(10);
            mcasino2.shuffle(10);
            mcasino3.shuffle(10);
            mcasino4.shuffle(10);
            mcasino5.shuffle(10);
            setTimeout((() => mcasino1.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino4.stop()), get_random(minTime, maxTime));
            setTimeout((() => mcasino5.stop()), get_random(minTime, maxTime));
        }
        function clean_bet() {
            if (+sessionStorage.getItem("money") < +sessionStorage.getItem("current-bet")) setTimeout((() => {
                sessionStorage.setItem("current-bet", 0);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            }), 1500);
        }
        var casinoAutoSpin;
        if (document.querySelector(".controls-game__button-spin")) document.querySelector(".controls-game__button-spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            d = 666;
            e = 666;
            if (casino1 && casino2 && casino3 && casino4 && casino5 && +sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) {
                delete_money(+sessionStorage.getItem("current-bet"), ".check");
                clearInterval(casinoAutoSpin);
                gameSlot();
                document.querySelector(".controls-game__button-spin").classList.add("_hold");
                setTimeout((() => {
                    document.querySelector(".controls-game__button-spin").classList.remove("_hold");
                }), 3500);
            } else no_money(".check");
        }));
        if (document.querySelector(".controls-game__button-auto")) document.querySelector(".controls-game__button-auto").addEventListener("click", (() => {
            if (casino1 && casino2 && casino3 && casino4 && casino5 && +sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) {
                delete_money(+sessionStorage.getItem("current-bet"), ".check");
                gameSlot();
                document.querySelector(".controls-game__button-auto").classList.add("_hold");
                let casinoAutoSpinCount = 0;
                casinoAutoSpin = setInterval((function() {
                    casinoAutoSpinCount++;
                    if (casinoAutoSpinCount < 10 && +sessionStorage.getItem("money") > +sessionStorage.getItem("current-bet")) {
                        delete_money(+sessionStorage.getItem("current-bet"), ".check");
                        gameSlot();
                    } else {
                        clearInterval(casinoAutoSpin);
                        document.querySelector(".controls-game__button-auto").classList.remove("_hold");
                        if (+sessionStorage.getItem("money") < +sessionStorage.getItem("current-bet")) {
                            sessionStorage.setItem("current-bet", 0);
                            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
                        }
                    }
                }), 4500);
            }
        }));
    }
    if (document.querySelector(".game__body") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".game__body").classList.add("_active");
    const config = {
        number_program: 0,
        count_win: 0,
        current_coeff: 1,
        count_delay_animation: 0,
        timerId: false
    };
    const coefficient = {
        item_1: 1.2,
        item_2: 1.2,
        item_3: 3.2,
        item_4: 3.2,
        item_5: 2.8,
        item_6: 3.8,
        item_7: 3.2,
        item_8: 3.2,
        item_9: 5
    };
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [ array[j], array[i] ];
        }
        return array;
    }
    function get_number_program() {
        let arr = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9 ];
        let new_arr = shuffle(arr);
        let number = get_random(0, 31);
        return new_arr[number];
    }
    function start_game() {
        add_remove_className(".bets__button", "_hold");
        config.number_program = get_number_program();
        get_anim_item();
        setTimeout((() => {
            chek_win();
            write_win_count();
            setTimeout((() => {
                document.querySelector(".win").classList.add("_active");
            }), 1e3);
        }), config.count_delay_animation + 500);
    }
    function chek_win() {
        let bet = +sessionStorage.getItem("current-bet");
        if (1 == config.number_program) {
            show_active_item(1);
            config.current_coeff = coefficient.item_1;
            config.count_win = bet * coefficient.item_1;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (2 == config.number_program) {
            show_active_item(2);
            config.current_coeff = coefficient.item_2;
            config.count_win = bet * coefficient.item_2;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (3 == config.number_program) {
            show_active_item(3);
            config.current_coeff = coefficient.item_3;
            config.count_win = bet * coefficient.item_3;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (4 == config.number_program) {
            show_active_item(4);
            config.current_coeff = coefficient.item_4;
            config.count_win = bet * coefficient.item_4;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (5 == config.number_program) {
            show_active_item(5);
            config.current_coeff = coefficient.item_5;
            config.count_win = bet * coefficient.item_5;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (6 == config.number_program) {
            show_active_item(6);
            config.current_coeff = coefficient.item_6;
            config.count_win = bet * coefficient.item_6;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (7 == config.number_program) {
            show_active_item(7);
            config.current_coeff = coefficient.item_7;
            config.count_win = bet * coefficient.item_7;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (8 == config.number_program) {
            show_active_item(8);
            config.current_coeff = coefficient.item_8;
            config.count_win = bet * coefficient.item_8;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else if (9 == config.number_program) {
            show_active_item(9);
            config.current_coeff = coefficient.item_9;
            config.count_win = bet * coefficient.item_9;
            add_money(config.count_win, ".check", 1e3, 2e3);
        } else return false;
    }
    function show_active_item(number) {
        add_remove_className(`.field__item_${number}`, "_active");
        add_remove_className(`.values__item_${number}`, "_active");
    }
    function write_win_count() {
        document.querySelector(".win__multiple").textContent = `x${config.current_coeff}`;
        document.querySelector(".win__text").textContent = config.count_win;
    }
    function get_anim_item() {
        let timer = get_random(2500, 4e3);
        config.count_delay_animation = timer;
        config.timerId = setInterval((() => {
            setTimeout((() => {
                clearInterval(config.timerId);
            }), config.count_delay_animation);
            get_random_item();
        }), 210);
    }
    function get_random_item() {
        let number = get_random(0, 9);
        let items = document.querySelectorAll(".field__item");
        items[number].classList.add("_active");
        setTimeout((() => {
            items[number].classList.remove("_active");
        }), 200);
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main__body") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main__body").classList.add("_active");
        }
        if (targetElement.closest(".block-bet__minus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            if (current_bet >= 50) {
                sessionStorage.setItem("current-bet", current_bet - 50);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".block-bet__plus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            let current_bank = +sessionStorage.getItem("money");
            if (current_bank - 49 > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 50);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            } else no_money(".check");
        }
        if (targetElement.closest(".controls-game__button-max")) {
            let money = sessionStorage.getItem("money");
            sessionStorage.setItem("current-bet", +money - 50);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".bets__button")) start_game();
        if (targetElement.closest(".win__button")) {
            document.querySelector(".win").classList.remove("_active");
            setTimeout((() => {
                add_remove_className(".bets__button", "_hold");
            }), 1e3);
            document.querySelectorAll(".field__item").forEach((el => {
                if (el.classList.contains("_active")) el.classList.remove("_active");
            }));
            document.querySelectorAll(".values__item").forEach((el => {
                if (el.classList.contains("_active")) el.classList.remove("_active");
            }));
            config.count_win = 0;
            config.current_coeff = 1;
            config.number_program = 0;
        }
    }));
    window["FLS"] = true;
    isWebp();
})();