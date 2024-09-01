const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
//const mssql = require('mssql')

const app = express();
app.use(express.json()); // Middleware para parsear JSON

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar CORS
app.use(cors({
  origin:'*', // Cambia esto a la URL de tu frontend si está en producción
  optionsSuccessStatus: 200
}));

/********************/
// Configuración de MySQL
const db = mysql.createConnection({
  host: '80.211.42.157',
  user: 'webuser',
  password: 'Guadalajara73$',
  database: 'transportesdev'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('============================================');
  console.log('=== Servidor MySQL connected...          ===');
  console.log('============================================');
});



// metodos  GET ,POST, PUT , DELETE
app.get('/distritos',(req,res)=>{
  const { pagina = 1, limite = 1} = req.query;
  const offset = (pagina - 1) * limite;
  //let sql ='SELECT * from Distritos';}
  const sql = `SELECT * FROM Distritos LIMIT ${limite} OFFSET ${offset}`;
  db.query(sql,(err,results)=>{
    if (err){
      res.status(500).send(err);
           } else{
      res.json(results);
    }
  });
});
/* estados */
app.get('/estados', (req, res) => {
  let sql = 'CALL spListarestados()';
  db.query(sql,(err,results)=> {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
});
});
/* 
clientes 
*/
app.get('/clientes', (resq, res) => {
  let clientes = [];
  let clienteAct = null;
  let sql = 'CALL splistaclientes()';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      results[0].forEach(row => {
        // Si es un nuevo cliente 
        if (!clienteAct || clienteAct.cteID !== row.cteID) {
          if (clienteAct) {
            clientes.push(clienteAct);
          }
          //
          clienteAct = {
            cteID: row.cteID,
            ctedomid: row.cteDomId,
            ctenombre: row.cteNombre,
            ctecorreo: row.cteCorreoElectronico,
            ctetelefono: row.cteTelefono,
            gerente: [],
            ejecutivo: [],
            grupo: [],
            asesor: [],
            supervisor: [],
            domicilios: [],
          };
        }
        clienteAct.domicilios.push({
          domid: row.DomId,
          domcalle: row.DomCalle,
          domcolonia: row.DomColonia,
          domcpostal: row.DomCpostal,
          domciudad: row.DomCiudad,
        });
           // ejecutivo
           if (clienteAct.ejecutivo.length == 0) {
            clienteAct.ejecutivo.push({
              ejeid: row.cteEjeId,
              ejenombre: row.ejeNombre,
              ejecorreo: row.ejeCorreo,
              ejetelefono: row.ejeTelefono,
            });
          }
        if (clienteAct.gerente.length == 0) {
          clienteAct.gerente.push({
            gerid: row.cteGerId,
            gernombre: row.gerNombre,
            gercorreo: row.gerCorreo,
            gertelefono: row.gerTelefono,

          });
        }
         // grupo
         if (clienteAct.grupo.length == 0) {
          clienteAct.grupo.push({
            gpoid: row.cteGpoId,
            gponombre: row.gpoNombre,             
            gpoestatus: row.gpoEstatus,
          });
        }
         // asesor
         if (clienteAct.asesor.length == 0) {
          clienteAct.asesor.push({
            aseid: row.cteAseId,
            asenombre: row.aseNombre,
            asetelefono: row.aseTelefono,
            asecorreo: row.aseCorreo,
            aseestatus: row.aseEstatus,
          });
        }
        // supervisor
        if (clienteAct.supervisor.length == 0) {
          clienteAct.supervisor.push({
            supid: row.cteSupId,
            supnombre: row.supNombre,
            suptelefono: row.supTelefono,
            supCorreo: row.supCorreo,
            supestatus: row.supEstatus,
          });
        }
     

      });



      // 
      if (clienteAct) {
        clientes.push(clienteAct);
      }

      res.json(clientes);
    }
  });
});
// domiiclios
app.get('/domicilios', (req, res) => {
  let sql = 'CALL splistardomicilios()';
  db.query(sql,(err,results)=> {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
});
});

app.listen(4001, () => {
  console.log('==============================================');
  console.log("=== Servidor escucha por el puerto 4001    ===");
});  
