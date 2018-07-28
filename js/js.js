var hsl = {
    h: 0,
    s: 0,
    l: 0
};
var rgb;
var pallett = false;
var hue = false;
var colorPicker = $('#pallet');
var huePicker = $('#line');
var currentObject;

Number.prototype.minmax = function (min, max) {
    return this < min ? min : (this > max ? max : this);
};

function ViewColor() {
    rgb = HVLtoRGB(hsl.h,hsl.s,hsl.l);
    var hex = '#';
    $('#h').val(hsl.h);
    $('#s').val(hsl.s);
    $('#l').val(hsl.l);

    $('#r').val(rgb[0]);
    $('#g').val(rgb[1]);
    $('#b').val(rgb[2]);

    rgb.forEach(function (item) {
        hex+=item.toString(16);
    });
    $('#hexInp').val(hex);
    $('#'+currentObject).css('background-color','hsl('+hsl.h+','+hsl.s+'%,'+hsl.l+'%)');
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

$('.btnColor').click(function () {
    $('#colorChoose').toggleClass('show');
    currentObject=$(this).attr('id');
});

huePicker.mousemove(function (e) {
    if (e.buttons == 1 && hue) {
        var height = this.offsetHeight;
        var offset = $(this).offset();
        var Y = e.pageY - offset.top;
        if (Y < height) {
            hsl.h = Math.round(Y / height * 100 * 3.6);
            $('#ranger').css('top', Y + 'px');
            colorPicker.css('background-color', 'hsl(' + hsl.h + ',100%,50%)');
        }
        ViewColor();
    }
});

huePicker.mousedown(function () {
    hue=true;
});

colorPicker.mousedown( function () {
    pallett = true
});

$(window).mouseup( function () {
    pallett = false;
    hue = false;
});

$(window).mousemove(function (e) {
    var t,height,width,offset;
    if (e.buttons == 1) {
        if (pallett) {
            t = colorPicker;
            width = t[0].offsetWidth;
            height = t[0].offsetHeight;
            offset = t.offset();
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
            t = huePicker;
            height = t[0].offsetHeight;
            offset = t.offset();
            Y = e.pageY - offset.top;
            Y = Y.minmax(0, height);
            hsl.h = Math.round(Y / height * 100 * 3.6);
            $('#ranger').css('top', Y + 'px');
            $('#pallet').css('background-color', 'hsl(' + hsl.h + ',100%,50%)');
            ViewColor();
        }
    }
});
