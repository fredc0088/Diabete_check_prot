// Author : Federico Cocco
// ITS username: fcocco01
// Module: Javascript
// July 2016

window.onload = function init() {

    /*
     * @name: none
     * @params: none
     * @return: undefined
     * @descr: This function check every fist options.
     */
    (function() {
        var fields = document.getElementsByClassName("fields");
        for (var z = 0; z < fields.length; z++) {
            var defaultButton = fields[z].getElementsByTagName("input")[0];
            defaultButton.checked = true;
        }
        return;
    })();

    /*
     * @name: getSelections
     * @params: none
     * @return: array options
     * @functions: check
     * @descr: This function gets first all fields in the form and then
     *          all the CHECKED elements, putting them into an array.
     */
    function getSelections() {
        var options = [];
        var fields = document.getElementsByClassName("fields");
        for (var j = 0; j < fields.length; j++) {
            var selections = fields[j].getElementsByTagName("input");
            /*
             * @name: check
             * @params: none
             * @return: array options or recursive call
             * @descr: function to get the radio selections
             */
            (function check(index) {
                if (selections[index].checked) {
                    return options.push(selections[index]); //as soon as it finds the selection it pushes onto an array
                }
                return check(index + 1); // recursion to keep searching the selection
            })(0);
        }
        return options;
    }

    /*
     * @name: getSum
     * @params: array elements
     * @return: array newArray
     * @descr: this function returns the sum of the elements' values and,
     *          if over certain value, their names.
     */
    function getSum(elements) {
        var newArray = [];
        newArray.unshift(0);
        for (var i = 0; i < elements.length; i++) {
            newArray[0] += parseInt(elements[i].value); // sum is stored in array's first position
            if (elements[i].value >= 10) {
                newArray.push(elements[i].getAttributeNode("name").value); // gets element's name
            }
        }
        return newArray;
    }

    /*
     * @name: displayFactors
     * @params: array arrayOfResults
     * @return: none
     * @descr: This function produce a string displaying the factors 
     *         risk for diabete. 
     */
    function displayFactors(arrayOfResults) {
        var factors = ". Your main risk ";
        if (arrayOfResults.length === 2) { // finds there is only one element
            factors += "factor is your " + arrayOfResults[1];
        } else if (arrayOfResults.length > 2) { // multiple factors case
            factors += "factors are ";
            for (var i = 1; i < arrayOfResults.length - 1; i++) {
                factors += "your " + arrayOfResults[i];
                if (i < arrayOfResults.length - 2) factors += ", ";
            }
            factors += " and your " + arrayOfResults[i];
        }
        document.getElementById("factors").innerHTML = factors;
    }

    /*
     * @name: displayMessage
     * @params: string element
     * @return: none
     * @descr: This function display or hide the message
     *         resulting from calculation
     */
    function displayMessage(element) {
        var rootEl = document.getElementById("message");
        rootEl.classList.remove("hide"); // display the results table
        var message = rootEl.getElementsByClassName("result");
        for (var i = 0; i < message.length; i++) {
            if (message[i].id === element) {
                message[i].classList.remove("hide");
            } else {
                message[i].classList.add("hide"); // hide elements not to be displayed
            }
        }
    }

    /*
     * @name: getResults
     * @params: none
     * @return: boolean 
     * @functions: getSelections, getSum,
     * @descr: This function initialises and starts the process of result
     *          displaying after the form is submitted.
     */
    (function getResultForm() {
        document.getElementById("healthform").onsubmit = function() {
            var selected = getSelections();
            var results = getSum(selected);
            if (results[0] > 25) {
                displayMessage("high");
                if (results.length > 1) {
                    displayFactors(results);
                }
            } else if (results[0] <= 25 && results[0] > 15) {
                displayMessage("medium");
            } else {
                displayMessage("low");
            }
            return false; // avoid standard behaviour of the form
        }
    })();
};