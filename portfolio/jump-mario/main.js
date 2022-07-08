//variáveis com proporções da tela
const height = window.innerHeight;
const width = window.innerWidth;

//variáveis do menu e do jogo em si
const startMenu = document.querySelector('.pre-game')
const game = document.querySelector('.on-game')

//variável da img Mario
const mario = document.querySelector('.mario');

//variável da img pipe
const pipe =  document.querySelector('.pipe');

//variável do html onde se muda os pontos
const score = document.querySelector('.score')


//nome do Jogador
const name = document.querySelector('.name')

//variável do win or lose
const winLose = document.querySelector('.win-lose')

//pontos do Mario
var points = 0;


//FUNÇÕES

//função de começar o jogo (POR ENQANTO APENAS TEM O NEGÓCIO DE MUDAR O NOME)
function startGame(){
    var newPlayer = document.querySelector('.type-input').value;
    name.innerText = `${newPlayer}`
    startMenu.style.display = 'none'
    game.style.display = 'block'
}

//função de regarregar a página (reset)
function reset(){
    location.reload();
}

//Função do pulo do Mario
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

//Função de adicionar o gif de "you win" ou "you lose"
function display_image(src, width, height, alt) {
    var a = document.createElement("img");
    a.src = src;
    a.width = width;
    a.height = height;
    a.alt = alt;
    winLose.appendChild(a);
}


//Intervalo que verifica constantemente se o Mario bateu na pipe até ele bater
const loop = setInterval(() => {
    //acessa o deslocamento esquerdo da img pipe
    const pipePosition =  pipe.offsetLeft;

    //acessa a posição vertical do Mario (que é dada em String), retira o px do nome e transforma a String em Number (com o + na frente)
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    //condição que verifica se o Mario bateu na pipe
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 180){
        
        //parar animação da pipe no lugar em que o Mario bateu
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        //Parar animação do Mario onde ele estiver e trocar imagem dele
        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`;
        mario.src = 'images/game-over.png';
        mario.style.width = '90px';
        mario.style.height = '120px';
        mario.style.marginLeft ='30px';

        //terminar o jogo
        clearInterval(loop)
        
        //gif 'you-lose.gif' (aqui tem que ser a mesma porcentagem que o código no css em width e height)
        display_image('images/you-lose.gif', width* 0.4, height * 0.4, "You Lose!");
    }

    //condição que aumenta os pontos quando Mario pula com sucesso
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition > 180) {
        
        //soma dos pontos
        points += 10;
        
        //mostrar pontos
        score.innerText = `Pontos: ${points}`
    }

    //condição para o Mario ganhar o jogo (100 pontos) ------------------(INCOMPLETA)------------------
    if (points >= 100){
        pipe.style.animation = 'none';
        pipe.style.right  = `0`;

        //terminar o jogo
        clearInterval(loop);
        
        //gif 'you-win.gif' (aqui tem que ser a mesma porcentagem que o código no css em width e height)
        display_image('images/you-win.gif', width* 0.4, height * 0.4, "You Win!");
    }
}, 10)


//eventos do pulo (teclado e celular)
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);