var hsl = {
    h: 0,
    s: 0,
    l: 0
}

// если число не в диапозоне возвращает минимальное/максимальное значение
Number.prototype.minmax = function (min, max) {
    return this < min ? min : (this > max ? max : this);
}

var palette = false; // true если пользователь зажал клавишу мыши над квадратом sl
var hue = false; // true если пользователь зажал клавишу миши над полосой выбора hue
var colorPicker = $('#pallet');
var huePicker = $('#line');

function ViewColor() {
    $('#h').val(hsl.h);
    $('#s').val(hsl.s);
    $('#l').val(hsl.l);
    var rgb = HVLtoRGB(260, 40, 10);
}

function HVLtoRGB(h, s, l) {
    s /= 100;
    l /= 100;
    var Hk = h / 60;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs(Hk % 2 - 1));
    var m = l - c / 2;
    var r = [];
    if (Hk >= 0 && Hk < 1) r.push(c, x, 0);
    else if (Hk >= 1 && Hk < 2) r.push(x, c, 0);
    else if (Hk >= 2 && Hk < 3) r.push(0, c, x);
    else if (Hk >= 3 && Hk < 4) r.push(0, x, c);
    else if (Hk >= 4 && Hk < 5) r.push(x, 0, c);
    else r.push(c, 0, x);
    for (var i = 0; i < r.length; i++) {
        r[i] = Math.round((r[i] + m) * 255);
    }
    return r;
}

$('#btn').click(function () {
    $('#colorChoose').toggleClass('show');
});

$('#line').mousemove(function (e) {
    if (e.buttons == 1 && hue) {
        var height = this.offsetHeight;
        var offset = $(this).offset();
        var Y = e.pageY - offset.top;
        if (Y < height) {
            hsl.h = Math.round(Y / height * 100 * 3.6);
            $('#ranger').css('top', Y + 'px');
            $('#pallet').css('background-color', 'hsl(' + hsl.h + ',100%,50%)');
        }
        ViewColor();
    }
});

$('#line').mousedown(() => hue = true);

$('#pallet').mousedown(() => palette = true);

$(window).mouseup(() => {
    palette = false;
    hue = false;
});

$(window).mousemove(function (e) {
    if (e.buttons == 1) {
        if (palette) {
            var t = colorPicker;
            var width = t[0].offsetWidth;
            var height = t[0].offsetHeight;
            var offset = t.offset();
            var X = e.pageX - offset.left;
            var Y = e.pageY - offset.top;
            X = X.minmax(0, width);
            Y = Y.minmax(0, height);
            hsl.s = Math.round(X / width * 100);
            hsl.l = 100 - Math.round(Y / height * 100);
            X.minmax();
            $('#curs').css({
                "top": Y + "px",
                "left": X + "px"
            });
            ViewColor();
        } else if (hue) {
            var t = huePicker;
            var height = t[0].offsetHeight;
            var offset = t.offset();
            var Y = e.pageY - offset.top;
            Y = Y.minmax(0, height);
            hsl.h = Math.round(Y / height * 100 * 3.6);
            $('#ranger').css('top', Y + 'px');
            $('#pallet').css('background-color', 'hsl(' + hsl.h + ',100%,50%)');
            ViewColor();
        }
    }
});
