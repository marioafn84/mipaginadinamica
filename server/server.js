import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
//console.log("Servidor actualizado");
console.log("Servidor iniciado correctamente");

app.use(cors());


app.use(express.json());

// CONEXIÓN MYSQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendainformatica'
});

conexion.connect((error) => {
    if(error){
        console.log('MySQL no conectado');
    } else {
        console.log('Conexión exitosa');
    }
});




// PROBAR CONEXIÓN
//conexion.connect((error) => {

  //  if(error){
    //    console.log('Error de conexión');
    //} else {
     //   console.log('Conexión exitosa a MySQLL');
    //}

//});

// CONSULTAR FABRICANTES
app.get('/fabricantes', (req, res) => {

    conexion.query('SELECT * FROM fabricantes', (error, resultado) => {

        if(error){
            res.send(error);
        } else {
            res.json(resultado);
        }

    });
    

});

//
// AGREGAR FABRICANTE

app.post('/fabricantes', (req, res) => {

    const { nombre, pais, fecha_fundacion } = req.body;

    const sql = `
        INSERT INTO fabricantes(nombre, pais, fecha_fundacion)
        VALUES (?, ?, ?)
    `;

    conexion.query(
        sql,
        [nombre, pais, fecha_fundacion],
        (error, resultado) => {

            if(error){
                res.send(error);
            } else {
                res.send('Fabricante agregado correctamente');
            }

        }
    );

});

// aqui termina agregar


//Agregamos el metodo eliminar
app.delete('/fabricantes/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM fabricantes WHERE idfabricante = ?';

    conexion.query(sql, [id], (error, resultado) => {

        if(error){
            res.send(error);
        } else {
            res.send('Fabricante eliminado');
        }
    });

});

//Termina el metodo eliminar

//aqui inicia el metodo modificar

// MODIFICAR FABRICANTE

app.put('/fabricantes/:id', (req, res) => {

    const id = req.params.id;

    const { nombre, pais, fecha_fundacion } = req.body;

    const sql = `
        UPDATE fabricantes
        SET nombre = ?,
            pais = ?,
            fecha_fundacion = ?
        WHERE idfabricante = ?
    `;

    conexion.query(
        sql,
        [nombre, pais, fecha_fundacion, id],
        (error, resultado) => {

            if(error){
                res.send(error);
            } else {
                res.send('Fabricante modificado');
            }

        }
    );

});

//aqui termina el metodo modificar

// CONSULTAR ARTICULOS

app.get('/articulos', (req, res) => {

    const sql = `
        SELECT articulos.idarticulo,
               articulos.nombre,
               articulos.precio,
                articulos.idfabricante,
               fabricantes.nombre AS fabricante
        FROM articulos
        INNER JOIN fabricantes
        ON articulos.idfabricante = fabricantes.idfabricante
    `;

    conexion.query(sql, (error, resultado) => {

        if(error){
            res.send(error);
        } else {
            res.json(resultado);
        }

    });

});



//aqui pegamos el codigo para el crud de articulos

// AGREGAR ARTICULO

app.post('/articulos', (req, res) => {

    const { nombre, precio, idfabricante } = req.body;

    const sql = `
        INSERT INTO articulos(nombre, precio, idfabricante)
        VALUES (?, ?, ?)
    `;

    conexion.query(
        sql,
        [nombre, precio, idfabricante],
        (error, resultado) => {

            if(error){
                res.send(error);
            } else {
                res.send('Artículo agregado');
            }

        }
    );

});


// ELIMINAR ARTICULO

app.delete('/articulos/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM articulos WHERE idarticulo = ?';

    conexion.query(sql, [id], (error, resultado) => {

        if(error){
            res.send(error);
        } else {
            res.send('Artículo eliminado');
        }

    });

});


// MODIFICAR ARTICULO

app.put('/articulos/:id', (req, res) => {

    const id = req.params.id;

    const { nombre, precio, idfabricante } = req.body;

    const sql = `
        UPDATE articulos
        SET nombre = ?,
            precio = ?,
            idfabricante = ?
        WHERE idarticulo = ?
    `;

    conexion.query(
        sql,
        [nombre, precio, idfabricante, id],
        (error, resultado) => {

            if(error){
                res.send(error);
            } else {
                res.send('Artículo modificado');
            }

        }
    );

});

//aqui termina el crud de articulos


// SERVIDOR
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});