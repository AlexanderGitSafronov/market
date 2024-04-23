let basketData = [];





if(document.querySelector('.add_cart')){
    
const addCart = document.querySelector('.add_cart')
addCart.addEventListener('click', ()=>{
   
    
    let size = '';
    if(document.querySelector('.btn__size.active span')){
        size = document.querySelector('.btn__size.active span').textContent
    } else {
        size = '';
    }

    let color = '';
    if(document.querySelector('.btn__color.active span')){
        color = document.querySelector('.btn__color.active span').textContent
    } else {
        color = '';
    }
    
    let name = document.querySelector('.cart_name').textContent
    let id = document.querySelector('.cart_id').textContent
    let price = document.querySelector('.tovar__price_title').textContent
    let cartPrice = document.querySelector('.cart_price').textContent
    let img = document.querySelector('.cart_img').textContent
    let article = document.querySelector('.cart_article').textContent
    let cartCount = document.querySelector('.cart_count_prod').textContent
    let articleActual = article+size

    if(localStorage.getItem('basket') !== null) {
        basketData = JSON.parse(localStorage.getItem('basket'))
    }
  
    if(basketData.length === 0){
        basketData = [...basketData, {
            id,
            name,
            size,
            price,
            cartPrice,
            img,
            articleActual,
            cartCount,
            color
        }]
       
        setLocalStorage()
        basketData = JSON.parse(localStorage.getItem('basket'))
        
        // console.log(basketData)
    } else {
        console.log(basketData)
       let sizeFind =  basketData.find((el)=> el.size === size && el.color === color && el.id === id)
       basketData = JSON.parse(localStorage.getItem('basket'))
        console.log(sizeFind)
       if(sizeFind) {
        basketData = JSON.parse(localStorage.getItem('basket'))
        console.log(basketData)
           return
           
       } else {
        basketData = [...basketData, {
            id,
            name,
            size,
            price,
            cartPrice,
            img,
            articleActual,
            cartCount,
            color
        }]
        // console.log(basketData)
        
        setLocalStorage()
        basketData = JSON.parse(localStorage.getItem('basket'))
       }
     
      
    //    if(document.querySelector('.basket__carts')){
    //     getBasket()
    //    }
    
       
    }
    basketData = JSON.parse(localStorage.getItem('basket'))
    console.log(basketData.length)
    console.log("basketData " + JSON.stringify(basketData) )
   
   
    countCart();
   
})
}














const setLocalStorage = ()=>{
    localStorage.setItem('basket', JSON.stringify(basketData))
}

if(localStorage.getItem('basket') !== null) {
    basketData = JSON.parse(localStorage.getItem('basket'))
}



