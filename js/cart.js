let basketData = [];

if(document.querySelectorAll('.btn__size')){
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



if(document.querySelector('.add_cart')){
    
const addCart = document.querySelector('.add_cart')
addCart.addEventListener('click', ()=>{
   
    let size = document.querySelector('.btn__size.active span').textContent
    let name = document.querySelector('.name').textContent
    let id = document.querySelector('.id').textContent
    let price = document.querySelector('.price').textContent
    let img = document.querySelector('.img').textContent

    if(localStorage.getItem('basket') !== null) {
        basketData = JSON.parse(localStorage.getItem('basket'))
    }
  
    if(basketData.length === 0){
        basketData = [...basketData, {
            id,
            name,
            size,
            price,
            img
        }]
       
        setLocalStorage()
        basketData = JSON.parse(localStorage.getItem('basket'))
        
        // console.log(basketData)
    } else {
        console.log(basketData)
       let sizeFind =  basketData.find((el)=> el.size === size && el.id === id)
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
            img
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
            <div class="card_tov" data-size="${item.size}">
            <div class="card_tov_left">

            <div class="img_tovar"><img src="${item.img}" alt=""></div>
            <div>
            <div class="name">${item.name}</div>
            <div class="size">${item.size} р</div>
            <div class="price">${item.price} грн.</div>
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
                console.log(basketData)
                localStorage.setItem('basket', JSON.stringify(basketData))
              
               
                getBasket()
                countCart();
               
                if(document.querySelector('.total__sum')){
                    let totalBasket = document.querySelector('.total__sum')
                    totalSumResult(totalBasket)
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
        return acc + +rec.price 
    }, 0)
}






function countCart() {
    document.querySelector('.cart_count').textContent = basketData.length;
}
countCart()