import axios from 'axios'
const baseConfig = require('./api/config.js')


axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create({
	baseURL: '', //api的base_url
	timeout: 5000,
	header: {
		'Content-Type': 'application/json'
	}
});

axios.interceptors.request.use = instance.interceptors.request.use

/**
 * axios拦截请求，在发送请求之前做些什么
 */
instance.interceptors.request.use(config => {
	//头信息添加token
	if(localStorage.getItem('token')) {
		config.headers.Authorization = `token ${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	//显示loading
	//....
	return config
}, err => {
	return Promise.reject(err)
})

/**
 * axios拦截响应
 */
instance.interceptors.response.use(response => {
	//对响应数据做点什么，允许在数据返回客户端前，修改影响的数据
	//如果只需要返回体中数据，可以直接 return response.data
	return response
}, err => {
	//对响应错误做点什么
	return Promise.reject(err)
})

/**
 * 封装axios的post请求
 */
export function fetch(url, params) {
	console.info("33333333333333333"+ JSON.stringify(params))
	return new Promise((resolve, reject) => {
		axios.post(url, params)
		.then(response => {
			resolve(response.data)
		})
		.catch((error) => {
			reject(error)
		})
	})
}

export default {
	ldapAuth(data) {
		// return instance.post('http://localhost:8000/ldapAuth', data)
		return instance.post(baseConfig.baseURL + ':' + baseConfig.basePort + '/ldapAuth', data)
	},
	// // 用户注册
	// userRegister(data) {
	// 	return instance.post('/api/register', data)
	// },
	// 用户登录
	userLogin(data) {
		return fetch('/api/login', data)
	},
	// 获取用户
	getUser() {
		return instance.get('/api/user')
	},
	// // 删除用户
	// delUser(data) {
	// 	return instance.post('/api/delUser', data)
	// },

	mockData(params) {
		console.info("22222222222"+ JSON.stringify(params))
		return fetch('/api/login', params)
	},

	automation_delete(data) {
		return instance.post(baseConfig.baseURL + ':' + baseConfig.basePort + '/automation_server', data)
	},
	automation_axios(data) {
		console.info("22222222222"+ JSON.stringify(data))

		return fetch('/api/login', data)
	},


}
