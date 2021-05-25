// pages/judge/judge.js
//获取应用实例
var http = require("../../utils/http");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gameData: {},
    userInfo: app.globalData.userInfo,
    imagesUrl: app.globalData.resourcesUrl,
    pageShow: "game",
    is: false,
    flag: false,
    s: 60, //读秒
    radios: [
      {
        label: "✓",
        value: "✓",
      },
      {
        label: "✗",
        value: "✗",
      },
    ],
    timer: null, //定时器
    score: 0, //分数
    gameName: "", //游戏名字
    num: 0,
    numTotal: 0,
    txt: "", //题目内容
    anweser: [],
    anwesers: {},
    daan: [],
    wancheng:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gameData: app.globalData.gameData,
      gameName: app.globalData.gameName,
      numTotal: app.globalData.gameData.info.length,
    });
    let num = this.data.num;
    let txt = this.data.gameData.info[num].question;
    this.setData({
      num: num+1,
      txt: txt,
      is:0
    });
    // app.watch(this, {
    //   s: function (newVal) {
    //     if (newVal == 0) {
    //       clearInterval(this.data.timer);
    //       this.setData({
    //         pageShow: "over",
    //       });
    //     }
    //   },
    // });
  },
  // 提交当前题目答案
  subAnwser: function (e) {
    let num = this.data.num;
    let len = this.data.gameData.info.length
    let txt
    try {
      txt = this.data.gameData.info[num].question;
    } catch (error) {
      txt = this.data.gameData.info[len-1].question;
    }
    let a = { game_info_id: this.data.gameData.info[num-1].id, answer: this.data.is + 1 };
    console.log(a)
    if(num>=len){
      num = len-1
      txt="您已完成所有答题,请提交！"
      this.setData({
        wancheng: false
      });
    }
    this.setData({
      num: num + 1,
      txt: txt,
      anweser: this.data.anweser.concat(a),
      is:0
    });
  },
  // 提交
  sub: function () {
    let _this = this;
    console.log(JSON.stringify(_this.data.anweser));
    if (_this.data.anweser.length >= _this.data.gameData.info.length) {
      console.log(JSON.stringify(_this.data.anweser));
      var prams = { answer: JSON.stringify(this.data.anweser)};
      http.postRequest(
        "answer",
        prams,
        function (res) {
          clearInterval(_this.data.timer);
          _this.setData({
            daan: res.data.answer,
            score: res.data.score,
            pageShow: "over",
          });
        },
        function (err) {}
      );
    } else {
      _this.tip("请先完成答题");
    }
  },
  tip: function (msg) {
    wx.showModal({
      title: "提示",
      content: msg,
      showCancel: false,
    });
  },
  // 答案选择
  check: function (e) {
    var is = e.currentTarget.dataset.index;
    this.setData({
      is:is
    })
  },
  starGame: function () {
    let _this = this;
    app.nextGame().then(function (res) {
      app.globalData.gameData = res.data;
      _this.setData({
        gameData: app.globalData.gameData,
      });
    });
  },
  //游戏开始改变isStar状态
  parentCallBack(event) {
    let num;
    this.setData({
      isStar: event.detail.isStar,
      flag: true,
    });
    this.data.timer = setInterval(() => {
      num = --this.data.s;
      this.setData({
        s: num,
      });
    }, 1000);
  },
  // 返回
  goBack: function () {
    wx.navigateBack({
      delta: 1,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
