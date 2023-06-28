let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
let styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`
let styleContent = `
color: rgb(30,152,255);
`
let title1 = 'Liynw'
let title2 = `
┏┛┻━━━━━━━━┛┻┓
┃｜｜｜｜｜｜｜┃
┃　　　━　　　 ┃
┃　┳┛ 　┗┳ 　 ┃
┃　　　　　　　┃
┃　　　┻　　　 ┃
┃　　　　　　　┃
┗━━┓　　　┏━━━┛
　　┃　史　┃　　
　　┃　诗　┃　　
　　┃　之　┃　　
　　┃　宠　┃
　　┃　　　┗━━━━━━┓
　　┃           　┣┓
　　┃镇站专用宠物　┃
　　┗━┓┓┏━┳┓┏━━━━━┛
　　　┃┫┫　┃┫┫
　　　┗┻┛　┗┻┛                                           
`
let content = `
版 本 号：1.0.11
更新日期：2023-6-28

主页:  https://blog.liynw.top/
Github:  https://github.com/Liynw/BLOG
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)

function randomPost() {
    fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        while (true) {
            let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
            if (location.href == url) continue;
            location.href = url;
            return;
        }
    })
}

function pjaxUpdate(type, attribute, value) {
    return new Promise(resolve => {
        const oldEle = document.querySelector(`${type}[${attribute}="${value}]"`)
        if (!oldEle) return resolve(false)
        const newEle = document.createElement(type)
        const content = item.text || item.textContent || item.innerHTML || ""
        Array.from(item.attributes).forEach(attr => newEle.setAttribute(attr.name, attr.value))
        newEle.appendChild(document.createTextNode(content))
        newEle.onload = () => resolve(true)
        oldEle.parentNode.replaceChild(newEle, oldEle)
        resolve(false)
    })
}

// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
// 表情放大
function owoBig() {
    let flag = 1, // 设置节流阀
        owo_time = '', // 设置计时器
        m = 3 // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    let body = document.querySelector('body')
    body.appendChild(div)

    document.getElementById('post-comment').addEventListener('DOMNodeInserted', (dom) => {
        if (dom.target.classList && (dom.target.classList.value == 'OwO-body' || 'tk-comment')) {
            let owo_body = dom.target;

            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            owo_body.addEventListener('contextmenu', e => e.preventDefault())

            // 鼠标移入
            owo_body.addEventListener('mouseover', (e) => {
                if (e.target.tagName == 'IMG' && flag) {
                    flag = 0;
                    // 移入300毫秒后显示盒子
                    owo_time = setTimeout(() => {
                        let height = e.path[0].clientHeight * m // 盒子高
                        let width = e.path[0].clientWidth * m // 盒子宽
                        let left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2 // 盒子与屏幕左边距离
                        if ((left + width) > body.clientWidth) { left -= ((left + width) - body.clientWidth + 10) } // 右边缘检测，防止超出屏幕
                        if (left < 0) left = 10 // 左边缘检测，防止超出屏幕
                        let top = e.y - e.offsetY // 盒子与屏幕顶部距离

                        // 设置盒子样式
                        div.style.height = height + 'px'
                        div.style.width = width + 'px'
                        div.style.left = left + 'px'
                        div.style.top = top + 'px'
                        div.style.display = 'flex'
                        // 在盒子中插入图片
                        div.innerHTML = `<img src="${e.target.src}">`
                    }, 300);
                }
            })

            // 鼠标移出
            owo_body.addEventListener('mouseout', (e) => {
                // 隐藏盒子
                div.style.display = 'none';
                flag = 1
                clearTimeout(owo_time)
            })
        }
    });
}

// 复制通知，F12 通知
(function () {
    'use strict';
    document.onkeydown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            iziToast.info({
                title: '已开启开发者模式',
                message: '扒源码请遵守 GPL 协议！<a href="/license/">点击查看博客声明</a>',
                timeout: 2000,
                backgroundColor: '#e5f7ff',
                icon: 'Fontawesome',
                icon: 'far fa-copyright',
                position: 'topRight'
            });
        }
    }
})();

