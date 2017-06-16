// pages/goods/info.js
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{
    count: 1,
    details: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id,
        that = this
    tools.request('Goods/info', {id})
      .then(function(res){
        that.setData({info: res.info, standard: res.standard})
      })
      .catch(function(){
        console.error()
      })
  },
  radioChange: function(e){
    let id = e.detail.value,
        info = this.data.standard[id],
        details = this.data.details
    details[info.pid] = info
    this.setData({details})
  },
  confirm: function(){
    let details = this.data.details,
        _standard = this.data.info._standard
    if (Object.keys(details).length == Object.keys(_standard).length){
      this.toCar()
    } else {
      tools.modal({title: '请选择规格', content:'', showCancel: false})
    }
  },
  toCar: function(){
    let details = this.data.details,
        gid = this.data.info.id,
        count = this.data.count,
        detail = '',
        standard = '',
        method = 'POST'
    for(var i in details){
      var item = details[i]
      detail += ',' + item.pid + ':' + item.id
      standard += ' ' + item.name
    }
    detail = detail.substring(1)
    standard = standard.trim()
    
    tools.request('Car/add', {gid, standard, detail, count, method})
      .then(function(res){
        if (res.err_code == 0){
          tools.modal({title: '提示', content: '已加入购物车，是否立即前往购物车'})
            .then(function(res){
              if (res.confirm){
                wx.navigateTo({
                  url: '/pages/car/index'
                })
              }
            })
        }
      })
      .catch(function(){
        console.error()
      })
  },
  decr: function(){
    this.setCount('decr')
  },
  incr: function(){
    this.setCount('incr')
  },
  setCount: function(t){
    let count = this.data.count
    switch(t){
      case 'decr':
        if (count >= 2) count --
        break;
      case 'incr':
        count ++
        break;
    }
    this.setData({count})
  }
})