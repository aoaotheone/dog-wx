// pages/info/info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      name: '',
      age: '',
      phone_num: '',
      phone_code: '',
      address: '',
      job: '',
      hobby: ''
    },
    is_regist: false,
    time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.is_regist){
      this.getInfo()
    }
    this.setData({
      is_regist: app.globalData.is_regist
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
  registerDone: function () {
    if(this.data.info.name.trim() === ''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.info.age.trim() === '') {
      wx.showToast({
        title: '年龄不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.info.phone_num.trim() === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.info.phone_num.trim().length < 11) {
      wx.showToast({
        title: '手机号为11位',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.info.phone_code.trim() === '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
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
        "type": "U001",
        "data": this.data.info
      },
      success: res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.globalData.is_regist = true
          this.setData({
            time: 0
          })
          wx.showToast({
            title: '注册成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () { wx.navigateBack({ delta: 1 })}, 1000)
        }
      }
    })
  
  },
  change: function () {
    if (this.data.info.phone_num.trim() === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.info.phone_code.trim() === '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
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
        "type": "U004",
        "data": this.data.info
      },
      success: res => {
        wx.hideLoading()
        
        if (res.data.code === 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000
          })
          this.setData({
            time: 0
          })
          setTimeout(function () { wx.navigateBack({ delta: 1 })},2000)
        }
      }
    })
  },
  getcode: function () {
    if (this.data.info.phone_num.trim() === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (this.data.info.phone_num.trim().length < 11) {
      wx.showToast({
        title: '手机号为11位',
        icon: 'none',
        duration: 2000
      })
      return false
    }
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
        "type": "U002",
        "data": {
          phone_num: this.data.info.phone_num
        }
      },
      success: res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          this.setData({
            time: 61
          })
          this.countDown()
        }
      }
    })
  },
  setInfo: function (e) {
    this.data.info[e.currentTarget.dataset.info] = e.detail.value
    this.setData({
      info: this.data.info
    })
  },
  countDown: function() {
    let time = this.data.time - 1
    this.setData({
      time: time
    })
    if(time <= 0) return
    setTimeout(this.countDown.bind(this),1000)
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
        "type": "U005",
        "data": {}
      },
      success: res => {
        wx.hideLoading()
        if (res.data.code === 200) {
          res.data.msg.phone_code = ''
          this.setData({
            info: res.data.msg
          })
        }
      }
    })
  }
})