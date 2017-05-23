var db = require('./dbapi'); // 后台数据库相关api

// 添加管理员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.addAdmin('admin2', '昵称2', 'e10adc3949ba59abbe56e057f20f883e', (err)=> {
  if (err) { console.log(err.error); return; };
  console.log('======= add Admin success.');
});

// 添加团长
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.addTZ('tz2', '团长2', 'e10adc3949ba59abbe56e057f20f883e', (err)=> {
  if (err) { console.log(err.error); return; };
  console.log('======= add 团长 success.');
});

// 添加团员
// 1： 用户登录名，2：昵称，3：密码（经过md5运算），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.addTY('ty2', '团员3', 'e10adc3949ba59abbe56e057f20f883e', (err)=> {
  if (err) { console.log(err.error); return; };
  console.log('======= add 团员 success.');
});

db.users.all_users(1, 20, (err, users) => {
  if (err) { console.log(err.error); return; };
  console.log(users);
});

db.users.single_user(1, (err, user) => {
  if (err) { console.log("single_user: " + err.error); return; };
  console.log(user);
});

// 修改用户
// 1：用户id，2：昵称，3：密码（为null不修改），4：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.updateUser(4, '昵称3', null, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('======= edit success');
});

// 查询所有用户
// 1：页号，从1开始，2：每页记录条数，3：回调，err如果成功为null，否则表示失败。属性error表示错误描述。users对应的用户信息
db.users.all_users(1, 20, (err, users) => {
  if (err) { console.log(err.error); return; };
  console.log(users);
});

// 删除用户
// 1：用户id，2：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.delUser(4, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('======= del success');
});

db.users.all_users(1, 20, (err, users) => {
  if (err) { console.log(err.error); return; };
  console.log(users);
});

// 更新用户状态
// 1：用户id，2：status值，3：回调，err如果成功为null，否则表示失败。属性error表示错误描述。
db.users.changeUserStatus(3, 0, (err) => {
  if (err) { console.log(err.error); return; };
  console.log('======= changed');
});

// 查询所有用户
db.users.all_users(1, 10, (err, users) => {
  if (err) { console.log(err.error); return; };
  console.log(users);
});

// 查询所有游戏
db.games.all_games((err, games) => {
  if (err) { console.log(err.error); return; };

  console.log(games);
});
