var r = require('rethinkdb');
var rconf = require('../config');

r.connect({db: rconf.db, host: rconf.host, port: rconf.port}, (err, conn) => {

  if (err != null) {
    throw err;
  } else {
    console.log("rethinkdb connect success. now initialize db.");
    exports.conn = conn;

    r.dbList().run(conn, (err, dblist) => {

      if (dblist.indexOf(rconf.db) == -1) {
        // create db.
        r.dbCreate(rconf.db).run(conn, (err, result) => {
          if (err) throw err;
          conn.use(rconf.db);
        });
      }

      r.tableList().run(conn, (err, result)=>{
        // create tables
        var tables = ['logs', 'users'];
        tables.forEach((table)=> {
          if (result.indexOf(table) == -1) {
            r.tableCreate(table).run(conn, (err, result) => {
              if (err) throw err;
            })
          }
        });
      });

      // create indexes for logs
      createIndex('logs', ['userid', 'addtime']);
      // create indexes for users
      createIndex('users', ['role', 'usname']);

    });
  }
});

function createIndex(table, indexes) {
  r.table(table).indexList().run(exports.conn, (err, result) => {
    indexes.forEach((index)=> {
      if (result.indexOf(index) == -1) {
        r.table(table).indexCreate(index).run(exports.conn, (err, result)=>{
          if (err) console.log(err);
        });
      }
    });
  });
}

exports.r = r;
