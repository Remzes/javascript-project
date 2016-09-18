var notErrors = {};
function validateRequired() {
    //e.preventDefault();
    //return false;
    fnameValid();
    lnameValid();
    checkPassword();
    confirmPassword();
    validateEmail();
    validateConfirmEmail();
    phoneValidation();
    dateValidation();
    var counter = 0;
    var counterLengthObject = 0;
    for (var p in notErrors) {
        counterLengthObject++;
        if (notErrors[p]) {
            counter++;
        }
    }
    var inputElements = document.querySelectorAll("input");
    var signForm = document.getElementById("sign-form");
    var errorDiv = document.getElementById("mainError");
    //var crustBoxes = document.getElementsByName("crust");
    var fieldset = document.getElementsByTagName("fieldset")[0];
    var fieldsetValidity;
    var elementCount = inputElements.length;
    var currentElement;
    console.log(signForm);
    for (var i = 0; i < elementCount; i++) {
        currentElement = inputElements[i];
        if (currentElement.value === "") {
            //fieldset.style.border = "3px solid rgb(255, 61, 0)";
            fieldsetValidity = false;
        } else {
            //fieldset.style.border = "3px solid rgba(4, 129, 177, 0.4);"
        }
    }
    if (counter == counterLengthObject){
        fieldsetValidity = true;
    }
    console.log(counter, counterLengthObject, fieldsetValidity, notErrors);
    if (fieldsetValidity === false && counter != counterLengthObject) {
        errorDiv.innerHTML = "Please, fill all fields in the form";
        errorDiv.style.border = "5px rgba(255, 61, 0, 0.5)solid";
        errorDiv.style.marginTop = "15px";
        errorDiv.style.marginBottom = "15px";
        $("html, body").animate({ scrollTop: $("#wrapper").offset().top - 80 });
        //return false;
    } else {
        errorDiv.innerHTML = "";
        errorDiv.style.border = "";
        errorDiv.style.marginTop = "40px";
        errorDiv.style.marginBottom = "40px";
        //console.log(123);
        //counter = 0;
        return true;
        //return true;
    }
    return false;
}

    function fnameValid() {
        var fname = document.getElementById("fname");
        var fnameError = document.getElementById("fnameError");
        //console.log(/^[A-Z]/.test("Abc"));
        if (!fname.value) {
            fnameError.innerHTML = "Required";
            notErrors["fnameValid"] = false;
        } else if (fname.value.length > 15 && !(/^[A-Z]/.test(fname.value))) {
            fnameError.innerHTML = "First name must be less than 15 characters and first letter must be uppercase";
            notErrors["fnameValid"] = false;
        } else if (!(/^[A-Z]/.test(fname.value))) {
            fnameError.innerHTML = "First letter must be uppercase";
            notErrors["fnameValid"] = false;
        } else if (fname.value.length > 15) {
            fnameError.innerHTML = "First name must be less than 15 characters";
            notErrors["fnameValid"] = false;
        } else {
            fnameError.innerHTML = "";
            notErrors["fnameValid"] = true;
            fnameError.style.padding = "";
        }
    }

    function lnameValid() {
        var lname = document.getElementById("lname");
        var lnameError = document.getElementById("lnameError");
        //console.log(/^[A-Z]/.test("Abc"));
        if (!lname.value) {
            lnameError.innerHTML = "Required";
            notErrors["lnameValid"] = false;
        } else if (lname.value.length > 15 && !(/^[A-Z]/.test(lname.value))) {
            lnameError.innerHTML = "First name must be less than 15 characters and first letter must be uppercase";
            notErrors["lnameValid"] = false;
        } else if (!(/^[A-Z]/.test(lname.value))) {
            lnameError.innerHTML = "First letter must be uppercase";
            notErrors["lnameValid"] = false;
        } else if (lname.value.length > 15) {
            lnameError.innerHTML = "First name must be less than 15 characters";
            notErrors["lnameValid"] = false;
        } else {
            lnameError.innerHTML = "";
            notErrors["lnameValid"] = true;
        }
    }

    function checkPassword() { //checking first Password field in the form
        var passwd = document.getElementById("passwd");
        if (!passwd.value) {
            notErrors["password"] = false;
            document.getElementById("passwdError").innerHTML = "Required";
        } else if (/^[a-zA-Z0-9- ]*$/.test(passwd.value) && !(passwd.value.length >= 10 && passwd.value.length <= 20)) {
            notErrors["password"] = false;
            document.getElementById("passwdError").innerHTML = "Length must be between 10-20 and it must contain special character";
        } else if (passwd.value.length >= 10 && passwd.value.length <= 20 && !/^[a-zA-Z0-9- ]*$/.test(passwd.value)) {
            notErrors["password"] = true;
            document.getElementById("passwdError").innerHTML = "";
        }
        else if (!(passwd.value.length >= 10 && passwd.value.length <= 20)) {
            notErrors["password"] = false;
            document.getElementById("passwdError").innerHTML = "The password length must be between 10-20";
        } else if (/^[a-zA-Z0-9- ]*$/.test(passwd.value)) {
            notErrors["password"] = false;
            document.getElementById("passwdError").innerHTML = "It must contain at least 1 special character";
        }
    }

    function confirmPassword() {
        var passwd = document.getElementById("passwd");
        var confPasswd = document.getElementById("confPasswd");
        if (passwd.value != confPasswd.value) {
            document.getElementById("confPasswdError").innerHTML = "Passwords are not the same";
            passwd.style.background = "yellow";
            confPasswd.style.background = "yellow";
            notErrors["confPasswd"] = false;
        } else {
            document.getElementById("confPasswdError").innerHTML = "";
            passwd.style.background = "";
            confPasswd.style.background = "";
            notErrors["confPasswd"] = true;
        }
    }

    function validateEmail() {
        var email = document.getElementById("email");
        var regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
        if (email.value) {
            if (!regex.test(email.value)) {
                document.getElementById("emailError").innerHTML = "Not right format of email";
                notErrors["email"] = false;
            } else {
                document.getElementById("emailError").innerHTML = "";
                notErrors["email"] = true;
            }
        } else {
            document.getElementById("emailError").innerHTML = "Required";
            notErrors["email"] = false;
        }
    }


    function validateConfirmEmail() {
        var email = document.getElementById("email");
        var confEmail = document.getElementById("confEmail");
        if (email.value == confEmail.value) {
            notErrors["confEmail"] = true;
            document.getElementById("confEmailError").innerHTML = "";
            email.style.background = "";
            confEmail.style.background = "";
        } else {
            notErrors["confEmail"] = false;
            document.getElementById("confEmailError").innerHTML = "Emails do not equal";
            email.style.background = "yellow";
            confEmail.style.background = "yellow";
        }
    }

    function phoneValidation() {
        var phone = document.getElementById("phone");
        phoneError = document.getElementById("phoneError");
        if (!phone.value) {
            notErrors["phone"] = false;
            phoneError.innerHTML = "Required";
        } else if (isNaN(phone.value) && phone.value.length > 10) {
            phoneError.innerHTML = "The format of phone is not right and length must be less than 11";
            notErrors["phone"] = false;
        } else if (isNaN(phone.value)) {
            phoneError.innerHTML = "The format of phone is not right";
            notErrors["phone"] = false;
        } else if (phone.value.length > 10) {
            phoneError.innerHTML = "The length mut be less than 11";
            notErrors["phone"] = false;
        } else {
            phoneError.innerHTML = "";
            notErrors["phone"] = true;
        }
    }

    function dateValidation() {
        var date = document.getElementById("date");
        var regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
        if (!date.value) {
            notErrors["date"] = false;
            document.getElementById("dobError").innerHTML = "Required";
        } else if (!regex.test(date.value)) {
            notErrors["date"] = false;
            document.getElementById("dobError").innerHTML = "Date is in not format";
        } else {
            notErrors["date"] = true;
            document.getElementById("dobError").innerHTML = "";
        }
    }

