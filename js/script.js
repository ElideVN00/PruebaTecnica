fetch('https://pokeapi.co/api/v2/type/')//Obtener respuesta de API
.then(response => response.json())//Transformar la respuesta a JSON
.then((data) =>{ //Obtener la data en JSON
    console.log({tipos: data})//Se muestra en consola la data recuperada para saber como destrucutrarla
    const tipos = data.results

    const selectTipos = document.createElement('select')//Crear elemento HTML tipo select

    //Iterar sobre el arreglo de types para llenar el select con options (Por CADA elemento en el arreglo types)
    tipos.forEach((tipo) => {

        /* Crear elemento html */
        const optionTipo = document.createElement('option')
        const nombreTipo = tipo.name

        /* Asignar atributos html */
        optionTipo.value = nombreTipo
        optionTipo.textContent = nombreTipo

        /* Inyectar como hijo de select en HTML (cada option dentro del select)*/
        selectTipos.appendChild(optionTipo)
    });

    /* Obtener un elemento HTML ya existente en el DOM */
    const contenedorSelect = document.querySelector('.container-select-pokemon')
    contenedorSelect.appendChild(selectTipos)

    /* Asignar estilos al contenedor */
    const contenedor = document.querySelector('.container')
    contenedor.style.display = 'flex'
    contenedor.style.flexDirection = 'row'
    contenedor.style.gap = '2rem'
})


fetch('https://pokeapi.co/api/v2/pokemon?limit=1300')
.then((response) => response.json())
.then((data)=>{
    console.log({pokemones: data})
    const pokemones = data.results
    const contenedorPokemones = document.querySelector('.container-pokemones')
    
    contenedorPokemones.style.display = 'grid'
    contenedorPokemones.style.gridTemplateColumns = 'repeat(4, 1fr)'
    contenedorPokemones.style.gap = '1rem'
    pokemones.forEach((pokemon) => {
        /* Crear HTML */
        const contenedorNombrePokemon = document.createElement('div')
        contenedorNombrePokemon.style.padding = '2rem'
        contenedorNombrePokemon.style.backgroundColor = 'pink'
        contenedorNombrePokemon.style.textAlign = 'center'
        contenedorNombrePokemon.style.borderRadius = '10px'
        contenedorNombrePokemon.style.textTransform = 'uppercase'
        contenedorNombrePokemon.style.fontFamily = '"Quicksand", sans-serif'
        contenedorNombrePokemon.style.fontWeight = 'bold'
        /* Asignar Atributos */
        const nombrePokemon = pokemon.name
        contenedorNombrePokemon.textContent = nombrePokemon
        /* inyectar */
        contenedorPokemones.appendChild(contenedorNombrePokemon)
    })
})
