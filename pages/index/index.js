//index.js
//获取应用实例
const app = getApp();
var http = require("../../utils/http");

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    imagesUrl: app.globalData.resourcesUrl,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          console.log(res);
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
    var prams = {
      nickname: app.globalData.userInfo.nickName,
      headimg: app.globalData.userInfo.avatarUrl,
      gender: app.globalData.userInfo.gender,
      country: app.globalData.userInfo.country,
      province: app.globalData.userInfo.province,
      city: app.globalData.userInfo.city,
    };
    http.postRequest(
      "userinfo",
      prams,
      function (res) {},
      function (err) {}
    );
    if (this.data.hasUserInfo == true) {
      wx.navigateTo({
        url: "../timeN/timeN",
      });
    }
  },
  goToCenter: function () {
    wx.navigateTo({
      url: "../personalCenter/personalCenter",
    });
  },
});
