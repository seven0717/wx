var newsData = require("../../data/newsdata.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsDetails:{},
    newsid:0,
    newCollected:false
  },

  /**
   *  修改data数据
   *    setData：setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
   *  注意：

      1.直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
      2.单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
      3.请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。
   */
  onLoad: function (options) {
    this.setData({
      newsDetails: newsData[options.id],
      newsid:options.id
    })

    var newsCollect = wx.getStorageSync("newsCollect");
    if(!newsCollect){
     var newsCollect = {};
     newsCollect[options.id] = false;
     wx.setStorageSync("newsCollect", newsCollect) ;
    }else{
      this.setData({
        newCollected:newsCollect[options.id]
      })
    }
  },

  /**
   * 收藏功能：
   *  1.初始化
   *      判断当前数据是否被收藏过，创建一个收藏的数据存储方案
   *  2.事件
   *      修改掉收藏的状态
   *  3.使用API
   *      1.本地存储
   *      2.修改视图
   *      3.条件渲染
   *  4.存储数据格式
   *      {
   *        0:true,
   *        1:false,
   *        2:true
   *      }
   *  5.存储的Key
   *      1.集合：newsCollect
   *      2.单条：newCollect
   */

  collectEvent:function(event){
    var newsCollect = wx.getStorageSync("newsCollect");
    var newCollect = newsCollect[this.data.newsid];
    newCollect = ! newCollect;
    newsCollect[this.data.newsid] = newCollect;
    wx.setStorageSync("newsCollect", newsCollect);
    this.setData({
      newCollected: newCollect
    })
  }
})
