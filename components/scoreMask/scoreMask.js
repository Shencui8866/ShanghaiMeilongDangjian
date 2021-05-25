// components/scoreMask/scoreMask.js

//获取应用实例
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: String,
      value: "0",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imagesUrl: app.globalData.resourcesUrl,
    mask: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    btnHide: function () {
      this.setData({
        mask: false,
      });
      this.triggerEvent(
        "parentReceive",
        {
          isStar: true,
        },
        {}
      );
    },
  },
  // btnHide:function(){
  //

  // },
});
