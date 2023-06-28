function insertAtCursor(myField, myValue) {
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
  }
  else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

      if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
      }
      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
  } else {
      myField.value += myValue;
      myField.focus();
  }
}
let lyw = {};
// 显示右键菜单
lyw.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');
  if (isTrue) {
      $rightMenu.show();
  } else {
      $rightMenu.hide();
  }
}
// 复制地址
lyw.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
  GLOBAL_CONFIG.Snackbar && btf.snackbarShow('复制成功');
}
// 阅读模式
lyw.switchReadMode = function () {
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)
  function clickFn() {
      $body.classList.remove('read-mode')
      newEle.remove()
      newEle.removeEventListener('click', clickFn)
  }
  newEle.addEventListener('click', clickFn)
}
// 复制文本
lyw.copySelect = function () {
  document.execCommand('Copy', false, null);
}
// 回到顶部
lyw.scrollToTop = function () {
  btf.scrollToDest(0, 500);
}
// 保存图片
lyw.saveimg = function () {
    var a = document.createElement('a');
    var url = el.src;
    var filename = url.split("/")[-1];
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
// 切换主题
lyw.switchTheme=function(load=false){
  let themes = ['candyhome.css','simple.css'];
  let vTheme = parseInt(localStorage.getItem('visitor-theme'));
  if(!vTheme){
      vTheme = load?0:1;
  }else{
      vTheme += load?0:1;
      vTheme%=themes.length;
  }
  localStorage.setItem('visitor-theme',vTheme)
  let themesrc = ''
  if(themes[vTheme]){
      themesrc += 'https://cdn.jsdelivr.net/npm/liynw-blog@1.0.11/css/liynw/themes/'+themes[vTheme];
  }
  $(document.head).find('[tag="theme"]')[0].href = themesrc;
};
$('#menu-themeChange').on('click',function(){lyw.switchTheme();});
window.addEventListener('load',function(){lyw.switchTheme(true);});
// 评论
lyw.commentSelect = function(){
  console.log(document.getSelection().toString());
	window.location.href = window.location.href.split('#')[0]+"#post-comment"
	$("#twikoo>.tk-comments>.tk-submit textarea.el-textarea__inner").val("> "+document.getSelection().toString()+"\n\n").focus().change();
}
// 显示菜单
function popupMenu() {
  window.oncontextmenu = function (event) {
      if (event.ctrlKey) return true; //ctrl+右键 使用原生右键
      console.log(event.keyCode)
      $('.rightMenu-group.hide').hide();
      if (document.getSelection().toString()) {
          $('#menu-text').show();
      }
      if (document.getElementById('post')) {
          $('#menu-post').show();
      } else {
          if (document.getElementById('page')) {
              $('#menu-post').show();
          }
      }
      var el = window.document.body;
      el = event.target;
      var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
      if (a.test(window.getSelection().toString())){
          $('#menu-too').show()
      }
      if (el.tagName == 'A') {
          $('#menu-to').show()
          lyw.open = function () {
              location.href = el.href
          }
          // 新标签打开链接
          lyw.openWithNewTab = function () {
              window.open(el.href);
              window.location.reload();
          }
          // 复制链接
          lyw.copyLink = function () {
              let url = el.href
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
              GLOBAL_CONFIG.Snackbar && btf.snackbarShow('复制成功');
          }
      }
      if (el.tagName == 'IMG') {
          $('#menu-img').show()
          // 新标签打开图片
          lyw.openWithNewTab = function () {
              window.open(el.src);
              window.location.reload();
          }
          // 点击图片
          lyw.click = function () {
              el.click()
          }
          // 复制图片地址
          lyw.copyLink = function () {
              let url = el.src
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
              GLOBAL_CONFIG.Snackbar && btf.snackbarShow('复制成功');
          }
      } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
          $('#menu-paste').show();
          lyw.paste = function () {
              navigator.permissions
                  .query({
                      name: 'clipboard-read'
                  })
                  .then(result => {
                      if (result.state == 'granted' || result.state == 'prompt') {
                          navigator.clipboard.readText().then(text => {
                              console.log(text)
                              insertAtCursor(el, text)
                          })
                      } else {
                          alert('请允许读取剪贴板！')
                      }
                  })
          }
      }
      let pageX = event.clientX + 10;
      let pageY = event.clientY;
      let rmWidth = $('#rightMenu').width();
      let rmHeight = $('#rightMenu').height();
      if (pageX + rmWidth > window.innerWidth) {
          pageX -= rmWidth + 10;
      }
      if (pageY + rmHeight > window.innerHeight) {
          pageY -= pageY + rmHeight - window.innerHeight;
      }
      lyw.showRightMenu(true, pageY, pageX);
      return false;
  };
  window.addEventListener('click', function () {
      lyw.showRightMenu(false);
  });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement
function addLongtabListener(target, callback) {
  let timer = 0
  target.ontouchstart = () => {
      timer = 0
      timer = setTimeout(() => {
          callback();
          timer = 0
      }, 380)
  }
  target.ontouchmove = () => {
      clearTimeout(timer)
      timer = 0
  }

  target.ontouchend = () => {
      if (timer) {
          clearTimeout(timer)
      }
  }
}
addLongtabListener(box, popupMenu)