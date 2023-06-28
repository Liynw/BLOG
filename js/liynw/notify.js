function SAONotify(title,message,action){
  var notifyWindow = document.getElementById('SAO-Notify');
  if(notifyWindow){
    notifyWindow.remove();
  }
  var tempstyle = `@font-face{font-family:'cat';src:url('https://cdn.jsdelivr.net/npm/liynw-blog@1.0.11/fonts/hytmr55.woff');font-display:swap;}#SAO-Notify{z-index:9999;background:rgba(252,252,252,0.8);font-family:cat,-apple-system,sans-serif;font-weight:bolder;text-shadow:0.5px 0.5px 0.5px#888;height:240px;width:350px;position:fixed;bottom:0;right:0;left:0;top:0;margin:auto auto;border-radius:5px;box-shadow:2px 2px 10px#888;display:block;animation:flashOpen 1s ease alternate}.notify-title{background:rgba(255,173,49,0.8);color:rgba(255,255,255,1);height:60px;width:100%;display:block;font-size:20px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;padding-top:10px}.notify-alert::-webkit-scrollbar{display:none}.notify-alert{background:rgba(255,255,255,0.8);color:rgba(60,60,61,0.7);height:120px;overflow:scroll;width:100%;display:flex;justify-content:space-around;align-items:center;}.notify-button{background:rgba(255,173,49,0.8);height:60px;width:100%;display:block;text-align:center;border-bottom-left-radius:5px;border-bottom-right-radius:5px;padding-top:12.5px}.notify-confirm{background:rgba(47,121,212,0);border-radius:50%;display:inline-block;width:36px;height:36px;margin-inline:60px;border:1px solid;border-color:#2f79d4}.notify-confirm button{background:#2f79d4;text-align:center;border-radius:50%;font-size:18px;color:#fff;display:block;width:30px;height:30px;margin:2px}.notify-cancel{background:rgba(203,55,73,0);border-radius:50%;display:inline-block;width:36px;height:36px;margin-inline:60px;border:1px solid;border-color:#cb3749}.notify-cancel button{background:#cb3749;text-align:center;border-radius:50%;font-size:18px;font-weight:bolder;color:#fff;display:block;width:30px;height:30px;margin:2px}.notify-receive{background:rgba(47,121,212,0);border-radius:50%;display:inline-block;width:36px;height:36px;margin-inline:60px;border:1px solid;border-color:#eda60c}.notify-receive button{background:#eda60c;text-align:center;border-radius:50%;font-size:18px;color:#fff;display:block;width:30px;height:30px;margin:2px}@-moz-keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@-webkit-keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@-o-keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@keyframes flashOpen{from{transform:rotateX(90deg)}to{transform:rotateX(0deg)}}@-moz-keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}@-webkit-keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}@-o-keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}@keyframes flashClose{from{transform:rotateX(0deg)}to{transform:rotateX(90deg)}}`;
  if (action){
    var template =`<div id="SAO-Notify"><style>` + tempstyle +`</style><div class="notify-title">` + `${title}` + `</div><div class="notify-alert"> `+ `${message}` + `</div><div class="notify-button"><span class="notify-confirm"><button class="far fa-circle" type="button" name="confirm" onclick="clickAudio();setTimeout(function(){` + `${action}` + `},500);cancelNotify()"></button></span><span class="notify-cancel"><button class="fa fa-times" type="button" name="cancel" onclick="panelAudio();cancelNotify()"></button></span></div><audio id="SAO-Notify-Panel" src="https://npm.elemecdn.com/akilar-candyassets/audio/Panel.mp3"></audio><audio id="SAO-Notify-Click" src="https://npm.elemecdn.com/akilar-candyassets/audio/Click.mp3"></audio>
    </div>`
  } else {
    var template =`<div id="SAO-Notify"><style>` + tempstyle +`</style><div class="notify-title">` + `${title}` + `</div><div class="notify-alert"> `+ `${message}` + `</div><div class="notify-button"><span class="notify-receive"><button class="fas fa-check" type="button" name="receive" onclick="panelAudio();cancelNotify()"></button></span></div><audio id="SAO-Notify-Panel" src="https://npm.elemecdn.com/akilar-candyassets/audio/Panel.mp3"></audio><audio id="SAO-Notify-Click" src="https://npm.elemecdn.com/akilar-candyassets/audio/Click.mp3"></audio>
    </div>`
  };
  document.body.insertAdjacentHTML('beforeend',template);
}
function clickAudio() {
  var clickAudio = document.getElementById("SAO-Notify-Click");
  if (clickAudio) {
    clickAudio.play();
  }
}
function panelAudio() {
  var panelAudio = document.getElementById("SAO-Notify-Panel");
  if (panelAudio) {
    panelAudio.play();
  }
}
function cancelNotify(){
  var notifyWindow = document.getElementById('SAO-Notify');
  notifyWindow.style.animation = 'flashClose 1.5s ease alternate ';
  setTimeout(function() {
    notifyWindow.remove();
  }, 1e3);
}