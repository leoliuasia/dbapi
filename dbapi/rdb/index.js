var r = require('rethinkdb');

r.connect({db: 'wow', host: 'localhost', port: 28015}, (err, conn) => {

  if (err != null) {
    throw err;
  } else {
    console.log("rethinkdb connect success. now initialize db.");
    exports.conn = conn;

    r.dbList().run(conn, (err, dblist) => {

      if (dblist.indexOf('wow') == -1) {
        // create db.
        r.dbCreate('wow').run(conn, (err, result) => {
          if (err) throw err;
          conn.use('wow');
        });
      }

      r.db('wow').tableList().run(conn, (err, result)=>{
        // create tables
        var tables = ['logs'];
        tables.forEach((table)=> {
          if (result.indexOf(table) == -1) {
            r.db('wow').tableCreate(table).run(conn, (err, result) => {
              if (err) throw err;
            })
          }
        });
      });

      // create indexes for logs
      r.db('wow').table('logs').indexList().run(conn, (err, result) => {
        var indexes = ['userid', 'addtime'];
        indexes.forEach((index)=> {
          if (result.indexOf(index) == -1) {
            r.db('wow').table('logs').indexCreate(index).run(conn, (err, result)=>{
              if (err) console.log(err);
            });
          }
        });
      });
    });
  }
});

exports.r = r;
