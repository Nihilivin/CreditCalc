/**
 * @file Main calculator client-side script
 *
 * @author Alexandre Germain
 * @copyright 2016 GerkinDevelopment
 * @license none none
 * @package creditcalc
 *
 * @version 0.2.0
 */

/*jslint plusplus: true */
/*jshint strict: true */
/*jslint nomen: true*/
/*jslint browser: true, devel: true, regexp: true, white:true */
/*global d, Event, atob, btoa */

/**
 * @callback EventFunction
 * @param {object} event Event object emitted
 */
/**
 * @typedef DOMElement
 * @type {object}
 * @description {@link http://www.w3schools.com/jsref/dom_obj_all.asp See definition on w3schools.com}
 * @see http://www.w3schools.com/jsref/dom_obj_all.asp
 */

(function () {
    'use strict';
    /**
     * @class Calculator
     * @description Base class that  handles calculations
     * @author Gerkin
     */
    function Calculator() {
        var amount,
            duration,
            rate,
            payment,
            paymentYear = null,
            paymentTotal = null;

        Object.defineProperties(this, {
            /**
             * @member {Integer} amount
             * @description Amount of money borrowed
             * @memberof Calculator
             * @public
             * @instance
             */
            amount: {
                get: function () {
                    return amount;
                },
                set: function (newAmount) {
                    newAmount = parseFloat(newAmount);
                    if (isFinite(newAmount) && newAmount > 0) {
                        amount = newAmount;
                    }
                }
            },
            /**
             * @member {Integer} rate
             * @description Annual rate of the loan
             * @memberof Calculator
             * @public
             * @instance
             */
            rate: {
                get: function () {
                    return rate;
                },
                set: function (newRate) {
                    newRate = parseFloat(newRate);
                    if (isFinite(newRate) && newRate > 0) {
                        rate = newRate;
                    }
                }
            },
            /**
             * @member {Integer} duration
             * @description Total duration of the loan, in years
             * @memberof Calculator
             * @public
             * @instance
             */
            duration: {
                get: function () {
                    return duration;
                },
                set: function (newDuration) {
                    newDuration = parseFloat(newDuration);
                    if (isFinite(newDuration) && newDuration > 0) {
                        duration = newDuration;
                    }
                }
            },
            /**
             * @member {Integer} payment
             * @description Payment of a mensuality
             * @memberof Calculator
             * @public
             * @instance
             */
            payment: {
                get: function () {
                    return payment;
                },
                set: function (newPayment) {
                    newPayment = parseFloat(newPayment);
                    if (isFinite(newPayment) && newPayment > 0) {
                        payment = newPayment;
                    }
                }
            },
            /**
             * @member {Integer} paymentYear
             * @description Payment of a year of mensualities
             * @memberof Calculator
             * @public
             * @instance
             * @readonly
             */
            paymentYear: {
                get: function (){
                    return paymentYear;
                },
                set: function (newPaymentYear) {
                    newPaymentYear = parseFloat(newPaymentYear);
                    console.log(newPaymentYear);
                    if (isFinite(newPaymentYear) && newPaymentYear > 0) {
                        paymentYear = newPaymentYear;
                        paymentTotal = newPaymentYear * duration;
                    }
                }
            },
            paymentTotal: {
                get: function(){
                    return paymentTotal;
                }
            }
        });
    }
    Calculator.prototype = {
        /**
         * @function calc_amount
         * @memberof Calculator
         * @description Calculates the {@link Calculator#amount amount borrowed}, according to given {@link Calculator#duration duration}, {@link Calculator#rate rate} and {@link Calculator#payment monthly payment}
         * @author Gerkin
         * @returns {float} The amount of the loan
         */
        calc_amount: function () {
            var self = this,
                mensualRate = self.rate / 1200;
            return self.payment * ((1 - (1 / Math.pow(1 + mensualRate, 12 * self.duration))) / mensualRate);
        },
        /**
         * @function calc_duration
         * @memberof Calculator
         * @description Calculates the {@link Calculator#duration duration} of the loan, according to given {@link Calculator#amount amount borrowed}, {@link Calculator#rate rate} and {@link Calculator#payment monthly payment}
         * @author Gerkin
         * @returns {float} The duration of the loan
         */
        calc_duration: function () {
            var self = this,
                r = self.rate / 1200;
            return Math.log(-self.payment / ((r * self.amount) - self.payment)) / (12 * Math.log(r + 1));
        },
        /**
         * @function calc_rate
         * @memberof Calculator
         * @description Calculates the {@link Calculator#rate annual rate} of the loan, according to given {@link Calculator#amount amount borrowed}, {@link Calculator#duration duration} and {@link Calculator#payment monthly payment}. Notice: this function is iterative, and may return non-exact values
         * @author Gerkin
         * @returns {float} The annual rate of the loan
         */
        calc_rate: function () {
            var self = this,
                tempCalc = new Calculator(),
                rate = 0,
                lastRate,
                step = 1,
                exitCount = 0,
                amount;
            if (self.payment * (self.duration * 12) < self.amount) {
                return 0;
            }
            tempCalc.duration = self.duration;
            tempCalc.payment = self.payment;
            while (step > 0.0001 && exitCount <= 999) {
                exitCount++;
                lastRate = rate;
                rate += step;
                tempCalc.rate = rate;
                amount = tempCalc.calc_amount();
                if (amount < self.amount) {
                    step /= 10;
                    rate = lastRate;
                } else if (amount === self.amout) {
                    exitCount = 1000;
                }
            }
            return rate;
        },
        /**
         * @function calc_payment
         * @memberof Calculator
         * @description Calculates the {@link Calculator#payment monthly payment} of the loan, according to given {@link Calculator#amount amount borrowed}, {@link Calculator#rate rate} and {@link Calculator#duration duration}
         * @author Gerkin
         * @returns {float} The monthly payment of the loan
         */
        calc_payment: function () {
            var self = this,
                mensualRate = self.rate / 1200;
            return (self.amount * mensualRate) / (1 - (1 / Math.pow((1 + mensualRate), 12 * self.duration)));
        }
    };


    function isNA(value) {
        return value === null || typeof value === "undefined";
    }
    /**
 * @function attach
 * @description Bind events with specified functions on specified elements
 * @param {DOMElement|DOMElement[]}					a	DOMElements to bind
 * @param {string|string[]}					b	Events to bind
 * @param {EventFunction|EventFunction[]}	c	Functions to attach
 * @since 0.1.0
 */
    function attach(a, b, c) {
        /**
	 * @function _attach
	 * @description Single-valued version of {@link ImageZoom.attach attach}. hould not be called directly
	 * @param {DOMElement}			a DOMElement to bind
	 * @param {string}			b Event to bind
	 * @param {EventFunction}	c Function to attach
     * @inner
	 * @since 0.1.0
	 */
        function _attach(a, b, c) {
            var i = a && b && c && (a.addEventListener || a.attachEvent).call(a, b, c);
        }
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        if (isNA(c) || c.constructor.name !== "Array") {c = [c]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length, K = c.length;
        for (i = 0; i < I; i++) { for (j = 0; j < J; j++) { for (k = 0; k < K; k++) {
            _attach(a[i], b[j], c[k]);
        } } }
    }

    /**
 * @function detach
 * @description Unbind events with specified functions on specified elements
 * @param {DOMElement|DOMElement[]}					a	DOMElements to unbind
 * @param {string|string[]}					b	Events to unbind
 * @param {EventFunction|EventFunction[]}	c	Functions to detach
 * @since 0.1.0
 */
    function detach(a, b, c) {
        /**
	 * @function _detach
	 * @description Single-valued version of {@link ImageZoom.detach detach}. hould not be called directly
	 * @param {DOMElement}			a DOMElement to unbind
	 * @param {string}			b Event to unbind
	 * @param {EventFunction}	c Function to detach
     * @inner
	 * @since 0.1.0
	 */
        function _detach(a, b, c) {
            var i = a && b && c && (a.removeEventListener || a.detachEvent).call(a, b, c);
        }
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        if (isNA(c) || c.constructor.name !== "Array") {c = [c]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length, K = c.length;
        for (i = 0; i < I; i++) {for (j = 0; j < J; j++) {for (k = 0; k < K; k++) {
            _detach(a[i], b[j], c[k]);
        } } }
    }

    function triggerEvent(a, b, c) {
        /**
	 * @function _triggerEvent
	 * @description Single-valued version of {@link ImageZoom.triggerEvent detach}. Should not be called directly
	 * @param {DOMElement}			a DOMElement to unbind
	 * @param {string}			b Event name
	 * @param {object}	c Event object to send (unused)
     * @inner
	 * @since 0.1.0
	 */
        function _triggerEvent(a, b, c, e) {
            if (a && b && c) {
                if (d.createEvent) {
                    e = new Event(b);
                    a.dispatchEvent(e);
                } else {
                    e = d.createEventObject();
                    a.fireEvent("on" + b, e);
                }
            }
        }
        if (isNA(a) || a.constructor.name !== "Array") {a = [a]; }
        if (isNA(b) || b.constructor.name !== "Array") {b = [b]; }
        if (isNA(c) || c.constructor.name !== "Array") {c = [c]; }
        var i = 0, j = 0, k = 0, I = a.length, J = b.length;
        for (i = 0; i < I; i++) { for (j = 0; j < J; j++) {
            _triggerEvent(a[i], b[j], c);
        } }
    }


    var hashTable = {
        amount: 1,
        duration: 2,
        rate: 3,
        payment: 4,
        paymentYear: 5,
        wasCalc: 9
    },
        hashTableK = Object.keys(hashTable);


    var hashBase = new Base(
        "!$&'()*+,;=-._~:@/?ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz0123456789");// Sort by inference
    var dataBase = new Base(
        ":1234567890,.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");// Sort by inference
    /**
     * @function setUrlHash
     * @description Takes an object, and put it as url hash in base64
     * @param {object} obj The object to encode and put in hash
     * @author Gerkin
     */
    function setUrlHash(obj) {
        if (isNA(obj) || obj === "") {
            if (history.pushState) {
                history.pushState(null, null, "");
            } else {
                location.hash = "";
            }
        }
        var tabledObj = {}
        for(var i in obj){
            var val = i === "wasCalc" ? hashTable[obj[i]] : obj[i];
            tabledObj[hashTable[i] || i] = val;
        }
        var json = JSON.stringify(tabledObj),
            string = json.slice(1).slice(0, -1).replace(/"/g, ""),
            hash = dataBase.convert(hashBase, string);
        try {
            if (history.pushState) {
                history.pushState(null, null, '#' + hash);
            } else {
                location.hash = '#' + hash;
            }
        } catch (e) {
            console.error("Could not change hash:", e);
        }
    }
    /**
     * @function getUrlHash
     * @description Returns the base64 decoded hash of the url
     * @returns {object} The decoded object
     * @author Gerkin
     */
    function getUrlHash() {
        var hash = location.hash.slice(1),
            obj = {},
            decoded;
        try {
            decoded = hashBase.convert(dataBase, hash);
            obj = JSON.parse(("{" + decoded + "}").replace(/(\{|,)([^:]+)|([a-zA-Z]+)/g,'$1"$2$3"'));
        } catch (e) {console.error(e, e.stack)}
        var tabledObj = {};
        for(var i in obj){
            var val = hashTableK.filter(function(k){
                return hashTable[k] == i;
            })[0] === "wasCalc" ? hashTableK.filter(function(k){
                return hashTable[k] == obj[i];
            })[0] : obj[i];
            tabledObj[hashTableK.filter(function(k){
                return hashTable[k] == i;
            })[0] || i] = val;
        }
        return tabledObj;
    }

    /**
     * @function gei
     * @description Minification shorthand for {@link DOMElement}.getElementById
     * @author Gerkin
     * @param {string} s The id of required element
     * @returns {DOMElement|null} The DOMElement, or null if not found
     */
    function gei(s) {return d.getElementById(s); }
    function qs(s,e) {return (e||d).querySelector(s); }
    function qsa(s,e) {return (e||d).querySelectorAll(s); }
    function geiN(s) {return gei(s) || {};}
    function qsN(s,e) {return qs(s,e) || {}; }
    function qsaN(s,e) {return qsa(s) || {}; }
    function hop(a,v) {return a.hasOwnProperty(v); }


    var months = {
        1: {
            full: "Janvier",
            short: "Janv."
        },
        2: {
            full: "Février",
            short: "Févr."
        },
        3: {
            full: "Mars",
            short: "Mars"
        },
        4: {
            full: "Avril",
            short: "Avr."
        },
        5: {
            full: "Mai",
            short: "Mai"
        },
        6: {
            full: "Juin",
            short: "Juin"
        },
        7: {
            full: "Juillet",
            short: "Juil."
        },
        8: {
            full: "Aout",
            short: "Aout"
        },
        9: {
            full: "Septembre",
            short: "Sept."
        },
        10: {
            full: "Octobre",
            short: "Oct."
        },
        11: {
            full: "Novembre",
            short: "Nov."
        },
        12: {
            full: "Décembre",
            short: "Déc."
        }
    },
        d = document,
        /**
     * @global
     * @name calculator
     * @type {Calculator}
     * @description The main {@link Calculator} instance
     */
        calculator = new Calculator(),
        /**
     * @global
     * @name formElems
     * @type {object}
     * @property {DOMElement}  calculatorVariables.calc The calcul trigger button
     * @description {@link DOMElement DOMElements} stored in memory to avoid most of the DOM queries
     */
        formElems = {},
        /**
     * @global
     * @name calculatorVariables
     * @description The list of handled form sets
     * @type {string[]}
     * @readonly
     * @enum {string}
     */
        calculatorVariables = {"amount": 0, "duration": 1, "rate": 2, "payment": 3},

        graphElems = {y:[],m:[]},
        bodyGraph = gei("graph_1-body_scroll"),
        prototype = qs(".html-prototype", bodyGraph),
        pseudoContainer = d.createElement("div"),
        prototypeStr;




    calculatorVariables = Object.keys(calculatorVariables);
    window.calculator = calculator;
    prototype.classList.remove("html-prototype")
    pseudoContainer.appendChild(prototype);
    prototypeStr = pseudoContainer.innerHTML;


    /**
 * @function _init
 * @description Init function called once global var are initialized
 * @author Gerkin
 * @inner
 */
    (function _init() {
        /**
         * @function getNumFieldValue
         * @description convert a {@link isParsableNumber parsable string} into a float.
         * @author Gerkin
         * @param   {string|number} str The value to ensure float
         * @returns {number} Numeric value
         */
        function getNumFieldValue(str) {
            return parseFloat(String(str).replace(/ /g, "").replace(/,/g, ".") || 0);
        }
        /**
         * @function preciseValue
         * @description Returns a numeric-casted value of value with the good precision
         * @author Gerkin
         * @param   {calculatorVariables} type  The type of the var. See the list of vars used
         * @param   {string|number} value The string or numeric value to cast
         * @returns {float} Value with the precision according to type
         * @use getNumFieldValue
         */
        function preciseValue(type, value) {
            value = getNumFieldValue(value);
            if (["amount", "payment", "rate"].indexOf(type) !== -1) {
                return (parseFloat((Math.ceil(value * 100)).toFixed(0)) / 100).toFixed(2);
            } else if (type === "duration") {
                return Math.ceil(value).toFixed(0);
            } else if (type === "roundMoney") {
                return (parseFloat((Math.round(value * 100)).toFixed(0)) / 100).toFixed(2);
            }
        }
        /**
         * @function formatDisplayable
         * @description Takes a float and format it with spaces and comma as separator
         * @author Gerkin
         * @param   {float} value  The numeric value to format
         * @returns {string} Displayable string
         */
        function formatDisplayable(value) {
            value += "";
            var parts = value.match(/^(\d*)(?:[.,](\d*))?$/),
                regexReplacePost = /(.*\d)(\d{3})/,
                returnStr,
                regexReplacePre = /(\d{3})(.*\d)/;
            if (isNA(parts) || parts.length === 0) {
                return "";// If the pattern is invalid, return an empty value
            }
            while (parts[1].match(regexReplacePost)) {
                parts[1] = parts[1].replace(regexReplacePost, "$1 $2");
            }
            returnStr = parts[1];
            if (!isNA(parts[2])) {
                returnStr += ",";
                while (parts[2].match(regexReplacePre)) {
                    parts[2] = parts[2].replace(regexReplacePre, "$1 $2");
                }
                returnStr += parts[2];
            }
            return returnStr;
        }
        /**
         * @function isParsableNumber
         * @description Check if the input string contains only understandable chars & with the right format
         * @author Gerkin
         * @param   {string} value  The string to check
         * @returns {boolean} True if parsable, false otherwise. Note: a string with a length of 0 is not parsable
         */
        function isParsableNumber(value) {
            if (value.length > 0) {
                return !(value.match(/[^0-9,. ]/) ||
                         ((value.match(/[.,]/g) || []).length > 1) ||
                         !value.match(/^\d/) ||
                         !value.match(/\d$/));
            }
            return false;
        }
        /**
         * @function enableCalcButtons
         * @description Check each calculation, padlock & pager buttons and set them disabled/enabled depending on missing & provided values.
         * @author Gerkin
         */
        function enableCalcButtons() {
            var type,
                checkValidValue = function (value) {
                    return value !== type && isParsableNumber(formElems[value].value.value);
                };
            for (type in formElems) {
                if (hop(formElems,type)) {
                    formElems[type].padlock.disabled = !isParsableNumber(formElems[type].value.value); // Disable padlock button if non valid value
                    formElems[type].calc.disabled = Object.keys(formElems).filter(checkValidValue).length !== 3; // Enable Calc button if the 3 other values are filled
                }
            }
        }
        /**
         * @function getVarValue
         * @description Retrieves the input value for choosen var. Also clears some styles
         * @author Gerkin
         * @param   {calculatorVariables} type  The name of the var to retrieve
         * @returns {float|0} The numeric value of the input. 0 if invalid
         */
        function getVarValue(type) {
            if (formElems[type] && formElems[type].value) {
                formElems[type].value.classList.remove("calculated");
                return getNumFieldValue(formElems[type].value.value);
            }
            return 0;
        }

        function formatHtmlPrototype(DOMElement, replacements){
            var table = d.createElement('table'),
                tableBody = d.createElement('tbody'),
                DOMClone = DOMElement.cloneNode(true);
            table.appendChild(tableBody);

            DOMClone.classList.remove("html-prototype");

            tableBody.appendChild(DOMClone);
            tableBody.innerHTML = replacePlaceholders(tableBody.innerHTML, replacements);
            return tableBody.firstChild;
        }

        function getPayments(calc) {
            var amount = calc.amount,
                loanLeft = amount,
                payment = calc.payment,
                rate = calc.rate,
                monthRate = (rate / 1200),
                a = monthRate + 1,
                b = -payment,
                r = b / (1 - a),
                n = 1,
                payments = [],
                newLoanLeft,
                newPayment;

            while (Math.round(loanLeft * 100) > 0) {
                newLoanLeft = (Math.pow(a, n) * (amount - r)) + r;
                n++;
                newPayment = {
                    interests: loanLeft * monthRate,
                    loan: payment - (loanLeft * monthRate),
                    amountAtBegin: loanLeft,
                    loanLeft: newLoanLeft
                };
                loanLeft = newLoanLeft;
                payments.push(newPayment);
            }
            return payments;
        }


        var dynamicStylesheet = d.createElement('style'),
            repeatableButtons = qsa("button.repeatable"),
            i,
            j,
            initRepeatableButton = function (i) {
                var button = repeatableButtons[i],
                    timer,
                    step,
                    basestep = button.getAttribute("data-timer-basestep") || 500,
                    count;
                attach(button, "mousedown", function () {
                    count++;
                    step = basestep / (Math.log(Math.pow(count, 2)) + 1);
                    timer = setTimeout(function () {
                        triggerEvent(button, "mousedown");
                    }, step);
                });
                attach([button, window], ["mouseup", "mouseleave", "blur"], function () {
                    clearTimeout(timer);
                    step = basestep;
                    count = 0;
                });
                triggerEvent(button, "mouseup");
            },
            initCalculatorInput = function (i) {
                var j = calculatorVariables[i];
                formElems[j] = {
                    calc: gei(j + "-button"),
                    value: gei(j + "-value"),
                    buttonsContainer: gei(j + "-buttons-plus-minus-container"),
                    padlock: gei(j + "-padlock"),
                    plus: gei(j + "-plus"),
                    minus: gei(j + "-minus")
                };
                formElems[j].value.setAttribute("data-placeholder", formElems[j].value.placeholder);

                // Bind event listeners
                formElems[j].calculate = (function () {
                    var arrNoI = calculatorVariables.filter(function (v) {return v !== j; }),
                        type = j;
                    return function () {
                        var c = calculator,
                            k,
                            result,
                            valueContainer = formElems[type].value;

                        for (k in arrNoI) {
                            if (hop(arrNoI,k)) {
                                c[arrNoI[k]] = getVarValue(arrNoI[k]);
                            }
                        }
                        result = c["calc_" + type]();
                        if(type === "payment"){
                            calculator["paymentYear"] = result * 12;
                        } else {
                            calculator["paymentYear"] = calculator["payment"];
                        }
                        calculator[type] = result;
                        valueContainer.value = formatDisplayable(preciseValue(type, result));
                        setUrlHash({
                            amount: parseFloat(preciseValue("amount", c.amount)),
                            duration: parseFloat(preciseValue("duration", c.duration)),
                            rate: parseFloat(preciseValue("rate", c.rate)),
                            payment: parseFloat(preciseValue("payment", c.payment)),
                            paymentYear: parseFloat(preciseValue("payment", c.paymentYear)),
                            wasCalc: type
                        });
                        valueContainer.classList.add("calculated");
                        enableCalcButtons();
                        generateGraph();
                    };
                }());
                attach(formElems[j].calc, "click", formElems[j].calculate);
                attach([formElems[j].padlock], "click", (function () {
                    var target = formElems[j].buttonsContainer;
                    return function () {
                        target.classList.toggle("locked");
                        var doIncrement = calculatorVariables.filter(function (value) {
                            return formElems[value].buttonsContainer.classList.contains("locked");
                        }).length === 2;
                        calculatorVariables.forEach(function (value) {
                            var bc = formElems[value].buttonsContainer;
                            if (!bc.classList.contains("locked") && doIncrement === true) {
                                bc.classList.add("increment");
                            } else {
                                bc.classList.remove("increment");
                            }
                        });
                    };
                }()));
                attach([formElems[j].plus, formElems[j].minus], "mousedown", (function () {
                    var target = formElems[j].value,
                        type = j;
                    return function valueIncDec(e) {
                        var factor,
                            step, // Incremental/decremental step
                            bounds, // Defines the min & max values
                            dec,
                            rev,
                            tempvalue; // Force round value
                        if (e.target.id === type + "-plus") {
                            factor = 1;
                        } else if (e.target.id === type + "-minus") {
                            factor = -1;
                        } else {
                            factor = 0;
                        }

                        switch (type) {
                            case "duration":
                                dec = -0.001;
                                step = 1;
                                bounds = [0,+Infinity];
                                break;

                            case "amount":
                            case "payment":
                                for(rev = 1, tempvalue = getNumFieldValue(target.value); tempvalue > 100 - factor; rev *= 10) {
                                    tempvalue /= 10;
                                }
                                dec = 0.001;
                                step = rev;
                                bounds = [0,+Infinity];
                                break;

                            case "rate":
                                dec = 0.001;
                                if(getNumFieldValue(target.value) > 10) {
                                    step = 1;
                                } else if (getNumFieldValue(target.value) < 1 - factor*0.001) {
                                    step = 0.01;
                                } else {
                                    step = 0.1;
                                }

                                bounds = [0,10];
                                break;
                        }
                        target.value = formatDisplayable(
                            preciseValue(
                                type,
                                Math.max(
                                    bounds[0],
                                    Math.min(
                                        bounds[1],
                                        getNumFieldValue(target.value) + step * factor
                                    )
                                ).toFixed(2) - dec
                            )
                        );
                        enableCalcButtons();
                        calculatorVariables.forEach(function(value){
                            if(value !== j && formElems[value].buttonsContainer.classList.contains("increment")) {
                                formElems[value].calculate();
                            }
                        });
                    };
                }()));
                /**
                 * @function clearInputStyles
                 * @description Clear class, custom validity & placeholder from input
                 * @author Gerkin
                 * @inner
                 */
                attach(formElems[j].value,"focus", function clearInputStyles(){
                    this.setCustomValidity("");
                    this.placeholder = '';
                    this.classList.remove("calculated");
                });
                /**
             * @function checkInput
             * @description Checks if the input has a parsable value, and set the custom validity. Also, it refresh calculation buttons states
             * @author Gerkin
             * @inner
             */
                attach(formElems[j].value,["blur","keyup","change","input"], function checkInput(){
                    var self = this,
                        value = self.value.trim();

                    if(!isParsableNumber(value) && value.length > 0){
                        self.setCustomValidity("Cette valeur n'est pas une valeur numérique acceptable");
                    } else {
                        self.setCustomValidity("");
                    }
                    enableCalcButtons();
                });
                /**
             * @function filterChars
             * @description Allow only some chars in input. If the pressed key is not allowed, this function will kill the event and prevent the char from being added
             * @author Gerkin
             * @param   {KeyboardEvent} e Event emitted by "keypress" event
             * @inner
             */
                attach(formElems[j].value,"keypress", function filterChars(e){
                    if(!String.fromCharCode(e.which || e.keyCode).match(/^[0-9,. ]$/)) {
                        e.preventDefault();
                    }
                    if((e.which || e.keyCode) == 13){ // On "enter"
                        formElems[j].calculate();
                    }
                });
                /**
             * @function formatInput
             * @description Reformat the input value, and re-check value validity
             * @author Gerkin
             * @inner
             */
                attach(formElems[j].value,"blur", function formatInput(){
                    var self = this;
                    self.placeholder = self.getAttribute("data-placeholder");
                    if(isParsableNumber(self.value)){
                        self.value = formatDisplayable(preciseValue(j, self.value));
                    }else if(self.value === ""){
                        self.setCustomValidity("");
                    }else{
                        self.setCustomValidity("Cette valeur n'est pas une valeur numérique acceptable");
                    }
                });
                attach(gei('toggle-year_month-input'), "change", (function(){
                    var graphTable = gei('depreciation_schedule'),
                        input = gei('toggle-year_month-input');
                    /**
                 * @function setGraphDisplayMode
                 * @description Changes the attribute of graph table to display months or years
                 * @author Gerkin
                 * @inner
                 */
                    function setGraphDisplayMode(){
                        //graphTable.setAttribute("data-display-mode", input.checked ? "monthly" : "yearly");
                    }
                    setGraphDisplayMode();
                    return setGraphDisplayMode;
                }()));
            },
            hashObj = getUrlHash(),
            wasCalculated;

        dynamicStylesheet.id = "dynamicStylesheet";
        qs("head").appendChild(dynamicStylesheet);

        // Enable repeatable buttons
        for (i = 0, j = repeatableButtons.length; i < j; i++) {
            initRepeatableButton(i);
        }
        for (i in calculatorVariables) {
            if (hop(calculatorVariables,i)) {
                initCalculatorInput(i);
            }
        }
        // Try to load hash
        if(Object.keys(hashObj).length !== 0 && hashObj.constructor === Object) {
            for(i in hashObj) {
                console.log(i, calculatorVariables);
                if (hop(hashObj,i)) {
                    calculator[i] = hashObj[i];
                    formElems[i] && (formElems[i].value.value = formatDisplayable(preciseValue(i != "paymentYear" ? i : "payment", hashObj[i])));
                }
            }
            wasCalculated = formElems[hashObj.wasCalc];
            if(Object.keys(formElems).filter(function(v){
                return isParsableNumber(formElems[v].value.value)
            }).length === 4){
                if (wasCalculated) {
                    wasCalculated.value && wasCalculated.value.classList.add("calculated");
                }
                generateGraph(true);
            }
        }
        enableCalcButtons();





        function replacePlaceholders(text, replacements){
            text = text.replace(/\{\s*([\w\.]+)\s*\}/g, function(matched, identifier){
                var identifiers = identifier.split("."),
                    swapReplacements = replacements,
                    i = 0,
                    j = identifiers.length;
                for(i; i < j; i++){
                    // Search in both ancestor & current obj
                    if(typeof replacements === "object"){
                        swapReplacements = swapReplacements[identifiers[i]];
                    } else {
                        swapReplacements = "";
                    }
                    if(swapReplacements === ""){
                        break;
                    }
                }
                return swapReplacements || "";
            });
            return text;
        }

        function parseHtml(str){ // /!\ Single node only
            if(document.createRange){
                var range = document.createRange(),
                    fragment;
                range.selectNode(document.body); // required in Safari
                fragment = range.createContextualFragment(str);
                return fragment.firstChild;
            } else {
                var elem = document.createElement("div");
                elem.innerHTML = str;
                return elem.firstChild;
            }
        }

        var resizeListenerInited = false;
        function generateGraph(onInit){
            function getOrderedPayments(calc, dateStart){
                var paymentsList = getPayments(calc),
                    i = 0,
                    j = paymentsList.length,
                    month = dateStart.getMonth(),
                    yearStart = dateStart.getFullYear(),
                    year = yearStart,
                    payments = {};

                for(; i < j && year < yearStart + 16; i++){
                    month++;
                    if(month > 11 || i === j - 1){
                        for(var k in payments[year]){
                            if(payments[year].hasOwnProperty(k)) {
                                if(isNA(payments[year].loan)) {
                                    payments[year].loan = 0;
                                }
                                payments[year].loan += payments[year][k].loan;
                                if(isNA(payments[year].interests)) {
                                    payments[year].interests = 0;
                                }
                                payments[year].interests += payments[year][k].interests;
                            }
                        }
                        payments[year].loanLeft = paymentsList[i === j - 1 ? i : i - 1].loanLeft;
                    }
                    if(month > 11){
                        month = 0;
                        year++;
                    }
                    if(isNA(payments[year])){
                        payments[year] = {};
                    }
                    payments[year][month + 1] = paymentsList[i];
                }
                return payments;
            }

            var c = calculator,
                dateStart = new Date(), // Change for modulate start of payment. Defaults to "Now"
                dateStart = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1),
                dateEnd = new Date(dateStart.getFullYear() + Math.floor(c.duration), dateStart.getMonth() + Math.round((c.duration % 1) * 12)),
                payments = getOrderedPayments(c,dateStart),
                linesMaxCount = 15,// Change to display more rows
                firstYear = dateStart.getFullYear(),
                extraneousDates = {},
                inRange = {y:{},m:{}};


            // Init years list
            for(var i = 0, year; i < linesMaxCount && !isNA(year = payments[firstYear + i]); i++){
                inRange.y[String(firstYear + i)] = {
                    loanLeft: year.loanLeft,
                    loan: year.loan,
                    interests: year.interests
                };
            }

            // Init months list
            var i = -1,
                month = dateStart.getMonth(),
                yearInc = 0,
                yearO,
                monthO;
            while(++i < linesMaxCount && !isNA(yearO = payments[firstYear + yearInc]) && !isNA(monthO = yearO[month+1])){
                console.log(month, i, monthO);
                inRange.m[i + "_" + months[month + 1].short + " " + (firstYear + yearInc)] = {
                    loanLeft: monthO.loanLeft,
                    loan: monthO.loan,
                    interests: monthO.interests
                };
                month++;
                if(month == 12){
                    yearInc++;
                    month = 0;
                }
            }
            console.log(inRange);


            switchText(gei("datestart"),months[dateStart.getMonth() + 1].full + " " + dateStart.getFullYear(),onInit);
            switchText(gei("dateend"),months[dateEnd.getMonth() + 1].full + " " + dateEnd.getFullYear(),onInit);
            switchText(gei("refund_amount"), formatDisplayable(preciseValue("roundMoney",c.paymentTotal)),onInit);
            switchText(gei("payback_amount"), formatDisplayable(preciseValue("roundMoney",c.amount)),onInit);
            switchText(gei("interests_amount"), formatDisplayable(preciseValue("roundMoney",c.paymentTotal - c.amount)),onInit);

            // Init year lines
            var counter = 0,
                keys = Object.keys(inRange.y),
                keysCount = keys.length;

            for(; counter < keysCount; counter++){
                var key = keys[counter],
                    yearInfos = inRange.y[key],
                    paymentYearFactor = (function(){
                        if(key == dateStart.getFullYear() && key == dateEnd.getFullYear()){
                            return dateEnd.getMonth() - dateStart.getMonth();
                        } else if(key == dateStart.getFullYear()){
                            return 12 - dateStart.getMonth();
                        } else if(key == dateEnd.getFullYear()){
                            return dateEnd.getMonth() + 1
                        } else {
                            return 12
                        }
                    }()) / 12;

                if(isNA(graphElems.y[counter])){
                    // Create the rown
                    var formatted = replacePlaceholders(
                        prototypeStr,
                        {
                            type: "year",
                            label: key,
                            payment: formatDisplayable(preciseValue("roundMoney",c.paymentYear * paymentYearFactor)) + " €",
                            loan_paid: formatDisplayable(preciseValue("roundMoney",yearInfos.loan)) + "€",
                            loan_width:  ((preciseValue("roundMoney",yearInfos.loan) / (c.payment * 12)) * 100) + "%",
                            interests_paid: formatDisplayable(preciseValue("roundMoney",yearInfos.interests)) + "€",
                            interests_width: ((preciseValue("roundMoney",yearInfos.interests) / (c.payment * 12)) * 100) + "%"
                        }
                    ),
                        newElem = parseHtml(formatted);
                    graphElems.y.push(newElem);
                    bodyGraph.appendChild(newElem);
                    newElem.classList.add("inside");
                    if(counter === keysCount - 1){
                        newElem.classList.add("last");
                    }
                } else {
                    // Edit the row
                    graphElems.y[counter].classList.add("inside");
                    if(counter === keysCount - 1){
                        graphElems.y[counter].classList.add("last");
                    } else {
                        graphElems.y[counter].classList.remove("last");
                    }
                    qsN(".date p", graphElems.y[counter]).innerHTML = key;
                    qsN(".payment p", graphElems.y[counter]).innerHTML = formatDisplayable(preciseValue("roundMoney",c.paymentYear * paymentYearFactor)) + " €";
                    qsN(".refund p", graphElems.y[counter]).innerHTML = formatDisplayable(preciseValue("roundMoney",yearInfos.loan)) + "€";
                    qsN(".interests p", graphElems.y[counter]).innerHTML = formatDisplayable(preciseValue("roundMoney",yearInfos.interests)) + "€";
                }
            }
            for(; counter < linesMaxCount; counter++){
                var row = graphElems.y[counter];
                if(!isNA(row)){
                    row.classList.remove("inside");
                    row.classList.remove("last");
                }
            }


            function equalizeWidths(selector, parents){
                parents = [].slice.call(parents);
                var val = 0,
                    parentsCount = parents.length,
                    i = 0;
                for(; i < parentsCount; i++){
                    var child = qs(selector, parents[i]);
                    if(child){
                        val = Math.max(child.offsetWidth, val);
                    }
                }
                return val;
            }
            var yearLines = qsa(".line-year", bodyGraph);
            setTimeout(function(){
                var datesYearWidth = equalizeWidths(".date",yearLines),
                    paymentsYearWidth = equalizeWidths(".payment",yearLines),
                    labelsRefundYearWidth = equalizeWidths(".refund p",yearLines),
                    labelsInterestsYearWidth = equalizeWidths(".interests p",yearLines),
                    lineInfoWidth = datesYearWidth + paymentsYearWidth,
                    maxLoan = Math.max.apply(null,Object.keys(inRange.y).map(function(v){
                        return inRange.y[v].loan;
                    })),
                    maxInterests = Math.max.apply(null,Object.keys(inRange.y).map(function(v){
                        return inRange.y[v].interests;
                    })),
                    maxRatio = maxLoan / maxInterests,
                    maxRatioTotals = c.amount / (c.paymentTotal - c.amount);// Ration between column "refund" && "interests"


                /*qs("thead .loan-paid-graph",graphTable).style.width = ((loanPaid / total) * 100) + "%";
                qs("thead .interests-paid-graph",graphTable).style.width = ((interestsPaid / total) * 100) + "%";*/
                var prefix = "#graph_1 .graph_1-line.line-year ";
                var bodyStylesheet = prefix + ".date{width:"+datesYearWidth+"px}\n"+
                    prefix + ".payment{width:"+paymentsYearWidth+"px}\n"+
                    prefix + ".refund{min-width:"+labelsRefundYearWidth+"px;flex:"+maxRatio+" 0 0}\n"+
                    prefix + ".interests{min-width:"+labelsInterestsYearWidth+"px;flex:"+"1"+" 0 0}\n";
                dynamicStylesheet.innerHTML = bodyStylesheet;

                if(!resizeListenerInited){
                    resizeListenerInited = true;
                    attach(window, "resize", function(e){
                        console.log(e);
                        for(var i = 0; i < keysCount; i++){
                            var data = inRange.y[keys[i]],
                                firstLoanContainer = qs(".refund", yearLines[0]),
                                firstInterestsContainer = qs(".interests", yearLines[0]),
                                reallyUsefullSpace = firstLoanContainer.offsetWidth / firstLoanContainer.offsetWidth;// All lines have the same containers widths
                            if(!isNA(data)){
                                var line = yearLines[i],
                                    loanGraph = qs(".refund .graph-elem", line),
                                    interestsGraph = qs(".interests .graph-elem", line);

                                // Scale graph subelems
                                loanGraph.style.width = (reallyUsefullSpace * firstLoanContainer.offsetWidth * (data.loan / maxLoan)) + "px";
                                interestsGraph.style.width = ((firstLoanContainer.offsetWidth * reallyUsefullSpace) * (data.interests / maxLoan)) + "px";

                            }
                        }
                        // Scale out-of-table components
                        var head = gei("graph_1_head"),
                            headWidth = head.offsetWidth,
                            flexRightWidth = Math.max(
                                labelsInterestsYearWidth,
                                (headWidth - (lineInfoWidth + 40)) / (maxRatio + 1)
                            ),
                            flexLeftWidth = headWidth - flexRightWidth;
                        console.log(lineInfoWidth, (headWidth - (lineInfoWidth + 40)) / (maxRatio + 1));
                        dynamicStylesheet.innerHTML = bodyStylesheet +
                            "#graph_1 .left{min-width:" + flexLeftWidth + "px;max-width:" + flexLeftWidth + "px;width:" + flexLeftWidth + "px;}\n" +
                            "#graph_1 .right{min-width:" + flexRightWidth + "px;max-width:" + flexRightWidth + "px;width:" + flexRightWidth + "px;}\n";
                    });
                }
                triggerEvent(window, "resize");
            },1000);
        }

        function switchText(elem, newText, noAnim){
            noAnim = noAnim === true;
            function switchTextWidthOk(){
                var newWidth = newDom.offsetWidth;
                if(newWidth === 0 && newText.length != 0){
                    return setTimeout(switchTextWidthOk, 10);
                }
                elem.classList.remove("not-animated");
                elem.classList.add("animating");
                elem.style.width = newWidth + "px";
                elem.style.height = newDom.offsetHeight + "px";
                setTimeout(function(){
                    elem.removeChild(elem.lastChild);
                    elem.classList.remove("animating");
                    elem.style.width = "";
                }, 500);
            }

            if(isNA(elem)) {
                return;
            }
            if(noAnim){
                elem.innerHTML = "<span>" + newText + "</span>";
                return;
            }
            var newDom = parseHtml("<span>" + newText + "</span>");
            elem.style.height = elem.firstChild.offsetHeight + "px";
            elem.style.width = elem.firstChild.offsetWidth + "px";

            elem.classList.add("not-animated");
            elem.insertBefore(newDom, elem.firstChild);
            setTimeout(switchTextWidthOk, 10);
        }
        window.switchText = switchText;




        attach([].slice.call(qsa(".pager-button")), "click",(function(){
            var body = qs("body");
            /**
             * @function switchPage
             * @description Switch current page to button target page
             * @author Gerkin
             * @inner
             */
            return function switchPage(){
                body.setAttribute("data-page", this.getAttribute("data-page-target"));

                if(this.id === "pager-button-1_2"){
                    var c = calculator,
                        paymentsList = getPayments(c),
                        dateStart = new Date(),
                        month = dateStart.getMonth(),
                        year = dateStart.getFullYear(),
                        payments = {},
                        i = 0,
                        j = paymentsList.length,
                        k,
                        graphTable,
                        graphTableBody,
                        graphTablePrototype,
                        node,
                        next,
                        firstYear = dateStart.getFullYear(),
                        counterYear = 0,
                        counterMonth = 0,
                        extraneousDates = {},
                        curYear,
                        paymentYear,
                        getHtmlRow = function (type, label, payment){
                            var timeFactor = type==="yearly"?12:1;
                            return formatHtmlPrototype(
                                graphTablePrototype,
                                {
                                    type: type,
                                    label: label,
                                    loan_paid: formatDisplayable(preciseValue("roundMoney",payment.loan)) + "€",
                                    loan_width:  ((preciseValue("roundMoney",payment.loan) / (c.payment * timeFactor)) * 100) + "%",
                                    interests_paid: formatDisplayable(preciseValue("roundMoney",payment.interests)) + "€",
                                    interests_width: ((preciseValue("roundMoney",payment.interests) / (c.payment * timeFactor)) * 100) + "%"
                                }
                            );
                        },
                        yearMonths,
                        paymentMonth,
                        monthLabel,
                        firstCells,
                        minWidth,
                        thisWidth,
                        page2width;

                    console.log(month, year);
                    for(i; i < j; i++){
                        month++;
                        if(month > 11 || i === j - 1){
                            for(k in payments[year]){
                                if(payments[year].hasOwnProperty(k)) {
                                    if(isNA(payments[year].loan)) {
                                        payments[year].loan = 0;
                                    }
                                    payments[year].loan += payments[year][k].loan;
                                    if(isNA(payments[year].interests)) {
                                        payments[year].interests = 0;
                                    }
                                    payments[year].interests += payments[year][k].interests;
                                }
                            }
                            payments[year].loanLeft = paymentsList[i === j - 1 ? i : i - 1].loanLeft;
                        }
                        if(month > 11){
                            month = 0;
                            year++;
                        }
                        if(payments[year] === null){
                            payments[year] = {};
                        }
                        payments[year][month + 1] = paymentsList[i];
                    }

                    // Retrieve prototype
                    graphTable = gei('depreciation_schedule');
                    graphTableBody = qs('#depreciation_schedule-inner tbody',graphTable);
                    graphTablePrototype = qs('.html-prototype',graphTableBody);
                    node = graphTableBody.firstChild;
                    while (node) {
                        next = node.nextElementSibling;
                        if(!node.classList || !node.classList.contains("html-prototype")) {
                            graphTableBody.removeChild(node);
                        }
                        node = next;
                    }

                    (function(){
                        var total = c.payment * (c.duration * 12),
                            loanPaid = c.amount,
                            interestsPaid = total - loanPaid;
                        qs("thead .loan-paid-graph",graphTable).style.width = ((loanPaid / total) * 100) + "%";
                        qs("thead .interests-paid-graph",graphTable).style.width = ((interestsPaid / total) * 100) + "%";
                        qs("thead .loan-paid-value",graphTable).innerHTML = formatDisplayable(preciseValue("roundMoney", loanPaid)) + "€";
                        qs("thead .interests-paid-value",graphTable).innerHTML = formatDisplayable(preciseValue("roundMoney", interestsPaid)) + "€";
                    }());

                    // Init table
                    for (counterYear; counterYear < 15; counterYear++){
                        // Years append
                        curYear = (firstYear + counterYear);
                        paymentYear = payments[curYear];
                        if(typeof paymentYear !== "undefined"){
                            graphTableBody.appendChild(
                                getHtmlRow(
                                    "yearly",
                                    String(curYear),
                                    paymentYear
                                )
                            );
                            for(yearMonths = (firstYear === curYear ? dateStart.getMonth() + 2 : 1); counterMonth < 15 && yearMonths <= 12; ++counterMonth && ++yearMonths){
                                paymentMonth = paymentYear[yearMonths];
                                if(typeof paymentMonth !== "undefined"){
                                    monthLabel = months[yearMonths].short + " " + curYear;
                                    if(counterMonth === 0){
                                        extraneousDates.start = monthLabel;
                                    }
                                    extraneousDates.end = monthLabel;
                                    graphTableBody.appendChild(
                                        getHtmlRow(
                                            "monthly",
                                            monthLabel,
                                            paymentMonth
                                        )
                                    );
                                }
                            }
                        }
                    }
                    geiN("startdate").innerHTML = extraneousDates.start;
                    geiN("enddate").innerHTML=extraneousDates.end;

                    // Set the width of headers
                    firstCells = qsa("tbody td:first-child p",graphTableBody);
                    minWidth = Infinity;
                    for(i = 0, j = firstCells.length; i < j; i++){
                        thisWidth = firstCells[i].offsetWidth;
                        if(thisWidth !== 0){
                            minWidth = Math.min(minWidth, thisWidth);
                        }
                    }
                    dynamicStylesheet.innerHTML = "#depreciation_schedule-inner tbody td:first-child{width:"+minWidth+"px}";

                    page2width = qs("#page-2").offsetWidth;
                    qs("#depreciation_schedule tr.graph-tab td.sep").style.width = (((page2width - minWidth) / 2) + minWidth) + "px";
                }
            };
        }()));
    }());
}());