//todo - selector
let home = document.getElementById('home');
let banned = document.getElementById('banned');

//todo - async homepage (get)
async function homePage() {
  try {
    const reponse = await fetch('https://henri-potier.techx.fr/books');
    const json = await reponse.json();
    startElement(json, 'homepage');
  } catch (err) {
    console.error(err);
  }
}

//todo - Eventclick (Banned)
banned.addEventListener('click', function(e) {
  //todo - async banned (get)
  (async () => {
    try {
      const reponse = await fetch(
        'https://henri-potier.techx.fr/books/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861/commercialOffers'
      );
      const json = await reponse.json();

      startElement(json, 'banned', null);
    } catch (err) {
      console.error(err);
    }
  })();
});

//todo - Eventclick (Home)
home.addEventListener('click', function(e) {
  homePage();
});

//todo - DOMContentLoaded (Home)
document.addEventListener('DOMContentLoaded', function(e) {
  homePage();
});

//todo - startElement Fn -  
// Parametre => ( data, "banned" || 'homepage', search)
let startElement = function(data, type, search) {
  console.log(data);
  let selector = document.getElementById('book');
  if (!search) {
    let input = document.getElementById('site-search');
    let dataFetch = data;
    input.addEventListener('keyup', e => {
      let tab = [];
      data.forEach(
        element =>
          element.title &&
          element.title.toLowerCase().includes(input.value.toLowerCase()) &&
          tab.push(element)
      );
      if (!input.value) tab = dataFetch;
      selector.innerHTML = '';
      startElement(tab, 'homepage', 'search');
    });
  }
  if (type === 'banned') {
    selector.innerHTML = '';
    data = data.offers;
  }

  //todo - loop data
  for (const iterator of data) {
    console.log(iterator);
    if (type === 'homepage') createElementHomePage(iterator, selector);
    // if(type === 'banned') createElementHomePage(iterator);
  }
};

//todo - Création de la page home
let createElementHomePage = (iterator, selector) => {
  // parent
  let divBook = document.createElement('div');
  divBook.className = 'parent';
  divBook.style.height = '200px';

  // title
  let divTitle = document.createElement('div');
  divTitle.className = 'title';
  divTitle.innerHTML = iterator.title;

  // cover
  let divCover = document.createElement('div');
  divCover.style.backgroundImage = `url(${iterator.cover})`;
  divCover.style.backgroundRepeat = 'no-repeat';
  divCover.style.backgroundSize = '100px';
  divCover.style.height = '100%';

  divBook.append(divTitle, divCover);
  selector.append(divBook);
  //   console.log(iterator);
};

//todo - Création de la page panier
let createElementBannedPage = (iterator, selector) => {};
