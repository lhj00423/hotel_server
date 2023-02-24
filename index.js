const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

//서버생성
const app =  express();
//프로세서의 주소 포트번호 지정 
const port = 8080;
//브라우저의 코스 이슈를 막기 위해 사용
app.use(cors());
//josn 형식의 데이터를 처리하도록 설정
app.use(express.json());


//mysql 연결하기 
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: "3306",
    database: "sample" 
})
//선연결하기 
conn.connect();
//conn.query(쿼리문, 콜백함수) 
//get요청 
app.get("/members",(req,res)=>{
    conn.query("select * from member" , function(error,result,fields){
         res.send(result);
    })
   
})
app.get("/members/:id",(req,res)=>{
    const {id} = req.params;
    conn.query(`select * from member where m_no = ${id}` , function(error,result,fields){
        res.send(result);
   })
})

//서버를 구동 
app.listen(port,()=>{
    console.log("서버가 동작하고 있습니다.");
})