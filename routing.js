const http = require('http');
const mysql=require('mysql');
const fs = require('fs');
const qs = require('querystring');

var con = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "hackathon"
    });

const requestListener = function (req, res) {
    const {headers, method, url} = req;
    let body = '';
    req.on('data', function(chunk) {body+=chunk;}).on('end', function(){var post = qs.parse(body);});
    res.setHeader('username','-');
    res.setHeader('password','-');
    res.setHeader('user-type','-');
    res.setHeader('new-account','-');
    res.setHeader('type','-');
    res.setHeader('content','-');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    //console.log(headers);

    if(headers['content']===',,,')
    {
        let body = [];
        con.connect(function(err){
            if(err)throw err;
            con.query('SELECT * FROM hackathon.case', function(err, result){
                body.push(result);
            });
            res.write(JSON.stringify(body));
        })
    }
    if(method==='POST')
    {
        //console.log(headers);
        if(headers['user-type']==='patient')
        {
            if(headers['new-account']==='1')
            {   
                //register for patient account
                
                //console.log(headers['username'],headers['password']);
                var sql2 = `SELECT MAX(patient_id) FROM patient`;
                var sql3 = `INSERT INTO patient(patient_id) VALUES (0)`;

                con.connect(function(err){
                    if(err)throw err;
                    
                    let patId;
                    con.query(sql3,function(err, result)
                    {
                        if(err) throw err;
                        //console.log(result);   
                    });
                    function getMaxPat(){
                    con.query(sql2,function(err,result){
                        if(err) throw err;
                        patId=result[0]['MAX(patient_id)'];
                    });}
                    setTimeout(getMaxPat,1000);
                    function insertPatient(){
                    var sql = `INSERT INTO account(account_id,patient_id,doctor_id,user_name,password) VALUES (0,${patId},NULL,'${headers['username']}','${headers['password']}')`;
                    con.query(sql, function(err,result){
                        if(err) throw err;
                        //console.log(result);
                    });}
                    setTimeout(insertPatient,2000);

                });
            }
            else
            {
                //patient case
                //add case to case table and send all cases to txt file
                var sql = 'SELECT * FROM case';
                if(headers['type']!=='login')
                {
                    //console.log("hello");
                }
            }
        }
        else if(headers['user-type']==='doctor')
        {
            //console.log("doctor req");
            if(headers['new-account']==='1')
            {
                //console.log("Request of type POST and user-type doctor");
                
                var sql2 = `SELECT MAX(doctor_id) FROM doctor`;
                var sql3 = `INSERT INTO doctor(doctor_id) VALUES (0)`;
                //add new doctor account
                con.connect(function(err){
                    con.query(sql3, function(err, result){
                        if(err)throw err;
                        //console.log(result);
                    });
                    
                    let docid;
                    function getDocId()
                    {
                        con.query(sql2, function(err, result){
                            if(err)throw err;
                            docid=(result[0]['MAX(doctor_id)']);
                            //console.log(docid);
                        });
                    }
                    setTimeout(getDocId,2000);
                    
                    function updateAccounts(){
                        var sql = `INSERT INTO account(account_id,patient_id,doctor_id,user_name,password) VALUES (0,NULL,${docid},'${headers['username']}','${headers['password']}')`;
                        con.query(sql,function(err, result){
                            if(err)throw err;
                            //console.log(result);
                        });
                    }
                    setTimeout(updateAccounts,3000);
                });
            }
            else
            {
                //post solution to case object
                var sql = `SELECT doctor_id FROM account WHERE ${header['username']}=account.username`;
                casenum = headers['content'];
                mysql.createQuery(`UPDATE Case SET doctor_id=${docid},solution=${body} WHERE ${caseid}=case_id`)
            }
        }  
    }
    else if(method==='GET')
    {
        if(headers['type']==='login')
            {
                //login to patient account if username and pass are correct
                
                var sql = `SELECT * FROM account WHERE '${headers['username']}'=user_name AND '${headers['password']}'=password`;
                
                con.connect(function(err){
                    var exists;
                    function login(){
                    con.query(sql,function(err,result){
                        if(err)throw err;
                        exists = result;
                    });}
                    setTimeout(login,2000);
                    if(exists!==[])
                    {
                        console.log("Success");
                        res.writeHead(200);
                    }
                    else{res.writeHead(404);}
                });
            }

        else if(headers['type']==='solve')
            {
                var sql = `SELECT * FROM hackathon.case WHERE doctor_id=NULL`;
            }
            else if(headers['type']==='referral')
            {
                var sql = `SELECT * FROM doctor`;
                var docs = '';
                con.connect(function(err){
                    if(err)throw err;
                    con.query('SELECT * FROM doctor', function(err,result){
                    docs+=result;
                    })
                })
                res.write(docs);
            }
    }
    //console.log(body);
  res.writeHead(200);
  res.end(JSON.stringify(body));
}

const server = http.createServer(requestListener);
server.listen(8080);