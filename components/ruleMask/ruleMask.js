// components/ruleMask/ruleMask.js

//获取应用实例
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    txt: {
      type: String,
      value: "游戏规则",
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
