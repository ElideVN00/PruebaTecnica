document.addEventListener("DOMContentLoaded", () => {
  const contenedorPokemones = document.querySelector('.container-pokemones');
  const contenedorInfo = document.getElementById("info-pokemon");
  const contenedorSelect = document.querySelector('.container-select-pokemon');

  let listaPokemones = [];
  let listaFiltrada = [];

  // Cargar tipos en el select
  fetch('https://pokeapi.co/api/v2/type/')
    .then(res => res.json())
    .then(data => {
      const tipos = data.results;
      const selectTipos = document.createElement('select');
      const optionDefault = document.createElement('option');
      optionDefault.value = "";
      optionDefault.textContent = "Todos los tipos";
      selectTipos.appendChild(optionDefault);

      tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.name;
        option.textContent = tipo.name;
        selectTipos.appendChild(option);
      });

      contenedorSelect.appendChild(selectTipos);

      // Evento al cambiar tipo
      selectTipos.addEventListener('change', async (e) => {
        const tipoSeleccionado = e.target.value;
        await filtrarPorTipo(tipoSeleccionado);
      });
    });

  //Cargar todos los Pokémon
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1300')
    .then(res => res.json())
    .then(data => {
      listaPokemones = data.results;
      listaFiltrada = [...listaPokemones];
      renderPokemones(listaFiltrada);
    });

  // Función para renderizar Pokémon en la cuadrícula
  function renderPokemones(pokemones) {
    contenedorPokemones.innerHTML = "";
    contenedorPokemones.style.display = 'grid';
    contenedorPokemones.style.gridTemplateColumns = 'repeat(4, 1fr)';
    contenedorPokemones.style.gap = '1rem';

    pokemones.forEach(pokemon => {
      const div = document.createElement('div');
      div.style.padding = '2rem';
      div.style.backgroundColor = 'pink';
      div.style.textAlign = 'center';
      div.style.borderRadius = '10px';
      div.style.textTransform = 'uppercase';
      div.style.fontFamily = '"Quicksand", sans-serif';
      div.style.fontWeight = 'bold';

      div.textContent = pokemon.name;
      div.addEventListener('click', () => mostrarInfoPokemon(pokemon.name));

      contenedorPokemones.appendChild(div);
    });
  }

  // Función para filtrar Pokémon por tipo
  async function filtrarPorTipo(tipo) {
    if (!tipo) {
      listaFiltrada = [...listaPokemones];
      renderPokemones(listaFiltrada);
      return;
    }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
      const data = await res.json();
      listaFiltrada = data.pokemon.map(p => p.pokemon);
      renderPokemones(listaFiltrada);
    } catch (error) {
      console.error("Error filtrando por tipo:", error);
    }
  }

  // Función para mostrar info de un Pokémon
  async function mostrarInfoPokemon(nombre) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      const data = await res.json();

      contenedorInfo.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Altura:</strong> ${data.height}</p>
        <p><strong>Peso:</strong> ${data.weight}</p>
        <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Habilidades:</strong> ${data.abilities.map(a => a.ability.name).join(", ")}</p>
        <p><strong>Estadísticas:</strong></p>
        <ul>
          ${data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join("")}
        </ul>
      `;
    } catch (error) {
      console.error("Error al obtener la info del Pokémon:", error);
    }
  }

});