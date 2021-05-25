// pages/personalCenter/personInfo/personInfo.js
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
    sex: ['女', '男'],
    index: 0,
    date: '未选择',
    region: ["未选择", "未选择", "未选择"],
    txts:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let dz = []
    http.getRequest(
      "getuser",
      {},
      function (res) {
        dz.splice(1,0,res.data.country)
        dz.splice(1,1,res.data.city)
        dz.splice(1,2,res.data.address)
        console.log(res.data.address)
        _this.setData({
          date: res.data.birthday,
          index:res.data.gender,
          region:dz,
          txts:res.data.motto || '要做就全力以赴做到极致！'
        });
      },
      function (err) {}
    );
  },
  sub:function(){
    let _this = this
    let params = {birthday:_this.data.date,address:_this.data.region,motto:_this.data.txt}
    console.log()
    http.postRequest(
      "setuser",
      params,
      function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
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
  messageChang: function(e) {
    let value = e.detail.value
    // 及时更新数据
    this.setData({
      txts: value
    })
  },
  bindPickerChangeSex: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
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