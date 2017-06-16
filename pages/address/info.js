// pages/address/info.js
let data = require('../../utils/distpicker/data.js')
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{
    showTopTips: false
  },
  onLoad:function(options){
    this.setData({id: options.id})
    this.loadData()
  },
  init: function(){
    let province = this.initData(data[86])
    this.setData({province})
    if (this.data.p){
      let pIndex = this.getId(this.data.province, this.data.p)
      this.setCity(province[pIndex]['id'])
    } else {
      // 加载省市区
      this.setData({p: province[0]['name']})
      this.setCity(province[0]['id'])
    }
  },
  getId: function(data, name){
    for (let i in data){
      if (data[i]['name'] == name) return i;
    }
  },
  initData: function(data){
    let temp = []
    for (var i in data){
      temp.push({id: i, name: data[i]})
    }
    return temp
  },
  loadData: function(){
    let that = this,
        id = that.data.id
    tools.request('Address/edit', {id})
      .then(function(res){
        let info = res.info,
            on_time = res.on_time, p, c, d, time
        if (info){
            time = info.on_time || '',
            p = info.province,
            c = info.city,
            d = info.district
        }
        that.setData({info, on_time, d, c, p, time})
      })
      .then(function(){
        that.init()
      })
  },
  bindTimeChange: function(e){
    let on_time = this.data.on_time,
        index = e.detail.value,
        time = on_time[index]
    this.setData({time})
  },
  // 省变化
  bindProvinceChange: function(e){
    let province = this.data.province,
        pIndex = e.detail.value,
        p = province[pIndex]['name']
    this.setData({p})
    this.setCity(province[pIndex]['id'])
  },
  // 设置市
  setCity: function(pid){
    let city = this.initData(data[pid])
    this.setData({city, c: city[0]['name']})
    this.setDistrict(city[0]['id'])
  },
  // 市变化
  bindCityChange: function(e){
    let city = this.data.city,
        cIndex = e.detail.value,
        c = city[cIndex]['name']
    this.setData({c})
    this.setDistrict(city[cIndex]['id'])
  },
  // 设置地区
  setDistrict: function(cid){
    let district = this.initData(data[cid])
    this.setData({district, d: district[0]['name']})
  },
  // 地区变化
  bindDistrictChange: function(e){
    let district = this.data.district,
        dIndex = e.detail.value,
        d = district[dIndex]['name']
    this.setData({d})
  },
  submit: function(e){
    let data = e.detail.value
    data.method = 'POST'
    tools.request('Address/edit', data)
      .then(function(res){
        if (res.err_code == 0){
          tools.toast({title: '保存成功', duration: 1500})
          setTimeout(function(){
            wx.redirectTo({url: 'index'})
          }, 1500)
        } else {
          tools.modal({title: '提示', content: res.err_msg})
        }
      })
  },
  reset: function(e){
    console.log(e)
  }
})