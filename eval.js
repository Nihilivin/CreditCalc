/**
 * @file Main calculator client-side script
 *
 * @author Alexandre Germain
 * @copyright 2016 GerkinDevelopment
 * @license none none
 * @package creditcalc
 *
 * @version 0.1.0
 */

'use strict';

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

/**
 * @class Calculator
 * @description Base class that  handles calculations
 * @author Gerkin
 */
function Calculator(){
    var amount,
        duration,
        rate,
        payment;

    Object.defineProperties(this,{
        /**
         * @member {Integer} amount
         * @description Amount of money borrowed
         * @memberof Calculator
         * @public
         * @instance
         */
        amount: {
            get: function(){
                return amount;
            },
            set: function(newAmount){
                newAmount = parseFloat(newAmount);
                if(isFinite(newAmount) && newAmount > 0)
                    amount = newAmount;
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
            get: function(){
                return rate;
            },
            set: function(newRate){
                newRate = parseFloat(newRate);
                if(isFinite(newRate) && newRate > 0)
                    rate = newRate;
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
            get: function(){
                return duration;
            },
            set: function(newDuration){
                newDuration = parseFloat(newDuration);
                if(isFinite(newDuration) && newDuration > 0)
                    duration = newDuration;
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
            get: function(){
                return payment;
            },
            set: function(newPayment){
                newPayment = parseFloat(newPayment);
                if(isFinite(newPayment) && newPayment > 0)
                    payment = newPayment;
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
    calc_amount: function(){
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
    calc_duration: function(){
        var self = this,
            r = self.rate / 1200;
        return Math.log(-self.payment/((r*self.amount)-self.payment))/(12*Math.log(r+1));
    },
    /**
     * @function calc_rate
     * @memberof Calculator
     * @description Calculates the {@link Calculator#rate annual rate} of the loan, according to given {@link Calculator#amount amount borrowed}, {@link Calculator#duration duration} and {@link Calculator#payment monthly payment}. Notice: this function is iterative, and may return non-exact values
     * @author Gerkin
     * @returns {float} The annual rate of the loan
     */
    calc_rate: function(){
        var self = this,
            tempCalc = new Calculator(),
            rate = 0,
            lastRate,
            step = 1, 
            exit = 0;
        if (self.payment*(self.duration * 12) < self.amount){
            return 0;
        }
        tempCalc.duration = self.duration;
        tempCalc.payment = self.payment;
        while(step > 0.0001 && exit <= 999){
            exit++;
            lastRate = rate;
            rate += step;
            tempCalc.rate = rate;
            var amount = tempCalc.calc_amount();
            if(amount < self.amount){
                step /= 10;
                rate = lastRate;
            } else if(amount == self.amout){
                exit = 1000;
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
    calc_payment: function(){
        var self = this,
            mensualRate = self.rate / 1200;
        return (self.amount * mensualRate) / (1 - (1 / Math.pow((1 + mensualRate), 12 * self.duration)));
    }
}
/**
 * @function attach
 * @description Bind events with specified functions on specified elements
 * @param {DOMElement|DOMElement[]}					a	DOMElements to bind
 * @param {string|string[]}					b	Events to bind
 * @param {EventFunction|EventFunction[]}	c	Functions to attach
 * @since 0.1.0
 */
function attach(a,b,c){
    /**
	 * @function _attach
	 * @description Single-valued version of {@link ImageZoom.attach attach}. hould not be called directly
	 * @param {DOMElement}			d DOMElement to bind
	 * @param {string}			e Event to bind
	 * @param {EventFunction}	c Function to attach
     * @inner
	 * @since 0.1.0
	 */
    function _attach(a,b,c){a&&b&&c&&(a.addEventListener?a.addEventListener(b,c):a.attachEvent(b,c));}
    if(a==null||typeof a=="undefined"||a.constructor.name!="Array")a=[a];
    if(b==null||typeof b=="undefined"||b.constructor.name!="Array")b=[b];
    if(c==null||typeof c=="undefined"||c.constructor.name!="Array")c=[c];
    var i=0,j=0,k=0,I=a.length,J=b.length,K=c.length;
    for(i=0;i<I;i++){for(j=0;j<J;j++){for(k=0;k<K;k++){
        _attach(a[i],b[j],c[k]);
    }}}
}

/**
 * @function detach
 * @description Unbind events with specified functions on specified elements
 * @param {DOMElement|DOMElement[]}					a	DOMElements to unbind
 * @param {string|string[]}					b	Events to unbind
 * @param {EventFunction|EventFunction[]}	c	Functions to detach
 * @since 0.1.0
 */
function detach(a,b,c){
    /**
	 * @function _detach
	 * @description Single-valued version of {@link ImageZoom.detach detach}. hould not be called directly
	 * @param {DOMElement}			d DOMElement to unbind
	 * @param {string}			e Event to unbind
	 * @param {EventFunction}	c Function to detach
     * @inner
	 * @since 0.1.0
	 */
    function _detach(a,b,c){a&&b&&c&&(a.removeEventListener?a.removeEventListener(b,c):a.detachEvent(b,c));}
    if(a==null||typeof a=="undefined"||a.constructor.name!="Array")a=[a];
    if(b==null||typeof b=="undefined"||b.constructor.name!="Array")b=[b];
    if(c==null||typeof c=="undefined"||c.constructor.name!="Array")c=[c];
    var i=0,j=0,k=0,I=a.length,J=b.length,K=c.length;
    for(i=0;i<I;i++){for(j=0;j<J;j++){for(k=0;k<K;k++){
        _detach(a[i],b[j],c[k]);
    }}}
}

/**
 * @function gei
 * @description Minification shorthand for {@link DOMElement}.getElementById
 * @author Gerkin
 * @param {string} s The id of required element
 * @returns {DOMElement|null} The DOMElement, or null if not found
 */
function gei(s){return document.getElementById(s)};
/**
 * @global calculator
 * @type {Calculator}
 * @description The main {@link Calculator} instance
 */
var calculator = new Calculator();
/**
 * @global formElems
 * @type {object}
 * @property {DOMElement}  calculatorVariables.calc The calcul trigger button
 * @description {@link DOMElement DOMElements} stored in memory to avoid most of the DOM queries
 */
var formElems = {};
/**
 * @global calculatorVariables
 * @description The list of handled form sets
 * @type {[string]}
 * @readonly
 * @enum {string}
 */
var calculatorVariables = {"amount":0,"duration":1,"rate":2,"payment":3};
calculatorVariables = Object.keys(calculatorVariables);


/**
 * @function _init
 * @description Init function called once global var are initialized
 * @author Gerkin
 * @inner
 */
(function _init(){
    /**
     * @function preciseValue
     * @description Returns a numeric-casted value of value with the good precision
     * @author Gerkin
     * @param   {calculatorVariables} type  The type of the var. See the list of vars used
     * @param   {string|number} value The string or numeric value to cast
     * @returns {float} Value with the precision according to type
     * @use getNumFieldValue
     */
    function preciseValue(type, value){
        value = getNumFieldValue(value);
        if(["amount","payment","rate"].indexOf(type) != -1) {
            return (parseFloat((Math.ceil(value * 100)).toFixed(0)) / 100).toFixed(2);
        } else if(type == "duration")
            return Math.floor(value).toFixed(0);
    }
    /**
     * @function formatDisplayable
     * @description Takes a float and format it with spaces and comma as separator
     * @author Gerkin
     * @param   {float} value  The numeric value to format
     * @returns {string} Displayable string
     */
    function formatDisplayable(value){
        value += "";
        var parts = value.match(/^(\d*)(?:[.,](\d*))?$/);
        var regexReplacePost = /(.*\d)(\d{3})/;
        while(parts[1].match(regexReplacePost)){
            parts[1] = parts[1].replace(regexReplacePost, "$1 $2");
        }
        var returnStr = parts[1];
        if(typeof parts[2] != "undefined"){
            var regexReplacePre = /(\d{3})(.*\d)/;
            returnStr += ",";
            while(parts[2].match(regexReplacePre)){
                parts[2] = parts[2].replace(regexReplacePre, "$1 $2");
            }
            returnStr += parts[2];
        }
        return returnStr;
    }
    /**
     * @function enableCalcButtons
     * @description Check each calculation & pager buttons and set them disabled/enabled depending on missing & provided values.
     * @author Gerkin
     */
    function enableCalcButtons(){
        for(var type in formElems){
            formElems[type].calc.disabled = Object.keys(formElems).filter(function(value){
                return value != type && isParsableNumber(formElems[value].value.value)
            }).length != 3
        }
        gei("pager-button-1_2").disabled = Object.keys(formElems).filter(function(value){
            return isParsableNumber(formElems[value].value.value)
        }).length != 4
    }
    /**
     * @function isParsableNumber
     * @description Check if the input string contains only understandable chars & with the right format
     * @author Gerkin
     * @param   {string} value  The string to check
     * @returns {boolean} True if parsable, false otherwise. Note: a string with a length of 0 is not parsable
     */
    function isParsableNumber(value){
        if(value.length > 0){
            return !(value.match(/[^0-9,. ]/) ||
                     ((value.match(/[.,]/g) || []).length > 1) ||
                     !value.match(/^\d/) ||
                     !value.match(/\d$/));
        }
        return false;
    }
    /**
     * @function getVarValue
     * @description Retrieves the input value for choosen var. Also clears some styles
     * @author Gerkin
     * @param   {calculatorVariables} type  The name of the var to retrieve
     * @returns {float|0} The numeric value of the input. 0 if invalid
     */
    function getVarValue(type){ 
        if(formElems[type] && formElems[type].value){
            formElems[type].value.classList.remove("calculated");
            return getNumFieldValue(formElems[type].value.value);
        }
        return 0;
    }
    /**
     * @function getNumFieldValue
     * @description convert a {@link isParsableNumber parsable string} into a float.
     * @author Gerkin
     * @param   {string|number} str The value to ensure float
     * @returns {number} Numeric value
     */
    function getNumFieldValue(str){
        return parseFloat((str+"").replace(/ /g, "").replace(/,/g, ".") || 0);
    }


    for(var i in calculatorVariables){
        (function(){
            var j = calculatorVariables[i];
            formElems[j] = {
                calc: gei(j+"-button"),
                value: gei(j+"-value"),
                minus: gei(j+"-minus"),
                plus: gei(j+"-plus")
            }
            formElems[j].value.setAttribute("data-placeholder", formElems[j].value.placeholder);

            // Bind event listeners
            attach(formElems[j].calc, "click", (function(){
                var arrNoI = calculatorVariables.filter(function(v){return v!=j});
                var type = j;
                return function(){
                    for(var k in arrNoI){
                        calculator[arrNoI[k]] = getVarValue(arrNoI[k]);
                    }
                    console.log(calculator);
                    var result = calculator["calc_"+type]();
                    var valueContainer = formElems[type].value;
                    console.log(result);
                    valueContainer.value = formatDisplayable(preciseValue(type, result));
                    valueContainer.classList.add("calculated");
                    enableCalcButtons();
                }
            })());
            attach([formElems[j].plus,formElems[j].minus],"click",(function(){
                var target = formElems[j].value;
                var type = j;
                return function(e){
                    var factor;
                    if(e.target.id == type + "-plus")
                        factor = 1;
                    else if(e.target.id == type + "-minus")
                        factor = -1;
                    else
                        factor = 0;

                    var step;
                    var bounds;
                    switch(type){
                        case "duration":{
                            step = 1;
                            bounds = [0,+Infinity]
                        } break;

                        case "amount":
                        case "payment":{
                            for(var rev = 1, tempvalue = getNumFieldValue(target.value); tempvalue > 100 - factor; rev *= 10, tempvalue /= 10);
                            step = rev;
                            bounds = [0,+Infinity]
                        } break;

                        case "rate":{
                            step = 0.1;
                            bounds = [1,10]
                        } break;
                    }
                    target.value = formatDisplayable(Math.max(bounds[0], Math.min(bounds[1], preciseValue(type,getNumFieldValue(target.value) + step * factor))));
                }
            })());
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
            })
            /**
             * @function checkInput
             * @description Checks if the input has a parsable value, and set the custom validity. Also, it refresh calculation buttons states
             * @author Gerkin
             * @inner
             */
            attach(formElems[j].value,["blur","keyup","change","input"], function checkInput(){
                var self = this;
                var value = self.value.trim();

                if(!isParsableNumber(value) && value.length > 0){
                    self.setCustomValidity("Cette valeur n'est pas une valeur numérique acceptable");
                } else {
                    self.setCustomValidity("");
                }
                enableCalcButtons();
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
                if(isParsableNumber(self.value))
                    self.value = formatDisplayable(preciseValue(j, self.value));
                else if(self.value == "")
                    self.setCustomValidity("");
                else
                    self.setCustomValidity("Cette valeur n'est pas une valeur numérique acceptable");
            });
        })();
    }
    enableCalcButtons();
    attach([].slice.call(document.querySelectorAll(".pager-button")), "click",(function(){
        var body = document.querySelector("body");
        /**
         * @function switchPage
         * @description Switch current page to button target page
         * @author Gerkin
         * @inner
         */
        return function switchPage(){
            body.setAttribute("data-page", this.getAttribute("data-page-target"));
        };
    })());
})();