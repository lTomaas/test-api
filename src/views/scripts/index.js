

fetch("http://localhost:3000/api/books")
    .then(function (response) {
        return response.json();
    })

    
    .then(function (books) {
        let tabla = document.getElementById("tabla-libros");
        let out = "";

        for (let book of books) {
            out += `
                <tr>
                    <td>${book.isbn} </td>
                    <td>${book.titulo} </td>
                    <td>${book.genero} </td>
                    <td>${book.autor} </td>
                    <td>${book.editorial} </td>
                    <td>${book.precio} $ </td>
                </tr>
                `
        }
        tabla.innerHTML = out;
    })
    .catch(function (error) {
        console.error('Error en la solicitud', error);
    });
