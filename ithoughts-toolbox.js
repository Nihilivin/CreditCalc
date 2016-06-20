/**
 * @file Minify compliant generic shorthands
 *
 * @author Alexandre Germain
 * @copyright 2016 iThoughts informatique
 * @license none none
 * @package iThoughts-toolbox
 *
 * @version 0.2.0
 */

/**
 * @class EventTarget
 * @description Extended `EvenTarget` class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 */
/**
 * @class Element
 * @description Extended `Element` class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 */
/**
 * @class Document
 * @description Extended `Document` class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 */
/**
 * @class Object
 * @description Extended `Object` class
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
 */
/**
 * @class NodeList
 * @description Extended `NodeList` class
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeList
 */

(function(){
    'use strict';

    var d = document,
        w = window,
        dp = Document.prototype,
        hep = HTMLElement.prototype,
        el = Element,
        elp = el.prototype,
        et = EventTarget,
        etp = et.prototype;



    /**
     * @function gei
     * @description Minification shorthand for {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById Document.getElementById}
     * @author Gerkin
     * @memberof Document
     * @instance
     * @param {string} s The id of the searched element
     * @returns {Element|null} The Element, or null if not found
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
     */
    dp.gei = function(s) {return this.getElementById(s); }
    /**
     * @function gei
     * @description Minification shorthand for {@link Document.gei} on the current `document` global variable
     * @global
     * @author Gerkin
     * @param {string} s The id of the searched element
     * @returns {Element|null} The Element, or null if not found
     */
    w.gei = function(s){return d.gei(s);}
    /**
     * @function qs
     * @description Minification shorthand for {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector Element.querySelector}
     * @author Gerkin
     * @memberof Element
     * @instance
     * @param {string} s The selector of the searched element
     * @returns {Element|null} The Element, or null if not found
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
     */
    dp.qs = elp.qs = function(s) {return this.querySelector(s); }
    w.qs = function(s){return d.qs(s);}
    /**
     * @function qsa
     * @description Minification shorthand for {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll Element.querySelectorAll}
     * @author Gerkin
     * @memberof Element
     * @instance
     * @param {string} s The selector of the searched element
     * @returns {NodeList} The NodeList containing every elements matching the selector
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
     */
    dp.qsa = elp.qsa = function(s) {return this.querySelectorAll(s); }
    w.qsa = function(s){return d.qsa(s);}
    /**
     * @function geiN
     * @description Like {@link Document.gei}, but returns an empty object instead of null to allow 1lvl attribute definition without tests
     * @author Gerkin
     * @memberof Document
     * @instance
     * @param {string} s The selector of the searched element
     * @returns {Element|{}} The Element, or an empty object if not found
     */
    dp.geiN = function(s) {return this.gei(s) || {};}
    /**
     * @function gei
     * @description Minification shorthand for {@link Document.geiN}
     * @author Gerkin
     * @param {string} s The id of the searched element
     * @returns {Element|{}} The Element, or an empty object if not found
     */
    w.geiN = function(s){return d.geiN(s);}
    /**
     * @function qsN
     * @description Like {@link Element.qsN}, but returns an empty object instead of null to allow 1lvl attribute definition without tests
     * @author Gerkin
     * @memberof Element
     * @instance
     * @param {string} s The selector of the searched element
     * @returns {Element|{}} The Element, or an empty object if not found
     */
    dp.qsN = elp.qsN = function(s) {return this.qs(s) || {}; }
    w.qsN = function(s){return d.qsN(s);}
    /**
     * @function hop
     * @description Minification shorthand for {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty Object.hasOwnProperty}
     * @author Gerkin
     * @memberof Object
     * @instance
     * @param {string} v The name of the attribute
     * @returns {Boolean} Returns the same than {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty Object.hasOwnProperty}
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
     */
    Object.prototype.hop = function(v) {return this.hasOwnProperty(v); }
    /**
     * @function isNA
     * @description Tests if the value is null or undefined
     * @author Gerkin
     * @param value The value to test
     * @returns {Boolean} Returns true if `value` is null or undefined
     */
    w.isNA = function(value) {return value === null || typeof value === "undefined";}
    /**
     * @function waitUntil
     * @description Minification shorthand for {@link HTMLDocument}.getElementById
     * @author Gerkin
     * @memberof Function
     * @instance
     * @param {Function} until Function executed on each loop.
     * @param {Number} every Time to wait between each test.
     * @param {Number|false} [max=false]  Time after which `this` will be executed even if `until` still returns false. Set it to false to not set max timeout
     * @param s Minification helper. Do not use
     */
    Function.prototype.waitUntil = function(until, every, max, s){
        if(isNA(until) || until.constructor.name !== "Function")
            throw TypeError('Calling "Function.waitUntil" without test function. Call setTimeout instead');

        s = this;
        max = !isNA(max) && !isNaN(parseInt(max)) ? parseInt(max) : false;
        setTimeout(function(){
            until() || (max !== false && max < 1) ? s.call(s) : s.waitUntil(until, every, max ? max - every : max)
        },every);
    }


    /**
     * @function attach
     * @description Bind events with specified functions on specified elements
     * @global
     * @param {EventTarget|EventTarget[]}					a	EventTarget to bind
     * @param {string|string[]}					b	Events to bind
     * @param {EventFunction|EventFunction[]}	c	Functions to attach
     * @since 0.1.0
     */
    function attach(a, b, c) {
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        if (isNA(c) || c.constructor.name !== "Array") {c = [c]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length, K = c.length;
        for (i = 0; i < I; i++) { for (j = 0; j < J; j++) { for (k = 0; k < K; k++) {
            a[i] instanceof et && a[i].on(b[j], c[k]);
        } } }
    }
    w.attach = attach;
    /**
     * @function attach
     * @description Same as {@link EventTarget#on}
     * @alias EventTarget.on
     * @memberof EventTarget
     * @param {string}			e Event to bind
     * @param {EventFunction}	f Function to attach
     * @instance
     * @see EventTarget#on
     * @since 0.1.0
     */
    etp.on = etp.attach = function(e, f) {
        var i = e && f && (this.addEventListener || this.attachEvent).call(this, e, f);
    }

    /**
     * @function detach
     * @description Unbind events with specified functions on specified elements
     * @global
     * @param {EventTarget|EventTarget[]}					a	EventTarget to unbind
     * @param {string|string[]}					b	Events to unbind
     * @param {EventFunction|EventFunction[]}	c	Functions to detach
     * @since 0.1.0
     */
    function detach(a, b, c) {
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        if (isNA(c) || c.constructor.name !== "Array") {c = [c]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length, K = c.length;
        for (i = 0; i < I; i++) {for (j = 0; j < J; j++) {for (k = 0; k < K; k++) {
            a[i] instanceof EventTarget && a[i].off(b[j], c[k]);
        } } }
    }
    w.detach = detach;
    /**
     * @function detach
     * @description Same as {@link EventTarget#off}
     * @memberof EventTarget
     * @param {string}			e Event to unbind
     * @param {EventFunction}	f Function to detach
     * @instance
     * @see EventTarget#off
     * @since 0.1.0
     */
    etp.off = etp.detach = function(e, f) {
        var i = e && f && (this.removeEventListener || this.detachEvent).call(this, e, f);
    }

    function triggerEvent(a, b) {
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length;
        for (i = 0; i < I; i++) { for (j = 0; j < J; j++) {
            a[i] instanceof et && a[i].go(b[j]);
        } }
    }
    w.triggerEvent = triggerEvent;
    /**
     * @function triggerEvent
     * @description Same as {@link EventTarget#go}
     * @memberof EventTarget
     * @param {string}			b Event name
     * @param e Minification helper. Do not use
     * @instance
     * @see EventTarget#go
     * @since 0.1.0
     */
    etp.go = etp.triggerEvent = function(b, e) {
        if (b) {
            if (d.createEvent) {
                e = new Event(b);
                this.dispatchEvent(e);
            } else {
                e = d.createEventObject();
                this.fireEvent("on" + b, e);
            }
        }
    }
}())