
Page({
	data: {
		login:false,
    nickName: '',
    avatarUrl: '../../images/common/touxiang.png' 
  },
	// onShareAppMessage 生命周期函数，用于自定义小程序分享能力
onShareAppMessage(obj) {
	return {
		title: '我的', // 分享的标题
		path: '/pages/tab4/tab4', // 分享页面的路径
		imageUrl: "/images/common/wode.png" // 分享的图片地址
	};
},

// 监听右上角分享到朋友圈按钮
onShareTimeline() {
  return {
    title: '我的', // 分享到朋友圈的标题
    query: 'id=1', // 分享的查询参数
    imageUrl: "/images/common/wode.png"// 分享的图片地址
  };
},

onLoad: function () {
	const userInfo = wx.getStorageSync('userInfo');
	const nickName = userInfo.nickName;
	const avatarUrl = userInfo.avatarUrl;   
	this.setData({
					avatarUrl: avatarUrl,
					nickName: nickName
	});
},
onShow:function(){
	const userInfo = wx.getStorageSync('userInfo');
	const nickName = userInfo.nickName;
	const avatarUrl = userInfo.avatarUrl;       
	this.setData({
					avatarUrl: avatarUrl,
					nickName: nickName
	});
},
	//退出登录
	leave() {
		wx.removeStorageSync('token'); 
			this.setData({
				login:false,
				nickName: '',
				avatarUrl: '../../images/common/touxiang.png' 
			})
			const app = getApp();
      app.globalData.Login = false;
	},


	/**
	 * 关闭/打开弹框
	 */
  login() {
    // 获取微信登录凭证（code）
    wx.login({
      success: (res) => {
        if (res.code) {
					this.sendLoginRequest(res.code)			
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          })
          console.error('wx.login 调用失败：' + res.errMsg)
        }
      },
      fail: (error) => {
        wx.hideLoading()
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        })
        console.error('wx.login 调用失败', error)
      }
    })
  },

  sendLoginRequest(code) {
    // 发送POST请求到后端
    wx.request({
      url: 'http://127.0.0.1:8080/bamboo_chicken/api/user/login', 
      method: 'POST',
      data: {
        code
			},			    
    header: {
	    'Content-Type': 'application/json'
    },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code === 200) { 
          // 登录成功，可以保存用户信息等
          //wx.setStorageSync('userInfo', { nickName, avatarUrl })
					wx.setStorageSync('token', res.data.data.token) 
					if(!wx.getStorageSync('id')){
						wx.setStorageSync('id', res.data.data.id);
					  wx.setStorageSync('openid', res.data.data.openid);
					}
          wx.showToast({
            title: '登录成功',
            icon: 'success'
					})
					this.setData({
            login:true
					})
					const app = getApp();
					app.globalData.Login = true;
					this.getUserInfo()
        } else {
          wx.showToast({
            title: res.data.message || '登录失败',
            icon: 'none'
          })
        }
      },
      fail: (error) => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        })
        console.error('Login error:', error)
      }
    })
	},


	getUserInfo() {
		const token = wx.getStorageSync('token'); 
		wx.request({
			 url: 'http://127.0.0.1:8080/bamboo_chicken/api/user/getUserInfo',  // 确保URL正确
			 method: 'GET',
			 header: {
					 'Content-Type': 'application/json',
					 'token': `${token}`  // 使用Bearer token进行授权
			 },
			 success: (res) => {
					 if (res.data.code === 200) {
							 const userInfo = {
								 nickName: res.data.data.nickName,
								 avatarUrl: res.data.data.avatarUrl || '../../images/chicken/1.jpg'  // 如果没有头像URL，使用默认头像
							 };
							 wx.setStorageSync('userInfo', userInfo);
							 this.setData({
								  avatarUrl: userInfo.avatarUrl,
									nickName: userInfo.nickName
							 });
						} else {
							 console.error('获取用户信息失败:', res.data.msg);
							 wx.showToast({
									title: '获取用户信息失败',
									icon: 'none'
							 });
						}
			 },
			 fail: (err) => {
					 console.error('请求失败:', err);
					 wx.showToast({
							title: '网络错误，请稍后重试',
							icon: 'none'
					 });
			 }
		});
	},


	go1(){
		wx.navigateTo({
			url: "/pages/change-message/change-message",
		})
	},
	go2(){
		wx.navigateTo({
			url: "/pages/get-order/get-order",
		})
	},
	go3(){
		wx.navigateTo({
			url: "",
		})
	},
	go4(){
		wx.navigateTo({
			url: "",
		})
	},

})



