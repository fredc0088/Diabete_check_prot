// Author : Federico Cocco
// ITS username: fcocco01
// Module: Javascript
// July 2016
// Thanks: https://regex101.com/

window.onload = function init() {
    var formNode = document.getElementById("contactform"); // get the form

    /*
     * @name: none
     * @params: none
     * @return: none
     * @functions: none
     * @descr: This function set or remove placeholders on
     * text inputs. Also it sets the focus on one
     * as window just loads
     */
    (function () {
        var inputs = formNode.elements;
        var placeholder = '';
        for (var y = 1; y < inputs.length; y++) {
            if (inputs[y].name !== "title") {
                switch (inputs[y].name) {
                    case "firstname":
                        placeholder = "Insert yout firstname";
                        break;
                    case "lastname":
                        placeholder = "Insert yout lastname";
                        break;
                    case "HNAcontact":
                        placeholder = "Insert your Health National Number";
                        break;
                    case "email":
                        placeholder = "Insert a valid email";
                        break;
                    case "number":
                        placeholder = "Insert your telephone number";
                        break;
                    default: // default case (no any of above cases) get ignored and returns
                        return;
                }
                inputs[y].placeholderText = placeholder; // stored property to the current input
                inputs[y].classList.add("placeholder");
                inputs[y].placeholder = inputs[y].placeholderText;
                inputs[y].onblur = function () {
                    if (this.value === '' || this.value === this.placeholderText) {
                        this.classList.add("placeholder");
                        this.placeholder = this.placeholderText;
                    }
                }
                inputs[y].onfocus = function () {
                    if (this.value === '' || this.value === this.placeholderText) {
                        this.classList.remove("placeholder");
                        this.placeholder = "";
                    }
                }
            }
        }
    })();

    formNode.getElementsByTagName("input")["firstname"].focus(); // autofocus
    /*
     * @name: displayHint
     * @params: none
     * @return: none
     * @functions: none
     * @descr: This function display or hide 
     * 			a tooltip where indicated,
     */
    (function displayHint() {
        var trigger = document.getElementById("tipTrigger");
        var hint = document.getElementById("tooltip")
        trigger.onmouseover = function () {
            hint.classList.remove("hide"); // display if mouse on
        };
        trigger.onmouseout = function () {
            hint.classList.add("hide"); // hide if mouse off
        };
    })();

    /*
     * @name: checkForm
     * @params: none
     * @return: none
     * @functions: displayError, singleValidation
     * @descr: This function initialises and starts the process of result
     *          displaying after the for is sunmitted.
     */
    (function checkForm() {
        formNode.onsubmit = function () {
            var errors = this.getElementsByClassName("error"); //first is to get rid of all errors visualised
            for (var i = 0; i < errors.length; i++)
                errors[i].classList.add("hide");
            var x = formNode.elements;
            var validForm = true; // flag
            for (var j = 1; j < x.length - 1; j++) { //checks the form's elements (no submit) 

                /*
                 * @name: displayError
                 * @params: String flag
                 * @return: boolean 
                 * @belongs to object: x[j]
                 * @descr: This function remove class "hide" from html element of class "error" 
                 *  		which belongs to the same node of the object 
                 */
                x[j].displayError = function (flag, oneError) {
                    var p = this.parentNode;
                    var sp = p.getElementsByClassName("error");
                    if (typeof flag == "undefined" || oneError) {
                        sp = sp[0];
                    } else {
                        if (sp.length > 1)
                            sp = sp[1];
                    }
                    sp.classList.remove("hide");
                    return false;
                }.bind(x[j]); //binding this function to the object
                if (!x[j].value && x[j].name !== "number") {
                    validForm = x[j].displayError();
                } else {
                    if (x[j].name !== "title") {

                        /*
                         * @name: singleValidation
                         * @params: function does 
                         * @return: none
                         * @belongs to object: x[j]
                         * @descr: This function choose the element to validate and validate it in the
                         * 			appropriate method. Then it does whatever function is passed as parameter
                         */
                        x[j].singleValidation = function (does) {
                            switch (this.name) { // test is used depending on the element's name								
                                case "firstname":
                                    if (!/(^[A-za-z]{1,})[-a-zA-Z]$/.test(this.value))
                                        return does("firstnameEr");
                                    break;
                                case "lastname":
                                    if (!/(^[A-za-z]{1,})[-a-zA-Z]$/.test(this.value))
                                        return does("lastnameEr");
                                    break;
                                case "HNAcontact":
                                    if (!/^(ZHA)([0-9]{6})$/.test(this.value))
                                        return does("zhanEr");
                                    break;
                                case "email":
                                    if (!/[-\w.]+@([A-Z0-9][-A-Z0-9]+\.)+[A-Z]{2,4}/.test(this.value))
                                        return does("mailEr");
                                    break;
                                case "number":
                                    if (!/^$|^[0-9]{11}$/.test(this.value))
                                        return does("telEr", true); // regex test either pattern matches or is an empty string
                                    break;
                                default: // standard behaviour simply does not check anything and let the value passing through
                                    break;
                            }
                        };
                        if (x[j].singleValidation(x[j].displayError) === false) // validates an input
                            validForm = false;
                    }
                }
            }

            if (validForm)
                alert('Details submitted!');
            return validForm; // avoid standard behaviour of the form
        };
    })();
};