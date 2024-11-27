Page({
  data: {
		stepCount: 0,
		myself: {},
    stepNumberList: []
	},
	  
onLoad: function () {
			this.updateRankList();
		},



// 发送步数到后端

updateRankList: function () {
	const token = wx.getStorageSync('token');
	// 获取用户步数数据
	wx.getWeRunData({
		success: (res) => {
			const encryptedData = res.encryptedData;
			const iv = res.iv;

			// 发送到后端服务进行解密和存储
			wx.request({
				url: 'http://127.0.0.1:8080/bamboo_chicken/api/user/step', // 替换为你的后端接口
				method: 'POST',
				data: {
					encryptedData: encryptedData,
					iv: iv
				},
				header: {
					'Content-Type': 'application/json', 
					'token': `${token}`  
				},
				success: (response) => {
					// 更新排行榜数据
					this.fetchRankList();
				},
				fail: (error) => {
					console.error('更新步数失败', error);
				}
			});
		},
		fail: (error) => {
			console.error('获取步数数据失败', error);
		}
	});
},

fetchRankList: function () {
	const token = wx.getStorageSync('token');
	// 获取排行榜数据
	wx.request({
		url: 'http://127.0.0.1:8080/bamboo_chicken/api/user/getAllStep', // 替换为你的后端接口
		method: 'GET',
		header: {
			'Content-Type': 'application/json', 
			'token': `${token}`  
		},
		success: (response) => {
			const data = response.data.data; 
			this.setData({
				myself: data.myself,
				stepNumberList: data.stepNumberList.slice(0, 100)
			});
		},
		fail: (error) => {
			console.error('获取排行榜失败', error);
		}
	});
}



});
