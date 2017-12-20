var app=getApp();
Page({
  data:{
    meters:'',
    Time:'',
  },
  onLoad:function(){
    var that=this;
    wx.getStorage({
      key: 'Time',
      success: function(res) {
        console.log(res.data);
        that.setData({Time:res.data})
      },
    })
    wx.getStorage({
      key: 'meters',
      success: function(res) {
        console.log(res.data);
        that.setData({meters:res.data})
      },
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享你的跑步记录',
      desc: '邀请好友一起来跑步吧！',
      path: '/info/storage'
    }
  }
})