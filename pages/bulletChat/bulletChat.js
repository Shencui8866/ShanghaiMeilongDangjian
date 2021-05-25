// pages/bulletChat/bulletChat.js

//获取应用实例
var http = require("../../utils/http");
const app = getApp();
// 弹幕字体颜色
function getRandomColor() {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? "0" + color : color;
    rgb.push(color);
  }
  return "#" + rgb.join("");
}
Page({
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext("myVideo");
  },
  /**
   * 页面的初始数据
   */
  inputValue: "",
  data: {
    userInfo: app.globalData.userInfo,
    imagesUrl: app.globalData.resourcesUrl,
    pageShow: "game",
    videoPlay: false,
    timer: null, //定时器
    videoSrc: "",
    danmuList: [
    ],
    myDanmu: "",
    gameName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      videoSrc: app.globalData.gameData.info.link_video,
      gameName: app.globalData.gameName,
    });
    let _this = this;
    let arrs = [];
    let info = app.globalData.gameData.barrage;
    for (var i = 0; i < info.length; i++) {
      let arr = {};
      arr.text = info[i];
      arr.color = "#fe1802";
      arr.time = 1;
      arrs.push(arr);
    }
    console.log(arrs);
    _this.setData({
      danmuList: arrs,
    });
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value;
  },
  bindSendDanmu: function () {
    if (this.data.myDanmu == "") {
      wx.showToast({
        title: "请先输入弹幕！",
        icon: "none",
        duration: 2000,
      });
    } else {
      var prams = {
        barrage: this.data.myDanmu,
        game_info_id:app.globalData.gameData.info.id
      };
      http.postRequest(
        "barrageVideo",
        prams,
        function (res) {
          // _this.setData({
          //   score: res.data.score,
          // });
        },
        function (err) {}
      );
      clearInterval(this.data.timer);
      this.setData({
        pageShow: "over",
      });
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: "#fe1801",
      });
      Math;
    }
  },
  bindPlay: function () {
    this.setData({
      videoPlay: true,
    });
    this.videoContext.play();
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
  videoErrorCallback: function (e) {
    console.log("视频错误信息:");
    console.log(e.detail.errMsg);
  },
  //游戏开始改变isStar状态
  parentCallBack(event) {
    this.setData({
      isStar: event.detail.isStar,
    });
  },
  // 返回
  goBack: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
  messageChang: function (e) {
    // 获取输入框当前value值
    let value = e.detail.value;

    // 及时更新数据
    this.setData({
      myDanmu: value,
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
