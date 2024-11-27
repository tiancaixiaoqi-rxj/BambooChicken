Page({
  data: {
		      
      goods: []
  },

  onLoad: function () {
    this.fetchGoods();
  },

  fetchGoods: function () {
		const token = wx.getStorageSync('token');
    // 模拟从后端获取活动数据
    wx.request({
      url: 'http://127.0.0.1:8080/bamboo_chicken/api/goods/get', 
			method: 'GET',
			header: {
				'Content-Type': 'application/json', 
				'token': `${token}`  
			},
      success: (response) => {
        if (response.data.code === 200) {
          this.setData({
            goods: response.data.data
          });
        } else {
          wx.showToast({
            title: '获取活动信息失败',
            icon: 'none'
          });
        }
      },
      fail: (error) => {
        console.error('获取活动信息失败', error);
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
	},


});
