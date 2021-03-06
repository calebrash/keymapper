// keymapper.js 0.4.0
// Copyright (c) 2012 Caleb Rash except where noted
// Licensed under the MIT License

// Array.indexOf of support adapted from Mozilla Developer Network
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (se) {
        "use strict";
        if (this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var l = t.length >>> 0;
        if (l === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) {
                n = 0;
            } else if (n !== 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= l) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(l - Math.abs(n), 0);
        for (; k < l; k++) {
            if (k in t && t[k] === se) {
                return k;
            }
        }
        return -1;
    };
}

(function($) {
    Array.prototype.compare = function(arr) {
        if (this.length != arr.length) {
            return false;
        }
        var success = true, l = this.length, i = 0;
        for(i; i<l; i++) {
            if(arr.indexOf(this[i]) == -1) {
                success = false;
                break;
            }
        }
        return success;
    };
    Array.prototype.keyify = function(converted) {
        converted = typeof converted == 'boolean' ? converted : false;
        var r = [], i = 0, l = this.length;
        for(i; i<l; i++) {
            if (converted) {
                r.push(this[i].toString());
            } else {
                r.push($.keys.reverse(this[i]).toString());
            }
        }
        return r.sort().join('_');
    };
    $.keys = {
        map: function(k) {
            if(typeof this.l[k] == 'undefined') {
                return false;
            } else {
                return this.l[k];
            }
        },
        reverse: function(k) {
            if(typeof this.r[k] == 'undefined') {
                return false;
            } else {
                return this.r[k];
            }
        },
        active: false,
        command_active: false,
        l: {
            13: 'enter',
            16: 'shift',
            17: 'control',
            18: 'option',
            27: 'escape',
            32: 'space',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            91: 'command',
            93: 'rcommand',
            112: 'f1',
            113: 'f2',
            114: 'f3',
            115: 'f4',
            116: 'f5',
            117: 'f6',
            118: 'f7',
            119: 'f8',
            120: 'f9',
            121: 'f10',
            122: 'f11',
            123: 'f12',
            187: 'plus',
            188: 'comma',
            189: 'minus',
            190: 'period',
            191: 'slash',
            192: 'tilde',
            219: 'left bracket',
            220: 'backslash',
            221: 'right bracket'
        },
        r: {
            enter: 13,
            shift: 16,
            control: 17,
            option: 18,
            escape: 27,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            command: 91,
            rcommand: 93,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            plus: 187,
            comma: 188,
            minus: 189,
            period: 190,
            slash: 191,
            tilde: 192,
            'left bracket': 219,
            backslash: 220,
            'right bracket': 221
        },
        a: [],
        c: {}
    };

    $.fn.keymapper = function(keys, ondown, onup) {
        keys = typeof keys == 'object' || typeof keys == 'array' ? keys : [keys];
        event_key = keys.keyify();
        ondown = typeof ondown == 'function' ? ondown : function() {};
        onup = typeof onup == 'function' ? onup : function() {};
        $.keys.c[event_key] = {
            down: ondown,
            up: onup
        };
        var ev = typeof $._data($(this).get(0), 'events') != 'undefined' ? $._data($(this).get(0), 'events') : {},
            el = typeof ev.keydown != 'undefined' ? ev.keydown : [],
            should_bind = true,
            i = 0,
            l = el.length;
        for(i; i<l; i++) {
            if(el[i].namespace == 'keymapper') {
                should_bind = false;
                break;
            }
        }
        if(should_bind) {
            $(this).on('keydown.keymapper', function(e) {
                var key = e.which == $.keys.r.rcommand ? $.keys.r.command : e.which,
                    ek = false,
                    t = [];
                if($.keys.a.indexOf(key) == -1) {
                    $.keys.a.push(key);
                }
                ek = $.keys.a.keyify(true);
                $.keys.command_active = $.keys.a.indexOf($.keys.r.command) !== -1;
                $.each(ek.split('_'), function(i,v) {
                    t.push(parseInt(v,10));
                });
                if(!$.keys.active && typeof $.keys.c[ek] != 'undefined' && $.keys.a.compare(t)) {
                    e.preventDefault();
                    $.keys.active = true;
                    $.keys.c[ek].down();
                }
            });
            $(this).on('keyup.keymapper', function(e) {
                var i = $.keys.a.indexOf(e.which),
                    ek = $.keys.a.keyify(true);
                if(i !== -1) {
                    $.keys.a.splice(i, 1);
                }
                if($.keys.active) {
                    if($.keys.command_active) {
                        $.keys.a = [];
                        $.keys.command_active = false;
                    }
                    $.keys.active = false;
                    if(typeof $.keys.c[ek] !== undefined) {
                        $.keys.c[ek].up();
                    }
                }
            });
        }
    };
})(jQuery);
