const { Router } = require("express")
const router = Router();

const path = require('path');
 
const { getBooks, createBook, getBookById, deleteBook, updateBook } = require("../../controllers/index_controller");


//Prueba
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
})



//API
router.get("/api/books", getBooks);
router.get("/api/books/:isbn", getBookById);
router.post("/api/books", createBook);
router.delete("/api/books/:isbn", deleteBook);
router.put("/api/books/:isbn", updateBook);


module.exports = router;
