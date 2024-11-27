// pages/tab1/tab1.js
Page({
	data: {
		login:false,
    nickName: '',
    avatarUrl: '' 
	},
	onLoad: function () {
		const userInfo = wx.getStorageSync('userInfo');
		const nickName = userInfo.nickName;
		const avatarUrl = userInfo.avatarUrl;   
		const app = getApp();  
		this.setData({
						avatarUrl: avatarUrl,
						nickName: nickName,
						login:app.globalData.Login
		});

	},

	onShow:function(){
		const userInfo = wx.getStorageSync('userInfo');
		const nickName = userInfo.nickName;
		const avatarUrl = userInfo.avatarUrl;   
		const app = getApp();      
		this.setData({
						avatarUrl: avatarUrl,
						nickName: nickName,
						login:app.globalData.Login
		});
	},

	enter1(){
		wx.navigateTo({
			url: "/pages/index1/index1",
		})
	},
	enter2(){
		wx.navigateTo({
			url: "/pages/index2/index2",
		})
	},
	enter3(){
		wx.navigateTo({
			url: "/pages/index3/index3",
		})
	},
	go1(){
		wx.navigateTo({
			url: "",
		})
	},
	go2(){
		wx.navigateTo({
			url: "",
		})
	},
	go3(){
		wx.navigateTo({
			url: "",
		})
	},
	go4(){
		wx.navigateTo({
			url: "/pages/my-activity/my-activity",
		})
	},
})