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



