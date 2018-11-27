var CMS = {};
var DEVICE = {
  profiles: [],
  modeIndex: 2,
  profile: null,
  playle: null,
  keymap: null,
  leData: null,
  params: null,
  definecolor: "0xff0000"
};
var MENU = {
  "index": null,
  "menuPID":"",
  "menuID":"",
  "menuName":"",
  "keyLE": "",
  "driverValue":""
};
var hoverTimer;
var timeInterval;
var currenttime;
var timeleguid = "7768069A-DD1E-4471-AF76-1E17E1454B82";

$.multilang=window.parent.$.multilang;
function initUI() {
  initDeviceImage();
  
  if (CMS.currentProfile && (CMS.currentProfile.ModelID === CMS.deviceID)) 
    DEVICE.modeIndex = CMS.currentProfile.ModeIndex;

  for(var i = 0; i < CMS.profiles.length; i++) {
    var modeIndex = CMS.profiles[i].ModeIndex; 
    if(modeIndex == 1) {
      (function(modeIndex) {
        window.parent.readProfile(CMS.deviceID, CMS.profiles[i].GUID, function(data) {
          DEVICE.profiles[modeIndex] = data;
          if (modeIndex == DEVICE.modeIndex){
            onProfileSelect(DEVICE.modeIndex);
          }
        });
      })(modeIndex);
      break;
    }
  }
  for(var i = 0; i < CMS.profiles.length; i++) {
    var modeIndex = CMS.profiles[i].ModeIndex; 
    if((modeIndex >= 2) && (modeIndex <= 4)) {
      (function(modeIndex) {
        window.parent.readProfile(CMS.deviceID, CMS.profiles[i].GUID, function(data) {
          DEVICE.profiles[modeIndex] = data;
          if (modeIndex == DEVICE.modeIndex){
            onProfileSelect(DEVICE.modeIndex);
          }
        });
      })(modeIndex);
    }
  }
  if (window.parent.CMS.deviceConfig.AspectRatio) {
    $('#device').device({
      aspectratio: window.parent.CMS.deviceConfig.AspectRatio,
    });
  }
 
  $.le({
    onDisplay: function(data) {
      $('#device').device({"display": data});
    }
  });

  window.parent.setLanguage(false);
}


function initDeviceImage() {
  $("#device").empty();
  var str = '';
  str +=  '<img src="imgshow/device_outline.png" class="device-outline" />\
  <img src="imgshow/device_panel.png" class="device-panel" />\
  <img src="imgshow/device_keycap.png" class="device-keycap" />';
  $("#device").append(str);
}

$(document).ready(function() {
  Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    var month = this.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
  }
  CMS = window.parent.CMS;
  $.getJSON("data/keymapshow.js", function(json){
    DEVICE.keymap = json;
    initUI();
  });
});

function onProfileSelect(modeIndex) {
  DEVICE.modeIndex = modeIndex;
  DEVICE.profile = DEVICE.profiles[DEVICE.modeIndex];
  onProfileLoad();
  window.parent.changeMode(CMS.deviceID, modeIndex);
}

function onProfileLoad() {
  window.parent.CMS.currentProfile = DEVICE.profile;
  initDevice();
  initFunc();
  initFuncEvent();
}

function onProfileChanged() {
  var isLECheckResult = checkLE();
  if(!isLECheckResult) {
    window.parent.warning($.multilang("not_found_light_file"));
    return;
  }

  window.parent.apply(CMS.deviceID, DEVICE.profile.GUID, function(result) {
    if(result)
      window.parent.success($.multilang("apply_success"));
    else
      window.parent.error($.multilang("apply_error"));
  });
}

function initDevice() {
  //初始化按键
  $('#device').device({ 
    keymap: DEVICE.keymap, 
  });

}

