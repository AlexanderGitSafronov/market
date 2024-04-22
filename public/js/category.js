

let shoesList = document.querySelector('.tov')
const filterSelectorPrice = document.querySelector('.filter__selector_price')
const filterSelectorCategory = document.querySelector('.filter__selector_category')
const filterSelectorCategoryWrapper = document.querySelector('.filter__selector_category_wrapper')
const filterSelectorGender = document.querySelector('.filter__selector_gender')
const filterSelectorGenderWrapper = document.querySelector('.filter__selector_gender_wrapper')
const filterSearch = document.querySelector('.search_input')

const btnChoiseProduct = document.querySelector('.choise__category')

let url = "/api/product?";
let filterPrice = ''
let filteCategory = ''
let filteGender = ''
let filteSearch = ''
let choiseProduct = ''
let paginationCount = 1;
let pagination = ''+paginationCount;
let limit = '6';
let priceGte = '';
let priceLte = '';

let resolveLength;

const getShoes = () => {
 
    // fetch(url + `${filterPrice.length ? '_sort=' + filterPrice + '&' : ''}${filteCategory.length ? 'category=' + filteCategory + "&" : ''}${filteGender.length ? 'gender=' + filteGender + "&" : ''}${filteName.length ? 'q=' + filteName + "&" : ''}`)
    fetch(url + `${pagination.length ? '_page=' + pagination + '&' : ''}${limit.length ? '_limit=' + limit + '&' : ''}${choiseProduct.length ? 'product=' + choiseProduct + '&' : ''}${filterPrice.length ? '_sort=price&_order=' + filterPrice + '&' : ''}${filteCategory.length ? 'category=' + filteCategory + "&" : ''}${filteGender.length ? 'gender=' + filteGender + "&" : ''}${filteSearch.length ? 'title_like=' + filteSearch + "&" : ''}${priceGte.length ? 'price_gte=' + priceGte + '&' : ''}${priceLte.length ? 'price_lte=' + priceLte + '&' : ''}`)
    .then((resolve)=> resolve.json())
    .then((resolve)=> {
      resolveLength = resolve.length
      console.log(resolve.length)
      // if(resolve.length === 0){
      //   paginationNextBtn.classList.add('disable')
      //   return
      // }
     
      paginationNextBtn.classList.remove('disable')
      shoesList.innerHTML = ''
        resolve.forEach((item)=>{
            shoesList.innerHTML += `
            <div class="swiper-slide"><div class="card">
      <a href="./tovar/product.html?product=${item.id}" data-id="${item.id}">
        <div class="card__img">
          <img class="item__image1" src="${item.images}" alt="">
          <img class="item__image2" src="${item.images2}" alt="">
        
          <div class="card__img_info">
            <div class="new__info"><span>New</span></div>
          
          </div>

        </div>
      </a>
      <div class="card__desc">
        <p>${item.title}</p>
        <div class="sale_red"><span>-20%</span></div>
        <p class="prices"><span>4 868 грн</span><span>${item.price} грн</span></p>

      </div>
    </div></div>
            `
        })

        if(resolve.length < 6){
          paginationNextBtn.classList.add('disable')
          console.log(resolve.length)


          // shoesList.innerHTML = '<h1>Товари данної категоріх закінчилися</h1>'
          // paginationPrev()
         
          // paginationNextBtn.style.backgroundColor = '#000'
          // return
        }
         if(resolve.length === 6){
          testShoes()
          // getShoes()
      }

    })
    .catch((err)=>console.log(err))
}

getShoes()

function testShoes(){
  let paginationTest = pagination;
  let paginationCountTest = paginationCount + 1;
  paginationTest = ''+paginationCountTest;
  fetch(url + `${paginationTest.length ? '_page=' + paginationTest + '&' : ''}${limit.length ? '_limit=' + limit + '&' : ''}${choiseProduct.length ? 'product=' + choiseProduct + '&' : ''}${filterPrice.length ? '_sort=price&_order=' + filterPrice + '&' : ''}${filteCategory.length ? 'category=' + filteCategory + "&" : ''}${filteGender.length ? 'gender=' + filteGender + "&" : ''}${filteSearch.length ? 'title_like=' + filteSearch + "&" : ''}`)
  .then((resolve)=> resolve.json())
  .then((resolve)=> {
    console.log('testShoes :',  resolve.length)
  
    if(resolve.length === 0){
      paginationNextBtn.classList.add('disable')
      return
      // console.log("Маєм ноль")
    }

  })
}






