//true is server env, false is local env
var env = false;

var baseURL = '';
var basePort = '';
var baseHost = '';
if(env) {
    baseURL = 'http://hk1235464.hc.com';
    basePort = '8000'
    baseHost = '132.123.123.21'   
} else {
    baseURL = 'http://localhost';
    basePort = '8000'
    baseHost = '127.0.0.1' 
}

const ldapURL = 'ldaps://glue.systems.hk.abcd:3269'

module.exports.baseURL = baseURL;
module.exports.baseHost = baseHost;
module.exports.basePort = basePort;
// export default {
//     ldapURL:  'ldaps://glue.systems.hk.abcd:3269'
// }