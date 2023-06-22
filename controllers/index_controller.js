const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'postgres',
    port: process.env.DB_PORT || '5433'
})

const path = require('path');



const getBooks = async (req, res) => {
    /*
    const response = await pool.query('SELECT * FROM libros')
    res.status(200).json(response.rows)
    */

    pool.connect();

    pool.query('SELECT * FROM libros', (err, result) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).send('Error en la consulta');
        } else {
            res.send(result.rows);
        }
        
    });
}

const getBookById = async (req, res) => {
    //res.send('Book ID: ' + req.params.id)
    const isbn = req.params.isbn
    const response = await pool.query('SELECT * FROM libros \
                WHERE isbn = $1'
        , [isbn])
    res.json(response.rows)
}

const createBook = async (req, res) => {
    //console.log(req.body)
    //const titulo = req.body.titulo
    const { titulo, autor, editorial,
        genero, fechaDeLanzamiento, precio } = req.body;

    const response = await pool.query(
        'INSERT INTO libros (titulo,autor,editorial,genero,fecha_de_lanzamiento,precio) VALUES ($1,$2,$3,$4,$5,$6)',
        [titulo, autor, editorial, genero, fechaDeLanzamiento, precio]
    )
    console.log(response);
    res.json({
        message: 'Libro creado con exito',
        body: {
            libro: { titulo, autor, editorial, genero, fechaDeLanzamiento, precio }
        }
    })
}

const updateBook = async (req, res) => {
    const isbn = req.params.isbn;
    const { titulo, autor, editorial,
        genero, fechaDeLanzamiento, precio } = req.body;
    //console.log(titulo, autor, isbn)

    const response = await pool.query(
        'UPDATE libros \
                SET titulo = $1, autor = $2, editorial = $3, \
                genero = $4, fecha_de_lanzamiento = $5, precio = $6\
                WHERE isbn = $7',
        [titulo,
            autor,
            editorial,
            genero,
            fechaDeLanzamiento,
            precio,
            isbn])
    console.log(response);
    res.json("Libro actualizado con exito")
}

const deleteBook = async (req, res) => {
    //res.send('Libro eliminado ISBN: ' + req.params.isbn)
    const isbn = req.params.isbn;
    const response = await pool.query('DELETE FROM libros \
                WHERE isbn = $1', [isbn]);
    console.log(response);
    res.json('Libro ' + isbn + ' eliminado con exito');
}

module.exports = {
    getBooks,
    createBook,
    getBookById,
    deleteBook,
    updateBook
}