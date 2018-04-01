/**
 * 
 * 处理星星：
 *  5.8 -> 30
 *  9.2 -> 45
 *  4.8 -> 25
 *  10  -> 50 
 *        10 20 30 40 50
 *         5颗
 * [1,0,0,0,0]
 * [1,1,0,0,0]
 * [1,1,1,0,0]
 * [1,1,1,1,0]
 */

function convertToStarsArray(stars){
  var num = stars.toString().substring(0,1);  // 2
  var starArr = [];
  for(var i = 0;i<5;i++){
    if (num >= i ){
      starArr.push(1)
    }else{
      starArr.push(0)
    }
  }
  return starArr;
}


/**
 * 处理title
 * 
 */

function cutTitle(title){
  if(title.length >=7){
    return title.substring(0,7)+"..."
  }else{
    return title;
  }
}

/**
 * 网络请求
 * 
 */
function http(url,callback){
  wx.request({
    url: url,
    method: "get",
    header: {
      'content-type': 'application/xml'
    },
    success:function(res){
      callback(res)
    }
  })
}


//演员名字使用“/”分隔开
function convertToCastString(casts) {
  var castsjoin = "";
  var castsfinal = "";
  for (var dic in casts) {
    castsjoin = castsjoin + casts[dic].name + " / ";
  }
  castsfinal = castsjoin.substring(0, castsjoin.length - 3);
  return castsfinal;
}

//处理演员信息：头像+名字

function convertToCastsString(casts) {
  //存储信息：头像+名字
  var castsArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  cutTitle: cutTitle,
  http: http,
  convertToCastsString: convertToCastsString,
  convertToCastString: convertToCastString
}