function initFunc() {
  //初始化左侧选择键以及默认功能菜单索引
  MENU.index = null;

  //初始化菜单栏选项
  $("#menu_select").find("li").eq(0).addClass("active");
  $("#lamp_setting").is(":hidden") && $("#func_setting").show();

  //初始化模式灯光功能按钮
  $("#tools_lamp_1").find(".ximagebutton").ximagebutton({
    colors: {
      normal: "#787878",
      active: "#00c2ff"
    }
  });
  $("#tools_lamp_1").find(".ximagebutton").eq(0).ximagebutton('active');
  $("#menu_select").find("li").unbind('click').click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    
    $("#lamp_setting").is(":hidden") && $("#lamp_setting").show();
    $("#bottom_nav").css({'display': 'flex'});
    $("#apply").css("display","block");
    $("#device").find(".show-F9").css("display","flex");
   
  });
  $("#menu_select").find("li:eq(0)").click();
  //初始化DriverLE
  //初始化F9装备槽
  if ($("#device").find(".show-F9").length <= 0) {
    var  str = '<ul class="show-F9">\
    <li>L-1</li>\
    <li>L-2</li>\
    <li>L-3</li>\
    <li>L-4</li>\
    <li>L-5</li>\
    </ul>';
    $("#device").append(str);
    $("#device").find(".show-F9").css({"top": "-34px", "left": "270px", "display": "none"});
  } else {
    $(".show-F9").css({"display": "none"});
  }

  for (var i = 0; i < DEVICE.profile.DriverLE.length; i++) {
    var change_value = "";
    if (DEVICE.profile.DriverLE[i].GUID != "") {
      change_value_light = DEVICE.profile.DriverLE[i].Name;
      $("#device").find(".show-F9").find("li").eq(i).data("change-value-light", change_value_light);
      $("#device").find(".show-F9").find("li").eq(i).addClass("border");
    }
  }

  var index_no_configuration = $.multilang("no_config");
  var kb_lamp = $.multilang("kb_lamp");
  if ($("#device").find(".show-function").length <= 0) {
    var add = '<div class="show-function">\
    <div class="show-function-content">\
    '+kb_lamp+': <span class="text" id="light_config">' + index_no_configuration + '</span>\
    <span class="remove" id="light_remove">\
    </span>\
    </div>\
    </div>';
    $("#device").append(add);
  }

  renderLamp();

  //初始化颜色下拉选择设定功能
  $("#le_config_color_select").off('click').click(function(){
    if ($("#le_config_colors").is(":hidden")) {
      $("#le_config_colors").show();
      $("#le_color_dropdown").addClass("hover-up"); 
    } else {
      $("#le_config_colors").hide();
      $("#le_color_dropdown").removeClass("hover-up"); 
    }
    return false;
  });
  //初始化颜色下拉选择设定功能
  $("input[name='datemode']").off('click').click(function(){
    var currentleguid = $("#tool_lamp").find(".func-setting").find("ul").find(".menu-item.selected").data('guid');
    if(currentleguid !== timeleguid) return;
    var fmt = $(this).val();
    if(timeInterval){
      timeInterval = clearInterval(timeInterval);
    }
    showTimes(fmt);
    timeInterval = setInterval(function(){showTimes(fmt)},1000);
  });
  
  $("input[name='fanspeed']:eq("+DEVICE.profile.SpeedLevel+")").click();
  
  $(document).click(function(){
    $("#le_config_colors").hide();
    $("#le_color_dropdown").removeClass("hover-up"); 
  });
}

