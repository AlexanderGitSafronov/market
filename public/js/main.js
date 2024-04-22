const radioBtn = document.querySelectorAll('.product_btn')
const btnWooman = document.querySelector('.btn__wooman')
const listItemWooman = document.querySelector('.list__item_wooman')
const listItemMan = document.querySelector('.list__item_man')

const radioBtnHit = document.querySelectorAll('.product_btnn')
const btnItemWoomanHit = document.querySelector('.btn__wooman_hit')
const btnItemManHit = document.querySelector('.btn__man_hit')
const listItemWoomanHit = document.querySelector('.list__item_wooman_hit')
const listItemManHit = document.querySelector('.list__item_man_hit')


function radioNew(){
    radioBtn.forEach(item=>{
        item.addEventListener('click',()=>{
            radioBtn.forEach(item=>{
                item.classList.remove('active')
            })
            item.classList.add('active')
            if(btnWooman.classList.contains('active')){
                listItemMan.style.display = 'none';
                listItemWooman.style.display = 'block';
            } else {
                listItemWooman.style.display = 'none';
                listItemMan.style.display = 'block';
            }
            
        })
    })
    if(btnWooman.classList.contains('active')){
        listItemMan.style.display = 'none';
        listItemWooman.style.display = 'block';
    } else {
        listItemWooman.style.display = 'none';
        listItemMan.style.display = 'block';
    }
}
radioNew()

function radioHit(){
    radioBtnHit.forEach(item=>{
        item.addEventListener('click',()=>{
            radioBtnHit.forEach(item=>{
                item.classList.remove('active')
            })
            item.classList.add('active')
            if(btnItemWoomanHit.classList.contains('active')){
                listItemManHit.style.display = 'none';
                listItemWoomanHit.style.display = 'block';
            } else {
                listItemWoomanHit.style.display = 'none';
                listItemManHit.style.display = 'block';
            }
            
        })
    })
    if(btnItemWoomanHit.classList.contains('active')){
        listItemManHit.style.display = 'none';
        listItemWoomanHit.style.display = 'block';
    } else {
        listItemWoomanHit.style.display = 'none';
        listItemManHit.style.display = 'block';
    }
}
radioHit()



const btnOpenDesc = document.querySelector('.main__desc_info_btn button')
const mainDescInfo = document.querySelector('.main__desc_info')
btnOpenDesc.addEventListener('click',()=>{
    mainDescInfo.classList.toggle('open')
    if(mainDescInfo.classList.contains('open')){
        btnOpenDesc.textContent = 'Коротко'
    } else {
        btnOpenDesc.textContent = 'Детальніше'
    }

})







// Отображение акардиона
const acardeonFooter = document.querySelectorAll('.footer__acardeon_item p');
acardeonFooter.forEach((item) => {
    item.addEventListener('click', (e) => {
            e.target.nextElementSibling.classList.toggle('hide'); 
            if(e.target.nextElementSibling.classList.contains('hide')){
                item.parentElement.getElementsByClassName('footer__acardeon_simbol')[0].classList.remove('rotates');
             
            } else {
                item.parentElement.getElementsByClassName('footer__acardeon_simbol')[0].classList.add('rotates');
             
            }
    })
})

