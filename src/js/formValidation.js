window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("contactForm").addEventListener("submit", checkForEmptyFields); 
    // document.getElementById("purchaseForm").addEventListener("submit", submitDisplay); 
});

window.addEventListener("load", function() {
    var cssSelector = "input[type=text]";
    const fields = document.querySelectorAll(cssSelector);

    for(let f of fields) {
        f.addEventListener("focus", setBackground);
        f.addEventListener("blur", setBackground);
    }  
});

function checkForEmptyFields(e) {  

    checkFirst();
    checkLast();
    checkPhoneNumber();
    checkEmail();

	var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";

    var cssSelector = "input[type=text]";
    var fields = document.querySelectorAll(cssSelector);

    // loop thru the input elements looking for empty values
    var fieldList = [];

    for (i=0; i<fields.length; i++) {
        if (fields[i].value == null || fields[i].value == "") {
            // since a field is empty prevent the form submission
            e.preventDefault();
            fieldList.push(fields[i]);
        }
    }

    // now set up the error message
    var msg = "The following fields can't be empty: ";
    if (fieldList.length > 0) {
        for (i=0; i<fieldList.length; i++) {
            msg += fieldList[i].id + ", ";
        }

        errorArea.innerHTML = "<p>" + msg + "</p>";
        errorArea.className = "visible";    
	}

    if(checkFirst() && checkLast() && checkPhoneNumber() && checkEmail()) {
        isGood();
    }    

}

/* validate first */
function checkFirst() {
    var first = document.getElementById('fname').value;

    if(first.charAt(0) != first.charAt(0).toUpperCase()) {
        first.charAt(0).toUpperCase();
        return true;
    }
    
    return true;

}

/* validate last name */
function checkLast() {
    var last = document.getElementById('lname').value;

    if(last.charAt(0) != last.charAt(0).toUpperCase()) {
        last.charAt(0).toUpperCase();
        return true;
    }
    
    return true;

}

/* validate phone number */
function checkPhoneNumber() {
    var phone = document.getElementById('phone');
    var filterPhone = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
    
    if (!filterPhone.test(phone.value)) {
		alert('Please provide a valid phone number');
		phone.focus;
		return false;
	}

    return true;

}

/* validate email */
function checkEmail() {
	var email = document.getElementById('email');
	var filterEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	if (!filterEmail.test(email.value)) {
		alert('Please provide a valid email address');
		email.focus;
		return false;
	}

    return true;
}

/*  set input box focus color */
function setBackground(e) {

    if(e.type == "focus") {
        e.target.style.backgroundColor = "#FFE393";
    }

    else if(e.type == "blur") {
        e.target.style.backgroundColor = "white";
    }

};

function isGood() {

    var submitted = document.getElementById("formSubmit");
    submitted.className = "hidden";
    submitted.innerHTML = "<p>" + "Submitted!!!" + "</p>";
    submitted.className = "visible";

}