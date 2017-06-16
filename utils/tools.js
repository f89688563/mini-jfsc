let config = require('config.js')
function request( uri, opts = {}){
    let { method = 'GET' } = opts,
        url = config.apiUrl + uri
    return new Promise( function( resolve, reject ){
        wx.request({
          url: url,
          data: opts,
          method: method,
          header: { 'Content-type': 'application/x-www-form-urlencoded'},
          success: function(res){
            resolve(res.data)
          },
          fail: function(e) {
            reject(e)
          }
        })
    } );
}

function wxPromisify(fn) {  
  return function (obj = {}) {    
    return new Promise((resolve, reject) => {      
      obj.success = function (res) {        
        resolve(res)      
      }
      obj.fail = function (res) {        
        reject(res)      
      }
      fn(obj)
    })  
  }
}
let modal = wxPromisify(wx.showModal),
    toast = wxPromisify(wx.showToast),
    showLoading = wxPromisify(wx.showLoading),
    actionSheet = wxPromisify(wx.showActionSheet)

function phoneCall(){
  modal({title: '拨打客服电话', content: '您注册的手机号码是18674083822，请告知客服'})
    .then(function(res){
      if (res.confirm){
        wx.makePhoneCall({
          phoneNumber: '18674083822' //仅为示例，并非真实的电话号码
        })
      }
    })
    .catch(function(e){
      console.error(e)
    })
}

function del(url, id, opts = {}){
  let {uri} = opts

  return modal({title: '提示', content: '确定删除？'})
    .then(function(res){
      if (res.confirm){
        return new Promise(function(resolve, reject){
          request(url, {id})
            .then(function(res){
              if (res.err_code == 0){
                modal({title: '提示', content: '删除成功', showCancel: false})
                  .then(function(r){
                    if(r.confirm){
                      if (uri) wx.redirectTo({url: uri})
                    }
                    resolve(res)
                  })
              } else {
                modal({title: '提示', content: res.err_msg || '操作失败'})
              }
            })
        })
      }
    })
}

module.exports = {
    request,
    modal,
    toast,
    showLoading,
    actionSheet,
    phoneCall,
    del
}