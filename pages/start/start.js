//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex: function () {
    console.log(wx.getStorageSync('skey'));
    if (wx.getStorageSync('skey') > 0) {
      if (wx.getStorageSync('result') == 1 || wx.getStorageSync('firstLogin') == '1') {
        wx.switchTab({
          url: '/pages/order_list/order_list',
        });
      }
      else if (wx.getStorageSync('result') == 0) {
        wx.navigateTo({
          url: "/pages/login/login"
        });
      } 
      else if (wx.getStorageSync('result') == -1) {
        return ;
      }
    }
  },
  onLoad: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: '帮帮快'
    })
  },
  onShow: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});