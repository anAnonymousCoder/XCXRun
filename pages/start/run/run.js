var app=getApp()
var oriMeters = 0.0;
var time=0;
var timeout=true;

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function getTime(micro_second) {
  // 秒数
  var second = micro_second;
  // 小时位
  var hr = fill_zero_prefix(Math.floor(second / 3600));
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  return hr + ":" + min + ":" + sec + " ";
}


function getDistance(lat1, lng1, lat2, lng2) {
  var dis = 0;
  var radLat1 = toRadians(lat1);
  var radLat2 = toRadians(lat2);
  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRadians(lng1) - toRadians(lng2);
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return dis * 6378137;
  function toRadians(d) { return d * Math.PI / 180; }
}


function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

//****************************************************************************************
//****************************************************************************************

Page({
  data: {
    clock: '',
    isLocation: false,
    latitude: 0,
    longitude: 0,
    markers: [],
    covers: [],
    meters: 0.00,
    Time: "00:00:00"
  },

  //****************************
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getLocation()
    console.log("onLoad")
  },
  //****************************
  openLocation: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        wx.openLocation({
          latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
          longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例
        })
      },
    })
  },

  judgeTime: function () {
    if (timeout) {
      time++;
      var num_time = getTime(time);
      this.setData({
        Time: num_time
      })
      if (time % 5 == 0) {
        this.getLocation();
      }
      setTimeout(this.judgeTime, 1000);
    } else {
      return;
    }
  },
  //****************************
  startRun: function () {
    timeout = setTimeout(this.judgeTime,1000)
    this.getLocation();
  },


  //****************************
  stopRun: function () {
  timeout=false;
  },


  //****************************
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log("res----------")
        console.log(res)
        var newCover = {
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: '/resources/点1.png',
        };
        var oriCovers = that.data.covers;
        console.log("oriMeters----------")
        console.log(oriMeters);
        var len = oriCovers.length;
        var lastCover;
        if (len == 0) {
          oriCovers.push(newCover);
        }
        len = oriCovers.length;
        var lastCover = oriCovers[len - 1];
        console.log("oriCovers----------")
        console.log(oriCovers, len);
        var newMeters = getDistance(lastCover.latitude, lastCover.longitude, res.latitude, res.longitude) / 1000;
        if (newMeters < 0.0015) {
          newMeters = 0.0;
        }
        oriMeters = oriMeters + newMeters;
        console.log("newMeters----------")
        console.log(newMeters);
        var meters = new Number(oriMeters);
        var showMeters = meters.toFixed(2);
        oriCovers.push(newCover);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [],
          covers: oriCovers,
          meters: showMeters,
        });
      },
    })
  },

  format: function (e) {  //格式化时间
    console.log(e.detail.value);
    this.setData({ time: e.detail.value })
  },

  over: function () {
    var that = this;   //停止跑步并记录数据
    timeout=false;
    wx.setStorage({
      key: "Time",
      data: this.data.Time
    })
    wx.setStorage({
      key: "meters",
      data: this.data.meters
    })
    that.setData({
      meters: "0.00",
      Time: "00:00:00"
    })
    wx.switchTab({ //跳转到tabBar
      url: "../start"
    })
    wx.showToast({
      title: '记录保存成功',
      icon: 'success',
      duration: 2000
    })
  }
  })
