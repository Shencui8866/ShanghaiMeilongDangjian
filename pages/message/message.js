// pages/message/message.js
//获取应用实例
var http = require("../../utils/http");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagesUrl: app.globalData.resourcesUrl,
    pageShow: "game",
    videoPlay: true,
    myDanmu: "",
    gameInfo:'',
    gameName:'',
    imgSrc:'',
    imgSrc2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = app.globalData.gameData.info;
    this.setData({
      gameInfo: info,
      gameName: app.globalData.gameName,
      imgSrc: app.globalData.gameData.info.link_pic
    });
  },
  // 长按保存图片
  saveImage(e){
    console.log(e)
    let that=this
    wx.getSetting({
      success(res) {
        //未授权 先授权 然后保存
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(re) {
              that.saveToBlum();
            }
          })
        }else{
         //已授 直接调用保存到相册方法
          that.saveToBlum();
        }
      }
    })  

  },
  saveToBlum:function(){
    wx.downloadFile({
      url: this.data.imgSrc,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          }
        })
      }
    })
  },
  starGame:function(){
    let _this = this
    app.nextGame().then(function (res) {
      app.globalData.gameData = res.data;
      _this.setData({
        gameData : app.globalData.gameData
      })
    });
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value;
  },
  bindSendDanmu: function () {
    let _this = this
    if (this.data.myDanmu == "") {
      wx.showToast({
        title: "请先输入留言！",
        icon: "none",
        duration: 2000,
      });
    } else {
      var prams = {
        barrage: this.data.myDanmu,
        game_info_id:app.globalData.gameData.info.id
      };
      http.postRequest(
        "barragePic",
        prams,
        function (res) {
          console.log(res)
          _this.setData({
            score: res.data.score,
            imgSrc2:res.data.url
          });
        },
        function (err) {}
      );
      this.setData({
        pageShow: "over",
        videoPlay: false,
      });
    }
  },
  messageChang: function (e) {
    // 获取输入框当前value值
    let value = e.detail.value;

    // 及时更新数据
    this.setData({
      myDanmu: value,
    });
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
