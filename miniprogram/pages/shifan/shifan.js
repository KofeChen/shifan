const db = wx.cloud.database();
const user = db.collection('user');

Page({
  data: {
    date: null,
    // isWorkDay: true,
    isRange: false,
    actionShow: false,
    isBreakfast: false,
    isLunch: false,
    isDinner: false,
    calType: "single",
    calMaxDay: null,
    defaultDate: null,
    dateFilter: (d) => {
      let day = d.date.getDay();
      if (day == 0 || day == 6) {
        d.type = "disabled";
        d.bottomInfo = "周末";
      }
      return d;
    }
  },
  onLoad() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let today = date.getDate();
    let maxDay = 0;
    if (30 - today < 7) {
      maxDay = new Date(year, month + 2, 0).getTime();
    } else {
      maxDay = new Date(year, month + 1, 0).getTime();
    }
    this.setData({
      calMaxDay: maxDay
    });
  },
  onShow() {
    wx.hideHomeButton();
  },
  selectDate(e) {
    this.setData({ 
      date: e.detail,
      actionShow: true 
    });
  },
  changeCalType(e) {
    this.setData({ isRange: e.detail });
    let today = new Date(new Date().setHours(0,0,0,0)).getTime(); // 获取当天开始的时间戳
    let tomorrow = today + 24*60*60*1000; // 获取下一天的时间戳，即默认选中区间开始的时间戳
    let dayAfter = tomorrow + 24*60*60*1000; // 获取默认选中区间结束的时间戳
    if (this.data.isRange) {
      this.setData({ calType: "range" });
      setTimeout(() => { // 先设置选择日期区间，然后再更改默认选中日期
        this.setData({ defaultDate: [tomorrow, dayAfter] });
      }, 10);
    } else {
      this.setData({ calType: "single" });
    }
  },
  // filterWeekend(e){
  //   this.setData({ isWorkDay: e.detail });
  //   if (this.data.isWorkDay) {
  //     this.setData({
  //       dateFilter: (d) => {
  //         let day = d.date.getDay();
  //         if (day == 0 || day == 6) {
  //           d.type = "disabled";
  //           d.bottomInfo = "周末";
  //         }
  //         return d;
  //       }
  //     })
  //   } else {
  //     this.setData({
  //       dateFilter: (d) => d
  //     })
  //   }
  // },
  changeBreakfast(e) {
    this.setData({ isBreakfast: e.detail });
  },
  changeLunch(e) {
    this.setData({ isLunch: e.detail });
  },
  changeDinner(e) {
    this.setData({ isDinner: e.detail });
  },
  closeAction() {
    this.setData({ actionShow: false });
  },
  submit() {
    if (!this.data.isRange) {
      
    } else {

    }
  }
})
