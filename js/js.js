/**
 * Created by hz on 15.07.2018.
 */
var HVLtoRGB=function HVLtoRGB (h,c,x,m) {
    var r =[];
    if(h>=0 && h<60) r.push(c,x,0);
    if(h>=60 && h<120) r.push(x,c,0);
    if(h>=120 && h<180) r.push(0,c,x);
    if(h>=180 && h<240) r.push(0,x,c);
    if(h>=240 && h<300) r.push(x,0,c);
    if(h>=300 && h<360) r.push(c,0,x);
    for (var i=0;i<r.length;i++){
        r[i]=Math.round((r[i]+m)*255);
    }
    return r;
};
$('#btn').click(function () {
    var h=$('#h').val();
    var s=$('#s').val();
    var l=$('#l').val();
    var Hk=h/60;
    var c=(1-Math.abs(2*l))*s;
    var x=c*(1-Math.abs(Hk%2-1));
    var m=l-c/2;
    var rgb= HVLtoRGB(h,c,x,m);
    var colorString = rgb[0]+","+rgb[1]+","+rgb[2];
    var textInp=$('#result');
    textInp.val(colorString);
    textInp.css('background-color','rgb('+colorString+')');
});
