// pages/jf/expend.js
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{
    goodsLists: [],
    loadding: false,
    endLoadding: false
  },
  onLoad:function(options){
    let that = this
    // 加载商品
    tools.request('Goods/lists')
      .then(function(res){
        var page = 2
        that.setData({goodsLists: res.lists, page})
        if (res.lists.length<10){
          that.setData({loadding: true, endLoading: true})
        }
      })
      .catch(function(e){
        console.error(e)
      })
  },
  call: function(){
    tools.phoneCall()
  },
  onReachBottom: function(){
    if (this.data.endLoadding == true) return;
    this.loadGoods()
  },
  loadGoods: function(){
    var that = this,
        page = that.data.page
    that.setLoading(true)
    tools.request('Goods/lists', {page})
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