// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}


var navig = $("#navigation");
var content = $(".content-div");
var logoAdd = $(".menu-logo-add");
var navigHeight = navig.height();
var navigOffset = navig.offset().top;
var logIn = $("#login");
var closePopUp = $(".bg-popup");
var inputID = $(".accId");
//window.addEventListener("scroll", calculateScroll, false);
$(window).on("scroll", calculateScroll);

//function processCookie() {
//    if (document.getElementById("rememberinput").checked) {
//        document.cookie = "username=" + document.getElementById("accID").value;
//    } else {
//        var expiresDate = new Date();
//        expiresDate.setDate(expiresDate.getDate() - 7);
//        document.cookie = "username=null; expires=" +
//            expiresDate.toUTCString();
//    }
//
//}


//function populateInfo() {
//    var uname = document.cookie;
//    uname = uname.substring(uname.lastIndexOf("=") + 1);
//    document.getElementById("accID").value = uname;
//}

function handleSubmit(e) {
    e.preventDefault();
    if ($("#rememberinput").prop('checked')) {
        console.log("aaa");
        var formData = {
            password: this.querySelector('.password').value,
            accId: this.querySelector('#accid').value
        };
        //console.log(formData);
        // options - object with properties cookie (expires, path, domain, secure)
        // setCookie(name, value, options)
        setCookie('auth', JSON.stringify(formData), {expires: 60 * 60 * 10});
    }else {
        console.log(123);
    }
}


function createEventListener() {
    var form = document.getElementById("formLogIn");
    var button = document.getElementById("loginID");
    if (form.addEventListener) {
        form.addEventListener("submit", handleSubmit, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", handleSubmit);
    }
}

function setUpPage() {
    //populateInfo();
    setValuesToAuthForm();
    createEventListener();
}

function calculateScroll() {
    var scrollTop = $(window).scrollTop();
    //console.log(scrollTop);
    if (scrollTop >= navigOffset) {
        navig.addClass("fixedNavig");
        content.addClass("isMenuFixed");
    }
    else {
        navig.removeClass("fixedNavig");
        content.removeClass("isMenuFixed");
    }
}

function scrollPageTop() {
    if ($(".fixedNavig").length) {
        var body = $("html, body");
        body.stop().animate({scrollTop: 0}, '500', 'swing');
    }
}

//function openPopUp() {
//    setTimeout(function () {
//        $(".bg-img-popup").addClass("active");
//        $(".popup-content").addClass("fadeInUp");
//        $(".popup-content").addClass("active");
//    }, 500)
//}
//
//function clPopUp() {
//    $(".popup-content").removeClass("fadeInUp");
//    $(".popup-content").removeClass("active");
//    $(".bg-popup").removeClass("active");
//}

//closePopUp.on("click", clPopUp);
//logIn.on("click", openPopUp);
//logoAdd.on("click", scrollPageTop);

function openPopUp() {
    setTimeout(function () {
        $(".bg-popup").addClass("active");
        $(".popup-content").addClass("fadeInUp");
        $(".popup-content").addClass("active");
    }, 500)
}

function clPopUp() {
    console.log(111);
    $(".popup-content").removeClass("fadeInUp");
    $(".popup-content").removeClass("active");
    $(".bg-popup").removeClass("active");
}

closePopUp.on("click", clPopUp);
logIn.on("click", openPopUp);
logoAdd.on("click", scrollPageTop);

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}

var setValuesToAuthForm = function () {
    var formData = getCookie('auth') ? JSON.parse(getCookie('auth')) : null;
    var elements = {};
    elements.authForm = document.getElementById('formLogIn');
    elements.password = elements.authForm.querySelector('.password');
    elements.accid = elements.authForm.querySelector('#accid');
    if (formData && elements && elements.authForm && elements.password && elements.accid) {
        elements.password.value = formData.password;
        elements.accid.value = formData.accId;
    }
};