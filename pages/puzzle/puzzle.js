// pages/puzzle/puzzle.js
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
    logList: [],
    logListIndex: 0, //当前点亮进度
    mapFilter: [],
    score: 0,
    gameInfo: "",
    gameName: "",
    anweser: [],
    bannerBg: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let arrs = [];
    let info = app.globalData.gameData.info;
    this.setData({
      gameInfo: info,
      gameName: app.globalData.gameName,
    });
    for (var i = 0; i < info.length; i++) {
      let arr = {};
      arr.id = info[i].id;
      arr.link_pic = info[i].link_pic;
      arr.num = info[i].rank;
      arr.opacity = 0;
      arr.filter = "grayscale(100%)";
      arrs.push(arr);
    }
    let bannerBg = Object.assign({}, arrs);
    this.setData({
      logList: bannerBg,
    });
    for (let i = 0; i < arrs.length - 1; i++) {
      for (let j = 0; j < arrs.length - 1 - i; j++) {
        if (arrs[j].num > arrs[j + 1].num) {
          let temp = arrs[j];
          arrs[j] = arrs[j + 1];
          arrs[j + 1] = temp;
        }
      }
    }

    console.log(bannerBg);
    this.setData({
      mapFilter: arrs.slice(0, 5),
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
  // 点亮图片
  bright: function (event) {
    let _this = this;
    var index = event.target.dataset.index;
    var imgId = event.target.dataset.imgid;
    var item = this.data.logList;
    var item2 = this.data.mapFilter;
    if (item[index].num < 6) {
      item2[item[index].num - 1].filter = "none";
      this.setData({
        score: this.data.score + 2,
      });
    }
    item[index].opacity = 1;
    let link_title = { game_info_id: imgId };
    this.setData({
      anweser: this.data.anweser.concat(link_title),
      logListIndex: this.data.logListIndex + 1,
      mapFilter: item2,
      logList: item,
    });
    if (this.data.logListIndex == 5) {
      var prams = {
        answer: JSON.stringify(this.data.anweser)
      };
      http.postRequest(
        "joint",
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
    }
  },
  // 提交
  sub: function () {
    let _this = this;
    var prams = {
      answer: JSON.stringify(this.data.anweser),
      token: wx.getStorageSync("token"),
    };
    http.postRequest(
      "joint",
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
