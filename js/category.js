

let shoesList = document.querySelector('.tov')
const filterSelectorPrice = document.querySelector('.filter__selector_price')
const filterSelectorCategory = document.querySelector('.filter__selector_category')
const filterSelectorCategoryWrapper = document.querySelector('.filter__selector_category_wrapper')
const filterSelectorGender = document.querySelector('.filter__selector_gender')
const filterSelectorGenderWrapper = document.querySelector('.filter__selector_gender_wrapper')
const filterSearch = document.querySelector('.search_input')

const btnChoiseProduct = document.querySelector('.choise__category')




let url = "http://localhost:8080/shoes?";
let filterPrice = ''
let filteCategory = ''
let filteGender = ''
let filteSearch = ''
let choiseProduct = ''



const getShoes = () => {
  shoesList.innerHTML = ''
    // fetch(url + `${filterPrice.length ? '_sort=' + filterPrice + '&' : ''}${filteCategory.length ? 'category=' + filteCategory + "&" : ''}${filteGender.length ? 'gender=' + filteGender + "&" : ''}${filteName.length ? 'q=' + filteName + "&" : ''}`)
    fetch(url + `${choiseProduct.length ? 'product=' + choiseProduct + '&' : ''}${filterPrice.length ? '_sort=price&_order=' + filterPrice + '&' : ''}${filteCategory.length ? 'category=' + filteCategory + "&" : ''}${filteGender.length ? 'gender=' + filteGender + "&" : ''}${filteSearch.length ? 'title_like=' + filteSearch + "&" : ''}`)
    .then((resolve)=> resolve.json())
    .then((resolve)=> {
        // console.log(resolve)
        resolve.forEach((item)=>{
            shoesList.innerHTML += `
            <div class="swiper-slide"><div class="card">
      <a href="#">
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
    })
    .catch((err)=>console.log(err))
}
getShoes()






filterSelectorPrice.addEventListener('change', (e)=>{
    filterPrice = e.target.value
    getShoes()
})
filterSelectorCategory.addEventListener('change', (e)=>{
  filteCategory = e.target.value
    getShoes()
})
filterSelectorGender.addEventListener('change', (e)=>{
  filteGender = e.target.value
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
  }
  console.log(choiseProduct)
  document.querySelector('.main__link .active').textContent = choiseProduct;
  getShoes()
})




