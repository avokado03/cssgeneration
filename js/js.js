/**
 * Created by hz on 15.07.2018.
 */
$('#btn').click(function () {
    var h=$('#h').val();
    var s=$('#s').val();
    var l=$('#l').val();

    var Q = l<0.5 ? l*(1+s) : l+s-(l*s);
    var P = 2*l-Q;
    var Hk = h/360;
    var T = [Hk+1/3,Hk, Hk-1/3];
    for (var i=0; i<T.length; i++) {
        if (T[i] < 0)
            ++T[i];
        if (T[i] > 1)
            --T[i];
    }

    for (var j=0; j<T.length; j++){
        if (T[j]<1/6)
            T[j]=P+(Q-P)*6*T[j];
        else if (T[j]>=1/6 && T[j]<0.5)
            T[j]=Q;
        else if(T[j]>=0.5 && T[j]<2/3)
            T[j]=P+((Q-P)*(2/3-T[j])*6);
        else
            T[j]=P;
    }
    var colorString = T[0]+","+T[1]+","+T[2];
    $('#result').val(colorString);
});
