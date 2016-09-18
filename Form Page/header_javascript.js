var navig = $("#navigation");
var content = $(".content-div");
var logoAdd = $(".menu-logo-add");
var navigHeight = navig.height();
var navigOffset = navig.offset().top;
var logIn = $("#login");
var closePopUp = $(".bg-popup");
//console.log(navig.height());
//console.log(navig.offset().top);
var inputID = $(".accId");
//window.addEventListener("scroll", calculateScroll, false);
$(window).on("scroll", calculateScroll);

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

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

function sendFormLogIn(e) {
    e.preventDefault();
    console.log(555);
    var loginObjects = {
        accID: $("#accID").val(),
        password: $("#passw").val()
    };
    console.log(loginObjects);
    if (loginObjects.accID && loginObjects.password) {
        var option = {
            expires: 3000000
        };
        setCookie("account", JSON.stringify(loginObjects), option);
    } else {
        //написать валидацию
    }
}

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
//
//
//function populateInfo() {
//    var uname = document.cookie;
//    uname = uname.substring(uname.lastIndexOf("=") + 1);
//    document.getElementById("accID").value = uname;
//}
//
//function handleSubmit(e) {
//    e.preventDefault();
//    processCookie();
//}
//
//
//function createEventListener() {
//    var form = document.getElementById("formLogIn");
//    var button = document.getElementById("loginID");
//    if (button.addEventListener) {
//        button.addEventListener("submit", handleSubmit, false);
//    } else if (button.attachEvent) {
//        button.attachEvent("onsubmit", handleSubmit);
//    }
//}

function setUpPage() {
    //populateInfo();
    //createEventListener();
    console.log("cookie");
    console.log(getCookie("account"));
    if (accountCookie && accountCookie.accID && accountCookie.password) {
        var accountCookie = JSON.parse(getCookie("account"));
        console.log(accountCookie);
        $("#accID").val(accountCookie.accID);
        $("#passw").val(accountCookie.password);
    }
    $("#formLogIn").on("submit", sendFormLogIn);
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