// pages/location/location.js
//获取应用实例
var http = require("../../utils/http");
const app = getApp();
Page({
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.mapCtx = wx.createMapContext("myMap");
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    imagesUrl: app.globalData.resourcesUrl,
    pageShow: true,
    imgPath: app.globalData.resourcesUrl + "/img/faceChanging/upload-bg.png",
    latitude: 31.245105,
    longitude: 121.506377,
    markers: [],
    circles: [],
    gameName:"",
    score:10,
    loClick:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = app.globalData.gameData.info;
    this.setData({
      gameInfo: info,
      gameName: app.globalData.gameName,
      link_pic:info.link_pic,
      addres:info.site_name
    });
    var that = this;
    //获取当前的地理位置、速度
    wx.getLocation({
      type: "gcj02", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        console.log(res);
        console.log(info.site_y,info.site_x,info.site_r,info.site_name,)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers:{
            id: 1,
            latitude: info.site_y,
            longitude: info.site_x,
            name: info.site_name+"打卡点",
          },
          circles: [
            {
              latitude: res.latitude,
              longitude: res.longitude,
              color: "#7cb5ec88",
              fillColor: "#7cb5ec88",
              radius: 500,
              strokeWidth: 1,
            },
          ],
        });
      },
    });
  },
  getCenterLocation: function () {
    let _this = this
    if(_this.data.loClick == true){
      this.mapCtx.getCenterLocation({
        success: function (res) {
          var prams = { site_x:res.longitude,site_y:res.latitude, game_info_id: _this.data.gameInfo.id };
          http.postRequest(
            "location",
            prams,
            function (res) {
              let data = res.data
              _this.setData({
                pageShow:false,
                score:data.score
              })
            },
            function (err) {}
          );
        },
      });
    }else{
      this.tip('请先点击定位！')
    }
    
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation();
    this.setData({
      loClick:true
    })
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
