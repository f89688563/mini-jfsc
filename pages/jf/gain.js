// pages/jf/gain.js
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{},
  onLoad:function(options){
    this.loadInfo()
  },
  loadInfo: function(){
    this.punchInfo()
  },
  punchInfo: function(){
    let that = this
    tools.request('Punch/punch')
      .then(function(res){
        let punched = res.punched
        that.setData({punched})
      })
  },
  punch: function(){
    let that = this
    tools.request('Punch/punch', {method: 'POST'})
      .then(function(res){
        if (res.err_code == 0){
          that.loadInfo()
        } else {
          tools.modal({title: '提示', content: res.err_msg})
        }
      })
  }
})