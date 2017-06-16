// pages/car/index.js
let app = getApp(),
    tools = app.globalData.tools
Page({
  data:{},
  onLoad:function(options){
    let that = this
    tools.request('Car/index')
      .then(function(res){
        var lists = res.lists
        that.setData({lists})
        that.setTotal()
      })
      .catch(function(){
        console.error()
      })
  },
  remove:  function(e){
    var id = e.currentTarget.dataset.id,
        that = this
    tools.modal({title: '提示', content:'确认移出购物车？'})
      .then(function(res){
        if (res.confirm){
          tools.request('Car/del', {id})
            .then(function(res){
              var lists = that.data.lists
              for (var i in lists){
                if (lists[i]['id'] == id){
                  lists.splice(i, 1)
                  break
                }
              }
              that.setData({lists})
              that.setTotal()
            })
        }
      })
  },
  setTotal: function(){
    let lists = this.data.lists,
        total = 0
    for (var i in lists){
      total += parseInt(lists[i]['count']) * parseFloat(lists[i]['price'])
    }
    this.setData({total})
  },
  decr: function(e){
    this.setCount('decr', e.currentTarget.dataset.item)
  },
  incr: function(e){
    this.setCount('incr', e.currentTarget.dataset.item)
  },
  setCount: function(t, e){
    let count = e.count,
        id = e.id,
        method = 'POST',
        that = this
    switch(t){
      case 'decr':
        if (count >= 2) count --
        break;
      case 'incr':
        count ++
        break;
    }
    tools.request('Car/edit', {id, count, method})
      .then(function(res){
        var lists = that.data.lists
        lists = lists.map(function(item){
          if (item.id == id) item.count = count
          return item
        })
        that.setData({lists})
        that.setTotal()
      })
      .catch(function(){
        console.error()
      })
  },
  confirm: function(){
    tools.request('Order/generate')
      .then(function(res){
        if (res.err_code == 0){
          wx.redirectTo({url: '/pages/order/confirm?id='+res.id})
        } else {
          tools.modal({title: '提示', content: res.err_msg})
        }
      })
      .catch(function(){
        console.error()
      })
  }
})