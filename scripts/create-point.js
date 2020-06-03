
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    // O código abaixo pode se tornar uma função, o que é mais prático
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

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then((res) => {return res.json()})
    .then( cities => {

        for (city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;        
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


// Ítens de coleta, fazer que pareça diferente quando selecionado


// É preciso ajeitar, no css, os elementos filhos da tag li para que o javaScript
// não pegue esses elementos quando o usuário clicar no nosso "botão"

// pega todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li");
for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);
}


// guardar os itens selecionados pelo usuário para serem enviados pelo form
let selectedItems = [];
// input escondido
const collectedItems = document.querySelector("input[name=items]");


function handleSelectedItem(event){

    
    const itemLi = event.target;
    
    // adicionar ou remover uma classe com javaScript
    // em vez de toggle poderia ser add, para adicionar, ou remove, para remover
    // toggle verifica se tem a classe selected, se tiver ele remove e se não tiver ele coloca! 
    itemLi.classList.toggle("selected");

    // pega o id do item (varia de 1 a 6)
    const itemId = event.target.dataset.id;

    

    // verificar se o item selecionado agora já havia sido elecionado antes
    const alredySelected = selectedItems.findIndex( item =>{
        const itemFound = item ==itemId; //se a condição é satisfeita é true
        return itemFound; 
    })

    // se já estiver selecionado, tirar da seleção
    // a função filter ele adiciona no novo array se o elemento é diferente do id em questão (itemId)
    if(alredySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;  // quand essa condição é falsa é pq o item = itemId, e aí o filter não deixa passar para o novo array
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    }else{ // se não estiver selecionado, colocar na seleção
        selectedItems.push(itemId); //coloca esse id no array
    }
   

    // atualizar o input escondido com os itens selecionados
    collectedItems.value = selectedItems;
    

}