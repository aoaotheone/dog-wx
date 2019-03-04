//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code)
        wx.request({
          url: this.globalData.url,
          method: "POST",
          header: {"content-type":"application/json"},
          dataType: "json",
          data: {
            "token": "login",
            "type": "L001",
            "data": {
              "code": res.code
            }
          },
          success: res0 =>{
            // console.log(res0)
            if (res0.data.code === 200){
              this.globalData.token = res0.data.msg.token
              this.globalData.is_regist = res0.data.msg.is_regist
              wx.setStorage({
                key: 'token',
                data: res0.data.msg.token,
                success: res => {
                  // console.log(this)
                  if (this.setTokenReady) {
                    this.setTokenReady(res0.data.msg.token)
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    url: "http://193.112.7.114:8080/GuideDog",
    token: null,
    is_regist: false
  }
})