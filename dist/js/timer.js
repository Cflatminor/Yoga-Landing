timeend = new Date();
timeend = new Date(2018, 12-1, 20);
function time() {
    today = new Date();
    today = Math.floor((timeend-today)/1000);
    tsec=today%60; today=Math.floor(today/60); if(tsec<10)tsec='0'+tsec;
    tmin=today%60; today=Math.floor(today/60); if(tmin<10)tmin='0'+tmin;
    thour=today%24; today=Math.floor(today/24);
    timestr=today;
    timestrH=thour;
    timestrM=tmin;
    timestrS=tsec;

    document.getElementById('d').innerHTML=timestr;

    document.getElementById('h').innerHTML=timestrH;

    document.getElementById('m').innerHTML=timestrM;

    document.getElementById('s').innerHTML=timestrS;
    window.setTimeout("time()",1000);
}
time();
