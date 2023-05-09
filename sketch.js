
var trex,trexCorrendo,chao,imagemChao,imagemNuvem,Subchao,nuvem,cacto,escolherCacto,tempoJogo,             
trexCollidiu, fimDeJogo,reiniciar
//variavel do som
var somPulo, somMorendo, somCheckPoint




//imagem dos cactos  
var imgemcacto1,imgemcacto2,imgemcacto3,imgemcacto4,imgemcacto5,imgemcacto6
var trexCorrendo,imagemChao,imagemNuvem,imagemfim,imagemReiniciar

const jogar = 1; 
const encerrar = 0
var estadoJogo = jogar;
 
function preload(){  
 trexCorrendo= loadAnimation("trex1.png","trex2.png","trex3.png")
  
  trexCollidiu = loadAnimation("trex_collided.png") 
  
imagemChao = loadImage("ground2.png")  
 imagemNuvem = loadImage("cloud.png") 
  
  imagemCacto1 = loadImage('obstacle1.png')
  imagemCacto2 = loadImage('obstacle2.png')
  imagemCacto3 = loadImage('obstacle3.png')
  imagemCacto4 = loadImage('obstacle4.png')
  imagemCacto5 = loadImage('obstacle5.png')  
  imagemCacto6 = loadImage('obstacle6.png')
  
 



imagemFim = loadImage("gameOver.png")
imagemReiniciar = loadImage("restart.png")
  
somPulo = loadSound ("jump.mp3")  
somMorendo = loadSound("die.mp3") 
somCheckPoint = loadSound("checkPoint.mp3")
  
}
 
                      


function setup() {
 createCanvas(600,200)
 //criandoSprite do trex- colocando a animacao  
trex = createSprite(50,100,20,40)
trex.addAnimation("correndo",trexCorrendo)
trex.addAnimation("collidiu",trexCollidiu)  
trex.scale = 0.5
 
//criandoSprate do cha o e colocando a imagem
chao = createSprite(200,180,500,10)
chao.addAnimation("chao",imagemChao)
//criando o subchao e deichando ele invisivel
  
subchao = createSprite(200,190,500,10)
subchao.visible = false
  
fimDeJogo = createSprite(300,80,30,30)
fimDeJogo.addAnimation("fimDeJogo",imagemFim) 
fimDeJogo.scale = 0.5  
  
reiniciar = createSprite(300,120,30,30)
reiniciar.addAnimation("reiniciar",imagemReiniciar) 
reiniciar. scale = 0.5 
  
  
 trex.setCollider("circle", 0,0,40)

 
 tempoJogo = 0
 
grupoDeCactos= new Group();  
grupoDeNuvens = new Group();  
  
  
}

function draw() {
background(180)  
//mostrar o tempo na tela  
text("tempo: "+ tempoJogo,500,30) 
  
  if (estadoJogo == jogar){

  chao.velocityX = -2
                          
if(chao.x < 0){
  
chao.x = chao.width / 2  
          }
    
    //criar o cronometro na variavel tempo do jogo
    
   tempoJogo = tempoJogo+1   
    
fimDeJogo.visible = false
reiniciar.visible = false    
  
if(keyDown("space") && trex.y > 161){
 trex.velocityY = - 10
somPulo.play()  
}
            
            
            
  trex.velocityY = trex.velocityY + 0.5   
            
gerarNuvens()  
  
gerarCactos()      
           
if(grupoDeCactos.isTouching(trex)){   
     estadoJogo =encerrar;                      
                           
                           
} 
                          
                          
 }else if (estadoJogo == encerrar)  {
   
   chao.velocityX = 0

fimDeJogo.visible = true 
reiniciar.visible = true   
   
grupoDeNuvens.setVelocityXEach(0);   
grupoDeCactos.setVelocityXEach(0);   
   
   
grupoDeNuvens.setLifetimeEach(-1)  
grupoDeCactos.setLifetimeEach(-1)
   
trex.changeAnimation("collidiu",trexCollidiu)   
   
   
trex.velocityY = 0
   
   
   if(mousePressedOver(reiniciar)){
     
     restart()
   }
 }

   


  
 

  
trex.collide(subchao) 
 

  
drawSprites() 
    
  
}

function restart(){
estadoJogo = jogar  
fimDeJogo.visible = false  
reiniciar.visible = false 
  
grupoDeCactos.destroyEach()  
grupoDeNuvens.destroyEach()
trex.changeAnimation("correndo",trexCorrendo)  
  tempoJogo=0
}

function gerarCactos(){
if(frameCount%60==0) {
  
  cacto = createSprite(600,165,10,40)  
  cacto.velocityX = -3
  
 escolherCacto = Math.round(random(1,6)) 
  
//Gerar cactos aleatorios
switch(escolherCacto)  {
 case 1 : cacto.addImage(imagemCacto1)  
      break;
 case 2 : cacto.addImage(imagemCacto2)    
      break;
 case 3 : cacto.addImage(imagemCacto3)      
      break;      
 case 4 : cacto.addImage(imagemCacto4)
      break;    
 case 5 : cacto.addImage(imagemCacto5)    
      break;
 case 6 : cacto.addImage(imagemCacto6)    
      break;
   default : break;   
}

cacto.scale = 0.4  
cacto.lifetime = 300
  

grupoDeCactos.add(cacto);  
  
  
}  
 
}                        
 










function gerarNuvens(){
 
if(frameCount % 60 == 0){
  

   nuvem = createSprite(600,100,50,10) 
 nuvem.velocityX = -3 
 nuvem.addAnimation("nuvempassando",imagemNuvem) 
nuvem.y = Math.round(random(60, 100))
  
//igualando a profundidade dos sprites  
nuvem.depth = trex.depth  
  
//colocando o trex na frente da nuvem  
trex.depth = trex.depth + 1
//diminui de tamanho  
nuvem.scale = 0.4
  
//destroi a nuvem  
nuvem.lifetime = 300 
  grupoDeNuvens.add(nuvem);  
 

  
  
  
 
  
 
  
  
}  
}  