
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
    console.log('=== Clientes                             ===');
    console.log('============================================');
  });
  