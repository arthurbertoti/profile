//variável da img Mario
const mario = document.querySelector('.mario');

//variável da img pipe
const pipe =  document.querySelector('.pipe');



//Função do pulo do Mario
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}


//Intervalo que verifica constantemente se o Mario bateu na pipe até ele bater
const loop = setInterval(() => {
    
    //acessa o deslocamento esquerdo da img pipe
    const pipePosition =  pipe.offsetLeft;

    //acessa a posição vertical do Mario (que é dada em String), retira o px do nome e transforma a String em Number (com o + na frente)
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    //loop que verifica se o Mario bateu na pipe
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 180){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`;
        mario.src = 'images/game-over.png';
        mario.style.width = '90px';
        mario.style.height = '120px';
        mario.style.marginLeft ='30px';
        clearInterval(loop)
    }
}, 10)

//Evento do pulo
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);