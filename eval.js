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
 * @file eval.js
 */

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
 * @description Base class that 
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
    calc_amount: function(){
        var mensualRate = this.rate / 1200;
        return this.payment * ((1 - (1 / Math.pow(1 + mensualRate, 12 * this.duration))) / mensualRate);
    },
    calc_duration: function(){
        var r = this.rate / 1200;
        return Math.log(-this.payment/((r*this.amount)-this.payment))/(12*Math.log(r+1));
    },
    calc_rate: function(){
        if (this.payment*(this.duration * 12) < this.amount){
            console.log("No interest")
            return 0;
        }
        var tempCalc = new Calculator(),
            rate = 0,
            lastRate,
            step = 1,
            exit = 0;
        tempCalc.duration = this.duration;
        tempCalc.payment = this.payment;
        while(step > 0.0001 && exit <= 999){
            exit++;
            lastRate = rate;
            rate += step;
            tempCalc.rate = rate;
            var amount = tempCalc.calc_amount();
            console.log("Checking with:",{
                rate:rate,
                step:step,
            });
            if(amount < this.amount){
                step /= 10;
                rate = lastRate;
            } else if(amount == this.amout){
                exit = 1000;
            }
        }
        return rate;
    },
    /**
     * @description todo
     * @author Gerkin
     * @returns {Float} The monthly payment
     * @see {@link https://fr.wikipedia.org/wiki/Mensualité#Calcul_formel}
     */
    calc_payment: function(){
        var mensualRate = this.rate / 1200;
        return (this.amount * mensualRate) / (1 - (1 / Math.pow((1 + mensualRate), 12 * this.duration)));
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

function gei(s){return document.getElementById(s)};

function setButtonsToDefaultColor(){

}



var calculator = new Calculator();

var formElems = {};

/**
 * @readonly
 * @enum {string}
 */
var calculatorVariables = {"amount":0,"duration":1,"rate":2,"payment":3};
calculatorVariables = Object.keys(calculatorVariables);

function formatDisplayable(value){
    value += "";
    var parts = value.match(/^(\d*)(?:[.,](\d*))?$/);
    console.log(value, parts);
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
        attach(formElems[j].value,"focus", function(){
            this.setCustomValidity("");
            this.placeholder = '';
            this.classList.remove("calculated");
        })
        attach(formElems[j].value,["blur","keyup","change","input"], function(){
            var self = this;
            var value = self.value.trim();
            self.placeholder = self.getAttribute("data-placeholder");

            if(!isParsableNumber(value) && value.length > 0){
                self.setCustomValidity("Cette valeur n'est pas une valeur numérique acceptable");
            } else {
                self.setCustomValidity("");
            }
            enableCalcButtons();
        });
        attach(formElems[j].value,"blur", function(){
            if(isParsableNumber(this.value))
                this.value = formatDisplayable(preciseValue(j, this.value));
            else if(this.value == "")
                this.setCustomValidity("");
            else
                this.setCustomValidity("Cette valeur n'est pas une valeur numérique acceptable");
        });
    })();
}

/**
 * @description Returns a numeric-casted value of value with the good precision
 * @author Gerkin
 * @param   {string} type  The type of the var. See the list of vars used
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
enableCalcButtons();
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
function isParsableNumber(value){
    if(value.length > 0){
        return !(value.match(/[^0-9,. ]/) ||
                 ((value.match(/[.,]/g) || []).length > 1) ||
                 !value.match(/^\d/) ||
                 !value.match(/\d$/));
    }
    return false;
}
console.log(formElems);


function getVarValue(type){
    if(formElems[type] && formElems[type].value){
        formElems[type].value.classList.remove("calculated");
        return getNumFieldValue(formElems[type].value.value);
    }
    return 0;
}
/**
 * @description convert a {@link isParsableNumber parsable string} into a float.
 * @author Gerkin
 * @param   {string|number} str The value to ensure float
 * @returns {number} Numeric value
 */
function getNumFieldValue(str){
    return parseFloat((str+"").replace(/ /g, "").replace(/,/g, ".") || 0);
}

attach([].slice.call(document.querySelectorAll(".pager-button")), "click",(function(){
    var body = document.querySelector("body");
    return function(e){
        body.setAttribute("data-page", this.getAttribute("data-page-target"));
    };
})());
