var utils = require("../../../utils/utils.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  onLoad: function (options) {
    utils.http(app.globalURL.doubanAPI +"/v2/movie/subject/"+options.movieid,this.movieDetailsInfo)
  },

  movieDetailsInfo:function(data){
    data = data.data;
   /*
         1.电影图片：movieImg
         2.制片国家/地区：country
         3.电影名称：title
         4.繁体名称：original_title
         5.想看人数：wish_count
         6.短评数量：commentCount
         7.年代：year
         8.电影类型：generes
         9.评星：stars
         10.评分：score
         11.导演:director
         12.主演：casts
         13.主演信息：castsInfo
         14.简介：summary
     */

    //确保拿到了电影详情的数据
    if (!data) {
      return;
    }

    //注意，因为豆瓣的api比较老，一些老电影的字段，有些信息可能不存在
    //在整个的测试阶段，如果发现那些字段不存在，则需要进行判断

    //处理一下导演
    var director = {
      avatar: "",
      name: "",
      id: ""
    }

    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }

    var temp = {
      movieImg: data.images.large,
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres,
      stars: utils.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.convertToCastString(data.casts),
      castsInfo: utils.convertToCastsString(data.casts),
      summary: data.summary
    }
    this.setData({
      movie: temp
    })

  }
})