// 引入传送点文件
const gw2map = require("./way-point.json");

// 保存输入的信息
var userInput;

// 保存查询结果
var waypointQueryResult;

// 保存传送点信息
var waypointInfo;

// 插件打开时执行
utools.onPluginEnter(({code, type, payload}) => {

  // 设置子输入框
  utools.setSubInput(({ text }) => {
    // 获取子输入框的内容并赋值
    userInput = text;
    
    // 无输入内容时的缺省提示
  }, '你好，指挥官')
})

// 窗口加载后执行
window.onload = function () {

  // 监听键盘按键
  document.addEventListener('keydown', (e) => {

    // 按下回车按键时执行
    if(e.code == "Enter") {

      // 获取查询结果并赋值
      waypointQueryResult = gw2map.waypoint.find(funcWaypointQuery);

      // 赋值前端信息
      funcSetWaypointInfo(waypointQueryResult);

      // 获取·传送点信息
      waypointInfo = waypointQueryResult.waypoint_name + ' - ' + waypointQueryResult.waypoint_code + ' - ' + waypointQueryResult.waypoint_map + ' - ' + waypointQueryResult.waypoint_area;
      // 将内容复制到系统剪贴板
      utools.copyText(waypointInfo);
      // 为显示在UI上做准备
      document.getElementById("waypoint").innerText = waypointInfo;
      // 显示 UI
      funcShow();
    }
  })

  // 表格样式函数
  funcSetTableSytle();
}

// 查询函数
function funcWaypointQuery(inputWayPoint) {

  // 返回查询信息
  return inputWayPoint.waypoint_name == userInput;

}

function funcSetWaypointInfo(waypointQueryResult) {

  document.getElementById("waypoint-name").innerText = waypointQueryResult.waypoint_name;
  document.getElementById("waypoint-code").innerText = waypointQueryResult.waypoint_code;
  document.getElementById("waypoint-map").innerText = waypointQueryResult.waypoint_map;
  document.getElementById("waypoint-area").innerText = waypointQueryResult.waypoint_area;
  document.getElementById("waypoint-dlc").innerText = waypointQueryResult.waypoint_dlc;

  document.getElementById("queryTips").style.display = "block";
  document.getElementById("queryTips").style.color = utools.isDarkColors() ? 'white' : 'black';

  document.getElementById("waypoint").style.display = "block";
  document.getElementById("waypoint").style.color = utools.isDarkColors() ? 'white' : 'black';

}

function funcShow() {
  document.getElementById("tabletable").style.display = "block";

  utools.setSubInputValue('');
}

function funcSetTableSytle() {
  var tfrow = document.getElementById('tfhover').rows.length;
  var tbRow = [];
  for (var i = 1; i < tfrow; i++) {
    tbRow[i] = document.getElementById('tfhover').rows[i];
    tbRow[i].onmouseover = function () {
      this.style.backgroundColor = '#f3f8aa';
    };
    tbRow[i].onmouseout = function () {
      this.style.backgroundColor = '#ffffff';
    };
  }
}