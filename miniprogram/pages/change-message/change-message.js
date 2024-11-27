Page({
	
  data: {
    avatarUrl: '',
    nickName: ''
  },

  onLoad: function () {
    // 从本地 storage 获取用户信息
    const avatarUrl = wx.getStorageSync('avatarUrl') ; // 默认头像
		const nickName = wx.getStorageSync('nickName') ; // 默认昵称      
    this.setData({
            avatarUrl: avatarUrl,
            nickName: nickName
    });
	},
	  // 选择头像的处理函数
		onChooseAvatar: function (event) {
			const { avatarUrl } = event.detail; // 获取选择的头像 URL
			this.setData({
				avatarUrl: avatarUrl // 更新数据
			});
		},
	
		// 输入昵称的处理函数
		onInputNickName: function (event) {
			this.setData({
				nickName: event.detail.value // 更新昵称数据
			});
		},
	
		// 保存按钮的处理函数
		remain: function () {
			const { avatarUrl, nickName } = this.data;
			const token = wx.getStorageSync('token');
	
			if (!avatarUrl) {
				wx.showToast({
					title: '请先选择头像',
					icon: 'none'
				});
				return; // 如果没有选择头像，则返回
			}
	
			if (!nickName) {
				wx.showToast({
					title: '昵称不能为空',
					icon: 'none'
				});
				return; // 如果昵称为空，则返回
			}
	
			// 假设你要保存到服务器
			wx.request({
				url: 'http://127.0.0.1:8080/bamboo_chicken/api/user/update', 
				method: 'POST',
				data: {
						avatarUrl,
						nickName
				},
				header: {
					'Content-Type': 'application/json' ,
					'token': `${token}`   
				},
				success: (res) => {
						// 检查后端返回的状态码
						if (res.data.code === 200) {
								
								this.setData({
										avatarUrl: avatarUrl, // 使用传入avatarUrl
										nickName: nickName    // 使用传入的nickName
								});
								wx.showToast({
										title: '保存成功',
										icon: 'success'
								});
								wx.setStorageSync('userInfo', {
									nickName: nickName, 
									avatarUrl: avatarUrl 
								});
								//跳转我的页面
							this.go1()	
						} else {
								
								wx.showToast({
										title: '保存失败，请重试',
										icon: 'none'
								});
						}
				},
				fail: () => {
						wx.showToast({
								title: '请求失败，请检查网络',
								icon: 'none'
						});
				}
		});		
		},
  
		go1: function() {
			setTimeout(() => {
				wx.navigateBack({
				})
			}, 1000); 
		}
 
});
