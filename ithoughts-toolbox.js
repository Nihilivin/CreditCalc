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

    /**
     * @function isNA
     * @description Tests if the value is null or undefined
     * @author Gerkin
     * @param value The value to test
     * @returns {Boolean} Returns true if `value` is null or undefined
     */
    function isNA(value) {return value === null || typeof value === "undefined";}

    var d = document,
        w = window,
        el = Element,
        et = typeof EventTarget != "undefined" && !isNA(EventTarget) ? EventTarget : document.createDocumentFragment().constructor
    w.isNA = isNA;



    w.docWidth = function(){
        return w.innerWidth ||
            w.documentElement.clientWidth ||
            w.body.clientWidth ||
            w.body.offsetWidth;
    }
    w.docHeight = function(){
        return w.innerHeight ||
            w.documentElement.clientHeight ||
            w.body.clientHeight ||
            w.body.offsetHeight;
    }
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
    w.gei = function(s,e) {return (e||d).getElementById(s); }
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
    w.qs = function(s,e) {return (e||d).querySelector(s); }
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
    w.qsa = function(s,e) {return (e||d).querySelectorAll(s); }
    /**
     * @function geiN
     * @description Like {@link Document.gei}, but returns an empty object instead of null to allow 1lvl attribute definition without tests
     * @author Gerkin
     * @memberof Document
     * @instance
     * @param {string} s The selector of the searched element
     * @returns {Element|{}} The Element, or an empty object if not found
     */
    w.geiN = function(s,e) {return gei(s,e) || {}; }
    /**
     * @function qsN
     * @description Like {@link Element.qsN}, but returns an empty object instead of null to allow 1lvl attribute definition without tests
     * @author Gerkin
     * @memberof Element
     * @instance
     * @param {string} s The selector of the searched element
     * @returns {Element|{}} The Element, or an empty object if not found
     */
    w.qsN = function(s,e) {return qs(s,e) || {}; }
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
    w.hop = function(s,v) {return s.hasOwnProperty(v); }
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
    w.waitUntil = function(fct, until, every, max){
        if(isNA(until) || until.constructor.name !== "Function")
            throw TypeError('Calling "Function.waitUntil" without test function. Call setTimeout instead');

        max = !isNA(max) && !isNaN(parseInt(max)) ? parseInt(max) : false;
        setTimeout(function(){
            until() || (max !== false && max < 1) ? fct() : waitUntil(fct, until, every, max ? max - every : max)
        },every);
    }


    /**
     * @function on
     * @description Bind events with specified functions on specified elements
     * @global
     * @param {EventTarget|EventTarget[]}					a	EventTarget to bind
     * @param {string|string[]}					b	Events to bind
     * @param {EventFunction|EventFunction[]}	c	Functions to attach
     * @since 0.1.0
     */
    function on(a, b, c) {
        /**
         * @function _on
         * @description Same as {@link EventTarget#on}
         * @alias EventTarget.on
         * @memberof EventTarget
         * @param {string}			e Event to bind
         * @param {EventFunction}	f Function to attach
         * @instance
         * @see EventTarget#on
         * @since 0.1.0
         */
        function _on(s, e, f) {
            var i = e && f && (s.addEventListener || s.attachEvent).call(s, e, f);
        }
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        if (isNA(c) || c.constructor.name !== "Array") {c = [c]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length, K = c.length;
        for (i = 0; i < I; i++) { for (j = 0; j < J; j++) { for (k = 0; k < K; k++) {
            a[i] instanceof et && _on(a[i], b[j], c[k]);
        } } }
    }
    w.on = w.attachEvent = on;

    /**
     * @function off
     * @description Unbind events with specified functions on specified elements
     * @global
     * @param {EventTarget|EventTarget[]}					a	EventTarget to unbind
     * @param {string|string[]}					b	Events to unbind
     * @param {EventFunction|EventFunction[]}	c	Functions to detach
     * @since 0.1.0
     */
    function off(a, b, c) {
        /**
         * @function _off
         * @description Same as {@link EventTarget#off}
         * @memberof EventTarget
         * @param {string}			e Event to unbind
         * @param {EventFunction}	f Function to detach
         * @instance
         * @see EventTarget#off
         * @since 0.1.0
         */
        function _off(s, e, f) {
            var i = e && f && (s.removeEventListener || s.detachEvent).call(s, e, f);
        }
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        if (isNA(c) || c.constructor.name !== "Array") {c = [c]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length, K = c.length;
        for (i = 0; i < I; i++) {for (j = 0; j < J; j++) {for (k = 0; k < K; k++) {
            a[i] instanceof et && _off(a[i], b[j], c[k]);
        } } }
    }
    w.off = w.detachEvent = off;

    function go(a, b) {
        /**
         * @function _go
         * @description Same as {@link EventTarget#go}
         * @memberof EventTarget
         * @param {string}			b Event name
         * @param e Minification helper. Do not use
         * @instance
         * @see EventTarget#go
         * @since 0.1.0
         */
        function _go(s, b, e) {
            if (b) {
                if (d.createEvent) {
                    e = new Event(b);
                    s.dispatchEvent(e);
                } else {
                    e = d.createEventObject();
                    s.fireEvent("on" + b, e);
                }
            }
        }
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length;
        for (i = 0; i < I; i++) { for (j = 0; j < J; j++) {
            a[i] instanceof et && _go(a[i], b[j]);
        } }
    }
    w.go = w.triggerEvent = go;
}())