!function(root, factory) {
    "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? module.exports = factory : root.conditionizr = factory();
}(this, function() {
    "use strict";
    var assets, exports = {}, head = document.head || document.getElementsByTagName("head")[0], _loader = function(testName, testDep, load) {
        var path = load ? testName : assets + testName + ("style" === testDep ? ".css" : ".js");
        switch (testDep) {
          case "script":
            var script = document.createElement("script");
            script.src = path, head.appendChild(script);
            break;

          case "style":
            var style = document.createElement("link");
            style.href = path, style.rel = "stylesheet", head.appendChild(style);
            break;

          case "class":
            document.documentElement.className += " " + testName;
        }
    };
    return exports.config = function(config) {
        var options = config || {}, tests = options.tests;
        assets = options.assets || "";
        for (var testName in tests) {
            var newTest = testName.toLowerCase();
            if (exports[newTest]) for (var testDeps = tests[testName], i = testDeps.length; i--; ) _loader(newTest, testDeps[i]);
        }
    }, exports.add = function(testName, testDeps, testFn) {
        var newTest = testName.toLowerCase();
        if (exports[newTest] = testFn(), exports[newTest]) for (var i = testDeps.length; i--; ) _loader(newTest, testDeps[i]);
    }, exports.on = function(testName, testFn) {
        var not = /^\!/;
        (exports[testName.toLowerCase()] || not.test(testName) && !exports[testName.replace(not, "")]) && testFn();
    }, exports.load = exports.polyfill = function(resource, testNames) {
        for (var testDep = /\.js$/.test(resource) ? "script" : "style", i = testNames.length; i--; ) exports[testNames[i].toLowerCase()] && _loader(resource, testDep, !0);
    }, exports;
}), function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), 
        jQuery.ready();
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = jQuery.expando + Math.random();
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), 
        data = elem.getAttribute(name), "string" == typeof data) {
            try {
                data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
            } catch (e) {}
            data_user.set(elem, key, data);
        } else data = void 0;
        return data;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), 
            events = pdataOld.events)) {
                delete pdataCur.handle, pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), 
            data_user.set(dest, udataCur));
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
    }
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle ? window.getDefaultComputedStyle(elem[0]).display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), 
        iframe.detach()), elemdisplay[nodeName] = display), display;
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 !== ret ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : values[index] || (hidden = isHidden(elem), 
        (display && "none" !== display || !hidden) && data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), "none" === display && (display = defaultDisplay(elem.nodeName)), 
        "inline" === display && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        }
        if (!jQuery.isEmptyObject(orig)) {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
    }
    var arr = [], slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, trim = "".trim, support = {}, document = window.document, version = "2.1.0", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window;
        },
        isNumeric: function(obj) {
            return obj - parseFloat(obj) >= 0;
        },
        isPlainObject: function(obj) {
            if ("object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            return !0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), 
            script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code));
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : trim.call(text);
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: Date.now,
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
            if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
            if (documentIsHTML && !seed) {
                if (match = rquickExpr.exec(selector)) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== strundefined && context;
        }
        function setFilters() {}
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function select(selector, context, results, seed) {
            var i, tokens, token, type, find, match = tokenize(selector);
            if (!seed && 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }
        var i, support, Expr, getText, isXML, compile, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, strundefined = "undefined", MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function(elem) {
            for (var i = 0, len = this.length; len > i; i++) if (this[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", function() {
                setDocument();
            }, !1) : parent.attachEvent && parent.attachEvent("onunload", function() {
                setDocument();
            })), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 
                2 === div.getElementsByClassName("i").length;
            }), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== strundefined && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                div.innerHTML = "<select t=''><option selected=''></option></select>", div.querySelectorAll("[t^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[5] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] && void 0 !== match[4] ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf.call(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (group || (group = tokenize(selector)), i = group.length; i--; ) cached = matcherFromTokens(group[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, 
            this[0] = elem), this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem);
            }
            return matched;
        },
        sibling: function(n, elem) {
            for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
            return matched;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                for (var i = 0; l > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
            this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), 
            this.pushStack(matched);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
            jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready")));
        }
    }), jQuery.ready.promise = function(obj) {
        return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1))), readyList.promise(obj);
    }, jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
    }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) return 0;
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    }, Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor);
                }
            }
            return this.cache[unlock] || (this.cache[unlock] = {}), unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" == typeof data) cache[data] = value; else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data); else for (prop in data) cache[prop] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return void 0 === key ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), 
            void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), 
            void 0 !== value ? value : key);
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (void 0 === key) this.cache[unlock] = {}; else {
                jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), 
                key in cache ? name = [ key, camel ] : (name = camel, name = name in cache ? [ name ] : name.match(rnotwhite) || [])), 
                i = name.length;
                for (;i--; ) delete cache[name[i]];
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            owner[this.expando] && delete this.cache[owner[this.expando]];
        }
    };
    var data_priv = new Data(), data_user = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; ) name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name]));
                    data_priv.set(elem, "hasDataAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                data_user.set(this, key);
            }) : access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && void 0 === value) {
                    if (data = data_user.get(elem, key), void 0 !== data) return data;
                    if (data = data_user.get(elem, camelKey), void 0 !== data) return data;
                    if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data;
                } else this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = data_priv.get(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div"));
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>", support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    }();
    var strundefined = "undefined";
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
            selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), 
            (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            }), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
            type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
            }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
            special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), 
            special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
            selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
            jQuery.event.global[type] = !0);
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], 
                tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, 
                tmp && (elem[ontype] = tmp)), event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur !== this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
                attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                data_priv.remove(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
            } else nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment;
        },
        cleanData: function(elems) {
            for (var data, elem, events, type, key, j, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
                    if (events = Object.keys(data.events || {}), events.length) for (j = 0; void 0 !== (type = events[j]); j++) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key];
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value);
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
            elem.textContent = "");
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")));
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {}, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
    };
    !function() {
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", 
            docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, 
            docElem.removeChild(container);
        }
        var pixelPositionVal, boxSizingReliableVal, divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
        container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return computePixelPositionAndBoxSizingReliable(), pixelPositionVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), 
                boxSizingReliableVal;
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                return marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = "0", 
                div.style.width = "1px", docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), 
                docElem.removeChild(container), div.innerHTML = "", ret;
            }
        });
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, 
                "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = "", 
                style[name] = value)), void 0);
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || data_priv.get(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.value = "t", input.type = "radio", support.radioValue = "t" === input.value;
    }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            } : function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = void 0;
        }
        return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), 
            wrap.map(function() {
                for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                return elem;
            }).append(this)), this);
        },
        wrapInner: function(html) {
            return this.each(jQuery.isFunction(html) ? function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            } : function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    window.ActiveXObject && jQuery(window).on("unload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key]();
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
    jQuery.ajaxTransport(function(options) {
        var callback;
        return support.cors || xhrSupported && !options.crossDomain ? {
            send: function(headers, complete) {
                var i, xhr = options.xhr(), id = ++xhrId;
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, 
                        "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                            text: xhr.responseText
                        } : void 0, xhr.getAllResponseHeaders()));
                    };
                }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort"), 
                xhr.send(options.hasContent && options.data || null);
            },
            abort: function() {
                callback && callback();
            }
        } : void 0;
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: !0,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                    }), document.head.appendChild(script[0]);
                },
                abort: function() {
                    callback && callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = url.slice(off), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, 
        params = void 0) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), function(window, $) {
    "use strict";
    var testName, document = window.document, docElem = document.documentElement, Modernizr = window.Modernizr, capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }, prefixes = "Moz Webkit O Ms".split(" "), getStyleProperty = function(propName) {
        var prefixed, style = docElem.style;
        if ("string" == typeof style[propName]) return propName;
        propName = capitalize(propName);
        for (var i = 0, len = prefixes.length; len > i; i++) if (prefixed = prefixes[i] + propName, 
        "string" == typeof style[prefixed]) return prefixed;
    }, transformProp = getStyleProperty("transform"), transitionProp = getStyleProperty("transitionProperty"), tests = {
        csstransforms: function() {
            return !!transformProp;
        },
        csstransforms3d: function() {
            var test = !!getStyleProperty("perspective");
            if (test && "webkitPerspective" in docElem.style) {
                var $style = $("<style>@media (transform-3d),(-webkit-transform-3d){#modernizr{height:3px}}</style>").appendTo("head"), $div = $('<div id="modernizr" />').appendTo("html");
                test = 3 === $div.height(), $div.remove(), $style.remove();
            }
            return test;
        },
        csstransitions: function() {
            return !!transitionProp;
        }
    };
    if (Modernizr) for (testName in tests) Modernizr.hasOwnProperty(testName) || Modernizr.addTest(testName, tests[testName]); else {
        Modernizr = window.Modernizr = {
            _version: "1.6ish: miniModernizr for Isotope"
        };
        var result, classes = " ";
        for (testName in tests) result = tests[testName](), Modernizr[testName] = result, 
        classes += " " + (result ? "" : "no-") + testName;
        $("html").addClass(classes);
    }
    if (Modernizr.csstransforms) {
        var transformFnNotations = Modernizr.csstransforms3d ? {
            translate: function(position) {
                return "translate3d(" + position[0] + "px, " + position[1] + "px, 0) ";
            },
            scale: function(scale) {
                return "scale3d(" + scale + ", " + scale + ", 1) ";
            }
        } : {
            translate: function(position) {
                return "translate(" + position[0] + "px, " + position[1] + "px) ";
            },
            scale: function(scale) {
                return "scale(" + scale + ") ";
            }
        }, setIsoTransform = function(elem, name, value) {
            var fnName, transformValue, data = $.data(elem, "isoTransform") || {}, newData = {}, transformObj = {};
            newData[name] = value, $.extend(data, newData);
            for (fnName in data) transformValue = data[fnName], transformObj[fnName] = transformFnNotations[fnName](transformValue);
            var translateFn = transformObj.translate || "", scaleFn = transformObj.scale || "", valueFns = translateFn + scaleFn;
            $.data(elem, "isoTransform", data), elem.style[transformProp] = valueFns;
        };
        $.cssNumber.scale = !0, $.cssHooks.scale = {
            set: function(elem, value) {
                setIsoTransform(elem, "scale", value);
            },
            get: function(elem) {
                var transform = $.data(elem, "isoTransform");
                return transform && transform.scale ? transform.scale : 1;
            }
        }, $.fx.step.scale = function(fx) {
            $.cssHooks.scale.set(fx.elem, fx.now + fx.unit);
        }, $.cssNumber.translate = !0, $.cssHooks.translate = {
            set: function(elem, value) {
                setIsoTransform(elem, "translate", value);
            },
            get: function(elem) {
                var transform = $.data(elem, "isoTransform");
                return transform && transform.translate ? transform.translate : [ 0, 0 ];
            }
        };
    }
    var transitionEndEvent, transitionDurProp;
    Modernizr.csstransitions && (transitionEndEvent = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd otransitionend",
        transitionProperty: "transitionend"
    }[transitionProp], transitionDurProp = getStyleProperty("transitionDuration"));
    var resizeTimeout, $event = $.event, dispatchMethod = $.event.handle ? "handle" : "dispatch";
    $event.special.smartresize = {
        setup: function() {
            $(this).bind("resize", $event.special.smartresize.handler);
        },
        teardown: function() {
            $(this).unbind("resize", $event.special.smartresize.handler);
        },
        handler: function(event, execAsap) {
            var context = this, args = arguments;
            event.type = "smartresize", resizeTimeout && clearTimeout(resizeTimeout), resizeTimeout = setTimeout(function() {
                $event[dispatchMethod].apply(context, args);
            }, "execAsap" === execAsap ? 0 : 100);
        }
    }, $.fn.smartresize = function(fn) {
        return fn ? this.bind("smartresize", fn) : this.trigger("smartresize", [ "execAsap" ]);
    }, $.Isotope = function(options, element, callback) {
        this.element = $(element), this._create(options), this._init(callback);
    };
    var isoContainerStyles = [ "width", "height" ], $window = $(window);
    $.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {
            opacity: 0,
            scale: .001
        },
        visibleStyle: {
            opacity: 1,
            scale: 1
        },
        containerStyle: {
            position: "relative",
            overflow: "hidden"
        },
        animationEngine: "best-available",
        animationOptions: {
            queue: !1,
            duration: 800
        },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1
    }, $.Isotope.prototype = {
        _create: function(options) {
            this.options = $.extend({}, $.Isotope.settings, options), this.styleQueue = [], 
            this.elemCount = 0;
            var elemStyle = this.element[0].style;
            this.originalStyle = {};
            var containerStyles = isoContainerStyles.slice(0);
            for (var prop in this.options.containerStyle) containerStyles.push(prop);
            for (var i = 0, len = containerStyles.length; len > i; i++) prop = containerStyles[i], 
            this.originalStyle[prop] = elemStyle[prop] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms();
            var originalOrderSorter = {
                "original-order": function($elem, instance) {
                    return instance.elemCount++, instance.elemCount;
                },
                random: function() {
                    return Math.random();
                }
            };
            this.options.getSortData = $.extend(this.options.getSortData, originalOrderSorter), 
            this.reloadItems(), this.offset = {
                left: parseInt(this.element.css("padding-left") || 0, 10),
                top: parseInt(this.element.css("padding-top") || 0, 10)
            };
            var instance = this;
            setTimeout(function() {
                instance.element.addClass(instance.options.containerClass);
            }, 0), this.options.resizable && $window.bind("smartresize.isotope", function() {
                instance.resize();
            }), this.element.delegate("." + this.options.hiddenClass, "click", function() {
                return !1;
            });
        },
        _getAtoms: function($elems) {
            var selector = this.options.itemSelector, $atoms = selector ? $elems.filter(selector).add($elems.find(selector)) : $elems, atomStyle = {
                position: "absolute"
            };
            return $atoms = $atoms.filter(function(i, atom) {
                return 1 === atom.nodeType;
            }), this.usingTransforms && (atomStyle.left = 0, atomStyle.top = 0), $atoms.css(atomStyle).addClass(this.options.itemClass), 
            this.updateSortData($atoms, !0), $atoms;
        },
        _init: function(callback) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(callback);
        },
        option: function(opts) {
            if ($.isPlainObject(opts)) {
                this.options = $.extend(!0, this.options, opts);
                var updateOptionFn;
                for (var optionName in opts) updateOptionFn = "_update" + capitalize(optionName), 
                this[updateOptionFn] && this[updateOptionFn]();
            }
        },
        _updateAnimationEngine: function() {
            var isUsingJQueryAnimation, animationEngine = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "");
            switch (animationEngine) {
              case "css":
              case "none":
                isUsingJQueryAnimation = !1;
                break;

              case "jquery":
                isUsingJQueryAnimation = !0;
                break;

              default:
                isUsingJQueryAnimation = !Modernizr.csstransitions;
            }
            this.isUsingJQueryAnimation = isUsingJQueryAnimation, this._updateUsingTransforms();
        },
        _updateTransformsEnabled: function() {
            this._updateUsingTransforms();
        },
        _updateUsingTransforms: function() {
            var usingTransforms = this.usingTransforms = this.options.transformsEnabled && Modernizr.csstransforms && Modernizr.csstransitions && !this.isUsingJQueryAnimation;
            usingTransforms || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), 
            this.getPositionStyles = usingTransforms ? this._translate : this._positionAbs;
        },
        _filter: function($atoms) {
            var filter = "" === this.options.filter ? "*" : this.options.filter;
            if (!filter) return $atoms;
            var hiddenClass = this.options.hiddenClass, hiddenSelector = "." + hiddenClass, $hiddenAtoms = $atoms.filter(hiddenSelector), $atomsToShow = $hiddenAtoms;
            if ("*" !== filter) {
                $atomsToShow = $hiddenAtoms.filter(filter);
                var $atomsToHide = $atoms.not(hiddenSelector).not(filter).addClass(hiddenClass);
                this.styleQueue.push({
                    $el: $atomsToHide,
                    style: this.options.hiddenStyle
                });
            }
            return this.styleQueue.push({
                $el: $atomsToShow,
                style: this.options.visibleStyle
            }), $atomsToShow.removeClass(hiddenClass), $atoms.filter(filter);
        },
        updateSortData: function($atoms, isIncrementingElemCount) {
            var $this, sortData, instance = this, getSortData = this.options.getSortData;
            $atoms.each(function() {
                $this = $(this), sortData = {};
                for (var key in getSortData) sortData[key] = isIncrementingElemCount || "original-order" !== key ? getSortData[key]($this, instance) : $.data(this, "isotope-sort-data")[key];
                $.data(this, "isotope-sort-data", sortData);
            });
        },
        _sort: function() {
            var sortBy = this.options.sortBy, getSorter = this._getSorter, sortDir = this.options.sortAscending ? 1 : -1, sortFn = function(alpha, beta) {
                var a = getSorter(alpha, sortBy), b = getSorter(beta, sortBy);
                return a === b && "original-order" !== sortBy && (a = getSorter(alpha, "original-order"), 
                b = getSorter(beta, "original-order")), (a > b ? 1 : b > a ? -1 : 0) * sortDir;
            };
            this.$filteredAtoms.sort(sortFn);
        },
        _getSorter: function(elem, sortBy) {
            return $.data(elem, "isotope-sort-data")[sortBy];
        },
        _translate: function(x, y) {
            return {
                translate: [ x, y ]
            };
        },
        _positionAbs: function(x, y) {
            return {
                left: x,
                top: y
            };
        },
        _pushPosition: function($elem, x, y) {
            x = Math.round(x + this.offset.left), y = Math.round(y + this.offset.top);
            var position = this.getPositionStyles(x, y);
            this.styleQueue.push({
                $el: $elem,
                style: position
            }), this.options.itemPositionDataEnabled && $elem.data("isotope-item-position", {
                x: x,
                y: y
            });
        },
        layout: function($elems, callback) {
            var layoutMode = this.options.layoutMode;
            if (this["_" + layoutMode + "Layout"]($elems), this.options.resizesContainer) {
                var containerStyle = this["_" + layoutMode + "GetContainerSize"]();
                this.styleQueue.push({
                    $el: this.element,
                    style: containerStyle
                });
            }
            this._processStyleQueue($elems, callback), this.isLaidOut = !0;
        },
        _processStyleQueue: function($elems, callback) {
            var objStyleFn, processor, triggerCallbackNow, callbackFn, styleFn = this.isLaidOut && this.isUsingJQueryAnimation ? "animate" : "css", animOpts = this.options.animationOptions, onLayout = this.options.onLayout;
            if (processor = function(i, obj) {
                obj.$el[styleFn](obj.style, animOpts);
            }, this._isInserting && this.isUsingJQueryAnimation) processor = function(i, obj) {
                objStyleFn = obj.$el.hasClass("no-transition") ? "css" : styleFn, obj.$el[objStyleFn](obj.style, animOpts);
            }; else if (callback || onLayout || animOpts.complete) {
                var isCallbackTriggered = !1, callbacks = [ callback, onLayout, animOpts.complete ], instance = this;
                if (triggerCallbackNow = !0, callbackFn = function() {
                    if (!isCallbackTriggered) {
                        for (var hollaback, i = 0, len = callbacks.length; len > i; i++) hollaback = callbacks[i], 
                        "function" == typeof hollaback && hollaback.call(instance.element, $elems, instance);
                        isCallbackTriggered = !0;
                    }
                }, this.isUsingJQueryAnimation && "animate" === styleFn) animOpts.complete = callbackFn, 
                triggerCallbackNow = !1; else if (Modernizr.csstransitions) {
                    for (var styleObj, i = 0, firstItem = this.styleQueue[0], testElem = firstItem && firstItem.$el; !testElem || !testElem.length; ) {
                        if (styleObj = this.styleQueue[i++], !styleObj) return;
                        testElem = styleObj.$el;
                    }
                    var duration = parseFloat(getComputedStyle(testElem[0])[transitionDurProp]);
                    duration > 0 && (processor = function(i, obj) {
                        obj.$el[styleFn](obj.style, animOpts).one(transitionEndEvent, callbackFn);
                    }, triggerCallbackNow = !1);
                }
            }
            $.each(this.styleQueue, processor), triggerCallbackNow && callbackFn(), this.styleQueue = [];
        },
        resize: function() {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout();
        },
        reLayout: function(callback) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, callback);
        },
        addItems: function($content, callback) {
            var $newAtoms = this._getAtoms($content);
            this.$allAtoms = this.$allAtoms.add($newAtoms), callback && callback($newAtoms);
        },
        insert: function($content, callback) {
            this.element.append($content);
            var instance = this;
            this.addItems($content, function($newAtoms) {
                var $newFilteredAtoms = instance._filter($newAtoms);
                instance._addHideAppended($newFilteredAtoms), instance._sort(), instance.reLayout(), 
                instance._revealAppended($newFilteredAtoms, callback);
            });
        },
        appended: function($content, callback) {
            var instance = this;
            this.addItems($content, function($newAtoms) {
                instance._addHideAppended($newAtoms), instance.layout($newAtoms), instance._revealAppended($newAtoms, callback);
            });
        },
        _addHideAppended: function($newAtoms) {
            this.$filteredAtoms = this.$filteredAtoms.add($newAtoms), $newAtoms.addClass("no-transition"), 
            this._isInserting = !0, this.styleQueue.push({
                $el: $newAtoms,
                style: this.options.hiddenStyle
            });
        },
        _revealAppended: function($newAtoms, callback) {
            var instance = this;
            setTimeout(function() {
                $newAtoms.removeClass("no-transition"), instance.styleQueue.push({
                    $el: $newAtoms,
                    style: instance.options.visibleStyle
                }), instance._isInserting = !1, instance._processStyleQueue($newAtoms, callback);
            }, 10);
        },
        reloadItems: function() {
            this.$allAtoms = this._getAtoms(this.element.children());
        },
        remove: function($content, callback) {
            this.$allAtoms = this.$allAtoms.not($content), this.$filteredAtoms = this.$filteredAtoms.not($content);
            var instance = this, removeContent = function() {
                $content.remove(), callback && callback.call(instance.element);
            };
            $content.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({
                $el: $content,
                style: this.options.hiddenStyle
            }), this._sort(), this.reLayout(removeContent)) : removeContent();
        },
        shuffle: function(callback) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), 
            this.reLayout(callback);
        },
        destroy: function() {
            var usingTransforms = this.usingTransforms, options = this.options;
            this.$allAtoms.removeClass(options.hiddenClass + " " + options.itemClass).each(function() {
                var style = this.style;
                style.position = "", style.top = "", style.left = "", style.opacity = "", usingTransforms && (style[transformProp] = "");
            });
            var elemStyle = this.element[0].style;
            for (var prop in this.originalStyle) elemStyle[prop] = this.originalStyle[prop];
            this.element.unbind(".isotope").undelegate("." + options.hiddenClass, "click").removeClass(options.containerClass).removeData("isotope"), 
            $window.unbind(".isotope");
        },
        _getSegments: function(isRows) {
            var segments, namespace = this.options.layoutMode, measure = isRows ? "rowHeight" : "columnWidth", size = isRows ? "height" : "width", segmentsName = isRows ? "rows" : "cols", containerSize = this.element[size](), segmentSize = this.options[namespace] && this.options[namespace][measure] || this.$filteredAtoms["outer" + capitalize(size)](!0) || containerSize;
            segments = Math.floor(containerSize / segmentSize), segments = Math.max(segments, 1), 
            this[namespace][segmentsName] = segments, this[namespace][measure] = segmentSize;
        },
        _checkIfSegmentsChanged: function(isRows) {
            var namespace = this.options.layoutMode, segmentsName = isRows ? "rows" : "cols", prevSegments = this[namespace][segmentsName];
            return this._getSegments(isRows), this[namespace][segmentsName] !== prevSegments;
        },
        _masonryReset: function() {
            this.masonry = {}, this._getSegments();
            var i = this.masonry.cols;
            for (this.masonry.colYs = []; i--; ) this.masonry.colYs.push(0);
        },
        _masonryLayout: function($elems) {
            var instance = this, props = instance.masonry;
            $elems.each(function() {
                var $this = $(this), colSpan = Math.ceil($this.outerWidth(!0) / props.columnWidth);
                if (colSpan = Math.min(colSpan, props.cols), 1 === colSpan) instance._masonryPlaceBrick($this, props.colYs); else {
                    var groupColY, i, groupCount = props.cols + 1 - colSpan, groupY = [];
                    for (i = 0; groupCount > i; i++) groupColY = props.colYs.slice(i, i + colSpan), 
                    groupY[i] = Math.max.apply(Math, groupColY);
                    instance._masonryPlaceBrick($this, groupY);
                }
            });
        },
        _masonryPlaceBrick: function($brick, setY) {
            for (var minimumY = Math.min.apply(Math, setY), shortCol = 0, i = 0, len = setY.length; len > i; i++) if (setY[i] === minimumY) {
                shortCol = i;
                break;
            }
            var x = this.masonry.columnWidth * shortCol, y = minimumY;
            this._pushPosition($brick, x, y);
            var setHeight = minimumY + $brick.outerHeight(!0), setSpan = this.masonry.cols + 1 - len;
            for (i = 0; setSpan > i; i++) this.masonry.colYs[shortCol + i] = setHeight;
        },
        _masonryGetContainerSize: function() {
            var containerHeight = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: containerHeight
            };
        },
        _masonryResizeChanged: function() {
            return this._checkIfSegmentsChanged();
        },
        _fitRowsReset: function() {
            this.fitRows = {
                x: 0,
                y: 0,
                height: 0
            };
        },
        _fitRowsLayout: function($elems) {
            var instance = this, containerWidth = this.element.width(), props = this.fitRows;
            $elems.each(function() {
                var $this = $(this), atomW = $this.outerWidth(!0), atomH = $this.outerHeight(!0);
                0 !== props.x && atomW + props.x > containerWidth && (props.x = 0, props.y = props.height), 
                instance._pushPosition($this, props.x, props.y), props.height = Math.max(props.y + atomH, props.height), 
                props.x += atomW;
            });
        },
        _fitRowsGetContainerSize: function() {
            return {
                height: this.fitRows.height
            };
        },
        _fitRowsResizeChanged: function() {
            return !0;
        },
        _cellsByRowReset: function() {
            this.cellsByRow = {
                index: 0
            }, this._getSegments(), this._getSegments(!0);
        },
        _cellsByRowLayout: function($elems) {
            var instance = this, props = this.cellsByRow;
            $elems.each(function() {
                var $this = $(this), col = props.index % props.cols, row = Math.floor(props.index / props.cols), x = (col + .5) * props.columnWidth - $this.outerWidth(!0) / 2, y = (row + .5) * props.rowHeight - $this.outerHeight(!0) / 2;
                instance._pushPosition($this, x, y), props.index++;
            });
        },
        _cellsByRowGetContainerSize: function() {
            return {
                height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
            };
        },
        _cellsByRowResizeChanged: function() {
            return this._checkIfSegmentsChanged();
        },
        _straightDownReset: function() {
            this.straightDown = {
                y: 0
            };
        },
        _straightDownLayout: function($elems) {
            var instance = this;
            $elems.each(function() {
                var $this = $(this);
                instance._pushPosition($this, 0, instance.straightDown.y), instance.straightDown.y += $this.outerHeight(!0);
            });
        },
        _straightDownGetContainerSize: function() {
            return {
                height: this.straightDown.y
            };
        },
        _straightDownResizeChanged: function() {
            return !0;
        },
        _masonryHorizontalReset: function() {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var i = this.masonryHorizontal.rows;
            for (this.masonryHorizontal.rowXs = []; i--; ) this.masonryHorizontal.rowXs.push(0);
        },
        _masonryHorizontalLayout: function($elems) {
            var instance = this, props = instance.masonryHorizontal;
            $elems.each(function() {
                var $this = $(this), rowSpan = Math.ceil($this.outerHeight(!0) / props.rowHeight);
                if (rowSpan = Math.min(rowSpan, props.rows), 1 === rowSpan) instance._masonryHorizontalPlaceBrick($this, props.rowXs); else {
                    var groupRowX, i, groupCount = props.rows + 1 - rowSpan, groupX = [];
                    for (i = 0; groupCount > i; i++) groupRowX = props.rowXs.slice(i, i + rowSpan), 
                    groupX[i] = Math.max.apply(Math, groupRowX);
                    instance._masonryHorizontalPlaceBrick($this, groupX);
                }
            });
        },
        _masonryHorizontalPlaceBrick: function($brick, setX) {
            for (var minimumX = Math.min.apply(Math, setX), smallRow = 0, i = 0, len = setX.length; len > i; i++) if (setX[i] === minimumX) {
                smallRow = i;
                break;
            }
            var x = minimumX, y = this.masonryHorizontal.rowHeight * smallRow;
            this._pushPosition($brick, x, y);
            var setWidth = minimumX + $brick.outerWidth(!0), setSpan = this.masonryHorizontal.rows + 1 - len;
            for (i = 0; setSpan > i; i++) this.masonryHorizontal.rowXs[smallRow + i] = setWidth;
        },
        _masonryHorizontalGetContainerSize: function() {
            var containerWidth = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: containerWidth
            };
        },
        _masonryHorizontalResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0);
        },
        _fitColumnsReset: function() {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            };
        },
        _fitColumnsLayout: function($elems) {
            var instance = this, containerHeight = this.element.height(), props = this.fitColumns;
            $elems.each(function() {
                var $this = $(this), atomW = $this.outerWidth(!0), atomH = $this.outerHeight(!0);
                0 !== props.y && atomH + props.y > containerHeight && (props.x = props.width, props.y = 0), 
                instance._pushPosition($this, props.x, props.y), props.width = Math.max(props.x + atomW, props.width), 
                props.y += atomH;
            });
        },
        _fitColumnsGetContainerSize: function() {
            return {
                width: this.fitColumns.width
            };
        },
        _fitColumnsResizeChanged: function() {
            return !0;
        },
        _cellsByColumnReset: function() {
            this.cellsByColumn = {
                index: 0
            }, this._getSegments(), this._getSegments(!0);
        },
        _cellsByColumnLayout: function($elems) {
            var instance = this, props = this.cellsByColumn;
            $elems.each(function() {
                var $this = $(this), col = Math.floor(props.index / props.rows), row = props.index % props.rows, x = (col + .5) * props.columnWidth - $this.outerWidth(!0) / 2, y = (row + .5) * props.rowHeight - $this.outerHeight(!0) / 2;
                instance._pushPosition($this, x, y), props.index++;
            });
        },
        _cellsByColumnGetContainerSize: function() {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            };
        },
        _cellsByColumnResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0);
        },
        _straightAcrossReset: function() {
            this.straightAcross = {
                x: 0
            };
        },
        _straightAcrossLayout: function($elems) {
            var instance = this;
            $elems.each(function() {
                var $this = $(this);
                instance._pushPosition($this, instance.straightAcross.x, 0), instance.straightAcross.x += $this.outerWidth(!0);
            });
        },
        _straightAcrossGetContainerSize: function() {
            return {
                width: this.straightAcross.x
            };
        },
        _straightAcrossResizeChanged: function() {
            return !0;
        }
    }, $.fn.imagesLoaded = function(callback) {
        function triggerCallback() {
            callback.call($this, $images);
        }
        function imgLoaded(event) {
            var img = event.target;
            img.src !== blank && -1 === $.inArray(img, loaded) && (loaded.push(img), --len <= 0 && (setTimeout(triggerCallback), 
            $images.unbind(".imagesLoaded", imgLoaded)));
        }
        var $this = this, $images = $this.find("img").add($this.filter("img")), len = $images.length, blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", loaded = [];
        return len || triggerCallback(), $images.bind("load.imagesLoaded error.imagesLoaded", imgLoaded).each(function() {
            var src = this.src;
            this.src = blank, this.src = src;
        }), $this;
    };
    var logError = function(message) {
        window.console && window.console.error(message);
    };
    $.fn.isotope = function(options, callback) {
        if ("string" == typeof options) {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var instance = $.data(this, "isotope");
                return instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? void instance[options].apply(instance, args) : void logError("no such method '" + options + "' for isotope instance") : void logError("cannot call methods on isotope prior to initialization; attempted to call method '" + options + "'");
            });
        } else this.each(function() {
            var instance = $.data(this, "isotope");
            instance ? (instance.option(options), instance._init(callback)) : $.data(this, "isotope", new $.Isotope(options, this, callback));
        });
        return this;
    };
}(window, jQuery), "function" != typeof Object.create && (Object.create = function(obj) {
    function F() {}
    return F.prototype = obj, new F();
}), function($, window, document) {
    var Carousel = {
        init: function(options, el) {
            var base = this;
            base.$elem = $(el), base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options), 
            base.userOptions = options, base.loadContent();
        },
        loadContent: function() {
            function getData(data) {
                var i, content = "";
                if ("function" == typeof base.options.jsonSuccess) base.options.jsonSuccess.apply(this, [ data ]); else {
                    for (i in data.owl) data.owl.hasOwnProperty(i) && (content += data.owl[i].item);
                    base.$elem.html(content);
                }
                base.logIn();
            }
            var url, base = this;
            "function" == typeof base.options.beforeInit && base.options.beforeInit.apply(this, [ base.$elem ]), 
            "string" == typeof base.options.jsonPath ? (url = base.options.jsonPath, $.getJSON(url, getData)) : base.logIn();
        },
        logIn: function() {
            var base = this;
            base.$elem.data("owl-originalStyles", base.$elem.attr("style")).data("owl-originalClasses", base.$elem.attr("class")), 
            base.$elem.css({
                opacity: 0
            }), base.orignalItems = base.options.items, base.checkBrowser(), base.wrapperWidth = 0, 
            base.checkVisible = null, base.setVars();
        },
        setVars: function() {
            var base = this;
            return 0 === base.$elem.children().length ? !1 : (base.baseClass(), base.eventTypes(), 
            base.$userItems = base.$elem.children(), base.itemsAmount = base.$userItems.length, 
            base.wrapItems(), base.$owlItems = base.$elem.find(".owl-item"), base.$owlWrapper = base.$elem.find(".owl-wrapper"), 
            base.playDirection = "next", base.prevItem = 0, base.prevArr = [ 0 ], base.currentItem = 0, 
            base.customEvents(), void base.onStartup());
        },
        onStartup: function() {
            var base = this;
            base.updateItems(), base.calculateAll(), base.buildControls(), base.updateControls(), 
            base.response(), base.moveEvents(), base.stopOnHover(), base.owlStatus(), base.options.transitionStyle !== !1 && base.transitionTypes(base.options.transitionStyle), 
            base.options.autoPlay === !0 && (base.options.autoPlay = 5e3), base.play(), base.$elem.find(".owl-wrapper").css("display", "block"), 
            base.$elem.is(":visible") ? base.$elem.css("opacity", 1) : base.watchVisibility(), 
            base.onstartup = !1, base.eachMoveUpdate(), "function" == typeof base.options.afterInit && base.options.afterInit.apply(this, [ base.$elem ]);
        },
        eachMoveUpdate: function() {
            var base = this;
            base.options.lazyLoad === !0 && base.lazyLoad(), base.options.autoHeight === !0 && base.autoHeight(), 
            base.onVisibleItems(), "function" == typeof base.options.afterAction && base.options.afterAction.apply(this, [ base.$elem ]);
        },
        updateVars: function() {
            var base = this;
            "function" == typeof base.options.beforeUpdate && base.options.beforeUpdate.apply(this, [ base.$elem ]), 
            base.watchVisibility(), base.updateItems(), base.calculateAll(), base.updatePosition(), 
            base.updateControls(), base.eachMoveUpdate(), "function" == typeof base.options.afterUpdate && base.options.afterUpdate.apply(this, [ base.$elem ]);
        },
        reload: function() {
            var base = this;
            window.setTimeout(function() {
                base.updateVars();
            }, 0);
        },
        watchVisibility: function() {
            var base = this;
            return base.$elem.is(":visible") !== !1 ? !1 : (base.$elem.css({
                opacity: 0
            }), window.clearInterval(base.autoPlayInterval), window.clearInterval(base.checkVisible), 
            void (base.checkVisible = window.setInterval(function() {
                base.$elem.is(":visible") && (base.reload(), base.$elem.animate({
                    opacity: 1
                }, 200), window.clearInterval(base.checkVisible));
            }, 500)));
        },
        wrapItems: function() {
            var base = this;
            base.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), 
            base.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), base.wrapperOuter = base.$elem.find(".owl-wrapper-outer"), 
            base.$elem.css("display", "block");
        },
        baseClass: function() {
            var base = this, hasBaseClass = base.$elem.hasClass(base.options.baseClass), hasThemeClass = base.$elem.hasClass(base.options.theme);
            hasBaseClass || base.$elem.addClass(base.options.baseClass), hasThemeClass || base.$elem.addClass(base.options.theme);
        },
        updateItems: function() {
            var width, i, base = this;
            if (base.options.responsive === !1) return !1;
            if (base.options.singleItem === !0) return base.options.items = base.orignalItems = 1, 
            base.options.itemsCustom = !1, base.options.itemsDesktop = !1, base.options.itemsDesktopSmall = !1, 
            base.options.itemsTablet = !1, base.options.itemsTabletSmall = !1, base.options.itemsMobile = !1, 
            !1;
            if (width = $(base.options.responsiveBaseWidth).width(), width > (base.options.itemsDesktop[0] || base.orignalItems) && (base.options.items = base.orignalItems), 
            base.options.itemsCustom !== !1) for (base.options.itemsCustom.sort(function(a, b) {
                return a[0] - b[0];
            }), i = 0; i < base.options.itemsCustom.length; i += 1) base.options.itemsCustom[i][0] <= width && (base.options.items = base.options.itemsCustom[i][1]); else width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== !1 && (base.options.items = base.options.itemsDesktop[1]), 
            width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== !1 && (base.options.items = base.options.itemsDesktopSmall[1]), 
            width <= base.options.itemsTablet[0] && base.options.itemsTablet !== !1 && (base.options.items = base.options.itemsTablet[1]), 
            width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== !1 && (base.options.items = base.options.itemsTabletSmall[1]), 
            width <= base.options.itemsMobile[0] && base.options.itemsMobile !== !1 && (base.options.items = base.options.itemsMobile[1]);
            base.options.items > base.itemsAmount && base.options.itemsScaleUp === !0 && (base.options.items = base.itemsAmount);
        },
        response: function() {
            var smallDelay, lastWindowWidth, base = this;
            return base.options.responsive !== !0 ? !1 : (lastWindowWidth = $(window).width(), 
            base.resizer = function() {
                $(window).width() !== lastWindowWidth && (base.options.autoPlay !== !1 && window.clearInterval(base.autoPlayInterval), 
                window.clearTimeout(smallDelay), smallDelay = window.setTimeout(function() {
                    lastWindowWidth = $(window).width(), base.updateVars();
                }, base.options.responsiveRefreshRate));
            }, void $(window).resize(base.resizer));
        },
        updatePosition: function() {
            var base = this;
            base.jumpTo(base.currentItem), base.options.autoPlay !== !1 && base.checkAp();
        },
        appendItemsSizes: function() {
            var base = this, roundPages = 0, lastItem = base.itemsAmount - base.options.items;
            base.$owlItems.each(function(index) {
                var $this = $(this);
                $this.css({
                    width: base.itemWidth
                }).data("owl-item", Number(index)), (index % base.options.items === 0 || index === lastItem) && (index > lastItem || (roundPages += 1)), 
                $this.data("owl-roundPages", roundPages);
            });
        },
        appendWrapperSizes: function() {
            var base = this, width = base.$owlItems.length * base.itemWidth;
            base.$owlWrapper.css({
                width: 2 * width,
                left: 0
            }), base.appendItemsSizes();
        },
        calculateAll: function() {
            var base = this;
            base.calculateWidth(), base.appendWrapperSizes(), base.loops(), base.max();
        },
        calculateWidth: function() {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },
        max: function() {
            var base = this, maximum = -1 * (base.itemsAmount * base.itemWidth - base.options.items * base.itemWidth);
            return base.options.items > base.itemsAmount ? (base.maximumItem = 0, maximum = 0, 
            base.maximumPixels = 0) : (base.maximumItem = base.itemsAmount - base.options.items, 
            base.maximumPixels = maximum), maximum;
        },
        min: function() {
            return 0;
        },
        loops: function() {
            var i, item, roundPageNum, base = this, prev = 0, elWidth = 0;
            for (base.positionsInArray = [ 0 ], base.pagesInArray = [], i = 0; i < base.itemsAmount; i += 1) elWidth += base.itemWidth, 
            base.positionsInArray.push(-elWidth), base.options.scrollPerPage === !0 && (item = $(base.$owlItems[i]), 
            roundPageNum = item.data("owl-roundPages"), roundPageNum !== prev && (base.pagesInArray[prev] = base.positionsInArray[i], 
            prev = roundPageNum));
        },
        buildControls: function() {
            var base = this;
            (base.options.navigation === !0 || base.options.pagination === !0) && (base.owlControls = $('<div class="owl-controls"/>').toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem)), 
            base.options.pagination === !0 && base.buildPagination(), base.options.navigation === !0 && base.buildButtons();
        },
        buildButtons: function() {
            var base = this, buttonsWrapper = $('<div class="owl-buttons"/>');
            base.owlControls.append(buttonsWrapper), base.buttonPrev = $("<div/>", {
                "class": "owl-prev",
                html: base.options.navigationText[0] || ""
            }), base.buttonNext = $("<div/>", {
                "class": "owl-next",
                html: base.options.navigationText[1] || ""
            }), buttonsWrapper.append(base.buttonPrev).append(base.buttonNext), buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(event) {
                event.preventDefault();
            }), buttonsWrapper.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(event) {
                event.preventDefault(), $(this).hasClass("owl-next") ? base.next() : base.prev();
            });
        },
        buildPagination: function() {
            var base = this;
            base.paginationWrapper = $('<div class="owl-pagination"/>'), base.owlControls.append(base.paginationWrapper), 
            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(event) {
                event.preventDefault(), Number($(this).data("owl-page")) !== base.currentItem && base.goTo(Number($(this).data("owl-page")), !0);
            });
        },
        updatePagination: function() {
            var counter, lastPage, lastItem, i, paginationButton, paginationButtonInner, base = this;
            if (base.options.pagination === !1) return !1;
            for (base.paginationWrapper.html(""), counter = 0, lastPage = base.itemsAmount - base.itemsAmount % base.options.items, 
            i = 0; i < base.itemsAmount; i += 1) i % base.options.items === 0 && (counter += 1, 
            lastPage === i && (lastItem = base.itemsAmount - base.options.items), paginationButton = $("<div/>", {
                "class": "owl-page"
            }), paginationButtonInner = $("<span></span>", {
                text: base.options.paginationNumbers === !0 ? counter : "",
                "class": base.options.paginationNumbers === !0 ? "owl-numbers" : ""
            }), paginationButton.append(paginationButtonInner), paginationButton.data("owl-page", lastPage === i ? lastItem : i), 
            paginationButton.data("owl-roundPages", counter), base.paginationWrapper.append(paginationButton));
            base.checkPagination();
        },
        checkPagination: function() {
            var base = this;
            return base.options.pagination === !1 ? !1 : void base.paginationWrapper.find(".owl-page").each(function() {
                $(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages") && (base.paginationWrapper.find(".owl-page").removeClass("active"), 
                $(this).addClass("active"));
            });
        },
        checkNavigation: function() {
            var base = this;
            return base.options.navigation === !1 ? !1 : void (base.options.rewindNav === !1 && (0 === base.currentItem && 0 === base.maximumItem ? (base.buttonPrev.addClass("disabled"), 
            base.buttonNext.addClass("disabled")) : 0 === base.currentItem && 0 !== base.maximumItem ? (base.buttonPrev.addClass("disabled"), 
            base.buttonNext.removeClass("disabled")) : base.currentItem === base.maximumItem ? (base.buttonPrev.removeClass("disabled"), 
            base.buttonNext.addClass("disabled")) : 0 !== base.currentItem && base.currentItem !== base.maximumItem && (base.buttonPrev.removeClass("disabled"), 
            base.buttonNext.removeClass("disabled"))));
        },
        updateControls: function() {
            var base = this;
            base.updatePagination(), base.checkNavigation(), base.owlControls && (base.options.items >= base.itemsAmount ? base.owlControls.hide() : base.owlControls.show());
        },
        destroyControls: function() {
            var base = this;
            base.owlControls && base.owlControls.remove();
        },
        next: function(speed) {
            var base = this;
            if (base.isTransition) return !1;
            if (base.currentItem += base.options.scrollPerPage === !0 ? base.options.items : 1, 
            base.currentItem > base.maximumItem + (base.options.scrollPerPage === !0 ? base.options.items - 1 : 0)) {
                if (base.options.rewindNav !== !0) return base.currentItem = base.maximumItem, !1;
                base.currentItem = 0, speed = "rewind";
            }
            base.goTo(base.currentItem, speed);
        },
        prev: function(speed) {
            var base = this;
            if (base.isTransition) return !1;
            if (base.options.scrollPerPage === !0 && base.currentItem > 0 && base.currentItem < base.options.items ? base.currentItem = 0 : base.currentItem -= base.options.scrollPerPage === !0 ? base.options.items : 1, 
            base.currentItem < 0) {
                if (base.options.rewindNav !== !0) return base.currentItem = 0, !1;
                base.currentItem = base.maximumItem, speed = "rewind";
            }
            base.goTo(base.currentItem, speed);
        },
        goTo: function(position, speed, drag) {
            var goToPixel, base = this;
            return base.isTransition ? !1 : ("function" == typeof base.options.beforeMove && base.options.beforeMove.apply(this, [ base.$elem ]), 
            position >= base.maximumItem ? position = base.maximumItem : 0 >= position && (position = 0), 
            base.currentItem = base.owl.currentItem = position, base.options.transitionStyle !== !1 && "drag" !== drag && 1 === base.options.items && base.browser.support3d === !0 ? (base.swapSpeed(0), 
            base.browser.support3d === !0 ? base.transition3d(base.positionsInArray[position]) : base.css2slide(base.positionsInArray[position], 1), 
            base.afterGo(), base.singleItemTransition(), !1) : (goToPixel = base.positionsInArray[position], 
            base.browser.support3d === !0 ? (base.isCss3Finish = !1, speed === !0 ? (base.swapSpeed("paginationSpeed"), 
            window.setTimeout(function() {
                base.isCss3Finish = !0;
            }, base.options.paginationSpeed)) : "rewind" === speed ? (base.swapSpeed(base.options.rewindSpeed), 
            window.setTimeout(function() {
                base.isCss3Finish = !0;
            }, base.options.rewindSpeed)) : (base.swapSpeed("slideSpeed"), window.setTimeout(function() {
                base.isCss3Finish = !0;
            }, base.options.slideSpeed)), base.transition3d(goToPixel)) : speed === !0 ? base.css2slide(goToPixel, base.options.paginationSpeed) : "rewind" === speed ? base.css2slide(goToPixel, base.options.rewindSpeed) : base.css2slide(goToPixel, base.options.slideSpeed), 
            void base.afterGo()));
        },
        jumpTo: function(position) {
            var base = this;
            "function" == typeof base.options.beforeMove && base.options.beforeMove.apply(this, [ base.$elem ]), 
            position >= base.maximumItem || -1 === position ? position = base.maximumItem : 0 >= position && (position = 0), 
            base.swapSpeed(0), base.browser.support3d === !0 ? base.transition3d(base.positionsInArray[position]) : base.css2slide(base.positionsInArray[position], 1), 
            base.currentItem = base.owl.currentItem = position, base.afterGo();
        },
        afterGo: function() {
            var base = this;
            base.prevArr.push(base.currentItem), base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2], 
            base.prevArr.shift(0), base.prevItem !== base.currentItem && (base.checkPagination(), 
            base.checkNavigation(), base.eachMoveUpdate(), base.options.autoPlay !== !1 && base.checkAp()), 
            "function" == typeof base.options.afterMove && base.prevItem !== base.currentItem && base.options.afterMove.apply(this, [ base.$elem ]);
        },
        stop: function() {
            var base = this;
            base.apStatus = "stop", window.clearInterval(base.autoPlayInterval);
        },
        checkAp: function() {
            var base = this;
            "stop" !== base.apStatus && base.play();
        },
        play: function() {
            var base = this;
            return base.apStatus = "play", base.options.autoPlay === !1 ? !1 : (window.clearInterval(base.autoPlayInterval), 
            void (base.autoPlayInterval = window.setInterval(function() {
                base.next(!0);
            }, base.options.autoPlay)));
        },
        swapSpeed: function(action) {
            var base = this;
            "slideSpeed" === action ? base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed)) : "paginationSpeed" === action ? base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed)) : "string" != typeof action && base.$owlWrapper.css(base.addCssSpeed(action));
        },
        addCssSpeed: function(speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                transition: "all " + speed + "ms ease"
            };
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            };
        },
        doTranslate: function(pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                transform: "translate3d(" + pixels + "px, 0px,0px)"
            };
        },
        transition3d: function(value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        },
        css2move: function(value) {
            var base = this;
            base.$owlWrapper.css({
                left: value
            });
        },
        css2slide: function(value, speed) {
            var base = this;
            base.isCssFinish = !1, base.$owlWrapper.stop(!0, !0).animate({
                left: value
            }, {
                duration: speed || base.options.slideSpeed,
                complete: function() {
                    base.isCssFinish = !0;
                }
            });
        },
        checkBrowser: function() {
            var regex, asSupport, support3d, isTouch, base = this, translate3D = "translate3d(0px, 0px, 0px)", tempElem = document.createElement("div");
            tempElem.style.cssText = "  -moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D, 
            regex = /translate3d\(0px, 0px, 0px\)/g, asSupport = tempElem.style.cssText.match(regex), 
            support3d = null !== asSupport && 1 === asSupport.length, isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints, 
            base.browser = {
                support3d: support3d,
                isTouch: isTouch
            };
        },
        moveEvents: function() {
            var base = this;
            (base.options.mouseDrag !== !1 || base.options.touchDrag !== !1) && (base.gestures(), 
            base.disabledEvents());
        },
        eventTypes: function() {
            var base = this, types = [ "s", "e", "x" ];
            base.ev_types = {}, base.options.mouseDrag === !0 && base.options.touchDrag === !0 ? types = [ "touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl" ] : base.options.mouseDrag === !1 && base.options.touchDrag === !0 ? types = [ "touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl" ] : base.options.mouseDrag === !0 && base.options.touchDrag === !1 && (types = [ "mousedown.owl", "mousemove.owl", "mouseup.owl" ]), 
            base.ev_types.start = types[0], base.ev_types.move = types[1], base.ev_types.end = types[2];
        },
        disabledEvents: function() {
            var base = this;
            base.$elem.on("dragstart.owl", function(event) {
                event.preventDefault();
            }), base.$elem.on("mousedown.disableTextSelect", function(e) {
                return $(e.target).is("input, textarea, select, option");
            });
        },
        gestures: function() {
            function getTouches(event) {
                if (void 0 !== event.touches) return {
                    x: event.touches[0].pageX,
                    y: event.touches[0].pageY
                };
                if (void 0 === event.touches) {
                    if (void 0 !== event.pageX) return {
                        x: event.pageX,
                        y: event.pageY
                    };
                    if (void 0 === event.pageX) return {
                        x: event.clientX,
                        y: event.clientY
                    };
                }
            }
            function swapEvents(type) {
                "on" === type ? ($(document).on(base.ev_types.move, dragMove), $(document).on(base.ev_types.end, dragEnd)) : "off" === type && ($(document).off(base.ev_types.move), 
                $(document).off(base.ev_types.end));
            }
            function dragStart(event) {
                var position, ev = event.originalEvent || event || window.event;
                if (3 === ev.which) return !1;
                if (!(base.itemsAmount <= base.options.items)) {
                    if (base.isCssFinish === !1 && !base.options.dragBeforeAnimFinish) return !1;
                    if (base.isCss3Finish === !1 && !base.options.dragBeforeAnimFinish) return !1;
                    base.options.autoPlay !== !1 && window.clearInterval(base.autoPlayInterval), base.browser.isTouch === !0 || base.$owlWrapper.hasClass("grabbing") || base.$owlWrapper.addClass("grabbing"), 
                    base.newPosX = 0, base.newRelativeX = 0, $(this).css(base.removeTransition()), position = $(this).position(), 
                    locals.relativePos = position.left, locals.offsetX = getTouches(ev).x - position.left, 
                    locals.offsetY = getTouches(ev).y - position.top, swapEvents("on"), locals.sliding = !1, 
                    locals.targetElement = ev.target || ev.srcElement;
                }
            }
            function dragMove(event) {
                var minSwipe, maxSwipe, ev = event.originalEvent || event || window.event;
                base.newPosX = getTouches(ev).x - locals.offsetX, base.newPosY = getTouches(ev).y - locals.offsetY, 
                base.newRelativeX = base.newPosX - locals.relativePos, "function" == typeof base.options.startDragging && locals.dragging !== !0 && 0 !== base.newRelativeX && (locals.dragging = !0, 
                base.options.startDragging.apply(base, [ base.$elem ])), (base.newRelativeX > 8 || base.newRelativeX < -8) && base.browser.isTouch === !0 && (void 0 !== ev.preventDefault ? ev.preventDefault() : ev.returnValue = !1, 
                locals.sliding = !0), (base.newPosY > 10 || base.newPosY < -10) && locals.sliding === !1 && $(document).off("touchmove.owl"), 
                minSwipe = function() {
                    return base.newRelativeX / 5;
                }, maxSwipe = function() {
                    return base.maximumPixels + base.newRelativeX / 5;
                }, base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe()), base.browser.support3d === !0 ? base.transition3d(base.newPosX) : base.css2move(base.newPosX);
            }
            function dragEnd(event) {
                var newPosition, handlers, owlStopEvent, ev = event.originalEvent || event || window.event;
                ev.target = ev.target || ev.srcElement, locals.dragging = !1, base.browser.isTouch !== !0 && base.$owlWrapper.removeClass("grabbing"), 
                base.dragDirection = base.owl.dragDirection = base.newRelativeX < 0 ? "left" : "right", 
                0 !== base.newRelativeX && (newPosition = base.getNewPosition(), base.goTo(newPosition, !1, "drag"), 
                locals.targetElement === ev.target && base.browser.isTouch !== !0 && ($(ev.target).on("click.disable", function(ev) {
                    ev.stopImmediatePropagation(), ev.stopPropagation(), ev.preventDefault(), $(ev.target).off("click.disable");
                }), handlers = $._data(ev.target, "events").click, owlStopEvent = handlers.pop(), 
                handlers.splice(0, 0, owlStopEvent))), swapEvents("off");
            }
            var base = this, locals = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };
            base.isCssFinish = !0, base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },
        getNewPosition: function() {
            var base = this, newPosition = base.closestItem();
            return newPosition > base.maximumItem ? (base.currentItem = base.maximumItem, newPosition = base.maximumItem) : base.newPosX >= 0 && (newPosition = 0, 
            base.currentItem = 0), newPosition;
        },
        closestItem: function() {
            var base = this, array = base.options.scrollPerPage === !0 ? base.pagesInArray : base.positionsInArray, goal = base.newPosX, closest = null;
            return $.each(array, function(i, v) {
                goal - base.itemWidth / 20 > array[i + 1] && goal - base.itemWidth / 20 < v && "left" === base.moveDirection() ? (closest = v, 
                base.currentItem = base.options.scrollPerPage === !0 ? $.inArray(closest, base.positionsInArray) : i) : goal + base.itemWidth / 20 < v && goal + base.itemWidth / 20 > (array[i + 1] || array[i] - base.itemWidth) && "right" === base.moveDirection() && (base.options.scrollPerPage === !0 ? (closest = array[i + 1] || array[array.length - 1], 
                base.currentItem = $.inArray(closest, base.positionsInArray)) : (closest = array[i + 1], 
                base.currentItem = i + 1));
            }), base.currentItem;
        },
        moveDirection: function() {
            var direction, base = this;
            return base.newRelativeX < 0 ? (direction = "right", base.playDirection = "next") : (direction = "left", 
            base.playDirection = "prev"), direction;
        },
        customEvents: function() {
            var base = this;
            base.$elem.on("owl.next", function() {
                base.next();
            }), base.$elem.on("owl.prev", function() {
                base.prev();
            }), base.$elem.on("owl.play", function(event, speed) {
                base.options.autoPlay = speed, base.play(), base.hoverStatus = "play";
            }), base.$elem.on("owl.stop", function() {
                base.stop(), base.hoverStatus = "stop";
            }), base.$elem.on("owl.goTo", function(event, item) {
                base.goTo(item);
            }), base.$elem.on("owl.jumpTo", function(event, item) {
                base.jumpTo(item);
            });
        },
        stopOnHover: function() {
            var base = this;
            base.options.stopOnHover === !0 && base.browser.isTouch !== !0 && base.options.autoPlay !== !1 && (base.$elem.on("mouseover", function() {
                base.stop();
            }), base.$elem.on("mouseout", function() {
                "stop" !== base.hoverStatus && base.play();
            }));
        },
        lazyLoad: function() {
            var i, $item, itemNumber, $lazyImg, follow, base = this;
            if (base.options.lazyLoad === !1) return !1;
            for (i = 0; i < base.itemsAmount; i += 1) $item = $(base.$owlItems[i]), "loaded" !== $item.data("owl-loaded") && (itemNumber = $item.data("owl-item"), 
            $lazyImg = $item.find(".lazyOwl"), "string" == typeof $lazyImg.data("src") ? (void 0 === $item.data("owl-loaded") && ($lazyImg.hide(), 
            $item.addClass("loading").data("owl-loaded", "checked")), follow = base.options.lazyFollow === !0 ? itemNumber >= base.currentItem : !0, 
            follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length && base.lazyPreload($item, $lazyImg)) : $item.data("owl-loaded", "loaded"));
        },
        lazyPreload: function($item, $lazyImg) {
            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading"), $lazyImg.removeAttr("data-src"), 
                "fade" === base.options.lazyEffect ? $lazyImg.fadeIn(400) : $lazyImg.show(), "function" == typeof base.options.afterLazyLoad && base.options.afterLazyLoad.apply(this, [ base.$elem ]);
            }
            function checkLazyImage() {
                iterations += 1, base.completeImg($lazyImg.get(0)) || isBackgroundImg === !0 ? showImage() : 100 >= iterations ? window.setTimeout(checkLazyImage, 100) : showImage();
            }
            var isBackgroundImg, base = this, iterations = 0;
            "DIV" === $lazyImg.prop("tagName") ? ($lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")"), 
            isBackgroundImg = !0) : $lazyImg[0].src = $lazyImg.data("src"), checkLazyImage();
        },
        autoHeight: function() {
            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px"), base.wrapperOuter.hasClass("autoHeight") || window.setTimeout(function() {
                    base.wrapperOuter.addClass("autoHeight");
                }, 0);
            }
            function checkImage() {
                iterations += 1, base.completeImg($currentimg.get(0)) ? addHeight() : 100 >= iterations ? window.setTimeout(checkImage, 100) : base.wrapperOuter.css("height", "");
            }
            var iterations, base = this, $currentimg = $(base.$owlItems[base.currentItem]).find("img");
            void 0 !== $currentimg.get(0) ? (iterations = 0, checkImage()) : addHeight();
        },
        completeImg: function(img) {
            var naturalWidthType;
            return img.complete ? (naturalWidthType = typeof img.naturalWidth, "undefined" !== naturalWidthType && 0 === img.naturalWidth ? !1 : !0) : !1;
        },
        onVisibleItems: function() {
            var i, base = this;
            for (base.options.addClassActive === !0 && base.$owlItems.removeClass("active"), 
            base.visibleItems = [], i = base.currentItem; i < base.currentItem + base.options.items; i += 1) base.visibleItems.push(i), 
            base.options.addClassActive === !0 && $(base.$owlItems[i]).addClass("active");
            base.owl.visibleItems = base.visibleItems;
        },
        transitionTypes: function(className) {
            var base = this;
            base.outClass = "owl-" + className + "-out", base.inClass = "owl-" + className + "-in";
        },
        singleItemTransition: function() {
            function transStyles(prevPos) {
                return {
                    position: "relative",
                    left: prevPos + "px"
                };
            }
            var base = this, outClass = base.outClass, inClass = base.inClass, $currentItem = base.$owlItems.eq(base.currentItem), $prevItem = base.$owlItems.eq(base.prevItem), prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem], origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2, animEnd = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
            base.isTransition = !0, base.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": origin + "px",
                "-moz-perspective-origin": origin + "px",
                "perspective-origin": origin + "px"
            }), $prevItem.css(transStyles(prevPos, 10)).addClass(outClass).on(animEnd, function() {
                base.endPrev = !0, $prevItem.off(animEnd), base.clearTransStyle($prevItem, outClass);
            }), $currentItem.addClass(inClass).on(animEnd, function() {
                base.endCurrent = !0, $currentItem.off(animEnd), base.clearTransStyle($currentItem, inClass);
            });
        },
        clearTransStyle: function(item, classToRemove) {
            var base = this;
            item.css({
                position: "",
                left: ""
            }).removeClass(classToRemove), base.endPrev && base.endCurrent && (base.$owlWrapper.removeClass("owl-origin"), 
            base.endPrev = !1, base.endCurrent = !1, base.isTransition = !1);
        },
        owlStatus: function() {
            var base = this;
            base.owl = {
                userOptions: base.userOptions,
                baseElement: base.$elem,
                userItems: base.$userItems,
                owlItems: base.$owlItems,
                currentItem: base.currentItem,
                prevItem: base.prevItem,
                visibleItems: base.visibleItems,
                isTouch: base.browser.isTouch,
                browser: base.browser,
                dragDirection: base.dragDirection
            };
        },
        clearEvents: function() {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect"), $(document).off(".owl owl"), 
            $(window).off("resize", base.resizer);
        },
        unWrap: function() {
            var base = this;
            0 !== base.$elem.children().length && (base.$owlWrapper.unwrap(), base.$userItems.unwrap().unwrap(), 
            base.owlControls && base.owlControls.remove()), base.clearEvents(), base.$elem.attr("style", base.$elem.data("owl-originalStyles") || "").attr("class", base.$elem.data("owl-originalClasses"));
        },
        destroy: function() {
            var base = this;
            base.stop(), window.clearInterval(base.checkVisible), base.unWrap(), base.$elem.removeData();
        },
        reinit: function(newOptions) {
            var base = this, options = $.extend({}, base.userOptions, newOptions);
            base.unWrap(), base.init(options, base.$elem);
        },
        addItem: function(htmlString, targetPosition) {
            var position, base = this;
            return htmlString ? 0 === base.$elem.children().length ? (base.$elem.append(htmlString), 
            base.setVars(), !1) : (base.unWrap(), position = void 0 === targetPosition || -1 === targetPosition ? -1 : targetPosition, 
            position >= base.$userItems.length || -1 === position ? base.$userItems.eq(-1).after(htmlString) : base.$userItems.eq(position).before(htmlString), 
            void base.setVars()) : !1;
        },
        removeItem: function(targetPosition) {
            var position, base = this;
            return 0 === base.$elem.children().length ? !1 : (position = void 0 === targetPosition || -1 === targetPosition ? -1 : targetPosition, 
            base.unWrap(), base.$userItems.eq(position).remove(), void base.setVars());
        }
    };
    $.fn.owlCarousel = function(options) {
        return this.each(function() {
            if ($(this).data("owl-init") === !0) return !1;
            $(this).data("owl-init", !0);
            var carousel = Object.create(Carousel);
            carousel.init(options, this), $.data(this, "owlCarousel", carousel);
        });
    }, $.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [ 1199, 4 ],
        itemsDesktopSmall: [ 979, 3 ],
        itemsTablet: [ 768, 2 ],
        itemsTabletSmall: !1,
        itemsMobile: [ 479, 1 ],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: [ "prev", "next" ],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    };
}(jQuery, window, document), conditionizr.add("ios", [], function() {
    return /iP(ad|hone|od)/i.test(navigator.userAgent);
}), conditionizr.load("resources/js/ios.js", [ "ios" ]), $(document).ready(function() {
    $("html").addClass("onLoad"), $("#slider").owlCarousel({
        navigation: !1,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0,
        stopOnHover: !0,
        autoPlay: 2500
    });
    var $container = $("#j-product-container");
    $container.isotope({
        getSortData: {
            price: function($elem) {
                return parseFloat($elem.find(".merchitem__price").attr("data-price"));
            }
        }
    }), $("#merch-filters a").click(function() {
        $optionSet = $(this).parent(), $optionSet.find(".selected").removeClass("selected"), 
        $(this).addClass("selected");
        var selector = $(this).attr("data-filter");
        $container.isotope({
            filter: selector
        });
    }), $("#merch-sorters a").click(function() {
        $optionSet = $(this).parent(), $optionSet.find(".selected").removeClass("selected"), 
        $(this).addClass("selected");
        var sortName = $(this).attr("data-sort");
        $container.isotope({
            sortBy: sortName,
            sortAscending: !0
        });
    }), $("#merch-priceHigh").click(function() {
        $container.isotope({
            sortBy: "price",
            sortAscending: !1
        });
    }), $(".nav__list a").click(function() {
        $("#header__toggle").prop("checked", !1);
    });
});