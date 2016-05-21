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
 * @description Base class that 
 * @author Gerkin
 */
function Calculator(){
    var s=this,
        amount,
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
        var n = -this.duration,
            r = this.rate/(12);
        return (this.payment * (1 - Math.pow((1 + r), n)))/r;
    },
    calc_duration: function(){
        var r = this.rate/(12);
        return Math.ceil((Math.log(this.payment) - Math.log(this.payment - this.amount * r))/Math.log(1+r));
    },
    calc_rate: function(){
        if (this.payment*this.duration < this.amount){
            return 0.0;
        }
        var frate = 1;
        for (i=0;i<400;i++){
            frate=(this.payment-this.payment/Math.pow((1+frate),this.duration))/this.amount;
        }
        return frate*12;
    },
    /**
     * @description todo
     * @author Gerkin
     * @returns {Float} The monthly payment
     * @see {@link https://fr.wikipedia.org/wiki/Mensualité#Calcul_formel}
     */
    calc_payment: function(){
        var  mensualRate = this.rate/1200;
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
var arr = ["amount","duration","rate","payment"];
for(var i in arr){
    var j = arr[i];
    formElems[j] = {
        calc: gei(j+"-button"),
        value: gei(j+"-value"),
        minus: gei(j+"-minus"),
        plus: gei(j+"-plus")
    }
    formElems[j].value.setAttribute("data-placeholder", formElems[j].value.placeholder);

    // Bind event listeners
    attach(formElems[j].calc, "click", (function(){
        var arrNoI = arr.filter(function(v){return v!=j});
        var type = j;
        return function(){
            for(var k in arrNoI){
                calculator[arrNoI[k]] = getValue(arrNoI[k]);
            }
            console.log(calculator);
            var result = calculator["calc_"+type]();
            var valueContainer = formElems[type].value;
            valueContainer.value = result;
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
            console.log("Factor:",factor);
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
        var precisionFactor = (this.id == "duration-value" ? 1 : 100);
        if(isParsableNumber(this.value))
            this.value = parseInt(this.value * precisionFactor) / precisionFactor;
    });
}
enableCalcButtons();
function enableCalcButtons(){
    for(var type in formElems){
        formElems[type].calc.disabled = Object.keys(formElems).filter(function(value){
            return value != type && isParsableNumber(formElems[value].value.value)
        }).length != 3
    }
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

function setButtonsToDefaultColor(){
    //amountButton	
}

function getValue(type){
    if(formElems[type] && formElems[type].value){
        formElems[type].value.classList.remove("calculated");
        return formElems[type].value.value;
    }
    return null;
}

function setAmount(once){
    rateVal = getRate();
    durationVal = getDuration();
    paymentVal = getPayment();
    if (rateVal != 0.0 && durationVal != 0 && paymentVal != 0.0 ) {
        //amountField.setText(ncurrency.format(computeAmount(rateVal, paymentVal, monthsVal)));
        amountValue.value = computeAmount(rateVal, paymentVal, durationVal)
        //amountField.setTextColor(getResources().getColor(R.color.black));
        setButtonsToDefaultColor();
    }
    if (once != 1)
        setOtherFields("amount-value");
}

function setDuration(once){
    rateVal = getRate();
    amountVal = getAmount();
    paymentVal = getPayment();
    if (rateVal != 0.0 && amountVal != 0.0 && paymentVal != 0.0) {
        //amountField.setText(ncurrency.format(computeAmount(rateVal, paymentVal, monthsVal)));
        durationValue.value = computeDuration(rateVal, amountVal, paymentVal)
        //amountField.setTextColor(getResources().getColor(R.color.black));
        setButtonsToDefaultColor();
    }
    if (once != 1)
        setOtherFields("duration-value");
}

function setRate(once){
    amountVal = getAmount();
    durationVal = getDuration();
    paymentVal = getPayment();
    if (amountVal != 0.0 && durationVal != 0 && paymentVal != 0.0 ) {
        //amountField.setText(ncurrency.format(computeAmount(rateVal, paymentVal, monthsVal)));
        rateValue.value = computeRate(paymentVal, amountVal, durationVal)
        //amountField.setTextColor(getResources().getColor(R.color.black));
        setButtonsToDefaultColor();
    }
    if (once != 1)
        setOtherFields("rate-value");

}

function setPayment(once){
    rateVal = getRate();
    durationVal = getDuration();
    amountVal = getAmount();
    if (rateVal != 0.0 && durationVal != 0 && amountVal != 0.0) {
        //amountField.setText(ncurrency.format(computeAmount(rateVal, paymentVal, monthsVal)));
        paymentValue.value = computePayment(rateVal, amountVal, durationVal)
        //amountField.setTextColor(getResources().getColor(R.color.black));
        setButtonsToDefaultColor();
    }
    if (once != 1)
        setOtherFields("payment-value");

}
/*
function setOtherFields(v){
    if (v!="amount-value") setAmount(1);
    if (v!="duration-value") setDuration(1);
    if (v!="rate-value") setRate(1);
    if (v!="payment-value") setPayment(1);
}

amountButton.onclick = setAmount;
durationButton.onclick = setDuration;
rateButton.onclick = setRate;
paymentButton.onclick = setPayment;
*/
