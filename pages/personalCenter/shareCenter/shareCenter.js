// pages/personalCenter/shareCenter/shareCenter.js
//获取应用实例
const app = getApp();
var http = require("../../../utils/http");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    imagesUrl: app.globalData.resourcesUrl,
    poster:app.globalData.resourcesUrl+'/img/index/banner.png',
    gameInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    console.log()
    http.getRequest(
      "getusershare",
      '',
      function (res) {
        console.log(res)
        _this.setData({
          gameInfo:res.data
        })
      },
      function (err) {}
    );
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})