function initFuncEvent() { 

  //设置下去 
  $('#apply').on('click', function() {
    //var driverleindex = $(".show-F9").find('li.button-active').index();
    //if(driverleindex === -1){
    //  var guid = $("#tool_lamp").find("ul").find("li.selected").data("guid");
    //  var name = $("#tool_lamp").find("ul").find("li.selected").text();
    //  DEVICE.profile.ModeLE.GUID = guid ? guid : '';
    //  DEVICE.profile.ModeLE.Name = name ? name : '';
    //  DEVICE.profile.ModeLE.Params = JSON.parse(JSON.stringify(DEVICE.params));
    //}
    onProfileChanged();
  });

  //初始化模式灯光功能按钮
  $("#tools_lamp_1").find(".ximagebutton").ximagebutton({
    onClick: function(){
      $element = this;
      var index = $element.index();  
      $("#tools_lamp_2").find(".functions").hide();
      $("#tools_lamp_2").find(".functions").eq(index).css({'display': 'flex'});
      $element.ximagebutton('active');
      $element.siblings().ximagebutton('inactive');
    }
  });
  $("#device").find(".show-F9").find("li").unbind('click').click(function() {
    $(this).addClass("button-active").siblings().removeClass("button-active");
  });

  $("#device").find(".show-F9").find("li").unbind('mouseenter mouseleave').hover(function() {
    clearTimeout(hoverTimer);
    var index = $(this).index();
    var change_value_light = $(this).data("change-value-light");
    var top = $(this).parent().position().top + $(this).position().top - 35;
    var left = $(this).parent().position().left + $(this).position().left + $(this).width() / 2 - 60 + 3;
    var $showButtonFunction = $("#device").find(".show-function");
    var $this = $(this);
    if (change_value_light) {
      $("#light_config").text(change_value_light)
    } else {
      $("#light_config").text($.multilang("no_config"));
    }
    $showButtonFunction.hover(function() {
      clearTimeout(hoverTimer);
    },function() {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function() {
        $("#device").find(".show-function").fadeOut("fast");
      }, 200);
    });

    $("#light_remove").unbind('click').click(function() {
      $("#light_config").text($.multilang("no_config"));
      $this.data("change-value-light",null);
      $this.removeClass("border");
      DEVICE.profile.DriverLE[index].GUID= "";
      DEVICE.profile.DriverLE[index].Name= "";
      window.parent.writeProfile(CMS.deviceID, DEVICE.profile.GUID, DEVICE.profile, function() {
        window.parent.apply(CMS.deviceID, DEVICE.profile.GUID, function(result) {  console.log(result); window.parent.warning($.multilang("clear_success"));});
      });
    });

    $showButtonFunction.css({"top": top + "px", "left": left + "px"});
    $showButtonFunction.css({"display": "flex"});

    $this.addClass("button-hover").siblings().removeClass("button-hover");
  },function() {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(function() {
      $("#device").find(".show-function").fadeOut("fast");
    }, 200);
    $(this).removeClass("button-hover");
  });
  
  $(".confirm .yes").unbind('click').click(function(){
      var sellampguid = $("#tool_lamp .func-setting .menu-list").find(".menu-item.selected").data('guid');
      var sellampname = $("#tool_lamp .func-setting .menu-list").find(".menu-item.selected span").text();
      var selspeedlevel = parseInt($("input[name='fanspeed']:checked").val());
      if(!sellampguid){
        window.parent.warning('请选择要应用的灯效！');
        return false;
      }
      DEVICE.profile.DriverLE[0].GUID= sellampguid;
      DEVICE.profile.DriverLE[0].Name= sellampname;
      DEVICE.profile.SpeedLevel= selspeedlevel;
      window.parent.writeProfile(CMS.deviceID, DEVICE.profile.GUID, DEVICE.profile, function() {
        $(".confirm .yes").removeClass('btn-breath');
        onProfileChanged();
      }); 

      // var driverleindex = $(".show-F9").find('li.button-active').index();
      // if(driverleindex !== -1){
      //   var sellampguid = $("#tool_lamp .func-setting .menu-list").find(".menu-item.selected").data('guid');
      //   var sellampname = $("#tool_lamp .func-setting .menu-list").find(".menu-item.selected span").text();
      //   DEVICE.profile.DriverLE[driverleindex].GUID= sellampguid;
      //   DEVICE.profile.DriverLE[driverleindex].Name= sellampname;
      //   window.parent.writeProfile(CMS.deviceID, DEVICE.profile.GUID, DEVICE.profile, function() {
      //   //window.parent.apply(CMS.modelID, DEVICE.profile.GUID, function(result) {  window.parent.warning($.multilang("clear_success"));});
      //     $("#light_config").text(sellampname);
      //     $(".show-F9").find('li.button-active').data("change-value-light",sellampname);
      //     $(".show-F9").find('li.button-active').addClass("border");
      //     //$(".show-F9 li").removeClass('button-active');
      //   });
      // }else{
      //   window.parent.warning('请选择！');
      // }
  });
  
  $("input[name='fanspeed']").change(function() {
    var objcheckedle = $("#tool_lamp").find(".func-setting").find("ul").find(".menu-item.selected");
    DriverLeDataChange(objcheckedle, $(this));
  });
  
  //主题灯效配置
  //staticLampFunc();
  lampfunc();
  bindingEvent();
  $("#tool_lamp .func-setting .menu-list").scrollTop($("#tools_lamp_2").find("ul").find("li[data-guid='" + DEVICE.profile.DriverLE[0].GUID + "']").index()*32);
  setTimeout(function() {
    $("#tools_lamp_2").find("ul").find("li[data-guid='" + DEVICE.profile.DriverLE[0].GUID + "']").click();
  },1000);
}

