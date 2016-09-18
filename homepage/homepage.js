var cueIdx = 0,
    cues = $('.cueLists').find('li'),
    maxCue = cues.length;

var rollingCues = function () {
    preloader();
    if (maxCue == 0) {
        return;
    }
    cues.eq(cueIdx).removeClass('fadein').addClass('fadeout');

    setTimeout(function () {
        cues.eq(cueIdx).addClass('wait');
        cueIdx++;
        cueIdx = (cueIdx >= maxCue) ? 0 : cueIdx;
        cues.eq(cueIdx).removeClass('wait');
        setTimeout(function () {
            cues.eq(cueIdx).removeClass('fadeout').addClass('fadein');
            setTimeout(rollingCues, 2000);
        }, 500);
    }, 500);
};

function preloader() {
    $(".hide").removeClass("hide");
    setTimeout(function () {
        $(".preload").addClass("isload");
    }, 5000);
}

$(window).on("load", rollingCues);