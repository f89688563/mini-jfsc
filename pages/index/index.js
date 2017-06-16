//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [],
    goodsLists: [],
    loadding: false,
    endLoadding: false
  },
  onLoad: function () {
    let tools = app.globalData.tools,
        that = this
    // 加载轮播图
    tools.request('Ad/slider')
      .then(function(res){
        that.setData({imgUrls: res.lists})
      })
      .catch(function(e){
        console.error(e)
      })
    // 加载商品
    tools.request('Goods/lists')
      .then(function(res){
        var page = 2
        that.setData({goodsLists: res.lists, page})
      })
      .catch(function(e){
        console.error(e)
      })
  },
  onReachBottom: function(){
    if (this.data.endLoadding == true) return;
    this.loadGoods()
  },
  loadGoods: function(){
    var that = this,
        page = that.data.page
    that.setLoading(true)
    app.globalData.tools.request('Goods/lists', {page})
      .then(function(res){
        var lists = res.lists,
            goodsLists = that.data.goodsLists,
            page = that.data.page
        if (lists){
          for(var i in lists){
            goodsLists.push(lists[i])
          }
          page ++
          that.setData({goodsLists, page})
          that.setLoading(false)
        } else {
          that.setData({endLoadding: true})
        }
      })
      .catch(function(e){
        console.error(e)
      })
  },
  setLoading: function(loadding){
    this.setData({loadding})
  }
})
