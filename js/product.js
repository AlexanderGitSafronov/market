const btnBlock = document.querySelector('.main__desc_tovar_header')
const btnBlockAll = document.querySelectorAll('.main__desc_active')
const characteristics = document.querySelectorAll('.characteristics>div')
console.log(characteristics)

btnBlock.addEventListener('click', (e)=>{
    e.preventDefault()
    characteristics.forEach((item)=>{
        item.classList.add('characteristics_hiden')
    })
    if(e.target.classList.contains('main__desc_active')){
        btnBlockAll.forEach((item)=>{
            item.classList.remove('active')
        })
        e.target.classList.add('active');
        console.log(e.target.dataset.name)
        characteristics.forEach((item)=>{
            if(item.classList.contains(e.target.dataset.name)){
                item.classList.remove("characteristics_hiden")
            }
        })

    }
})



const acardeon = document.querySelectorAll('.acardeon p');
acardeon.forEach((item) => {
    item.addEventListener('click', (e) => {
            e.target.nextElementSibling.classList.toggle('hide'); 
            if(e.target.nextElementSibling.classList.contains('hide')){
                item.parentElement.getElementsByClassName('acardeon_simbol')[0].classList.remove('rotates');
            } else {
                item.parentElement.getElementsByClassName('acardeon_simbol')[0].classList.add('rotates');
            }
          
    })
})




const title = document.querySelector('.tovar__title h2')
const price = document.querySelector('.tovar__price_title')
const characteristicAllLeft = document.querySelector('.characteristics_left')
const characteristicAllRight = document.querySelector('.characteristics_right')


const cartId = document.querySelector('.cart_id')
const cartArticle = document.querySelector('.cart_article')
const cartName = document.querySelector('.cart_name')
const cartPrice = document.querySelector('.cart_price')
const cartImg = document.querySelector('.cart_img')
const cartCount = document.querySelector('.cart_count_prod')




const sliderAll = document.querySelectorAll('.swiper-wrapper')
console.log(sliderAll)

const actualLink = document.querySelector('.main__link .active')

console.log(location)
let url = "http://localhost:8080/product/"+`${location.search.split('=')[1]}`;
const getOneProduct = ()=>{
    fetch(url)
    .then((resolve)=> resolve.json())
    .then((resolve)=> {
        actualLink.textContent = resolve.title
        console.log(resolve)
        title.textContent = resolve.title
        price.textContent = resolve.price
        let charakteristicsleft = resolve.charakteristicsLeft
        let charakteristicsRight = resolve.charakteristicsRight
        let img = resolve.imgCarusel
        console.log(img)

        cartId.textContent = resolve.id
        cartArticle.textContent = resolve.article
        cartName.textContent = resolve.title
        cartPrice.textContent = resolve.cartPrice
        cartImg.textContent = resolve.images
        cartCount.textContent = resolve.cartCount


        if(!resolve.size){
            document.querySelector('.wrapper__tovar_size').classList.add('hidden');
        } else {
            resolve.size.forEach((item,idx)=>{
                document.querySelector('.wrapper__tovar_size').innerHTML += `
                <div class="btn__size ${idx===0? "active" : ''}"><span>${item}</span></div>
                `
            })

            const btnSize = document.querySelectorAll('.btn__size')
    btnSize.forEach((item) => {
    item.addEventListener('click', ()=>{
        btnSize.forEach((btn) => {
            btn.classList.remove('active')
        })
        item.classList.add('active')
    })
})
           
        }

    

    

        for (const key in charakteristicsleft) {
            characteristicAllLeft.innerHTML += `
            <div class="characteristics_line">
            <div class="characteristics_line_left"><span>${key}</span></div>
            <div class="characteristics_line_center"></div>
            <div class="characteristics_line_right"><span>${charakteristicsleft[key]}</span></div>
        </div>
            `
        }
        for (const key in charakteristicsRight) {
            characteristicAllRight.innerHTML += `
            <div class="characteristics_line">
            <div class="characteristics_line_left"><span>${key}</span></div>
            <div class="characteristics_line_center"></div>
            <div class="characteristics_line_right"><span>${charakteristicsRight[key]}</span></div>
        </div>
            `
        }

        sliderAll.forEach(item=>{
            item.innerHTML = '';
            for (const key in img) {
                item.innerHTML += `
                <div class="swiper-slide">
                <img src="${img[key]}" />
              </div>
                `
            }
        })

        var swiper = new Swiper(".mySwiper", {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
          });
          var swiper2 = new Swiper(".mySwiper2", {
            loop: true,
            spaceBetween: 10,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            thumbs: {
              swiper: swiper,
            },
          });
    })
    .catch((err)=>console.log(err))
}


getOneProduct()




