const express = require('express');
//const router = express.Router();
const mysql = require('mysql2');


const db = mysql.createConnection({
  host: '80.211.42.157',
  user: 'webuser',
  password: 'Guadalajara73$',
  database: 'cobranzadbdev'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('============================================'); 
  console.log('=== Servidor MySQL connected...          ==='); 
  console.log('============================================');   
});


/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Devuelve los datos del usuario basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *               example:
 *                 id: 1
 *                 nombre: "Juan Pérez"
 *                 email: "juan@example.com"
 *       404:
 *         description: Usuario no encontrado
 */
/*router.get('/cliente/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para obtener el usuario por ID
  res.status(200).json({ id: userId, nombre: "Juan Pérez", email: "juan@example.com" });
});
*/
/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     description: Este endpoint crea un nuevo usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *               example:
 *                 id: 1
 *                 nombre: "Juan Pérez"
 *                 email: "juan@example.com"
 *       400:
 *         description: Error en la solicitud
 */
/*router.post('/clientes', (req, res) => {
  const { nombre, email } = req.body;
  // Lógica para crear un nuevo usuario
  res.status(201).json({ id: 1, nombre, email });
});
*/
module.exports = router;