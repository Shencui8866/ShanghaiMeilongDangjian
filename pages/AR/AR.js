// pages/AR/AR.js
//获取应用实例
const app = getApp();
Page({
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    imagesUrl: app.globalData.resourcesUrl,
    pageShow: true,
    imgPath: app.globalData.resourcesUrl+'/img/AR/bg.png',
    link_pic:'',
    score:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = app.globalData.gameData.info;
    this.setData({
      gameInfo: info,
      gameName: app.globalData.gameName,
      link_pic:info.link_pic
    });
  },
  bindSendDanmu: function () {
    let _this = this
    wx.uploadFile({
      url: "https://control.shencui1979.com/i/comparison",
      filePath: _this.data.imgPath,
      name: "file",
      header:{'token': wx.getStorageSync("token")},
      formData: {
        game_info_id: _this.data.gameInfo.id,
      },
      success(res) {
        const data =JSON.parse(res.data);
        console.log(data)
        _this.setData({
          pageShow: false,
          score:data.data.score
        });
      },
    });
    
  },
  chooseImg: function (e) {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          imgPath:tempFilePaths[0]
        })
        console.log(res,tempFilePaths[0])
        
      },
    });
  },
  // 返回
  goBack: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
  tip: function (msg) {
    wx.showModal({
      title: "提示",
      content: msg,
      showCancel: false,
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
