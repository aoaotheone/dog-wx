// pages/activity/activity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_folded: false,
    need_floded: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activity = JSON.parse(options.activity)
    // console.log(activity)
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
        wx.stopPullDownRefresh()        
        if (res.data.code === 200) {
          wx.redirectTo({
            url: '../activiting/activiting',
          })
        }
      }
    })

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
  sign: function () {
    // console.log(this.data.activity)
    if(app.globalData.is_regist){
      wx.showModal({
        title: '确认' + (this.data.activity.status === 3 ? '取消' : '') + '报名吗',
        content: '',
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
                "type": "A002",
                "data": {
                  activity_id: this.data.activity.aid
                }
              },
              success: res => {
                wx.hideLoading()
                if (res.data.code === 200) {
                  this.data.activity.status = this.data.activity.status === 0 ? 3 : 0
                  this.setData({
                    activity: this.data.activity
                  })
                }
              }
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../info/info'
      })
    }
    
  },
  startActivity: function () {
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
        if (res.data.code === 200) {
          wx.redirectTo({
            url: '../activiting/activiting?activity=' + JSON.stringify(this.data.activity),
          })
        }
      }
    })
   
  }
})