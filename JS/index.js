//Validar Formularios
const formulario = document.getElementById('contactos-form');
const inputs = document.querySelectorAll('#contactos-form input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apm: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    app: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    calle: /^[a-zA-ZÀ-ÿ\d\s]{1,40}$/, // Letras, números y espacios, pueden llevar acentos.
    num_int: /^\d{1,10}$/, // 10 numeros.
    num_ext: /^\d{4,10}$/, // 10 numeros.
    cp: /^\d{5}$/, // 5 numeros.
    colonia: /^[a-zA-ZÀ-ÿ\d\s]{5,40}$/, // Letras, números y espacios, pueden llevar acentos.
    telefono: /^\d{10}$/, // 10 numeros.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
    nombre: false,
    apm: false,
    app: false,
    calle: false,
    num_int: false,
    num_ext: false,
    cp: false,
    colonia: false,
    telefono: false,
    correo: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampos(expresiones.nombre, e.target, 'nombre');
            break;

        case "app":
            validarCampos(expresiones.app, e.target, 'app');
            break;
        case "apm":
            validarCampos(expresiones.apm, e.target, 'apm');
            break;

        case "calle":
            validarCampos(expresiones.calle, e.target, 'calle');
            break;

        case "num_int":
            validarCampos(expresiones.num_int, e.target, 'num_int');
            break;

        case "num_ext":
            validarCampos(expresiones.num_ext, e.target, 'num_ext');
            break;

        case "cp":
            validarCampos(expresiones.cp, e.target, 'cp');
            break;

        case "colonia":
            validarCampos(expresiones.colonia, e.target, 'colonia');
            break;

        case "telefono":
            validarCampos(expresiones.telefono, e.target, 'telefono');
            break;

        case "correo":
            validarCampos(expresiones.correo, e.target, 'correo');
            break;
    }
}

const validarCampos = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`div${campo}`).classList.remove('form-floating-incorrecto');
        document.getElementById(`div${campo}`).classList.add('form-floating-correcto');
        document.querySelector(`#div${campo} i`).classList.add('gg-check');
        document.querySelector(`#div${campo} i`).classList.remove('gg-close');
        campos[campo] = true;
    } else {
        document.getElementById(`div${campo}`).classList.add('form-floating-incorrecto');
        document.getElementById(`div${campo}`).classList.remove('form-floating-correcto');
        document.querySelector(`#div${campo} i`).classList.add('gg-close');
        document.querySelector(`#div${campo} i`).classList.remove('gg-check');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

//Show Alerts

// function showAlert(message, className) {
//     const div = document.createElement("div");
//     div.className = `alert alert-${className}`;

//     div.appendChild(document.createTextNode(message));
//     const container = document.querySelector('.contoiner');
//     const main = document.querySelector(".main");
//     container.insertBefore(div, main);

//     setTimeout(() => document.querySelector(".alert").remove(), 3000);
// }

// function showFormAlert(message, className) {
//     const div = document.createElement("div");
//     div.className = `alert alert-${className}`;

//     div.appendChild(document.createTextNode(message));
//     const container = document.querySelector('.contoiner');
//     const main = document.querySelector(".alertaForm");
//     container.insertBefore(div, main);

//     setTimeout(() => document.querySelector(".alert").remove(), 3000);
// }

// ShowContact
// const cargarContactos = async () => {
//     try {
//         const data = await fetch(`http://localhost/pkt1contactosBackend/index.php/ContactoController/FullContactos`)
//         const contacto = await data.json();

//         let contactos = '';
//         contacto.forEach(contacto => {
//             contactos = contactos + `
//             <tr id="idcontacto">
//                 <td>${contacto.idcontacto}</td>
//                 <td>${contacto.nombre}</td>
//                 <td>${contacto.app}</td>
//                 <td>${contacto.apm}</td>
//                 <td>${contacto.calle} ${contacto.num_int} ${contacto.num_ext} ${contacto.cp} ${contacto.colonia}</td>
//                 <td>${contacto.telefono}</td>
//                 <td>${contacto.correo}</td>
//                 <td class="acciones"><button class="editar" id="id_editar">Editar</button>
//                 <button class="eliminar" >Eliminar</buttton></td>
//             </tr>`;
//         });

//         //document.getElementById('lista-contacto').innerHTML = contactos;

//     } catch (err) {
//         console.log(err.message);
//     }
// }

// cargarContactos();

//Agregar Botones

// document.addEventListener('DOMContentLoaded', function() {
//     var button = document.createElement('input');
//     button.type = 'button';
//     button.id = 'submit';
//     button.value = 'Submit';
//     button.className = 'btn';

//     button.onclick = function() {
//     // …
//     };

//     var container = document.getElementById('lista-contacto');
//     container.appendChild(button);
// }, false);

//ADD Contact

const guardar = document.getElementById('guardarc')

guardar.addEventListener('click', (e) => {
    e.preventDefault();
    if (campos.nombre && campos.app && campos.apm && campos.calle && campos.num_int && campos.num_ext && campos.cp && campos.colonia && campos.telefono && campos.correo) {
        fetch("http://localhost/pkt1contactosBackend/index.php/ContactoController/save", {
            method: 'POST',
            body: new FormData(document.getElementById("contactosform"))
        }).then(res => res.json())
            .then(data => console.log(data))
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El contacto ha sido guardado',
            showConfirmButton: false,
            allowOutsideClick: false
        })
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se ha podido guardar el contacto',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1000
        })
    }

})