filterSelectorPrice.addEventListener('change', (e)=>{
    filterPrice = e.target.value
    resetCount()
    getShoes()
})
filterSelectorCategory.addEventListener('change', (e)=>{
  filteCategory = e.target.value
  resetCount()
    getShoes()
})
filterSelectorGender.addEventListener('change', (e)=>{
  filteGender = e.target.value
  resetCount()
    getShoes()
})
filterSearch.addEventListener('keyup', (e)=>{
  filteSearch = e.target.value
  console.log(filteSearch)
    getShoes()
})



const btnProductChoise = document.querySelectorAll('.choise__category button')

btnChoiseProduct.addEventListener('click', (e)=>{
 
  if(e.target.classList.contains('btnProduct')){
    resetCount()
    btnProductChoise.forEach((item)=>{
      item.style.background = "transparent";
      item.style.color = "#000";
    })
    e.target.style.background = "#000";
    e.target.style.color = "#fff";
  
  choiseProduct = e.target.textContent;
  filterPrice = ''
  filteCategory = ''
  filteGender = ''
  filteSearch = ''
  if(e.target.textContent === "Блендери"){
    filterSelectorCategoryWrapper.style.display = 'none';
    filterSelectorGenderWrapper.style.display = 'none';
  } 
  if(e.target.textContent === "Взуття"){
    filterSelectorCategoryWrapper.style.display = 'block';
    filterSelectorGenderWrapper.style.display = 'block';
  }
  if(e.target.textContent === "Всі товари"){
    filterSelectorCategoryWrapper.style.display = 'block';
    filterSelectorGenderWrapper.style.display = 'block';
    choiseProduct = '';
    
  }
  
  }
  console.log(choiseProduct)
  if(choiseProduct === ''){
    document.querySelector('.main__link .active').textContent = "Всі"
  } else {
    document.querySelector('.main__link .active').textContent = choiseProduct;
  }
  
  getShoes()
})
document.querySelector('.btnProductAll').style.background = "#000";
document.querySelector('.btnProductAll').style.color = "#fff";






const paginationPrevBtn = document.querySelector('.pagination_prev button')
const paginationNextBtn = document.querySelector('.pagination_next button')

let countPages = 1;
if(countPages === 1){
  paginationPrevBtn.classList.add('disable')
}
document.querySelector('.pagination_page').textContent = countPages
paginationNextBtn.addEventListener('click', ()=>{
  upToHeader()
 
    if(resolveLength === 0){
      return
    } else {
      paginationCount++;
      pagination = ''+paginationCount;
      countPages++;
      getShoes();
      document.querySelector('.pagination_page').textContent = countPages;
      if(countPages > 1){
        paginationPrevBtn.classList.remove('disable')
      }

     
    }

 
})
function resetCount(){
  countPages = 1
  paginationCount = 1
  pagination = '1';
  document.querySelector('.pagination_page').textContent = countPages;
  paginationPrevBtn.classList.add('disable');
}
paginationPrevBtn.addEventListener('click', ()=>{
  upToHeader()
  if(paginationCount < 2){
    return
  } else {
    paginationPrev()
  }
})

function paginationPrev() {
  paginationCount--;
  countPages--;
  pagination = ''+paginationCount;
  getShoes();
  document.querySelector('.pagination_page').textContent = countPages;
  if(countPages === 1){
    paginationPrevBtn.classList.add('disable')
  }
}

function upToHeader(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}



document.addEventListener('DOMContentLoaded', function(){
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [990, 4000],
    connect: true,
    range: {
      'min': 0,
      'max': 5000
    }
  });

  // Получаем контейнер для отображения значений
  var priceValuesMin = document.getElementById('price__min');
  var priceValuesMax = document.getElementById('price__max');

  // Связываем ползунок с контейнером для отображения значений
  slider.noUiSlider.on('update', function(values, handle) {
    priceValuesMin.innerHTML = (+values[0]).toFixed();
    priceValuesMax.innerHTML = (+values[1]).toFixed();
    priceGte = (+values[0]).toFixed();
    priceLte = (+values[1]).toFixed();
  });
});

const showBtn = document.querySelector('.show__btn button')
showBtn.addEventListener('click', ()=>{
  resetCount()
  getShoes()

})