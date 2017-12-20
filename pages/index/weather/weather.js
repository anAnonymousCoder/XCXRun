var weather = require('function.js')
Page({
  data: {
    weather: {}
  },
  onLoad: function () {
    var that = this;
    weather.loadWeatherData(function (data) {
      that.setData({
        weather: data
      });
    });
  },
});