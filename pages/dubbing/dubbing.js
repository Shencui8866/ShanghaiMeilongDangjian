// pages/dubbing/dubbing.js
import Notify from '@vant/weapp/notify/notify';
//获取应用实例
const app = getApp();
Page({
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext("myVideo");
    this.videoContext2 = wx.createVideoContext("myVideo2");
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    imagesUrl: app.globalData.resourcesUrl,
    pageShow: true,
    videoSrc: "",
    mp3Src: "",
    src: "",
    maskMp3: true,
    gameInfo: "",
    gameName: "",
    resData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let info = app.globalData.gameData.info;
    this.setData({
      gameInfo: info,
      gameName: app.globalData.gameName,
      videoSrc: info.link_video
    });
    wx.authorize({
      scope: "scope.record",
      success: function () {
        console.log("录音授权成功");
      },
      fail: function () {
        console.log("录音授权失败");
      },
    });
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！");
    });
    this.recorderManager.onStop(function (res) {
      Notify.clear()
      that.setData({
        src: res.tempFilePath,
      });
      console.log(res.tempFilePath);
    });
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！");
    });
  },
  audioPlay() {
    this.audioCtx.play();
  },
  /**
   * 长按录音开始
   */
  recordStart: function (e) {
    console.log("录音开始");
    this.videoContext.play();
    Notify({ type: 'success', message: '正在录音', duration: 1000*60*5,})
    this.recorderManager.start({
      format: "mp3",
    });
  },
  /**
   * 长按录音结束
   */
  recordTerm: function (e) {
    this.recorderManager.stop();
  },
  bindSendDanmu: function () {
    var src = this.data.src;
    if (src == "") {
      this.tip("请先录音！");
      return;
    }
    let _this = this;
    this.videoContext.pause();
    console.table([{src:_this.data.src,token:wx.getStorageSync("token"),game_info_id:_this.data.gameInfo.id}]);
    wx.uploadFile({
      url: "https://control.shencui1979.com/i/recording",
      filePath: _this.data.src,
      name: "file",
      formData: {
        game_info_id: _this.data.gameInfo.id,
      },
      header: {
        "Content-Type": "multipart/form-data", 
        "token": wx.getStorageSync("token")
      },
      success(res) {
        const data = res.data;

        console.log(res);
        //do something
      },
      fail(err) {
        console.log(err);
      },
    });
    this.setData({
      pageShow: false,
    });
  },
  playMp3: function () {
    var src = this.data.src;
    if (src == "") {
      this.tip("请先录音！");
      return;
    }
    console.log(this.videoContext2);
    this.videoContext2.play();
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play();
    this.setData({
      maskMp3: false,
    });
  },
  //游戏开始改变isStar状态
  parentCallBack(event) {
    this.setData({
      isStar: event.detail.isStar,
    });
  },
  starGame:function(){
    console.log('123')
    let _this = this
    app.nextGame().then(function (res) {
      app.globalData.gameData = res.data;
      _this.setData({
        gameData : app.globalData.gameData
      })
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