function renderStaticLamp() {
  $("#tool_lamp").find(".static-lelist").find("ul").empty();
  var str = '<li class="menu-item menu-item-light" data-guid=""><span>'+$.multilang("kb_static_light")+'</span></li>';
  $("#tool_lamp").find(".static-lelist").find("ul").append(str);

}

function staticLampFunc() {
  $("#tool_lamp").find(".func-static-lelist").find("ul").find(".menu-item").unbind('click').click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#tool_lamp").find(".func-setting").find("ul").find(".menu-item").removeClass("selected");
    $.le('stop');
    DEVICE.playle = '';
    $("#le_config_color_select p").data('index', null);
    lightenKeyFunc(); 
    if(!DEVICE.profile.ModeLE.LEData) {
      DEVICE.profile.ModeLE.LEData = {};  
    }
    var leData = DEVICE.profile.ModeLE.LEData;
    DEVICE.leData = leData;
    DEVICE.params = null;
    
    var config = {};
    for(var index in leData) {
      config[index] = leData[index].replace("0x", "#");
    }
    var data = { 
      "config": config 
    }; 
    $('#device').device({
      display: data
    });
  });
}

function lightenKeyFunc() {
  $("#bottom_nav").css({'display': 'flex'});
  $("#le_configs").css({'display': 'none'});
  $('#device').device({ 
    onSingleSelect: null,
    onMultiSelect: null
  });
  $('#device').device({ 
    onSingleSelect: lighten,
    onMultiSelect: lightenMulti
  });
}

function lighten(keyItem) {
  var locationCode = keyItem.LocationCode;
  if (DEVICE.definecolor === null) {
    window.parent.warning($.multilang("kb_select_color"));
    return;
  }
  DEVICE.profile.ModeLE.LEData[locationCode] = DEVICE.definecolor;
  var leData = DEVICE.profile.ModeLE.LEData;
  var config = {};
  for(var index in leData) {
    config[index] = leData[index].replace("0x", "#");
  }
  var data = { 
    "config": config 
  }; 
  $('#device').device({
    display: data
  });

}

function lightenMulti(locationCodes) {
  if (DEVICE.definecolor === null) {
    window.parent.warning($.multilang("kb_select_color"));
    return;
  }
  for (var i = 0; i < locationCodes.length; i++) {
    var locationCode = locationCodes[i];   
    DEVICE.profile.ModeLE.LEData[locationCode] = DEVICE.definecolor;
  }
  var leData = DEVICE.profile.ModeLE.LEData;
  var config = {};
  for(var index in leData) {
    config[index] = leData[index].replace("0x", "#");
  }
  var data = { 
    "config": config 
  }; 
  $('#device').device({
    display: data
  });
}

function cancelKeyFunc() {
  $("#bottom_nav").css({'display': 'flex'});
  $('#device').device({
    'display': {
      'config': {}
    }
  });
  $('#device').device({ 
    onSingleSelect: null,
    onMultiSelect: null
  });
}

