var app = getApp();
var utils = require("../../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    start:0,
    isFlag:false,
    currentURL:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var publicURL = app.globalURL.doubanAPI;
    var useURL = "";
    switch (options.category){
      case "正在热映":
        useURL = publicURL + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        useURL = publicURL + "/v2/movie/coming_soon"
        break;
      case "排行榜":
        useURL = publicURL + "/v2/movie/top250"
        break;   
    }
    this.setData({
      currentURL: useURL
    })
    wx.showLoading({
      title: '加载中',
    })
    // 动态设置导航条
    wx.setNavigationBarTitle({
      title: options.category
    })
    utils.http(useURL, this.getMovieInfo)
  },
  getMovieInfo(res){
    wx.hideLoading();
    var movies = [];
    for (var i = 0; i < res.data.subjects.length; i++) {
      var temp = {
        larger: res.data.subjects[i].images.large,
        title: utils.cutTitle(res.data.subjects[i].title),
        star: utils.convertToStarsArray(res.data.subjects[i].rating.stars),
        average: res.data.subjects[i].rating.average,
        id: res.data.subjects[i].id
      }
      movies.push(temp);
    }

    
    /**
     * 第一次进入的时候，totalMovies = movies
     * 菲第一次进入的时候：totalMovies = 当前movies + 渲染之后的movies
     * 
     */
    // 承载最终能要显示的数据
    var totalMovies = [];
    if (!this.data.isFlag){
      // 第一次进入
      this.setData({
        isFlag:true
      })
      totalMovies = movies
    }else{
      totalMovies = this.data.movies.concat(movies);
    }
    this.setData({
      movies: totalMovies,
      start: this.data.start += 20
    })
  },
  
  /**
   * 上拉加载
   */
  onReachBottom:function(){
    wx.showLoading({
      title: '加载中',
    })
    utils.http(this.data.currentURL+"?start=" + this.data.start + "&count=20", this.getMovieInfo);
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh:function (){
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      movies:[]
    })
    utils.http(this.data.currentURL, this.getMovieInfo);
  }

})