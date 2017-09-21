/*global window: true, App: true, document: true, Handlebars: true, jQuery: true */
/**
 */

;(function( $, App ) {
    "use strict";
	var HapiDay = App.HapiDay || {};


	HapiDay.init = function() {
        HapiDay.bindUi();
        HapiDay.registerHelpers();
    };

    HapiDay.registerHelpers = function() {

        Handlebars.registerHelper("compare", function(lvalue, operator, rvalue, options){
            if (arguments.length < 4) {
                throw new Error("Handlerbars Helper 'compare' needs 3 parameters");
            }

            var operators, result;

            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }

            operators = {
                'eq': function(l, r) { return l === r; },
                '===': function (l, r) { return l === r; },
                'ne': function(l, r) { return l !== r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                'lt': function(l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                'gt': function(l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                'le': function(l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'ge': function(l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l === r; }
            };

            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }

            result = operators[operator](lvalue, rvalue);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    };

    HapiDay.bindUi = function() {
        $(document).ready(HapiDay.helper);
    };

    HapiDay.helper =function() {
        $(App.templates.example({count: 4})).appendTo("body");
    };

    App.HapiDay = HapiDay;

}( jQuery, window.App = window.App || {} ));
App.HapiDay.init();