function renderLamp() {
  if (CMS.les.length ==0) {
    return;
  }
  $("#tool_lamp").find(".menu-list").find("ul").empty();
  var str = '';
  for (var i = 0; i < CMS.les.length; i++) {
    var combicostr = "";
    if(CMS.les[i].LeType === "combination"){
      combicostr = '<div class="combination-lamp"></div>';
      continue;
    }
    if (CMS.les[i].Type === 1) {
      str += '<li class="menu-item menu-item-light menu-item-dir" data-index="' + i + '" data-type="' + 1 + '">\
      <span>' + CMS.les[i].Name + '</span>\
      <div class="rmact" style="flex-direction: row;display: flex;align-items: center;">\
      <input type="text" value="" class="input-text">\
      <i class="ar-act"></i>\
      </div>\
      </li>';
    } else {
      if(CMS.deviceConfig.LeCate && CMS.les[i].LeCate && (CMS.deviceConfig.LeCate == CMS.les[i].LeCate)) {
        str += '<li class="menu-item menu-item-light menu-item-file" data-index="' + i + '" data-type="' + 0 + '" data-guid="' + CMS.les[i].GUID + '">\
        <span>' + CMS.les[i].Name + '</span>' + combicostr;
        str +='</div>\
        </li>';
      }
    }
  }
  $("#tool_lamp").find(".menu-list").find("ul").append(str);
}

function lampfunc() {
  $("#tool_lamp").find(".func-setting").find("ul").find(".menu-item").unbind('click').click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#tool_lamp").find(".func-static-lelist").find("ul").find(".menu-item").removeClass("selected");
    cancelKeyFunc();
    var guid = $(this).data("guid");
    if(guid) {
      window.parent.readLE(guid, function(data){
        if(guid === timeleguid){
          $.le('stop');
          DEVICE.leData = data;
          $("input[name='datemode']:checked").click();
          //data.Frames[0].Data = {};
        }else{
          currenttime = '';
          if(timeInterval){
            timeInterval = clearInterval(timeInterval);
          }
          var params = null;
          params = $.le('play', data, params);
          DEVICE.leData = data;
          DEVICE.params = null;
          setColorConfig(data, params);
          DEVICE.playle = guid;
        }
      });
      DriverLeDataChange($(this),$("input[name='fanspeed']:checked"));
    } else {
      $.le('stop');
      DEVICE.playle = '';
    }
  });
}

function setColorConfig(data, params) {
  $("#le_configs").css({'display': 'flex'});
  $("#le_config_colors").empty();
  $("#le_config_set").css({'display': 'none'});
  if (!params) return;
  if(params && params.hasOwnProperty('LEConfigs') && Object.prototype.toString.call(params.LEConfigs) == '[object Array]') {
    var leConfigs = params.LEConfigs;
    initLeColorSet(leConfigs);
    leColorSetFunc(data, params);
  }
}

function initLeColorSet(leConfigs) {
  var text = '颜色参数设置';
  $("#le_config_color_select p").text(text);
  $("#le_config_color_select p").data('index', null);
  var str = '';
  for (var i = 0; i < leConfigs.length; i++) {
    str += '<div class="item">' + leConfigs[i].Name + '</div>';
  }
  $("#le_config_colors").append(str);
}

function leColorSetFunc(data, params) {
  $("#le_config_colors").find(".item").off('mouseenter mouseleave').hover(function(){
    $(this).css({'outline': '1px solid #00c2ee'});
  }, function(){
    $(this).css({'outline': 'none'});
  });

  $("#le_config_colors").find(".item").off('click').click(function(){
    $("#le_config_colors").hide();
    $("#le_color_dropdown").removeClass("hover-up"); 
    var text = $(this).text();
    var index = $(this).index();
    $("#le_config_color_select p").text(text);
    $("#le_config_color_select p").data('index', index);
    DEVICE.params = params;
    $.le('play', data, DEVICE.params);
    $("#le_config_set").css({'display': 'flex'});
    $("#le_config_set_color").css({'backgroundColor': DEVICE.params.LEConfigs[index].Color.replace("0x", "#")});
  });
}