if(document.querySelector('.basket__carts')){
    const carts = document.querySelector('.basket__carts')
    const getBasket = ()=>{
        carts.innerHTML = ''
        basketData.forEach((item)=>{
            carts.innerHTML += `
            <div class="card_tov"  data-size="${item.size}">
            <div class="card_tov_left">
            <div class="img_tovar"><img src="${item.img}" alt=""></div>
            <div class="wrapper_info">
            <div class="name">${item.name}</div>
            <div class="counter_wrapper" data-id="${item.id}">
            <button class="minus"></button><div class="count_product">${item.cartCount}</div><button class="plus"></button>
            </div>
            ${item.size ? `<div class="size"><span class="cart_size">${item.size}</span> <span>р</span></div>` : ''}
            ${item.color ? `<div class="color"><span class="cart_color">${item.color}</span> </div>` : ''}
            <div class="price"> <span class="price_product">${item.price}</span>  <span></span>грн.</div>
            </div>
            </div>
            <button class="basket__card_del" id=${item.id}>X</button>
            </div>
            `
        })
       
        let itemDelite = document.querySelectorAll('.basket__card_del')
        itemDelite.forEach((item)=>{
        item.addEventListener('click', ()=>{
            let sizeFind =  basketData.find((el)=> el.size === item.parentNode.dataset.size && el.id === item.id)
            // console.log(sizeFind)
            // console.log(sizeFind)
           
                basketData = basketData.filter(el=> el !== sizeFind)
            
                localStorage.setItem('basket', JSON.stringify(basketData))
              
               
                getBasket()
                countCart();
               
                if(document.querySelector('.total__sum')){
                    let totalBasket = document.querySelector('.total__sum')
                    totalSumResult(totalBasket)
                }
            
        })
    })





    const counterWrapper = document.querySelectorAll('.counter_wrapper')

    counterWrapper.forEach((item)=>{
        item.addEventListener('click', (e)=>{
            if(e.target.classList.contains('plus')){
               
                let dataId =  e.target.parentElement.dataset.id
                if(e.target.parentElement.parentElement.querySelector('.cart_size')){
                    let dataSize = e.target.parentElement.parentElement.querySelector('.cart_size').textContent
                    let dataColor = e.target.parentElement.parentElement.querySelector('.cart_color').textContent

                    basketData.find(product => product.id === dataId && product.size === dataSize && product.color === dataColor).cartCount++
                    localStorage.setItem('basket', JSON.stringify(basketData))
                    e.target.parentElement.querySelector('.count_product').textContent = basketData.find(product => product.id === dataId).cartCount
                    
                   
                  
                     basketData.find(product => product.id === dataId && product.size === dataSize && product.color === dataColor).cartPrice = +basketData.find(product => product.id === dataId && product.size === dataSize && product.color === dataColor).cartPrice + +Array.from(document.querySelectorAll('.price_product'))[dataId-1].textContent
                     console.log(basketData)
                     localStorage.setItem('basket', JSON.stringify(basketData))
                     let totalBasket = document.querySelector('.total__sum')
                     totalSumResult(totalBasket)
                     getBasket()
                } else {
            
                    basketData.find(product => product.id === dataId).cartCount++
                    localStorage.setItem('basket', JSON.stringify(basketData))
                    e.target.parentElement.querySelector('.count_product').textContent = basketData.find(product => product.id === dataId).cartCount
                    
                   
                  
                     basketData.find(product => product.id === dataId).cartPrice = +basketData.find(product => product.id === dataId).cartPrice + +basketData.find(product => product.id === dataId).price
                     console.log(basketData)
                     localStorage.setItem('basket', JSON.stringify(basketData))
                     let totalBasket = document.querySelector('.total__sum')
                     totalSumResult(totalBasket)
                     getBasket()
                }
               

               
            }
            if(e.target.classList.contains('minus')){
                
                if(e.target.parentElement.querySelector('.count_product').textContent < 2){
                    return
                } else {
                    if(e.target.parentElement.parentElement.querySelector('.cart_size')){
                        let dataId =  e.target.parentElement.dataset.id
                        let dataSize = e.target.parentElement.parentElement.querySelector('.cart_size').textContent
                        let dataColor = e.target.parentElement.parentElement.querySelector('.cart_color').textContent
                        basketData.find(product => product.id === dataId && product.size === dataSize && product.color === dataColor).cartCount--
                        localStorage.setItem('basket', JSON.stringify(basketData))
                        e.target.parentElement.querySelector('.count_product').textContent = basketData.find(product => product.id === dataId).cartCount
        
                        basketData.find(product => product.id === dataId && product.size === dataSize && product.color === dataColor).cartPrice = +basketData.find(product => product.id === dataId && product.size === dataSize && product.color === dataColor).cartPrice - +Array.from(document.querySelectorAll('.price_product'))[dataId-1].textContent
                        console.log(basketData)
                        localStorage.setItem('basket', JSON.stringify(basketData))
                        let totalBasket = document.querySelector('.total__sum')
                        totalSumResult(totalBasket)
                        getBasket()
                    } else {
                        let dataId =  e.target.parentElement.dataset.id
                     
                        basketData.find(product => product.id === dataId).cartCount--
                        localStorage.setItem('basket', JSON.stringify(basketData))
                        e.target.parentElement.querySelector('.count_product').textContent = basketData.find(product => product.id === dataId).cartCount
        
                        basketData.find(product => product.id === dataId).cartPrice = +basketData.find(product => product.id === dataId).cartPrice - +basketData.find(product => product.id === dataId).price
                        console.log(basketData)
                        localStorage.setItem('basket', JSON.stringify(basketData))
                        let totalBasket = document.querySelector('.total__sum')
                        totalSumResult(totalBasket)
                        getBasket()
                    }
               
                }
                
            }
            
        })
    })



    }
    
    

    getBasket()




       


   



}

console.log(basketData)


if(document.querySelector('.total__sum')){
    let totalBasket = document.querySelector('.total__sum')
    totalSumResult(totalBasket)
}
function totalSumResult(totalBasket){
    totalBasket.textContent = basketData.reduce((acc,rec) => {
        return acc + +rec.cartPrice 
    }, 0)
}
function totalSumResultMinus(totalBasket){
    totalBasket.textContent = basketData.reduce((acc,rec) => {
        return acc - +rec.cartPrice 
    }, 0)
}


function countCart() {
    document.querySelector('.cart_count').textContent = basketData.length;
}
countCart()