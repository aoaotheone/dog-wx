//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activity: null
  },
  //事件处理函数
  
  onLoad: function (options) {
    // console.log(options)
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        app.globalData.userInfo = res.data
      },
      fail: res => {
        wx.redirectTo({
          url: '../authorize/authorize',
        })
      }
    })
    wx.getStorage({
      key: 'token',
      success: res => {
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
            "token": res.data,
            "type": "A001",
            "data": {
              page_num: 0,
              item_num: 0
            }
          },
          success: res => {
            wx.hideLoading()
            if (res.data.code === 200) {
              for (let i = 0; i < res.data.msg.item_list.length; i++) {
                switch (res.data.msg.item_list[i].status) {
                  case 0:
                    res.data.msg.item_list[i].state = "未满员"
                    res.data.msg.item_list[i].color = "#00cc80"
                    break;
                  case 1:
                    res.data.msg.item_list[i].state = "已报满"
                    res.data.msg.item_list[i].color = "#f4c606"
                    break;
                  case 2:
                    res.data.msg.item_list[i].state = "已结束"
                    res.data.msg.item_list[i].color = "#888888"
                    break;
                  case 3:
                    res.data.msg.item_list[i].state = "已报名"
                    res.data.msg.item_list[i].color = "#009a61"
                    break;
                  case 4:
                    res.data.msg.item_list[i].state = "已开始"
                    res.data.msg.item_list[i].color = "#00cc80"
                    break;
                  case 5:
                    res.data.msg.item_list[i].state = "已截止"
                    res.data.msg.item_list[i].color = "#f41c06"
                    break;
                  default:
                    break;
                }
              }
              // console.log(res.data.msg.item_list)
              this.setData({
                activity: res.data.msg.item_list
              })
            }
          }
        })
      },
    })
    app.setTokenReady = res => {
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
          "token": res,
          "type": "A001",
          "data": {
            page_num: 0,
            item_num: 0
          }
        },
        success: res => {
          wx.hideLoading()
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.msg.item_list.length; i++) {
              switch (res.data.msg.item_list[i].status) {
                case 0:
                  res.data.msg.item_list[i].state = "未满员"
                  res.data.msg.item_list[i].color = "#00cc80"
                  break;
                case 1:
                  res.data.msg.item_list[i].state = "已报满"
                  res.data.msg.item_list[i].color = "#f4c606"
                  break;
                case 2:
                  res.data.msg.item_list[i].state = "已结束"
                  res.data.msg.item_list[i].color = "#888888"
                  break;
                case 3:
                  res.data.msg.item_list[i].state = "已报名"
                  res.data.msg.item_list[i].color = "#009a61"
                  break;
                case 4:
                  res.data.msg.item_list[i].state = "已开始"
                  res.data.msg.item_list[i].color = "#00cc80"
                  break;
                case 5:
                  res.data.msg.item_list[i].state = "已截止"
                  res.data.msg.item_list[i].color = "#f41c06"
                  break;
                default:
                  break;
              }
            }
            this.setData({
              activity: res.data.msg.item_list
            })
          }
        }
      })
    }
  },
  onShow: function () {
    wx.getStorage({
      key: 'token',
      success: res => {
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
            "token": res.data,
            "type": "A001",
            "data": {
              page_num: 0,
              item_num: 0
            }
          },
          success: res => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            // console.log(res)
            if (res.data.code === 200) {
              for (let i = 0; i < res.data.msg.item_list.length; i++) {
                switch (res.data.msg.item_list[i].status) {
                  case 0:
                    res.data.msg.item_list[i].state = "未满员"
                    res.data.msg.item_list[i].color = "#00cc80"
                    break;
                  case 1:
                    res.data.msg.item_list[i].state = "已报满"
                    res.data.msg.item_list[i].color = "#f4c606"
                    break;
                  case 2:
                    res.data.msg.item_list[i].state = "已结束"
                    res.data.msg.item_list[i].color = "#888888"
                    break;
                  case 3:
                    res.data.msg.item_list[i].state = "已报名"
                    res.data.msg.item_list[i].color = "#009a61"
                    break;
                  case 4:
                    res.data.msg.item_list[i].state = "已开始"
                    res.data.msg.item_list[i].color = "#00cc80"
                    break;
                  case 5:
                    res.data.msg.item_list[i].state = "已截止"
                    res.data.msg.item_list[i].color = "#f41c06"
                    break;
                  default:
                    break;
                }
              }
              // console.log(res.data.msg.item_list)
              this.setData({
                activity: res.data.msg.item_list
              })
            }
          }
        })
      },
    })
  },
  goActivity: function (e) {
    // console.log(e.currentTarget.dataset.activity)
    if (e.currentTarget.dataset.activity.status === 4){
      wx.navigateTo({
        url: '../activiting/activiting?activity=' + JSON.stringify(e.currentTarget.dataset.activity)
      })
    }else{
      wx.navigateTo({
        url: '../activity/activity?activity=' + JSON.stringify(e.currentTarget.dataset.activity)
      })
    }
  },
  onPullDownRefresh: function () {
    wx.getStorage({
      key: 'token',
      success: res => {
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
            "token": res.data,
            "type": "A001",
            "data": {
              page_num: 0,
              item_num: 0
            }
          },
          success: res => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            // console.log(res)
            if (res.data.code === 200) {
              for (let i = 0; i < res.data.msg.item_list.length; i++) {
                switch (res.data.msg.item_list[i].status) {
                  case 0:
                    res.data.msg.item_list[i].state = "未满员"
                    res.data.msg.item_list[i].color = "#00cc80"
                    break;
                  case 1:
                    res.data.msg.item_list[i].state = "已报满"
                    res.data.msg.item_list[i].color = "#f4c606"
                    break;
                  case 2:
                    res.data.msg.item_list[i].state = "已结束"
                    res.data.msg.item_list[i].color = "#888888"
                    break;
                  case 3:
                    res.data.msg.item_list[i].state = "已报名"
                    res.data.msg.item_list[i].color = "#009a61"
                    break;
                  case 4:
                    res.data.msg.item_list[i].state = "已开始"
                    res.data.msg.item_list[i].color = "#00cc80"
                    break;
                  case 5:
                    res.data.msg.item_list[i].state = "已截止"
                    res.data.msg.item_list[i].color = "#f41c06"
                    break;
                  default:
                    break;
                }
              }
              // console.log(res.data.msg.item_list)
              this.setData({
                activity: res.data.msg.item_list
              })
            }
          }
        })
      },
    })
  }
})
