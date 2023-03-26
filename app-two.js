const display = document.querySelector('input[value]')
const btn = document.querySelector('.btn');
const title = document.querySelector('.title')
const typeGlass = document.querySelector('.glass')
const preparation = document.querySelector('.info-prep')
const btn2 = document.querySelector('.forward');
const btn3 = document.querySelector('.backward');
const image = document.querySelector('.image')
const home = document.querySelector('.wrapper-home')
const info = document.querySelector('.ingredient')
let i = 0;
const backSpace = document.querySelector('.back')
const alertAdvise = document.querySelector('.alert-advise');
let product = document.querySelector('.wrapper');
const homeFav = document.querySelector('.wrapper-fav');
const contentFav = document.querySelector('.fav-content-wrap');
const homeContent = document.querySelector('.home-content-wrap');


backSpace.addEventListener('click', () => {
  home.classList.toggle('home-active')
})

//call api
btn.addEventListener('click',(e) => {
  if(display.value == ''){
    e.preventDefault()
    alertAdvise.classList.add('active', 'show-error');
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Input field is empty';
    alertAdvise.appendChild(emptyMessage);
    const timeOut = setTimeout(messageOut,2000)
    function messageOut(){
      alertAdvise.classList.remove('active');
      emptyMessage.remove();
    }
  }
  else {
    let ciccio = ''
  callApi(display.value);
}
})

const backFav = document.querySelector('.back-arrow').addEventListener('click', () =>{
  homeFav.classList.add('home-close')
})

//call api with input value
function callApi(name){
  api = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  thecocktaildb()
}

async function thecocktaildb(){
try{
    const response = await fetch(api);
    const jsonData = await response.json();
    console.log(response)
    console.log(jsonData.drinks)
    showData(jsonData)
    //console.log(jsonData)
}catch(e){
  console.log(e)
}
}

function showData(jsonData){
    if(jsonData.drinks != null){
      console.log('works fine')
      document.addEventListener('DOMContentLoaded',data())
      const menu = document.querySelectorAll('.favorite')
      const likes = document.querySelectorAll('.favorite-module')
      console.log(likes);
      likes.forEach((item, i) => {
        item.addEventListener('click',(event)=>{
          event.target.classList.toggle('red');
          getFav(event.target)
        })
      });

      function closeBtn(){
        const closedBtn = document.querySelectorAll('.close-content');
        console.log(closedBtn)
        closedBtn.forEach((btnClosed, i) => {
          btnClosed.addEventListener('click', () =>{
            let div = btnClosed.parentElement;
            div.parentElement.style.display='none';
          })
        });
        }

      function openContent(){
        const openBtn = document.querySelectorAll('.open-content');
        openBtn.forEach((btnOpen, i) => {
          btnOpen.addEventListener('click', () =>{
            let panel = btnOpen.parentElement;
            console.log(panel)
            let panelClose = panel.nextElementSibling;
            let contentPanel = panel.parentElement;
            console.log(contentPanel)
            panelClose.classList.toggle('close-panel')
            panel.classList.toggle('rotate-panel')
            contentPanel.classList.toggle('close-panel')
          })

        });


      }

      function getFav(elem) {
        const parentFav = elem.parentElement;
        const images = parentFav.querySelector('img').src;
        const titleFav = parentFav.querySelector('.title').textContent;
        const glassType = parentFav.querySelector('.glass').textContent;
        const descriptionFav = parentFav.querySelector('.info-prep').innerHTML;
        const ingredientFav = parentFav.querySelector('.info-recipe').textContent;
        console.log(ingredientFav)
        const favElement = {images, titleFav, glassType, descriptionFav, }
        console.log(favElement)
        contentFav.innerHTML +=`<div class='container-fav'>
        <div class='close-btn'><i class='close-content fas fa-times-circle'></i></div>
        <div class='image'><img src= '${images}'/></div>
        <div class='open-btn'><i class="open-content fas fa-plus-circle"></i></div>
        <div class='content-fav'>
        <div class='title'><h4>${titleFav}</h4></div>
        <div class='info-glass'>${glassType}</div>
        <div class='info-recipe'>${descriptionFav}</div>
        <div class='recipe'>${ingredientFav}</div>
        </div>
      </div>`
      closeBtn()
      openContent()
      }

        function data(){

homeContent.innerHTML = '';

console.log(jsonData.drinks.length)
      for(let i=0; i < jsonData.drinks.length;i++)
              {let recipe = '';
              for (var n = 1; n <= 15; n++) {
              let measures = 'strMeasure' + n;
              let ingredient = 'strIngredient' + n;
              if ((jsonData.drinks[i][measures]) && (jsonData.drinks[i][ingredient]) !== "") {
                  recipe =recipe + `<li> ${jsonData.drinks[i][measures]} ${jsonData.drinks[i][ingredient]}</li></br>`;

              }}
                homeContent.innerHTML+= `<div class='container2'>
                <i class="favorite-module fas fa-heart"></i>
                <div class='image'></i><img src= '${jsonData.drinks[i].strDrinkThumb}'/></div>
                <div class='content'>
                <div class='title'><h4>${jsonData.drinks[i].strDrink}</h4></div>
                <div class='info-glass'><h4>Type of Glass</h4><p class='glass'>${jsonData.drinks[i].strGlass}</p></div>
                <div class='info-prep'><h4>Description</h4>${jsonData.drinks[i].strInstructions}</div>
                <div class='info-recipe'><h4>Ingredient</h4><ul class='a'>${recipe}</ul></div></div>
              </div>`
            }}

      home.classList.add('home-active')
    }
    else{
      alertAdvise.classList.add('active');
      const errorMessage = document.createElement('p');
      errorMessage.textContent = `${display.value} doesn't exist try again`;
      alertAdvise.appendChild(errorMessage);
      const timeout = setTimeout(removeAdd,2000)
      function removeAdd(){
        alertAdvise.classList.remove('active');
        errorMessage.remove()
    }
}
}

// Cancel favorite element
const favButton = document.querySelector('.fav-data').addEventListener('click', () =>{
homeFav.classList.toggle('home-close')
})

//Share button
const shareData = {
  title: 'Cocktails Parade',
  text: 'Find the right cocktail',
  url: 'https://emanaging.altervista.org/test-def/',
  img: './img/Screenshot.png'
}

const btnShare = document.querySelector('.share-site');
btnShare.addEventListener('click', async () => {
  try {
    await navigator.share(shareData)
  } catch(err) {
    console.log( 'Error: ' + err)
  }
});
