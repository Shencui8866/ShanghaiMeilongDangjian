//app.js
var http = require("/utils/http.js");
const back = wx.getBackgroundAudioManager();
App({
  onLaunch: function () {
    this.player(wx.getBackgroundAudioManager())
    wx.setStorageSync("loading", false);
    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: "https://control.shencui1979.com/i/login", //仅为示例，并非真实的接口地址
          method: "post",
          data: {
            code: res.code,
          },
          success(res) {
            wx.setStorageSync("token", res.data.data.token); //存储token
            // wx.setStorageSync("token", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LnNoZW5jdWkxOTc5LmNvbSIsInN1YiI6Imh0dHBzOlwvXC93d3cuc2hlbmN1aTE5NzkuY29tIiwiYXVkIjoiaHR0cHM6XC9cL3d3dy5zaGVuY3VpMTk3OS5jb20iLCJpYXQiOjE2MDk0MDc1NDAsImV4cCI6MTYxMDAxMjM0MCwiZGF0YSI6eyJpZCI6NH19.dKVffb5UFEi0KZFX0QmdVBwFQ6ROO9esl4XnVX35eWg3X4JegPXcEbuYy-KNRG1HHRucO2tZc8Hbr7ayRP7IUuhuAFbtH0h-d4CsfdluTLTRwSvCLdCTMFS3bpPCQHHCAbFRhE5mk50nYDP1s5greUxiWiJozdBDD-A1-DgrHVA');
          },
        });
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              var prams = {
                nickname: this.globalData.userInfo.nickName,
                headimg: this.globalData.userInfo.avatarUrl,
                gender: this.globalData.userInfo.gender,
                country: this.globalData.userInfo.country,
                province: this.globalData.userInfo.province,
                city: this.globalData.userInfo.city,
              };
              http.postRequest(
                "userinfo",
                prams,
                function (res) {},
                function (err) {}
              );
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
  nextGame: function () {
    let _this = this;
    return new Promise(function (resolve, reject) {
      http.getRequest(
        "game",
        '',
        function (res) {
          if (res.msg == "error") {
            wx.showToast({
              title: res.data,
              icon: 'none',
              duration: 2000
            })
            wx.redirectTo({
              url: '/pages/index/index',
            });
          } else {
            _this.globalData.gameData = res.data;
            _this.globalData.gameName = res.data.name.name;
            let url = "";
            switch (res.data.name.classify_id) {
              // 判断竞技
              case 1:
                url = "/pages/judge/judge";
                break;
              // 连连看
              case 2:
                url = "/pages/connection/connection";
                break;
              // 拼图
              case 3:
                url = "/pages/puzzle/puzzle";
                break;
              // 视频弹幕
              case 4:
                url = "/pages/bulletChat/bulletChat";
                break;
              // 图片留言
              case 5:
                url = "/pages/message/message";
                break;
              // 视频配音
              case 6:
                url = "/pages/dubbing/dubbing";
                break;
              // 照片上传生成海报
              case 7:
                url = "/pages/imgUpload/imgUpload";
                break;
              // AR识别对比
              case 8:
                url = "/pages/AR/AR";
                break;
              // 动漫变脸
              case 9:
                url = "/pages/faceChanging/faceChanging";
                break;
              // 定位打卡
              case 10:
                url = "/pages/location/location";
                break;
              default:
                url = "/pages/index/index"
                break;
            }
            wx.redirectTo({
              url: url,
            });
          }
          resolve(res);
        },
        function (err) {
          reject(err);
        }
      );
    });
  },
  player(audio) {
    var that = this
    audio.title = '中庚互动'
    audio.src = 'https://file.shencui1979.com/public/dj/bgm.mp3'
    audio.onEnded(() => {
      that.player(wx.getBackgroundAudioManager())
    })
  },

  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach((key) => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value);
      });
    });
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val;
      },
      set: function (newVal) {
        if (newVal === val) return;
        fn && fn(newVal);
        val = newVal;
      },
    });
  },
  globalData: {
    userInfo: null,
    resourcesUrl: "/public",
    gameData: {},
    gameName: "",
    token:''
  },
});
