// pages/activiting/activiting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activity = JSON.parse(options.activity)
    this.setData({
      activity: activity
    })
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
        "type": "A004",
        "data": {
          activity_id: this.data.activity.aid
        }
      },
      success: res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          this.setData({
            time: res.data.msg.time
          })
        }
      }
    })
    setTimeout(this.updateClock.bind(this),60000)
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
        "type": "A004",
        "data": {
          activity_id: this.data.activity.aid
        }
      },
      success: res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          this.setData({
            time: res.data.msg.time
          })
        }
      }
    })
  },
  overActivity: function() {
    wx.showModal({
      title: '确认结束服务？',
      content: '确认结束操作不可撤销',
      success: res => {
        if (res.confirm) {
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
              "type": "A003",
              "data": {
                activity_id: this.data.activity.aid
              }
            },
            success: res => {
              wx.hideLoading()
              // console.log(res)
              if (res.data.code === 200) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  
  },
  updateClock: function() {
    wx.request({
      url: app.globalData.url,
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/json"
      },
      data: {
        "token": app.globalData.token,
        "type": "A004",
        "data": {
          activity_id: this.data.activity.aid
        }
      },
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            time: res.data.msg.time
          })
        }
      }
    })
    setTimeout(this.updateClock.bind(this), 60000)    
  }
})