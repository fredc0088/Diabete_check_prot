// Author : Federico Cocco
// ITS username: fcocco01
// Module: Javascript
// July 2016
// Thanks: https://regex101.com/, https://jqueryvalidation.org/


$().ready(function() {

    /*
     * @name: assignText
     * @params: object obj, string message, boolean flag
     * @return: none
     * @descr: This function a text value to a given object
     */
    function assignText(obj, message, flag) {
        if (flag) {
            obj.val(message).addClass('placeholder');
        } else {
            obj.val(message).removeClass('placeholder');
        }
    }

    /*
     * @name: none
     * @params: none
     * @return: none
     * @descr: This function place specific placeholder to each input needed
     */
    (function() {
        $('#contactform').find('input, textarea').each(function(key) {
            var that = $(this); // get the context
            var placeholder = "";
            switch (that.attr("name")) {
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
            that.placeholder = placeholder; // assign placeholder property to the current input
            assignText(that, that.placeholder, true);
            that.focus(function() {
                if (that.val() === '' || that.val() === that.placeholder)
                    assignText(that, "", false);
            });
            that.blur(function() {
                if (that.val() === '' || that.val() === that.placeholder)
                    assignText(that, that.placeholder, true);
            });
            $("input[type=submit]").click(function() { // remove placeholders when form is submitted
                if (that.hasClass("placeholder")) {
                    assignText(that, "", false);
                }
            });
        });
    })();
    $('input[name=firstname]').focus(); // autofocus

    /*
     * @name: hint
     * @params: none
     * @return: none
     * @descr: This function controls the visualisation of the tooltip
     */
    (function hint() {
        $("#tipTrigger").hover(function() {
            $('#tooltip').removeClass('hide');
        }, function() {
            $('#tooltip').addClass('hide');
        });
    })();

    /*
     * @name: validtsSet
     * @params: none
     * @return: none
     * @descr: This function sets the validation mathods of 
     * 			the required fields (if not empty)
     */
    (function() {
        $.validator.addMethod("fnameVal", function(value, element) {
            return /(^[A-Za-z]{1,})[-a-zA-Z]$/.test(value);
        }, "*Only hypen other than characters is allowed"); // / add method to validate firstname
        $.validator.addMethod("lnameVal", function(value, element) {
            return /(^[A-Za-z]{1,})[-a-zA-Z]$/.test(value);
        }, "*Only hypen other than characters is allowed"); // add method to validate lastname
        $.validator.addMethod("zhan", function(value, element) {
            return /^(ZHA)([0-9]{6})$/.test(value);
        }, "*This ZHAN number may be incorrect or not valid."); // add method to validate Health Authority Number
        $.validator.addMethod("email", function(value, element) {
            return /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/.test(value);
        }, "*This email address is not valid."); // add method to validate email
        $.validator.addMethod("pnumber", function(value, element) {
            return value === "" || /^$|^[0-9]{11}$/.test(value);
        }, "*This number is not valid."); // add method to validate phone number
    })();

    $('#contactform').validate({ // jQuery validation plug-in
        rules: {
            firstname: {
                required: true,
                minlength:2,
                fnameVal: true
            },
            lastname: {
                required: true,
                minlength:2,
                lnameVal: true
            },
            title: {
                required: true
            },
            HNAcontact: {
                required: true,
                zhan: true
            },
            email: {
                required: true,
                email: true
            },
            number: {
                pnumber: true
            }
        }, //set rules for validation
        messages: {
            firstname: {
                required: "*This field is required",
                minlength: "*more than one character expected"
            },
            lastname: {
                required: "*Please enter your lastname",
                minlength: "*more than one character expected"
            },
            title: {
                required: "*You must select a title"
            },
            HNAcontact: {
                required: "*This field is required"
            },
            email: {
                required: "*Please enter a valid email address"
            }
        }, // set error messages for when field is left empty
        focusCleanup: true, // remove/display errors if input is focused on
        focusInvalid: false,
        submitHandler: function() {
                alert("Submitted!");
            } // handle the succesful validation and display a message
    }); // end validate 
}); // end document.ready context script