//function checkPassword2(){
//    var passwd = document.getElementById("passwd");
//    if (!/^[a-zA-Z0-9- ]*$/.test(passwd.value)) {
//        notErrors["password2"] = true;
//        document.getElementById("passwdError").innerHTML = "";
//    }
//    else {
//        notErrors["password2"] = false;
//        document.getElementById("passwdError").innerHTML = "It must contain at least 1 special character";
//    }
//}
//function checkPassword3(){
//    var passwd = document.getElementById("passwd");
//    var passwdArray = passwd.value.split("");
//    var counter = 0;
//    for (var i = 0; i < passwd.value.length; i++) {
//        if (!isNaN(passwdArray[i])) {
//            counter++;
//        }
//    }
//    if (counter == 0) {
//        document.getElementById("passwdError").innerHTML = "It must contain at least 1 digit";
//    } else {
//    document.getElementById("passwdError").innerHTML = "";
//    }
//}
//function checkDate(){
//    /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
//}

    function activateValidity() {
        var form = document.getElementById("sign-form");
        var fname = document.getElementById("fname");
        var lnameError = document.getElementById("lnameError");
        var passwd = document.getElementById("passwd");
        //if (form.addEventListener) {
        //    form.addEventListener("submit", validateRequired, false);
        //} else if (form.attachEvent) {
        //    form.attachEvent("onsubmit", validateRequired);
        //}
        $("#sign-form").on("submit", validateRequired);
        $("#fname").on("change", fnameValid);
        $("#lname").on("change", lnameValid);
        $("#passwd").on("change", checkPassword);
        $("#confPasswd").on("change", confirmPassword);
        $("#email").on("change", validateEmail);
        $("#confEmail").on("change", validateConfirmEmail);
        $("#phone").on("change", phoneValidation);
        $("#date").on("change", dateValidation);
        //$("#passwd").on("change", checkPassword2);
        //$("#passwd").on("change", checkPassword3);
        //if (passwd.addEventListener) {
        //    passwd.addEventListener("cnange", checkPassword, false);
        //} else if (passwd.attachEvent) {
        //    passwd.attachEvent("oncnange", checkPassword);
        //}
        //if (passwd.addEventListener) {
        //    passwd.addEventListener("cnange", checkPassword2, false);
        //} else if (passwd.attachEvent) {
        //    passwd.attachEvent("oncnange", checkPassword2);
        //}
        //if (passwd.addEventListener) {
        //    passwd.addEventListener("cnange", checkPassword3, false);
        //} else if (passwd.attachEvent) {
        //    passwd.attachEvent("oncnange", checkPassword3);
        //}
    }

    //function submitIt(){
    //    var check = validateRequired();
    //    if (check == true){
    //        $("#sign-form").submit();
    //    }
    //}

    function setUpPage() {
        activateValidity();
        //submitIt();
    }

    if (window.addEventListener) {
        window.addEventListener("load", setUpPage, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", setUpPage);
    }