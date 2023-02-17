async function buscarPokemons(url) {
    document.getElementById('lista'). innerHTML = ''
    const result = await fetch(url)
    const resultJson = await result.json()
    for (let index = 0; index < resultJson.results.length; index++) {
        const element = resultJson.results[index];
        await buscarPokemonPorUrl(element.url)   
    }
    const nav = document.getElementById('nav')
    
    nav.innerHTML = ''
    
    const popUp = `<button class="btn" id="pop" onclick="abrirPopUp()">POP UP</button>`
    nav.innerHTML += popUp

    if(resultJson.previous != null) {
        const btnAnterior = `<button class="btn" id="anterior" onclick="buscarPokemons('${resultJson.previous}')">Anterior</button>`
        nav.innerHTML += btnAnterior
    }
    
    if(resultJson.next != null) {
        const btnProximo = `<button class="btn" id="proximo" onclick="buscarPokemons('${resultJson.next}')">Proximo</button>`
        nav.innerHTML += btnProximo
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

async function buscarPokemonPorUrl(url){
    const result = await fetch(url)
    const item = await result.json()
    document.getElementById('lista').innerHTML += `
        <div class="card">
            <h2> ${item.name.toUpperCase()}</h2>
            <img src="${item.sprites.front_default}">
        </div>
    `
}