obj = {
  element : '',
  currentSec: 0,
  refreshInterval:0,
  init: function () {
    obj.element = $('#stopwatch');
    // localStorage.setItem('stopwatch_sec', 0);

    var currTime = new Date().getTime() / 1000;
    currTime = parseInt(currTime);
    var storedTime = localStorage.getItem('stopwatch_time');
    var sleepedSec = storedTime==null ? 0 : currTime - parseInt(storedTime);
    
    obj.currentSec = localStorage.getItem('stopwatch_sec');
    obj.currentSec = obj.currentSec ? parseInt(obj.currentSec) + sleepedSec : 0;
    if(obj.currentSec) {
      obj.refresh();
       $('#reset').attr('disabled', true);
    }
    
  },
    event: function (type) {
      switch(type) {
        case 'start':
          obj.element.removeAttr('class');
          obj.refresh();
          $('#start, #stop, #pause').attr('disabled', false);
          $('#reset').attr('disabled', true);
        break;
        case 'stop':
          obj.element.removeAttr('class');
          clearTimeout(obj.refreshInterval);
          localStorage.setItem('stopwatch_time', null);
          localStorage.setItem('stopwatch_sec', 0);
          obj.currentSec = 0;

          $('#reset, #stop').attr('disabled', false);
          $('#start, #pause').attr('disabled', true);
        break;
        case 'pause':
          obj.element.addClass('blink');
          clearTimeout(obj.refreshInterval);
          $('#start, #stop').attr('disabled', false);
          $('#reset').attr('disabled', true);
        break;
        case 'reset':
          localStorage.setItem('stopwatch_time', null);
          localStorage.setItem('stopwatch_sec', 0);
          obj.currentSec = 0;
          obj.element.html('00:00:00');
          $('div > input').attr('disabled', false);
        break;
      }
  },
    refresh: function() {
      var sec = obj.currentSec++;
      var hour = parseInt(sec/3600);
      sec = sec % 3600;
      var min = parseInt(sec/60);
      sec = sec % 60;


      obj.element.html((hour > 9 ? hour : '0' + hour) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec));
      localStorage.setItem('stopwatch_sec', obj.currentSec);
      
      var currTime = new Date().getTime() / 1000;
      currTime = parseInt(currTime);
      localStorage.setItem('stopwatch_time', currTime);

      obj.refreshInterval = setTimeout('obj.refresh()', 1000);
    }
}


$('document').ready(function () {
  obj.init();
});

var lap_data=[]
function lap(){
    var z=document.getElementById('stopwatch').innerHTML;
    lap_data.push("<br>"+z)
    console.log(lap_data)
    localStorage.setItem("lap_time",lap_data)
    document.getElementById("demo").innerHTML=localStorage.getItem("lap_time").replace(/,/g,"")
}



var arrpush=[]
function history()
    {
    var z=localStorage.getItem("lap_time").replace(/<br>/g, "");
    for(i=0;i<z.length;i++)
    {
        localStorage.setItem("history",z)
    }
    var his_get=localStorage.getItem("history")
    arrpush.push("<br>"+his_get)
    console.log(arrpush)
    var history_data=localStorage.setItem("arrayhistory",arrpush)
    document.getElementById("log").innerHTML=localStorage.getItem("arrayhistory")

}
