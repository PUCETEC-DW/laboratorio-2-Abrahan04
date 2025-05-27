const resultado = document.getElementById("resultado");
const buscar = document.getElementById("buscar");
let paises = [];

fetch("https://restcountries.com/v3.1/all")
  .then(respuesta => respuesta.json())
  .then(datos => {
    paises = datos;
    mostrarPaises(paises);
  })
  .catch(error => {
    resultado.innerHTML = "<p>Error al cargar los países.</p>";
    console.error(error);
  });

function mostrarPaises(lista) {
  resultado.innerHTML = ""; // Limpiar resultados anteriores
  lista.forEach(pais => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.official}" width="60">
      <strong>${pais.name.official}</strong>
      <p>Región: ${pais.region}</p>
      <p>Población: ${pais.population.toLocaleString()}</p>
    `;
    resultado.appendChild(div);
  });
}

buscar.addEventListener("input", () => {
  const texto = buscar.value.toLowerCase();
  const filtrados = paises.filter(pais =>
    pais.name.official.toLowerCase().includes(texto)
  );
  mostrarPaises(filtrados);
});