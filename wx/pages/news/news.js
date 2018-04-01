var newsData = require("../../data/newsdata.js")

Page({
  data: {
    swiper:{
      indicatorDots: true,
      indicatorColor:"#fff",
      autoplay:true
    },
    swiperImg:[
      "http://www.wwtliu.com/sxtstu/blueberrypai/indexImg/banner1.jpg",
      "http://www.wwtliu.com/sxtstu/blueberrypai/indexImg/banner2.jpg",
      "http://www.wwtliu.com/sxtstu/blueberrypai/indexImg/banner3.jpg"
    ],
    newsData: newsData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  // 跳转到详情页
  detailsTap:function(event){
    wx.navigateTo({
      url: '../news-details/news-details?id=' + event.currentTarget.dataset.customid,
    })
  }
})