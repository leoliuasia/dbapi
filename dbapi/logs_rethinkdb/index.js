
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
    addtime: new Date()
  }).run(rdb.conn, (err, result)=>{
    if (err) callback(err.msg);
    else callback(null);
  });
};

exports.getlogs = (pageIndex, pageCount, userid, callback) => {
  if (rdb.conn == null) {
    callback("rdb.conn is null");
    return;
  }

  var q = rdb.r.table('logs').orderBy({index: rdb.r.desc('addtime')});
  if (userid != null && userid != '') q = q.filter({userid: userid});
//  q = q.eqJoin('userid', rdb.r.table('users'));
//  q = q.without({right: ["id",'pwd','lastip','lasttime','role','status','regtime']});
//  q = q.zip();

  var qcount = q.count();
  qcount.run(rdb.conn, (err, count) => {
    if (err) callback(err.msg);
    else {
      if (count == 0) {
        callback(null, {total: 0, pageIndex: pageIndex, pageCount: pageCount, logs:[]});
      } else {
        var sliceStart = (pageIndex - 1) * pageCount;
        q = q.slice(sliceStart, sliceStart + pageCount);

        q.run(rdb.conn, (err, cursor)=>{
          if (err) callback(err.msg);
          else {
            cursor.toArray(function(err, result) {
              if (err) callback(err.msg);
              else {
                var data = {
                  total: count,
                  pageIndex: pageIndex,
                  pageCount: pageCount
                };
                data.logs = result;
                var ps = [];
                data.logs.forEach((log)=>{
                  ps.push(rdb.r.table('users').get(log.userid).run(rdb.conn)
                    .then((u)=>{log.usname = u.usname;
                        log.nickname = u.nickname;})
                    .catch((err)=>{log.usname='';log.nickname='';}));
                });

                Promise.all(ps).then(()=>{callback(null, data);}, (err)=>{callback(err);});
              }
            });
          }
        });
      }
    }
  });
};
