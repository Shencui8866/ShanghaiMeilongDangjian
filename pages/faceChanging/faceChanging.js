// pages/faceChanging/faceChanging.js
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
    imgPath: app.globalData.resourcesUrl+'/img/faceChanging/upload-bg.png',
    uploadType:false
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
      url: this.data.link_pic,
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
  bindSendDanmu: function () {
    let _this = this
    if(this.data.uploadType == true){
    wx.uploadFile({
      url: "https://control.shencui1979.com/i/cartoon",
      filePath: _this.data.imgPath,
      name: "file",
      header:{token: wx.getStorageSync("token")},
      formData: {
        game_info_id: _this.data.gameInfo.id,
      },
      success(res) {
        const data =JSON.parse(res.data);
        console.log(data)
        if(data.msg=='error'){
          wx.showToast({
            title: data.data,
            icon:"none",
            duration: 2000,
          })
        }else{
          _this.setData({
            pageShow: false,
            link_pic:data.data.url
          });
        }
      },
    });
    }else{
      this.tip('请先上传图片')
    }
    
  },
  chooseImg: function (e) {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          imgPath:tempFilePaths[0],
          uploadType:true
        })
      },
    });
  },
  
  starGame:function(){
    console.log('123')
    let _this = this
    app.nextGame().then(function (res) {
      app.globalData.gameData = res.data;
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
