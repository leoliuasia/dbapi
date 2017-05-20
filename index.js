// var r = require('rethinkdb');
//
// var connection = null;
// r.connect({host: 'localhost', port: 28015}, (err, conn) => {
//   if (err) throw err;
//   connection = conn;
//
//   // r.db('test').table('tv_shows').filter(r.row('episodes').gt(17)).run(connection, (err, result) => {
//   //   if (err) throw err;
//   //   console.log(result);
//   // });
//
//   r.db('test').tableCreate('authors').run(connection, (err, result)=>{
//     if (err) throw err;
//
//     console.log(JSON.stringify(result, null, 2));
//   });
//
// });

var dbapi = require('./dbapi'); // 后台数据库相关api
var taskapi = dbapi.tasks_api;  // 任务相关api
var userapi = dbapi.users_api;  // 用户相关api


console.log(taskapi.tasks); // 取得所有任务数据
taskapi.addTask({id:3, name: 'task 3'}); // 添加一个新任务
console.log(taskapi.tasks);

console.log(userapi.users); // 取得所有用户数据
userapi.addUser({id: 1, name: "leo", role: "admin"}); // 添加一个新用户
console.log(userapi.users);

/*

  待实现：修改，删除，等接口。

*/
