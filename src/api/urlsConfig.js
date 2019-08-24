
var debug = true;
//var debug = false;

var DEV = {
  isDebug:debug,
  /******************************图片start***************************************************/
  png:'/static/js/aaa.png',
  /******************************图片end***************************************************/
  //删除
  deleteAAA: contextPath + '/api/modules/login/login.json',
  //编辑
  editAAA: contextPath + '/api/modules/login/login.json',
 

};
var RELEASE = {
  isDebug:debug,
  /******************************图片start***************************************************/
  png:'/static/js/aaa.png',
  /******************************图片end***************************************************/
  //删除
  deleteAAA: contextPath + 'api/bbb.do',
  //编辑
  editAAA: contextPath + 'api/net/aaa.do',
};

var URL = debug ? DEV : RELEASE;

export {
  URL
}
