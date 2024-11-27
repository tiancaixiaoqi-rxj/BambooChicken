Page({
  data: {
		        
      isVisible: false,
      recipientName: '',
      recipientPhone: '',
      recipientAddress: '',
      recipientNote: '',
      activities: []
  },

  onLoad: function () {
    this.fetchActivities();
  },

  fetchActivities: function () {
		const token = wx.getStorageSync('token');
    // 模拟从后端获取活动数据
    wx.request({
      url: 'http://127.0.0.1:8080/bamboo_chicken/api/active/getActives', 
			method: 'GET',
			header: {
				'Content-Type': 'application/json', 
				'token': `${token}`  
			},
      success: (response) => {
        if (response.data.code === 200) {
          this.setData({
            activities: response.data.data
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

	receive:function(e){
		const { recipientName, recipientPhone, recipientAddress } = this.data;
		 if(!recipientName || !recipientPhone ||!recipientAddress){
			wx.showToast({
				title: '请填写基本信息',
				duration: 2000
			});
				this.setData({isVisible: true });
		 }

		 else{
			const token = wx.getStorageSync('token');
			const id = e.currentTarget.id
			const { recipientName, recipientPhone, recipientAddress, recipientNote } = this.data;
			wx.request({
				url: 'http://127.0.0.1:8080/bamboo_chicken/api/active/receive',
				method: 'POST',
				header: {
					'Content-Type': 'application/json', 
					'token': `${token}`  
				},
				data:{
					id: id,  // 活动ID
					consignee: recipientName,  
					address: recipientAddress, 
					phone:  recipientPhone,  
					remark: recipientNote  
				},  
			success: (response) =>{
				if (response.data.code === 200) {
					wx.showToast({
						title: '领取成功!',
						icon: 'success',
						duration: 2000
					});
						 //清空       
					this.setData({
							recipientName: '',
							recipientPhone: '',
							recipientAddress: '',
							recipientNote: '',
						});
				} 
				else{
					wx.showToast({
						title: '领取失败: ' + (response.data.msg || '未知错误'),
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (error) =>{
				console.error('请求失败:', error);
				wx.showToast({
					title: '网络错误，请重试',
					icon: 'none',
					duration: 2000
				});
			}
			})
		 }
	},

   
	handleChildSubmit(event) {
		this.setData({isVisible: false });
						const { 	recipientName1,recipientPhone1,recipientAddress1,recipientNote1 } = event.detail;
						
						// 接收数据
						console.log('Received data from child:', {
							recipientName1,
							recipientPhone1,
							recipientAddress1,
							recipientNote1		
						});
						this.setData({
							recipientName:recipientName1,
							recipientPhone:recipientPhone1,
							recipientAddress:recipientAddress1,
							recipientNote:recipientNote1			
				});
					},
		// co(){
		// 	const { recipientName, recipientPhone, recipientAddress, recipientNote } = this.data;
    
		// 	console.log(recipientName, recipientPhone, recipientAddress, recipientNote);
		// }
			

});
