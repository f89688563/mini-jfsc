// pages/order/confirm.js
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{
    ded: false,
    payType: 1,
    pay: [
      {name: '微信支付', value: 1},
      {name: '门店自提', value: 2}
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({id: options.id})
    this.loadInfo()
  },
  loadInfo: function(){
    var id = this.data.id,
        that = this
    tools.request('Order/info', {id})
      .then(function(res){
        let info = res.info
        that.setData({info})
      })
      .catch(function(){
        console.error();
      })
  },
  checkboxChange: function(e){
    this.setData({ded: e.detail.value[0] == 1})
  },
  radioChange: function(e){
    this.setData({payType: e.detail.value})
  }
})