document.body.oncopy = function () {
    iziToast.info({
        timeout: 2000,
        icon: 'Fontawesome',
        closeOnEscape: 'true',
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight',
        layout: '2',
        position: 'topRight',
        icon: 'far fa-copy',
        backgroundColor: '#e5f7ff',
        title: '复制成功',
        message: '请遵守 CC BY-NC-SA 4.0 协议'
    });
}

// 老旧浏览器提示
function browserTC() {
    iziToast.warning({
        title: '检测到您的浏览器版本过低',
        message: '这可能会导致网站样式错乱，SW 脚本无法运行而导致您的体验下降。',
        timeout: 5000,
        position: 'topRight'
    });
}
function browserVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
    var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
    var isOpera = userAgent.indexOf("Opera")>-1 || userAgent.indexOf("OPR")>-1 ; //Opera浏览器
    var isChrome = userAgent.indexOf("Chrome")>-1 && userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Chrome浏览器
    var isSafari = userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Chrome")==-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Safari浏览器
    if(isEdge) {
        if(userAgent.split('Edge/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isFirefox) {
        if(userAgent.split('Firefox/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isOpera) {
        if(userAgent.split('OPR/')[1].split('.')[0]<80){
            browserTC()
        }
    } else if(isChrome) {
        if(userAgent.split('Chrome/')[1].split('.')[0]<90){
            browserTC()
        }
    }
}
function setCookies(obj, limitTime) {
	let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toGMTString()
	for (let i in obj) {
		document.cookie = i + '=' + obj[i] + ';expires=' + data
	}
}
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
if(getCookie('browsertc')!=1){
    setCookies({
        browsertc: 1,
    }, 1);
    browserVersion();
}

// aplayer 不中断
function doStuff() {
    var flag=0;
    try{
        ap=aplayers[0];
        ap.list;
        flag=1;
    }catch{
        setTimeout(doStuff, 50);
        return;
    }
    if(flag){
        ap.lrc.hide();
        document.getElementsByClassName("aplayer-icon-menu")[0].click()
        if(localStorage.getItem("musicIndex")!=null){
            musicIndex = localStorage.getItem("musicIndex");
            ap.list.switch(musicIndex);
        }
        if(sessionStorage.getItem("musicTime") != null){
            window.musict = sessionStorage.getItem("musicTime");
            ap.setMode(sessionStorage.getItem("musicMode"));
            if(sessionStorage.getItem("musicPaused")!='1'){
                ap.play();
            }
            var g=true;
            ap.on("canplay",function(){
                if(g){
                    ap.seek(window.musict);
                    g=false;
                }
            });
        }else{
            sessionStorage.setItem("musicPaused",1);
            ap.setMode("mini");
        }
        if(sessionStorage.getItem("musicVolume") != null){
            ap.audio.volume=Number(sessionStorage.getItem("musicVolume"));
        }
        ap.on("pause",function(){sessionStorage.setItem("musicPaused",1);ap.lrc.hide()});
        ap.on("play",function(){sessionStorage.setItem("musicPaused",0);ap.lrc.show()});
        ap.audio.onvolumechange=function(){sessionStorage.setItem("musicVolume",ap.audio.volume);};
        setInterval(function(){
            musicIndex = ap.list.index;
            musicTime = ap.audio.currentTime;
            localStorage.setItem("musicIndex",musicIndex);
            sessionStorage.setItem("musicTime",musicTime);
            sessionStorage.setItem("musicMode",ap.mode);
        },200);
    }
}
doStuff();

// leaves

var stop, staticx;
var img = new Image();
img.src = "https://cdn.jsdelivr.net/npm/liynw-blog@1.0.11/img/leaf.webp";
function Sakura(x, y, s, r, fn) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn
}
Sakura.prototype.draw = function(cxt) {
    cxt.save();
    var xc = 20 * this.s / 2;
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(img, 0, 0, 20 * this.s, 20 * this.s);
    cxt.restore()
};
Sakura.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom("fnr");
        if (Math.random() > 0.4) {
            this.x = getRandom("x");
            this.y = 0;
            this.s = getRandom("s");
            this.r = getRandom("r")
        } else {
            this.x = window.innerWidth;
            this.y = getRandom("y");
            this.s = getRandom("s");
            this.r = getRandom("r")
        }
    }
};
SakuraList = function() {
    this.list = []
};
SakuraList.prototype.push = function(sakura) {
    this.list.push(sakura)
};
SakuraList.prototype.update = function() {
    for (var i = 0,
    len = this.list.length; i < len; i++) {
        this.list[i].update()
    }
};
SakuraList.prototype.draw = function(cxt) {
    for (var i = 0,
    len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt)
    }
};
SakuraList.prototype.get = function(i) {
    return this.list[i]
};
SakuraList.prototype.size = function() {
    return this.list.length
};
function getRandom(option) {
    var ret, random;
    switch (option) {
    case "x":
        ret = Math.random() * window.innerWidth;
        break;
    case "y":
        ret = Math.random() * window.innerHeight;
        break;
    case "s":
        ret = Math.random();
        break;
    case "r":
        ret = Math.random() * 4;
        break;
    case "fnx":
        random = -0.5 + Math.random() * 1;
        ret = function(x, y) {
            return x + 0.5 * random - 1.7
        };
        break;
    case "fny":
        random = 1.5 + Math.random() * 0.7;
        ret = function(x, y) {
            return y + random
        };
        break;
    case "fnr":
        random = Math.random() * 0.03;
        ret = function(r) {
            return r + random
        };
        break
    }
    return ret
}
function startSakura() {
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement("canvas"),
    cxt;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute("style", "position: fixed;left: 0;top: 0;pointer-events: none;");
    canvas.setAttribute("id", "canvas_sakura");
    document.getElementsByTagName("body")[0].appendChild(canvas);
    cxt = canvas.getContext("2d");
    var sakuraList = new SakuraList();
    for (var i = 0; i < 50; i++) {
        var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
        randomX = getRandom("x");
        randomY = getRandom("y");
        randomR = getRandom("r");
        randomS = getRandom("s");
        randomFnx = getRandom("fnx");
        randomFny = getRandom("fny");
        randomFnR = getRandom("fnr");
        sakura = new Sakura(randomX, randomY, randomS, randomR, {
            x: randomFnx,
            y: randomFny,
            r: randomFnR
        });
        sakura.draw(cxt);
        sakuraList.push(sakura)
    }
    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.update();
        sakuraList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee)
    })
}
window.onresize = function() {
    var canvasSnow = document.getElementById("canvas_snow")
};
img.onload = function() {
    startSakura()
};
function stopp() {
    if (staticx) {
        var child = document.getElementById("canvas_sakura");
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
        staticx = false
    } else {
        startSakura()
    }
};

// fps

if(window.localStorage.getItem("fpson")==="1"){
var rAF = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();
var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var loop = function () {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);
 
    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;
 
    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        if(fps<=6){
            var kd=`<span style="color:#bd0000">卡成ppt</span>`
        }
        else if(fps<24){
            var kd=`<span style="color:orange">会有卡的感觉</span>`
        }
        else if(fps<=40){
            var kd=`<span style="color:green">基本不影响体验</span>`
        }
        else{
            var kd=`<span style="color:#425aef">正常</span>`
        }
        document.getElementById("fps").innerHTML=`FPS:${fps} ${kd}`;
        frame = 0;
        lastTime = now;
    };
 
    rAF(loop);
}

loop();
}
else{$("#fps").hide()}