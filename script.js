async function buscarPokemons(url) {
    document.getElementById('lista'). innerHTML = ''
    const result = await fetch(url)
    const resultJson = await result.json()
    for (let index = 0; index < resultJson.results.length; index++) {
        const element = resultJson.results[index];
        await buscarPokemonPorUrl(element.url)   
    }

    const btnAnteriorElemento = document.getElementById('botao-anterior')
    const btnProximoElemento = document.getElementById('botao-proximo')
    
    btnAnteriorElemento.innerHTML = ''
    btnProximoElemento.innerHTML = ''
 

    if(resultJson.previous != null) {
        const btnAnterior = `<button class="btn btn-primary mx-2" id="anterior" onclick="buscarPokemons('${resultJson.previous}')">Anterior</button>`
        btnAnteriorElemento.innerHTML += btnAnterior
    } else {
        const btnAnterior = `<button class="btn btn-secondary mx-2 disabled" id="anterior" onclick="buscarPokemons('${resultJson.previous}')">Anterior</button>`
        btnAnteriorElemento.innerHTML += btnAnterior
    }
    
    if(resultJson.next != null) {
        const btnProximo = `<button class="btn btn-primary mx-2" id="proximo" onclick="buscarPokemons('${resultJson.next}')">Proximo</button>`
        btnProximoElemento.innerHTML += btnProximo
    } else {
        const btnProximo = `<button class="btn btn-secondary mx-2 disabled" id="proximo" onclick="buscarPokemons('${resultJson.next}')">Proximo</button>`
        btnProximoElemento.innerHTML += btnProximo
    }

}

function abrirPopUp(){
    const div = document.getElementById('popup')
    div.classList.remove('popup-off')
    div.classList.add('popup-on')
}
function fecharPopup() {
    const div = document.getElementById('popup')
    div.classList.remove('popup-on')
    div.classList.add('popup-off') 
}

async function buscarEspecie(url) {
    const result = await fetch(url)
    const item = await result.json()
    const texto = item.flavor_text_entries.find(text => text.language.name.includes('en'))
    return texto.flavor_text
}

async function buscarFotos(url) {
    const result = await fetch(url)
    const item = await result.json()
    const listaFotos = Object.values(item.sprites)
    const lista = document.getElementById('carousel-cards')
    lista.innerHTML = ''
    console.log(listaFotos)
    for (let index = 0; index < listaFotos.length; index++) {
        const element = listaFotos[index];

        if(element != null && typeof element == 'string') {
            if(index == 0) {
                const div = `
                <div class="carousel-item active" style="transition: transform 2s ease, opacity .5s ease-out">
                    <img src="${element}" class="d-block w-100" alt="...">
                </div>
                `
                lista.innerHTML += div
            } else {
                const div = `
                <div class="carousel-item" style="transition: transform 2s ease, opacity .5s ease-out">
                    <img src="${element}" class="d-block w-100" alt="...">
                </div>
                `
                lista.innerHTML += div
            }

        }
    }
}

async function buscarInformacoes(url) {
    const result = await fetch(url)
    const item = await result.json()
    await buscarFotos()
}


async function buscarPokemonPorUrl(url){
    const result = await fetch(url)
    const item = await result.json()
    const especieDados = await buscarEspecie(item.species.url)
    document.getElementById('lista').innerHTML += `

    <div class="card mx-3 my-3 border border-primary" style="width: 18rem;">
        <img src="${item.sprites.front_default}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"> ${item.name.toUpperCase()}</h5>
            <p class="card-text">${especieDados}</p>
            <button onclick="buscarFotos('${url}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#dialogo-info">
                Mais informações
            </button>
        </div>
    </div>
    `
}