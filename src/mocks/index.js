import Mock from 'mockjs'
import { get } from '../api/apiroutes';
import login from './login/login'

const Random = Mock.Random //Mork.Random 是一个工具类，用于生成各种随机数据


//login
const loginData1 = function() {
    let data = [];
    let newArticleObject = {
        info: true,
        success: true,
        token: '123456789',
        username: 'Nicole'
    }
    data.push(newArticleObject);
    return {
        data: data
    }
}

const loginData = function() {
    let data = {
        info: true,
        success: true,
        token: '123456789',
        username: 'Nicole'
    }
    return {
        data: data
    }
}

// Mock.mock(url, post/get, 返回的数据);
// Mock.mock('/api/login', 'post', loginData)

Mock.mock('/api/login', 'post', login.getLoginInfo());

export default Mock;