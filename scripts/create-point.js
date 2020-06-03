
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    // O código abaico pode se tornar uma função, o que é mais prático
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()})
    .then( states => {

        for (state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;        
        }

    });
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then((res) => {return res.json()})
    .then( cities => {

        for (city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;        
        }

        // habilita o campo
        citySelect.disabled = false;
    });

}

// "ouvidor" de eventos, nesse caso executa uma função quando o usuário muda a opção Estado
// ele vai habilitar a field cidade e colocá-las nas opções
// obs: a função "getCities" é passada por referência, por isso ela não é seguida por "()"
document.querySelector("select[name=uf]")
.addEventListener("change", getCities);
