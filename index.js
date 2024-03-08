require('dotenv').config();

const express = require('express');
const cors = require('cors')
const mysql = require('mysql2')



const app = express()

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection(process.env.DATABASE_URL)

// path / (main)
app.get('/', (req,res)=>{
    connection.query("SELECT * FROM food", function (err, results, fields){
        res.send(results)
    })
})

app.get('/menu', (req,res)=>{
    connection.query("SELECT * FROM menu", function(err, results, fields){
        res.send(results)
    })
})

app.post("/addmenu", function (req, res)  {
    connection.query(
      "INSERT INTO `menu`(`MenuId`, `MenuName`) VALUES (?, ?)",
      [req.body.MenuId, req.body.MenuName],
      function (err, results) {
        if (err) throw err;
        return res.send({
          err: false,
          data: results,
          message: "New menu has been created successfully.",
        });
      }
    );
  });


app.listen(process.env.PORT || 8000)