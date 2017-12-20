var app=getApp;
Page({
  data: {
     imgUrls: [
       'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513011974897&di=48614a99759da901daca992ce91ea0e1&imgtype=0&src=http%3A%2F%2Fwww.uhut.com%2Fuploads%2Fimage%2F20151012%2F20151012162115_50167.jpg', 
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513582236939&di=88e2b2e759b51c0a0f97f23a9afa18de&imgtype=0&src=http%3A%2F%2Fs9.knowsky.com%2Fsc%2Fmjpg%2F166%2F2013082412173850059.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513013952984&di=deb9fc82e074f5ec535981ae38297ef4&imgtype=0&src=http%3A%2F%2Feasyread.ph.126.net%2FO9U7Ky2dcG8KsS42pabJRQ%3D%3D%2F7916894937337711450.jpg'
    ]
  },
  showWeather: function () {
    wx.navigateTo({
      url: './weather/weather',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
 Article1: function () {
    wx.navigateTo({
      url: './Article1/Article1',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
   Article2: function () {
   wx.navigateTo({
     url: './Article2/Article2',
     success: function (res) {
     },
     fail: function () {
     },
     complete: function () {
     }
   })
 },
  Article3: function () {
     wx.navigateTo({
       url: './Article3/Article3',
       success: function (res) {
       },
       fail: function () {
       },
       complete: function () {
       }
     })
   }
})