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
/*========================================0 */
// ListarClientes
app.post('/clientes', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarClientes(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
//Obtener cliente por Id
app.post('/cliente', (req, res) => {
  const {id } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spObtenerCliente(?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
//Agregar cliente
app.post('/addcliente', (req, res) => {
  const {nombre,rfc,domicilio,tipo} = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere nombre,rfc, domicilio y tipo' });  }
  // Llama al procedimiento almacenado
  const query = 'CALL spInsertarCliente(?,?,?,?)';
  db.query(query, [nombre,rfc,domicilio,tipo], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }     
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
//Actualizar cliente 
app.post('/updcliente', (req, res) => {
  const {id,nombre,rfc,domicilio,tipo} = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spActualzarCliente(?,?,?,?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
// Domicilios
app.post('/domicilios', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarDomicilios(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});


/*========================================*/

// Metodos 
app.post('/distritos', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarDistritos(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});

// Conductores
app.post('/conductores', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarConductores(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
// Empleados por pagina 
app.post('/empleadosxpag', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarEmpleadosxpag(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
app.post('/empleados', (req, res) => {   
    // Llama al procedimiento almacenado
    const query = 'CALL splistarempleados';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar el procedimiento almacenado:', err);
            return res.status(500).json({ error: 'Error en la consulta' });
        }
  
        // Devuelve los resultados en formato JSON
        res.json(results[0]); // Los resultados están en la primera posición del array
    });
  });
// Estados
app.post('/estados', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarEstados(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
// Sucursales
app.post('/sucursales', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarSucursales(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
// Tarifa
app.post('/tarifa', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarTarifas(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
// Tipos Viaje
app.post('/tiposviaje', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarTiposviaje(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
// Viajes
app.post('/viajes', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarViajes(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});
// Vehiculos
app.post('/vehiculos', (req, res) => {
  const { pagina, limite } = req.body;
  // Valida los parámetros
  if (!pagina || !limite) {
      return res.status(400).json({ error: 'Se requiere "pagina" y "limite"' });  }

  // Llama al procedimiento almacenado
  const query = 'CALL spListarVehiculos(?, ?)';
  db.query(query, [pagina, limite], (err, results) => {
      if (err) {
          console.error('Error al ejecutar el procedimiento almacenado:', err);
          return res.status(500).json({ error: 'Error en la consulta' });
      }

      // Devuelve los resultados en formato JSON
      res.json(results[0]); // Los resultados están en la primera posición del array
  });
});

app.listen(4001, () => {
  console.log('==============================================');
  console.log("=== Servidor escucha por el puerto 4001    ===");
});  