function speedSelect() {
  $("#speed_select").off('mouseup').mouseup(function(){
    var speed = parseInt($(this).val());
    DEVICE.profile.Speed = speed;
  });
}

function bindingEvent(){
  //取色器颜色变化
  $('.picker').each( function() {
    $(this).minicolors({
      inline: $(this).attr('data-inline') === 'true',
      change: function(hex, opacity) {
        onColorChanged(hex);
      },
      theme: 'default'
    });
  });

  //颜色块选择框点击
  $("#choose_color").find(".item").click(function(){
    $("#current_color").css({
      backgroundColor: $(this).css("background-color")
    });

    var rgb = $(this).css('background-color'); 
    rgb = jQuery.Color(rgb).toHexString();
    rgb = "0x"+rgb.substring(1,rgb.length);
    DEVICE.definecolor = rgb;
    var index = $("#le_config_color_select p").data('index');
    if (DEVICE.params !== null && index !== null) {
      DEVICE.params.LEConfigs[index].Color = DEVICE.definecolor;
      $.le('play', DEVICE.leData, DEVICE.params);
      $("#le_config_set_color").css({
        backgroundColor: $(this).css("background-color")
      });
    }
  });
   
}

//颜色改变回调
function onColorChanged(data){
  $("#current_color").css({
    'backgroundColor': data
  });
  
  DEVICE.definecolor = "0x"+data.substring(1,data.length);
  var index = $("#le_config_color_select p").data('index');
  if (DEVICE.params !== null && index !== null) {
    DEVICE.params.LEConfigs[index].Color = DEVICE.definecolor;
    $.le('play', DEVICE.leData, DEVICE.params);
    
    $("#le_config_set_color").css({
      'backgroundColor': data
    });
  }
}


function checkLE() {
  var ret = true;
  ret &= checkDriverLE();
  return ret;
}



//检查F9标准灯效
function checkDriverLE() {
  var isCompleted =true;
  for (var i = 0; i < DEVICE.profile.DriverLE.length; i++) {
    if (!DEVICE.profile.DriverLE[i].GUID)
      continue;
    var flag = true;  
    for (var j = 0; j < window.parent.CMS.les.length; j++) {
      if (DEVICE.profile.DriverLE[i].GUID == window.parent.CMS.les[j].GUID) {
        if (DEVICE.profile.DriverLE[i].Name != window.parent.CMS.les[j].Name) {
          DEVICE.profile.DriverLE[i].Name = window.parent.CMS.les[j].Name;
        }
        flag = false;
        break;
      }
    }
    if (flag)
      isCompleted = false; 
  }
  return isCompleted;
}

function DriverLeDataChange(objle,objspeed){
  var guid = objle.data("guid");
  var speed = parseInt(objspeed.val());
  if((guid == DEVICE.profile.DriverLE[0].GUID) && (speed == DEVICE.profile.SpeedLevel)) {
    if($(".confirm .yes").is('.btn-breath')){
      $(".confirm .yes").removeClass('btn-breath');
    }
  } else {
    if(! $(".confirm .yes").is('.btn-breath')){
      $(".confirm .yes").addClass('btn-breath');
    }
  }
}


var codes = [
  [
    [0,1,2,3,4,18,22,36,37,38,39,40],
    [18,19,20,21,22],
    [0,2,3,4,18,20,22,36,37,38,40],
    [0,2,4,18,20,22,36,37,38,39,40],
    [0,1,2,20,36,37,38,39,40],
    [0,1,2,4,18,20,22,36,38,39,40],
    [0,1,2,3,4,18,20,22,36,38,39,40],
    [0,18,36,37,38,39,40],
    [0,1,2,3,4,18,20,22,36,37,38,39,40],
    [0,1,2,4,18,20,22,36,37,38,39,40]
  ],
  [
    [0,1,2,3,4,5,6,18,24,36,37,38,39,40,41,42],
    [18,19,20,21,22,23,24],
    [0,3,4,5,6,18,21,24,36,37,38,39,42],
    [0,3,6,18,21,24,36,37,38,39,40,41,42],
    [0,1,2,3,21,36,37,38,39,40,41,42],
    [0,1,2,3,6,18,21,24,36,39,40,41,42],
    [0,1,2,3,4,5,6,18,21,24,36,39,40,41,42],
    [0,18,36,37,38,39,40,41,42],
    [0,1,2,3,4,5,6,18,21,24,36,37,38,39,40,41,42],
    [0,1,2,3,6,18,21,24,36,37,38,39,40,41,42]
  ]
];

