// pages/user/index.js
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  call: function(){
    tools.phoneCall()
  },
})