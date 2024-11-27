Component({
	properties: {
			isVisible: {
					type: Boolean,
					value: false
			}
	},
	data: {
		  isVisible: false,
			recipientName1: '',
			recipientPhone1: '',
			recipientAddress1: '',
			recipientNote1: ''
	},
	methods: {
			inputName(event) {
					this.setData({
							recipientName1: event.detail.value
					});
			},
			inputPhone(event) {
					this.setData({
							recipientPhone1: event.detail.value
					});
			},
			inputAddress(event) {
					this.setData({
							recipientAddress1: event.detail.value
					});
			},
			inputNote(event) {
					this.setData({
							recipientNote1: event.detail.value
					});
			},
			//确认和取消
			handleSubmit() {
								const { recipientName1, recipientPhone1, recipientAddress1, recipientNote1,isVisible } = this.data;
								
								// 检查输入是否有效（可选）
								if(!recipientName1 || !recipientPhone1 ||!recipientAddress1){
									wx.showToast({
												title: '请填写所有必填项',
												icon: 'none'
										});
										return;
								}
				        this.setData({ isVisible: false });
								// 触发自定义事件，将数据传递给父组件
								this.triggerEvent('submit', {
										recipientName1,
										recipientPhone1,
										recipientAddress1,
										recipientNote1,
								});
								this.setData({
									recipientName1: '',
									recipientPhone1: '',
									recipientAddress1: '',
									recipientNote1: ''
							});

					},
		handleClose() {
							this.setData({ 
								isVisible: false ,
								recipientName1: '',
								recipientPhone1: '',
								recipientAddress1: '',
								recipientNote1: ''
						});
					}
		
  }
});
