import components from '@/demo/locale/zh_CN/components';
import route from './route';

export default {
	route,
	components,
	toolbar: {
		appname: '我的應用程式',
		settings: '設定',
		profile: '資料',
		logout: '退出'
	},
	settings: {
		title: '主題設定',
		default: '設為預設',
		version: '版本',
		position: '元素位置',
		theme: '主題',
		dark: '黑色主题',
		toolbarDense: '緊湊工具列',
		navbarDense: '緊湊導航欄',
		navbarLogo: '導航欄Logo',
		settingsBtn: '設定按鈕',
		footer: '頁腳'
	},
	login: {
		titleIn: '登入',
		titleUn: '註冊',
		signIn: '登入',
		signUp: '註冊',
		email: 'Email',
		account: '帳號',
		password: '密碼',
		confirm: '確認'
	},
	errors: {
		whoops: '哎呀 糟糕！',
		back: '帶我離開這裡',
		301: '頁面位置已經被移動了',
		401: '沒有權限觀看',
		403: '禁止進入',
		404: '找不到頁面',
		500: '伺服器錯誤'
	},
	guide: {
		description: '引导页对于第一次进入项目的人来说是很有用的. 你可以简单的介绍一下项目的特性. Demo是基于',
		button: '顯示引導訊息'
	},
	ui: {
		switch: '切換語言',
		theme: '切換主題',
		success: '成功',
		error: '錯誤',
		warning: '警告',
		info: '提示',
		primary: '主要',
		secondary: '次要',
		default: '預設',
		accent: '強調',
		firstName: '名',
		lastName: '姓',
		email: 'E-mail'
	}
};
