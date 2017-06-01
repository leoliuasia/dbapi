
var rdb = require('../rdb');

exports.addlog = (type, userid, content, ip, callback) => {

  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  rdb.r.table('logs').insert({
    type: type,
    userid: userid,
    content: content,
    ip: ip,
    addtime: new Date().toLocaleString()
  }).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else callback(null);
  });
};

exports.getlogs = (pageIndex, pageCount, userid, callback) => {
    var q = rdb.r.table('logs').orderBy({index: rdb.r.desc('addtime')});
    if (userid > 0) q = q.filter({userid: userid});

    var sliceStart = (pageIndex - 1) * pageCount;
    q = q.slice(sliceStart, sliceStart + pageCount);

    q.run(rdb.conn, (err, cursor)=>{
      //console.log(err);
      if (err) callback(err.msg);
      else {
        cursor.toArray(function(err, result) {
          if (err) callback(err.msg);
          else {
            var data = {
              total: result.length,
              pageIndex: pageIndex,
              pageCount: pageCount
            };
            data.logs = result;
            callback(null, data);
          }
        });
      }
    });
};
