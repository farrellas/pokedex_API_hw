String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const getData = async () => {
    const name = document.getElementsByTagName('input')[0].value.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await res.json();
    return data
};

const createList = (pokeObj) => {
    const myCard = document.createElement('div');
    let abilityString = ''
    for (let i = 0; i<pokeObj.abilities.length; i++) {
            abilityString += '<li class="list-group-item">Ability '+ (i+1) + ': ' + pokeObj.abilities[i].ability.name.toProperCase() + '</li>'
        }
    const cardString = '<div class="card">' +
    '<img src="'+ pokeObj.sprites.other.home.front_default +'" class="card-img-top" alt="pokemon">' +
    '<div class="card-body">'+
    '<h5 class="card-title">'+ pokeObj.name.toProperCase() + '</h5>' +
    '<p class="card-text">' + 
    `${pokeObj.name.toProperCase()} is a ${pokeObj.types[0].type.name} type pokemon with the ID number ${pokeObj.id}. ` +
    `${pokeObj.name.toProperCase()}'s height is ${pokeObj.height} and weight is ${pokeObj.weight}. ` + 
    `Listed below are ${pokeObj.name.toProperCase()}'s abilities.` + '</p>' + '</div>' +
    '<ul class="list-group list-group-flush">' + abilityString +
    '</ul>' + '</div>';
    myCard.innerHTML = cardString;
    document.querySelector('section.list-group').insertAdjacentElement('afterbegin', myCard);
};

const loadData = async () => {
    const pokeObj = await getData();
    createList(pokeObj);
};


const clearData = () => {
    document.querySelector('section').innerHTML = ''
};

const clear = document.getElementsByClassName('btn-danger')[0];
clear.addEventListener('click', clearData);