function showTimes(format){
  // console.log(getNowFormatDate(format));
  // return false;
  var fmttimestr = getNowFormatDate(format);
  if(currenttime === fmttimestr){
    return;
  }else{
    currenttime = fmttimestr
  }
  var codetype = 0;
  var ctimearr = fmttimestr.split("");
  if(ctimearr.length === 5){
    codetype = 1;
  }
  var lepos1 = getNumLe(ctimearr[0], 0, "#00ff00", codetype);
  var lepos2 = getNumLe(ctimearr[1], 1, "#00ff00", codetype);
  
  var lepos3 = getNumLe(ctimearr[3], 3, "#ff0000", codetype);
  var lepos4 = getNumLe(ctimearr[4], 4, "#ff0000", codetype);
  
  var lepos5 = {};
  var lepos6 = {};
  if(ctimearr.length>5){
    isbigshow = true;
    lepos5 = getNumLe(ctimearr[6], 6, "#00ffff", codetype);
    lepos6 = getNumLe(ctimearr[7], 7, "#00ffff", codetype);
  }
  
  
  var letime = {};
  Object.assign(letime, lepos1);
  Object.assign(letime, lepos2);
  Object.assign(letime, lepos3);
  Object.assign(letime, lepos4);
  Object.assign(letime, lepos5);
  Object.assign(letime, lepos6);
  //console.log(DEVICE.leData)
  DEVICE.leData.Frames[0].Data = letime;
  // var dataconfig = {"config":{}};
  // dataconfig.config = letime;
  // $('#device').device({"display": dataconfig});
  var params = null;
  params = $.le('play', DEVICE.leData, params);
  window.parent.writeLE(DEVICE.leData.GUID, DEVICE.leData, function(data) {
    window.parent.apply(CMS.deviceID, DEVICE.profile.GUID, function(result) {});
  });
}

function getNumLe(num, position, color, codetype){
  var objle = {};
  var numcode = codes[codetype][num];
  var codewith = 3;
  var codeheight = codetype === 0 ? 5 : 7;
  
  var orgtop = 0;
  var orgleft = 0;
  var marginrht = 2;
  var marginbtm = 1;
  if(codetype === 1){
    orgtop = 1;
    // orgleft = 0;
    // marginrht = 0;
    marginbtm = 2;
  }
  
  for(var i=0;i<numcode.length;i++){
    var orgcode = numcode[i] + orgtop + 18*orgleft; 
    switch(position){
      case 0:
        objle[orgcode] = color;
        break;
      case 1:
        objle[orgcode + 18*(codewith+marginrht)] = color;
        break;
      case 3:
        objle[orgcode + codeheight+marginbtm] = color;
        break;
      case 4:
        objle[orgcode + 18*(codewith+marginrht) + (codeheight+marginbtm)] = color;
        break;
      case 6:
        objle[orgcode + (codeheight+marginbtm)*2] = color;
        break;
      case 7:
        objle[orgcode + 18*(codewith+marginrht) + (codeheight+marginbtm)*2] = color;
        break;
    }
  }
  return objle;
}

function getNowFormatDate(format) {
    var date = new Date();
    return date.Format(format);
    // var seperator = ":";
    // var hour = date.getHours();
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    // if(hour >= 1 && hour <= 9) {
        // hour = "0" + hour;
    // }
    // if (minute >= 0 && minute <= 9) {
        // minute = "0" + minute;
    // }
    // if (second >= 0 && second <= 9) {
        // second = "0" + second;
    // }
    // var currentdate = hour + ':' + minute + ':' + second;
    // return currentdate;
}
