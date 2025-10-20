fetch('https://pokeapi.co/api/v2/type/')//Obtener respuesta de API
.then(response => response.json())//Transformar la respuesta a JSON
.then((data) =>{ //Obtener la data en JSON
    console.log(data)//Se muestra en consola la data recuperada para saber como destrucutrarla
    const types = data.results

    const selecttype = document.createElement('select')//Crear elemento HTML tipo select

    //Iterar sobre el arreglo de types para llenar el select con options (Por CADA elemento en el arreglo types)
    types.forEach((type) => {

        /* Crear elemento html */
        const optionType = document.createElement('option')
        const typeName = type.name

        /* Asignar atributos html */
        optionType.value = typeName
        optionType.textContent = typeName

        /* Inyectar como hijo de select en HTML (cada option dentro del select)*/
        selecttype.appendChild(optionType)
    });

    /* Obtener un elemento HTML ya existente en el DOM */
    const contenedor = document.querySelector('.container-select-pokemon')
    contenedor.appendChild(selecttype)

    /* Asignar estilos al contenedor */
    const contenedorFilters = document.querySelector('.container')
    contenedorFilters.style.display = 'flex'
    contenedorFilters.style.flexDirection = 'row'
    contenedorFilters.style.gap = '2rem'
    console.log(types)
})


fetch('https://pokeapi.co/api/v2/pokemon?limit=1300')
.then((response) =>{
    return response.json()
})
.then((data)=>{
    console.log(data)
    const pokemones = data.results
    const contenedor = document.querySelector('.container-pokemones')
    
    contenedor.style.display = 'grid'
    contenedor.style.gridTemplateColumns = 'repeat(4, 1fr)'
    contenedor.style.gap = '1rem'
    pokemones.forEach((pokemon) => {
        /* Crear HTML */
        const textName = document.createElement('div')
        textName.style.padding = '2rem'
        textName.style.backgroundColor = 'pink'
        textName.style.textAlign = 'center'
        textName.style.borderRadius = '10px'
        textName.style.textTransform = 'uppercase'
        textName.style.fontFamily = '"Quicksand", sans-serif'
        textName.style.fontWeight = 'bold'
        /* Asignar Atributos */
        const pokemonName = pokemon.name
        textName.textContent = pokemonName

        /* inyectar */
        contenedor.appendChild(textName)


    })

})

function hablar(){
    console.log('hablando...')
}

