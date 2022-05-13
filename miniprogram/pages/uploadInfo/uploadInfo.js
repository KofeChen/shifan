const db = wx.cloud.database();
const _ = db.command;
const user = db.collection('user');
const fans = db.collection('fans');

Page({
  data: {
    username: "",
    errorMsg: ""
  },
  onLoad() {
    
  },
  onShow() {
    wx.hideHomeButton();
  },
  inputName(e) {
    var reg = /^[\u4E00-\u9FA5]+$/;
    var username = e.detail;
    if (!reg.test(username) && username != "") {
      this.setData({
        errorMsg: "请输入正确的姓名!" 
      });
    } else {
      this.setData({
        errorMsg: "",
        username
      });
    }
  },
  setIdent(e) {
    let that = this;
    let openid = wx.getStorageSync('openid');
    if (this.data.errorMsg || !this.data.username) {
      wx.showToast({
        title: '输入正确的姓名',
        icon: 'error',
        duration: 1500
      }) 
    } else {
      user.where({
        _openid: openid
      }).update({
        data: {
          username : that.data.username,
          ident: e.currentTarget.dataset.ident
        },
        success(e) {
          wx.cloud.callFunction({
            name: "pushUser",
            data: {
              name: that.data.username
            },
            success(e) {
              wx.reLaunch({
                url: '/pages/shifan/shifan',
              });
            }
          })
        }
      })
    }
  }
})