//Edit Contact

const MostrarUnContacto = async (id) => {
    
    let objetoContacto = {};
    contact.filter(cont => {
        if (cont.idcontacto == id) {
            objetoContacto = cont
        }
    });

    document.querySelector('#idnombre').value = objetoContacto.nombre;
    document.querySelector('#idapp').value = objetoContacto.app;
    document.querySelector('#idapm').value = objetoContacto.apm;
    document.querySelector('#idcalle').value = objetoContacto.calle;
    document.querySelector('#idnum_int').value = objetoContacto.num_int;
    document.querySelector('#idnum_ext').value = objetoContacto.num_ext;
    document.querySelector('#idcp').value = objetoContacto.cp;
    document.querySelector('#idcolonia').value = objetoContacto.colonia;
    document.querySelector('#idtelefono').value = objetoContacto.telefono;
    document.querySelector('#idcorreo').value = objetoContacto.correo;
    document.querySelector('#guardarc').disabled = true
    document.querySelector('#guardarca').disabled = false
    const guardarCambios = document.getElementById('guardarca');

    guardarCambios.addEventListener('click', () => {
        if (campos.nombre || campos.app || campos.apm || campos.calle || campos.num_int || campos.num_ext || campos.cp || campos.colonia || campos.telefono || campos.correo) {
            fetch(`http://localhost/pkt1contactosBackend/index.php/ContactoController/UpdateContacto/${objetoContacto.idcontacto}`, {
                method: 'POST',
                body: new FormData(document.getElementById('contactosform'))
            }).then(res => res.json())
                .catch(error => console.log('Ocurrió un error al actualizar el contacto: ', error))
                .then(response => console.log(response));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El contacto ha sido editado',
                showConfirmButton: false,
                allowOutsideClick: false
            })
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No se ha podido modificar el contacto',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1000
            })
        }
    })
}



//Delete Contact

const EliminarContacto = (id) => {
    fetch(`http://localhost/pkt1contactosBackend/index.php/ContactoController/DeleteContacto/${id}`)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El contacto ha sido eliminado',
        showConfirmButton: false,
        allowOutsideClick: false
    })
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}


// document.querySelector('#lista-contacto').addEventListener("click", (e) => {
//     target = e.target;
//     if (target.classList.contains("eliminar")) {
//         console.log(target.parentElement.parentElement);
//    showAlert("El contacto han sido Eliminado", "danger");
//     }
// })


//Search Contact

const search = document.querySelector('#idinputbuscar');
const ListContact = document.querySelector('#lista-contacto');

let contact = [];

window.addEventListener('DOMContentLoaded', async () => {
    const dataContact = await loadContact()
    contact = dataContact
    renderContact(contact)

})

search.addEventListener('keyup', e => {
    const newContacts = contact.filter(contacts => contacts.nombre.toLowerCase().includes(search.value.toLowerCase()))
    renderContact(newContacts);
})


async function loadContact() {
    const response = await fetch(`http://localhost/pkt1contactosBackend/index.php/ContactoController/FullContactos`)
    return await response.json()
}



const createContactItems = contact => contact.map(contacto => `
<tr>
    <td>${contacto.idcontacto}</td>
    <td>${contacto.nombre}</td>
    <td>${contacto.app}</td>
    <td>${contacto.apm}</td>
    <td>${contacto.calle} ${contacto.num_int} ${contacto.num_ext} ${contacto.cp} ${contacto.colonia}</td>
    <td>${contacto.telefono}</td>
    <td>${contacto.correo}</td>
    <td class="acciones">
        <button class="editar" onclick="MostrarUnContacto(${contacto.idcontacto})">Editar</button>
        <button class="eliminar" onclick="EliminarContacto(${contacto.idcontacto})" >Eliminar</button>
    </td>
</tr>`).join(' ')


function renderContact(contact) {
    const itemsString = createContactItems(contact)
    ListContact.innerHTML = itemsString
}