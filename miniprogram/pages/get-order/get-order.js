// orders.js
Page({
  data: {
    orders: [],
		status: ["到店领取", "派送中", "已送达"]
  },

  onLoad: function(options) {
    this.getOrder()
	},
	
	getOrder() {
		const token = wx.getStorageSync('token');

    wx.request({
        url: 'http://127.0.0.1:8080/bamboo_chicken/api/order/getOrder',           
        method: 'GET',        // 请求方式
        header: {
						'Content-Type': 'application/json',
						'token': `${token}`  
        },
        success: (res) => {
            // 处理返回的数据
        if (res.data.code === 200) {
          this.setData({
            orders: res.data.data
          });
        } else {
          wx.showToast({
            title: '获取订单信息失败',
            icon: 'none'
          });
        }
        },
        fail: (error) => {
            console.error('请求错误:', error);
            wx.showToast({
                title: '请求错误，请重试',
                icon: 'none'
            });
        }
    });
},


	formatTime(timestamp) {
     
		const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需加1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	},
	
	deleteOrder: function(e) {
		const token = wx.getStorageSync('token');
    const orderId = e.currentTarget.id;
    const that = this;
    wx.showModal({
      title: '确认删除',
      content: '您确定要删除这个订单吗？',
      success: (res) =>{
        if (res.confirm) {
          wx.request({
            url: `http://127.0.0.1:8080/bamboo_chicken/api/order/delete/${orderId}`, // 替换为你的删除 API 地址
						method: 'DELETE',
						header: {
							'Content-Type': 'application/json',
							'token': `${token}`  
					},
            success:(res) => {
              if (res.data.code === 200) {
                 const updatedOrders = that.data.orders.filter(order => order.id !== orderId);
								 that.setData({ orders: updatedOrders });
								 that.getOrder();
                 wx.showToast({
                     title: '订单删除成功',
                     icon: 'success'
                 });
              } else {
                 wx.showToast({
                     title: '删除失败'+ (res.data.msg || '未知错误'),
                     icon: 'none'
                 });
              }
            },
            fail:(error) =>{
              console.error('请求错误:', error);
              wx.showToast({
                  title: '请求错误，请重试',
                  icon: 'none'
              });
            }
          });
        }
      }
    });
  }
})