// pages/address/index.js
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadData()
  },
  loadData: function(){
    let that = this
    tools.request('Address/index')
      .then(function(res){
        that.setData({lists: res.lists})
      })
  },
  del: function(e){
    let id = e.currentTarget.dataset.id,
        that = this
    tools.del('Address/del', id)
      .then(function(res){
        if (res != undefined && res.err_code == 0){
          that.loadData()
        }
      })
  }
})