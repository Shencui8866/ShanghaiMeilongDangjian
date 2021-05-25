// pages/personalCenter/personalCenter.js
//获取应用实例
var http = require("../../utils/http");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    imagesUrl: app.globalData.resourcesUrl,
    birthday:'',
    btnLists: [
      { icon: "icon-people.png", title: "个人资料", txt: "升级修改你的个人资料设置", url: "personInfo" },
      { icon: "icon-share.png", title: "分享中心", txt: "查看你的分享", url: "shareCenter" },
      { icon: "icon-judge.png", title: "竞技中心", txt: "查看你的竞技项目进程及分数", url: "vsCenter" },
      { icon: "icon-wechat.png", title: "我的微信", txt: "升级修改你的微信资料设置", url: "myWechat" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    http.getRequest(
      "getuser",
      {},
      function (res) {
        _this.setData({
          birthday: res.data.birthday,
        });
      },
      function (err) {}
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  goBack: function () {
    wx.navigateBack({
      delta: 1,
    });
  },

  goPage: function (e) {
    let query = e.currentTarget.dataset["url"];
    console.log(query);
    wx.navigateTo({
      url: "./" + query + "/" + query,
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
