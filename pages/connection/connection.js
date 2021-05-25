// pages/connection/connection.js
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
    pageShow: "game",
    s: 60, //读秒
    timer: null, //定时器
    score: 0,
    gameTitle: "",
    gameInfo: "",
    gameName: "",
    ptL: "",
    gameNum: 1,
    charArr: [],
    anweser: [],
    imgId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.gameData.info.forEach(item => {
      item.border = false;
    })
    this.setData({
      gameTitle: app.globalData.gameData.title,
      gameInfo: app.globalData.gameData.info,
      gameName: app.globalData.gameName,
    });

    app.watch(this, {
      s: function (newVal) {
        if (newVal == 0) {
          clearInterval(this.data.timer);
          // this.setData({
          //   pageShow: "over",
          // });
        }
      },
    });
  },
  con: function (e) {
    let id = e.currentTarget.dataset.id;
    let num = e.currentTarget.dataset.num;
    let txt = e.currentTarget.dataset.txt;
    if (num != undefined && id != undefined) {
      let arr = this.data.gameInfo
      this.data.ptL = "l" + (num + 1);
      arr.forEach(item => {
        item.border = false;
      })
      arr[num].border = true
      this.setData({
        imgId: id,
        gameInfo:arr
      });
    }
    if (num != undefined && txt != undefined) {
      let con1 = this.data.ptL + "r" + num;
      var index = this.data.charArr.indexOf(con1);
      var index2 = this.data.charArr.indexOf("r" + num);
      if (index < 0 && index2 < 0) {
        let con;
        let con2 = "r" + num;
        console.log(con2);
        let nums = this.data.gameNum + 1;
        if (nums > 5) return;
        for (var i = 0; i < 4; i++) {
          con = this.data.ptL + "r" + (i + 5);

          this.setData({
            charArr: this.data.charArr.concat(con),
          });
        }
        let link_title = {
          game_info_id: this.data.imgId,
          link_title: txt
        };
        this.setData({
          [con1]: 1,
          gameNum: nums,
          anweser: this.data.anweser.concat(link_title),
          charArr: this.data.charArr.concat(con2),
        });
      }
    }
  },
  // 提交
  sub: function () {
    let _this = this;
    var prams = {
      answer: JSON.stringify(this.data.anweser)
    };
    http.postRequest(
      "link",
      prams,
      function (res) {
        _this.setData({
          score: res.data.score,
        });
      },
      function (err) {}
    );
    clearInterval(this.data.timer);
    this.setData({
      pageShow: "over",
    });
  },
  //游戏开始改变isStar状态
  parentCallBack(event) {
    let num;
    this.setData({
      isStar: event.detail.isStar,
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