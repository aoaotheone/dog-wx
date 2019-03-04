// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    time:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      is_regist: app.globalData.is_regist
    })
    if (app.globalData.is_regist) {
      this.getInfo()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  register: function (){
    wx.navigateTo({
      url: '../info/info',
    })
  },
  getInfo: function () {
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.globalData.url,
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/json"
      },
      data: {
        "token": app.globalData.token,
        "type": "U003",
        "data": {}
      },
      success: res => {
        wx.hideLoading()
        // console.log(res)        
        if (res.data.code === 200) {
          this.setData({
            score: res.data.msg.score,
            time: res.data.msg.time
          })
        }
      }
    })
  },
  showTimeLine: function () {
    wx.showToast({
      title: '该功能还未上线',
      icon: 'loading',
      duration: 2000
    })
  },
  showMyAc: function (){
    wx.navigateTo({
      url: '../myActivity/myActivity',
    })
  }
})