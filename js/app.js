const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit', obtenerVerdura);
})

function obtenerVerdura(e){
    e.preventDefault();

    //Validar
    const verdura = document.querySelector('#Verdura').value;

    if(verdura === ''){
        mostrarError('La verdura es obligatoria');
        return;
    }
    //Consultar Api
    consultarAPI(verdura);

    //mostrar error de campos obligatorios
    function mostrarError(mensaje){
        const alerta = document.querySelector('.bg-red-100');

        if(!alerta){
        //crear alerta

        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        //Eliminamos la alerta a los 3 segundos.
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    }


function consultarAPI(verdura){

    const url = `https://vegies-api.herokuapp.com/api/vegi/${verdura}`;

    Spinner();

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            limpiarHTML();

            //Si obtenemos respuesta la mostramos
            mostrarVerdura(datos)
        })
}

function mostrarVerdura(datos){
    const { calories, fiber } = datos;

    const calorias = (calories);
    const fibra = (fiber);
    
    const caloriasValor = document.createElement('p');
    caloriasValor.textContent = `Calorias de la ${verdura} son de ${calorias}`;
    caloriasValor.classList.add('font-bold', 'text-2xl');

    const fibraValor = document.createElement('p');
    fibraValor.innerHTML = `y la fibra de ${fibra}`;
    fibraValor.classList.add('font-bold', 'text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(caloriasValor);
    resultadoDiv.appendChild(fibraValor);

    resultado.appendChild(resultadoDiv);

}

function limpiarHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){

    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}
}