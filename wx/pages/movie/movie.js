var utils = require("../../utils/utils.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },

 
  onLoad: function (options) {
    this.http(app.globalURL.doubanAPI +'/v2/movie/in_theaters?start=0&count=3', this.getInfo,"inTheaters","正在热映");
    this.http(app.globalURL.doubanAPI +'/v2/movie/coming_soon?start=0&count=3', this.getInfo,"comingSoon",'即将上映');
    this.http(app.globalURL.doubanAPI +'/v2/movie/top250?start=0&count=3', this.getInfo,"top250","排行榜");
    // 开启等待
    wx.showLoading({
      title: '加载中',
    })
  },

  http:function(url,callback,key,category){
    wx.request({
      url: url,
      method: "get",
      header: {
        'content-type': 'application/xml'
      },
      success: function (data) {
        // 这里数据源
        callback(data, key, category);
      }
    })
  },

  /**
   *
   *  数据的回调
   *    过滤数据：
   *      1.大图
   *      2.标题
   *      3.星星
   *      4.评分
   *      5.id
   */

  getInfo: function (res, key, category){
    // 关闭等待框
    wx.hideLoading();
    var movies = [];
    for (var i = 0; i < res.data.subjects.length;i++){
      var temp = {
        larger: res.data.subjects[i].images.large,
        title: utils.cutTitle(res.data.subjects[i].title),
        star: utils.convertToStarsArray(res.data.subjects[i].rating.stars),
        average: res.data.subjects[i].rating.average,
        id: res.data.subjects[i].id
      }
      movies.push(temp);
    }
    // 创建一个对象

    /**
     *  readyData = {
     *    "inTheaters":{movies:[],category:"正在热映"},  ...inTheaters = movies:[]
     *    "comingSoon":{movies:[],category:"即将上映"},
     *    "top250":{movies:[],category:"top250"}
     *  }
     * 
     */
    var readyData = {};
    readyData[key] = {
      movies: movies,
      category:category
    }
    console.log(readyData)
    this.setData(readyData);
  },

  // 跳转到更多
  gotoMore:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: './movie-more/movie-more?category=' + category
    })
  },

  // 跳转到详情
  gotoDetailsEvent:function(event){
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: './movie-details/movie-details?movieid=' + movieid,
    })
  }

})