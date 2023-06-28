function saveData(name, data) {
    localStorage.setItem(name, data);
}

function loadData(name) {
    let data = localStorage.getItem(name);
    return data;
}

// 初始化

try {
    let data = loadData('blogbg')
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

try {
    let zt = loadData('hiderightbottom_data');
    if(zt) hiderightbottom();
    else localStorage.removeItem('hiderightbottom_data');
} catch (error) { localStorage.removeItem('hiderightbottom_data'); }

try {
    let zt2 = loadData('themeColor');
    if(zt2) setColor(zt2);
} catch (error) { saveData('themeColor', 'pink'); }

try {
    let zt3 = loadData('kuanping');
    if(zt3 === "1") kuanping();
    else localStorage.removeItem('kuanping');
} catch (error) { localStorage.removeItem('kuanping'); }

try {
    let zt4 = loadData('setleaves');
    if(zt4 === "1") setleaves();
    else {saveData('setleaves', "1");setleaves();}
} catch (error) { saveData('setleaves', "1"); }

// 设置函数

function changeBg(s, flag) { // 切换背景
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

if(localStorage.getItem("hideRightside")==undefined){
    localStorage.setItem("hideRightside","0");
}

if(localStorage.getItem("hideRightside")=="1"){
    $("#rightside").toggle()
}
function toggleRightside(){
    $("#rightside").toggle();
    localStorage.setItem("hideRightside",Math.abs(Number(localStorage.getItem("hideRightside"))-1))
}

function setColor(color) { // 切换主题色
    document.getElementById("themeColor").innerText=`:root{--lyw-color-default:var(--lyw-${color})!important;--lyw-color-default-light:var(--lyw-${color}-light)!important}`;
    saveData('themeColor', color);
}

function kuanping() {
    if(loadData('kuanping') !== "1") {
        document.getElementById("kuanping").innerText=`.layout{max-width:1400px;}.aside-content{max-width:312px;min-width:300px;}@media screen and (min-width:1200px){#recent-posts{align-content:flex-start;display:flex;flex-wrap:wrap;justify-content:space-between;}#recent-posts > .recent-post-item{margin-top:1rem;display:inline-block;height:auto;width:49%;}#recent-posts > .recent-post-item .post_cover{width:100%;height:200px;}#recent-posts > .recent-post-item .post_cover img.post_bg{width:100%;height:100%;}#recent-posts > .recent-post-item{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}#recent-posts > .recent-post-item .left_radius{border-radius:8px 8px 0 0;}#recent-posts > .recent-post-item .right_radius{border-radius:8px 8px 0 0;}.recent-post-item{height:auto !important;}.recent-post-info{padding:0 40px;margin-top:1em;width:100%!important;}#recent-posts > .recent-post-item > .recent-post-info > .article-title{-webkit-line-clamp:1;margin-top:0.3rem;margin-bottom:0.3rem;font-size:1.2em;line-height:1.4;}#recent-posts > .recent-post-item >.recent-post-info > .article-meta-wrap{margin-bottom:1rem;}}.recent-post-info{display:flex;flex-direction:column;}.recent-post-info .article-meta-wrap{order:2;}.recent-post-info .content{order:1;}#bbTimeList{width:100%;}.layout.hide-aside{max-width:1400px;}#pagination{margin:0 auto!important;}`;
        saveData('kuanping',"1");
    }else{
        document.getElementById("kuanping").innerText=`/*nothing is there*/`;
        saveData('kuanping',"0");
    }
}

function setleaves() {
    if(loadData('setleaves') === "0"){
        stopp();
        saveData('setleaves', "1");
    }else{
        stopp();
        saveData('setleaves', "0");
    }
}

function fpson() {
    if(loadData('fpson') === "0"){
        saveData('fpson', "1");
    }else{
        saveData('fpson', "0");
    }
}

var winbox = ''

function createWinbox() {
    winbox = WinBox({
        id: 'changeBgBox',
        index: 888,
        title: "博客设置",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: 'var(--lyw-color-default)'
    });
    winResize();
    window.addEventListener('resize', winResize)

    winbox.body.innerHTML = `
    <style>
    .wb-title{
        font-family: cat,'PingFang SC','Ubuntu Mono','Noto Sans','Microsoft Yahei','SimSun'!important;
    }
    [data-theme="dark"] .wb-title{
        color:white;
    }
    [data-theme="dark"] #changeBgBox{
        background: #000a!important;
    }
    [data-theme="dark"] .wb-body{
        background:#000a!important;
    }
    .winbox.focus.max {
        border-radius: 0!important;
        -webkit-border-radius: 0!important;
        -moz-border-radius: 0!important;
        -ms-border-radius: 0!important;
        -o-border-radius: 0!important;
    }
    #article-container input[type="checkbox"] {
        width: 38px;
        height: 20px;
        position: relative;
        border: 1px solid #000000;
        background-color: #fdfdfd;
        border-radius: 12px;
        background-clip: content-box;
        display: inline-block;
        -webkit-appearance: none;
        user-select: none;
        outline: none;
        transform: translateY(5px);
    }
    #article-container input[type="checkbox"]:before {
        content: '';
        width: 12px;
        height: 12px;
        position: absolute;
        top: 3px;
        left: 5px;
        border-radius: 10px;
        background-color: #000;}
    #article-container input[type="checkbox"]:checked {
        background-color: var(--lyw-color-default);border-color:var(--lyw-color-default)}
    #article-container input[type="checkbox"]:checked:before {
        left: 19px;background-color: white!important;}
    #article-container input[type="checkbox"] {
        transition: border background-color box-shadow }
    #article-container input[type="checkbox"]:before {
        transition: left 0.2s;}
    #article-container input[type="checkbox"]:checked {
        background-color: var(--lyw-color-default);
    }
    #article-container input[type="checkbox"]:checked:before {
        transition: left 0.2s;}
    #article-container input[type="checkbox"]:checked:hover{
        opacity: 0.8;
    }
    #article-container input[type="checkbox"]:active{
        background-color: #666666!important;
        border-color:#666666!important;
    }
    #article-container input[type="checkbox"]:active::before{
        background-color:white!important;
    }
    </style>
    <div id="article-container" style="padding:10px;">

    <h1 class="content-head">主题设置</h1>

    <button class="content-button" onclick="lyw.switchTheme()">切换主题</button></br>
    <input type="checkbox" id="hideAside" onclick="toggleRightside()"><div class="content-text">隐藏右侧按钮（您仍然可以通过右键菜单进行相应操作）</div>
    <input type="checkbox" checked="checked" id="hideAside" onclick="setleaves()"><div class="content-text">打开落叶特效</div>
    <input type="checkbox" id="kuanping" onclick="kuanping()"><div class="content-text">宽屏模式（1400px）</div>
    <input type="checkbox" id="fpson" onclick="fpson()"><div class="content-text">开启帧率检测（刷新生效）</div>
    <h2 class="content-head">主题色</h2>
    <div class="content" id="lyw_bs_changecolor">
    <input type="radio" id="red" name="colors" value=" " onclick="setColor('red')">
    <input type="radio" id="orange" name="colors" value=" " onclick="setColor('orange')">
    <input type="radio" id="yellow" name="colors" value=" " onclick="setColor('yellow')">
    <input type="radio" id="green" name="colors" value=" " onclick="setColor('green')">
    <input type="radio" id="aqua" name="colors" value=" " onclick="setColor('aqua')">
    <input type="radio" id="blue" checked="checked" name="colors" value=" " onclick="setColor('blue')">
    <input type="radio" id="darkblue" name="colors" value=" " onclick="setColor('darkblue')">
    <input type="radio" id="purple" name="colors" value=" " onclick="setColor('purple')">
    <input type="radio" id="pink" name="colors" value=" " onclick="setColor('pink')">
    </div>
    <hr>
    
    <h1 class="content-head">背景设置</h1>

    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:var(--lyw-color-default);display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fas fa-sync-alt"></i>点我恢复默认背景</button></p>

    <h2 id="电脑壁纸"><a href="#电脑壁纸" class="headerlink" title="电脑壁纸"></a>电脑壁纸</h2>
    <div class="bgbox">
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/1.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/1.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/2.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/2.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/3.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/3.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/4.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/4.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/5.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/5.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/6.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/6.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/7.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/7.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/8.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/8.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/9.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/9.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/10.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/10.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/11.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/11.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/12.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/12.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/13.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/13.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/14.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/14.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/15.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/15.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/16.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/16.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/17.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/17.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/18.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/18.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/19.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/19.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/20.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/20.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/21.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/21.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/22.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/22.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/23.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/23.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/24.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/24.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/25.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/25.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/26.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/26.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/27.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/27.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/28.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/28.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/29.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/29.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https\://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/30.webp)')"><img src="https://cdn.jsdelivr.net/npm/saiodgm-api@1.0.1/randomimg-my/30.webp"></a>
    </div>

    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" class="box" style="background: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)" onclick="changeBg('linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)')"></a>
    <a href="javascript:;" class="box" style="background: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)" onclick="changeBg('linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)')"></a>
    <a href="javascript:;" class="box" style="background: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)" onclick="changeBg('linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)')"></a>
    <a href="javascript:;" class="box" style="background: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)" onclick="changeBg('linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)')"></a>
    <a href="javascript:;" class="box" style="background: linear-gradient(13deg, #0a0a39, #1d4064, #267992, #22b8c3)" onclick="changeBg('linear-gradient(13deg, #0a0a39, #1d4064, #267992, #22b8c3)')"></a>
    </div>

    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <input type="color" id="color"> 
    <a href="javascript:;" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a>
    <a href="javascript:;" class="box" style="background: #A9BC8F" onclick="changeBg('#A9BC8F')"></a>
    <a href="javascript:;" class="box" style="background: #8cb7b9" onclick="changeBg('#8cb7b9')"></a>
    <a href="javascript:;" class="box" style="background: #c1cbd7" onclick="changeBg('#c1cbd7')"></a>
    <a href="javascript:;" class="box" style="background: #8696a7" onclick="changeBg('#8696a7')"></a>
    <a href="javascript:;" class="box" style="background: #d8caaf" onclick="changeBg('#d8caaf')"></a>
    <a href="javascript:;" class="box" style="background: #965454" onclick="changeBg('#965454')"></a>
    <a href="javascript:;" class="box" style="background: #c9c0d3" onclick="changeBg('#c9c0d3')"></a>
    <a href="javascript:;" class="box" style="background: #b5c4b1" onclick="changeBg('#b5c4b1')"></a>
    </div>

    </div>
`;
}
function winResize() {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}