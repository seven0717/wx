// pages/topnews/topnews.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNewsData:[]
  },

  /**
   * 1.在账号中添加白名单的域名
   *      v.juhe.cn
   *      wwtliu.com
   * 2.找到数据源，聚合数据
   * 3.网络请求
   * 
   */

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?type=top&key=182e9e4d6c616c76309bc294e4368cda',
      method:"get",
      success:function(data){
        that.setData({
          topNewsData: data.data.result.data
        })
      }
    })
  }
})