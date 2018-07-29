var hsv = {
    h: 0,
    s: 0,
    v: 0
};
var pallett = false;
var hue = false;
var colorPicker = $('#pallet');
var huePicker = $('#line');
var colorChoose = $('#colorChoose');
var fontChoose = $('#fontChoose');
var currentObject;

Number.prototype.MinMax = function (min, max) {
    return this < min ? min : (this > max ? max : this);
};

function ViewColor() {
    var hsl = HSVtoHSL(hsv.h,hsv.s,hsv.v);
    var rgb = HSVtoRGB(hsv.h,hsv.s,hsv.v);
    var hex = '#';
    $('#h').val(hsl[0]);
    $('#s').val(hsl[1]);
    $('#l').val(hsl[2]);

    $('#r').val(rgb[0]);
    $('#g').val(rgb[1]);
    $('#b').val(rgb[2]);

    rgb.forEach(function (item) {
        hex+=item.toString(16);
    });
    $('#hexInp').val(hex);

    $('#'+currentObject).css('background-color','hsl('+hsl[0]+','+hsl[1]+'%,'+hsl[2]+'%)');
}

function HSVtoRGB(h, s, v) {
    var Hi = Math.round((h / 60)%6);
    var Vmin = (100-s)*v/100;
    var a = (v-Vmin)*(h%60)/60;
    var Vinc = Vmin+a;
    var Vdec = v-a;
    var r = [];
    switch (Hi){
        case 0:
            r.push(v,Vinc,Vmin);
            break;
        case 1:
            r.push(Vdec,v,Vmin);
            break;
        case 2:
            r.push(Vmin,v,Vinc);
            break;
        case 3:
            r.push(Vmin,Vdec,v);
            break;
        case 4:
            r.push(Vmin,Vinc,v);
            break;
        case 5:
            r.push(v,Vmin,Vdec);
            break;
        default:
            r.push(0,0,0);
            break;
    }
    for (var i=0; i<r.length;i++){
        r[i]=Math.round(r[i]*=2.55);
    }
    return r;
}

function HSVtoHSL(h,s,v) {
    s/=100;
    v/=100;
    var r = [];
    var L = (2 - s) * v / 2;
    var S = L&&L<1 ? s*v/(L<0.5 ? L*2 : 2-L*2) : s;
    r.push(h,Math.round(S*100),Math.round(L*100));
    return r;
}

$('.btnColor, .btnFont').click(function () {
    var elem = $(this);
    var chooseBlock;
    var addX;
    var addY = elem.offset().top+elem.height();
    if(elem.hasClass('btnColor')){
        chooseBlock=colorChoose;
        currentObject=elem.attr('id');
        addX = elem.offset().left+(elem.width())*2;
    }
    else {
        chooseBlock=fontChoose;
        addX = elem.offset().left+elem.width();
    }
    chooseBlock.css({
        'top':addY+'px',
        'left':addX+'px'
    });

    chooseBlock.toggleClass('show');
});

huePicker.mousemove(function (e) {
    if (e.buttons == 1 && hue) {
        var height = this.offsetHeight;
        var offset = $(this).offset();
        var Y = e.pageY - offset.top;
        if (Y < height) {
            hsv.h = Math.round(Y / height * 100 * 3.6);
            $('#ranger').css('top', Y + 'px');
            colorPicker.css('background-color', 'hsl(' + hsv.h + ',100%,50%)');
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
            X = X.MinMax(0, width);
            Y = Y.MinMax(0, height);
            hsv.s = Math.round(X / width*100);
            hsv.v = 100 - Math.round(Y / height*100);
            X.MinMax();
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
            Y = Y.MinMax(0, height);
            hsv.h = Math.round(Y / height * 100 * 3.6);
            $('#ranger').css('top', Y + 'px');
            $('#pallet').css('background-color', 'hsl(' + hsv.h + ',100%,50%)');
            ViewColor();
        }
    }
});
