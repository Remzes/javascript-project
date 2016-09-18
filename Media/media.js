var screens = $("#screens").find("img");

function openPopUp() {
    //setTimeout(function () {
    //    $(".bg-popup").addClass("active");
    //    $(".popup-content").addClass("fadeInUp");
    //    $(".popup-content").addClass("active");
    //}, 500)
    var id = $(this).attr("id").split("-")[1];
    var src =$(this).attr("src");
    $("#picture").attr("src",src);
    console.log(id);
    $(".bg-img-popup").addClass("active");
    $(".content-img-popup").addClass("active");
}

function clPopUp() {
    //$(".popup-content").removeClass("fadeInUp");
    $(".bg-img-popup").removeClass("active");
    $(".content-img-popup").removeClass("active");
    //$(".bg-popup").removeClass("active");
}

function preloader() {
    $(".hide").removeClass("hide");
    setTimeout(function () {
        $(".preload").addClass("isload");
    }, 5000);
}

function setUp(){
    preloader();
}

$(window).on("load", setUp);
$(".bg-img-popup").on("click", clPopUp);
//$("content-img-popup").on("click", clPopUp);
screens.on("click", openPopUp);