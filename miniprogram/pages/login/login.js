const db = wx.cloud.database();
const user = db.collection('user');

Page({
  data: {
    openid: ""
  },
  onLoad() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getopenid',
      complete: res => {
        wx.showLoading({ 
          mask: true,
          title: '加载中'
        });
        that.data.openid = res.result.openid;
        that.autoLogin();
      }
    })
  },
  autoLogin() {
    let that = this;
    user.where({
      _openid: that.data.openid
    }).get().then(res => {
      if (res.data.length != 0) {
        wx.hideLoading();
        wx.setStorageSync('openid', res.data[0]._openid);
        wx.reLaunch({
          url: '/pages/shifan/shifan'
        })
      } else {
        wx.hideLoading();
      }
    })
  },
  login() {
    let that = this;
    user.add({
      data: {},
      success: res => {
        wx.setStorageSync('openid', that.data.openid);
        wx.reLaunch({
          url: '/pages/uploadInfo/uploadInfo',
        })
      }
    })
  }
})