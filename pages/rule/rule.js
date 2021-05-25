// pages/rule/rule.js
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagesUrl: app.globalData.resourcesUrl,
    gameData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  star() {
    let _this = this
    app.nextGame().then(function (res) {
      console.log(res);
      app.globalData.gameData = res.data;
      _this.setData({
        gameData : app.globalData.gameData
      })
    });

    // this.setData({
    //   gameData :app.globalData.gameData
    // })
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1,
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
