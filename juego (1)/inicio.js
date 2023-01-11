contenedor = document.querySelector('.contenedor')
var altoTablero = 500
var anchoTablero = 1030
var altoBloque = 10
var anchoBloque = 170

//definir posicion Usuario
var posicionInicialBloque = [489,10]
let posicionActualBloque = posicionInicialBloque
//Definir posicion de la bola
var posicionInicialPelota = [489,40]
let posicionActualPelota = posicionInicialPelota
//definicion particularidad de la bola
let xDireccionPelota = 2
let yDireccionPelota = 2
let diametro = 10
//definir timer
let timerID
//Definicion de la clase bloque
class Bloque{
    constructor(ejeX, ejeY){
        this.bottomLeft = [ejeX, ejeY]
        this.bottomRigth = [ejeX + anchoBloque, ejeY]
        this.topLeft = [ejeX, ejeY + altoBloque]
        this.topRigth = [ejeX + anchoBloque, ejeY + altoBloque]

    }
}
//Definir todos los bloques que
const bloques  = [
    new Bloque(100, 460),
    new Bloque(260, 460),
    new Bloque(420, 460),
    new Bloque(570, 460),
    new Bloque(720, 460),
    new Bloque(860, 460),
    new Bloque(100, 385),
    new Bloque(260, 385),
    new Bloque(420, 385),
    new Bloque(570, 385),
    new Bloque(720, 385),
    new Bloque(860, 385),
    new Bloque(100, 310),
    new Bloque(260, 310),
    new Bloque(420, 310),
    new Bloque(570, 310),
    new Bloque(720, 310),
    new Bloque(860, 310),
]
//Bloques 
function addBloques(){
    for(let i = 0; i < bloques.length; i++){
        var bloque = document.createElement('div')
        bloque.classList.add('bloque')
        bloque.style.left = bloques[i].bottomLeft[0] + 'px'
        bloque.style.bottom = bloques[i].bottomLeft[1] + 'px'
        contenedor.appendChild(bloque)   
    }
}
//Dibujar bloques
addBloques()
//Usuario
function dibujarUsuario(){
    usuario.style.left = posicionActualBloque[0] + 'px'
    usuario.style.bottom = posicionActualBloque[1] + 'px'
}
//Usuario en el juego
var usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarUsuario()
function moverUsuario(e){
    switch(e.key){
        case 'ArrowLeft':
            if(posicionActualBloque[0] > 0){
                posicionActualBloque[0] -= 10
                dibujarUsuario()
            }
            break
        case 'ArrowRight':
            if(posicionActualBloque[0] < (anchoTablero - anchoBloque)){
                posicionActualBloque[0] += 20
                dibujarUsuario()
            }
            break
    }
}

document.addEventListener('keydown', moverUsuario)

function dibujarBola(){
    bola.style.left = posicionActualPelota[0]+ 'px'
    bola.style.bottom = posicionActualPelota[1]+ 'px'
}
var bola = document.createElement('div')
bola.classList.add('bola')
contenedor.appendChild(bola)
dibujarBola()

function moverBola(){
    posicionActualPelota[0] += xDireccionPelota
    posicionActualPelota[1] += yDireccionPelota
    dibujarBola()
    revisarColisiones()
    gameOver()
}
timerId = setInterval(moverBola, 20)
function revisarColisiones(){
    for (let i = 0; i < bloques.length; i++){
        if( (posicionActualPelota[0] > bloques[i].bottomLeft[0] && posicionActualPelota[0] < bloques[i].bottomRigth[0]) &&
            ((posicionActualPelota[1]  + diametro) > bloques[i].bottomLeft[1] && posicionActualPelota[1] < bloques[i].topLeft[1])
        ){
            const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
            todosLosBloques[i].classList.remove('bloque')
            bloques.splice(i,1)
            cambiarDireccion()
        }
    }

    if(
        posicionActualPelota[0] >= (anchoTablero - diametro) ||
        posicionActualPelota[1] >= (altoTablero - diametro) ||
        posicionActualPelota[0] <= 0 ||
        posicionActualPelota[1] <= 0
    ){
        cambiarDireccion()
    }
    if((posicionActualPelota[0] > posicionActualBloque[0] && posicionActualPelota[0] < posicionActualBloque[0] + anchoBloque) && 
    (posicionActualPelota[1] > posicionActualBloque[1] && posicionActualPelota[1] < posicionActualBloque[1] + altoBloque)
    ){
        cambiarDireccion()
    }

}
function gameOver(){
    if(posicionActualPelota[1] <= 0){
        clearInterval(timerId)
        document.removeEventListener('keydown',moverUsuario)
    }
}

function cambiarDireccion(){
    if(xDireccionPelota === 2 && yDireccionPelota === 2){
        yDireccionPelota = -2
        return
    }
    if(xDireccionPelota === 2 && yDireccionPelota === -2){
        xDireccionPelota = -2
        return
    }
    if(xDireccionPelota === -2 && yDireccionPelota === -2){
        yDireccionPelota = 2
        return
    }
    if(xDireccionPelota === -2 && yDireccionPelota === 2){
        xDireccionPelota = 2
        return
    }
}