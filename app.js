const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
const input = document.getElementById('input')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    setTarea(e)
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

listaTareas.addEventListener('click', e => {
    btnAccion(e)
})

const setTarea = e => {

    /* Validación formulario */

    if (input.value.trim() === '') {
        console.log('Debes escribir algo!')
    }

    /* Construimos nuestro objeto */

    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }

    /* Empujamos el objeto a la colección de objetos creada arriba con la variable "tareas" */

    tareas[tarea.id] = tarea

    /* Reseteamos lo ingresado en el formulario formulario */

    formulario.reset()

    /* Pintamos la tarea en pantalla */

    pintarTareas()
}

const pintarTareas = () => {

    /* Guardamos las tareas en el localStorage */

    localStorage.setItem('tareas', JSON.stringify(tareas))

    /* Limpiamos el DOM */

    listaTareas.innerHTML = ''

    /* Recorremos las tareas */

    Object.values(tareas).forEach(tarea => {

        /* Clonamos el template */

        const clone = template.cloneNode(true)

        /* Modificamos el clone modificando el párrafo con lo que el valor que elusuario ingreso en el input */

        clone.querySelector('p').textContent = tarea.texto

        /* Modifico los estilos a las tareas cuando se marcan completadas comprobando que estado de la tarea sea true */

        if (tarea.estado) {
            clone.querySelector('.tarea').classList.add('tarea-complete')
            clone.querySelector('.tarea-p').classList.add('tarea-p-complete')
            clone.querySelector('.tarea-check').classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('.tarea-minus').classList.add('tarea-minus-complete')
        }

        /* Le agrego el dato del id a cada boton correspondiente a una tarea puntual */

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id

        /* Lo agregamos a Fragment */

        fragment.appendChild(clone)
    })

    /* Agregamos todo lo que tiene fragment a "listaTareas" */

    listaTareas.appendChild(fragment)

}

const btnAccion = e => {
    if (e.target.classList.contains('fa-check-circle')) {
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
        console.log(tareas)
    }

    if (e.target.classList.contains('fa-minus')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
        console.log(tareas)
    }

    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
        console.log(tareas)
    }

    e.stopPropagation()
}