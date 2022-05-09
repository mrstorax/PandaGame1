import { setupGround, updateGround } from './ground.js'
import { setupDino, updateDino, getDinoRect, setDinoLose, setDinoSmall, setDinoNormal } from './dino.js'
import { setupBambou, updateBambou, getBambouRects } from './bambou.js'
import { setupShroom, updateShroom, getShroomRects, deleteShroom } from './shroom.js'
import { setupForest, setupMountain, setupSky, updateForest, updateMountain, updateSky } from './background.js'



const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001


const worldElem = document.querySelector('[data-world')
const scoreElem = document.querySelector('[data-score]')
const bestScoreElem = document.querySelector('[data-best-score]')
const startScreenElem = document.querySelector('[data-start-screen]')


setPixelToWorldScale()
window.addEventListener("rezise", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true})
document.addEventListener("mousedown", handleStart, { once: true})

bestScoreElem.textContent =  document.cookie





let lastTime
let speedScale
let score
let timmer
timmer = 0


function update(time){
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateMountain(delta, speedScale)
    updateSky(delta, speedScale)
    updateForest(delta, speedScale)
    updateDino(delta, speedScale)
    updateBambou(delta, speedScale)
    updateShroom(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)

   
    if (checksmall() || ( timmer > 0 && timmer < 1000  )) {
        timmer += 1
        setDinoSmall()  
        deleteShroom()
    }
    else{
        setDinoNormal()
        timmer = 0
    }
       
    if (checklose()) return handlelose()


    // isInFullScreen = windowRef.fullScreen;
    // console.log(isInFullScreen)
      

    lastTime = time

    window.requestAnimationFrame(update)


}


function checklose(){
    const dinoRect = getDinoRect()
    return getBambouRects().some(rect => isCollision(rect, dinoRect))
}

function checksmall(){
    const dinoRect2 = getDinoRect()
    return getShroomRects().some(rect => isCollision(rect, dinoRect2))
}

function isCollision(rect1, rect2) {
    return (
    rect1.left < rect2.right 
    && rect1.top < rect2.bottom
    && rect1.right > rect2.left
    && rect1.bottom > rect2.top
    )
}

function updateSpeedScale(delta){
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    startScreenElem.classList.add("hide")
    setupGround()
    setupMountain()
    setupSky()
    setupForest()
    setupDino()
    setupBambou(speedScale)
    setupShroom(speedScale)
    
    window.requestAnimationFrame(update)
    
}

function handlelose () {
    setDinoLose()
    timmer = 0
    if (Math.floor(score) > document.cookie) {
        document.cookie = Math.floor(score)
    }

    setTimeout(() => {
        document.addEventListener("keydown", handleStart, {once: true})
        document.addEventListener("mousedown", handleStart, {once: true})
        startScreenElem.classList.remove("hide")
    }, 100)
    window.location.reload();
}






function setPixelToWorldScale(){
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT ) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
        
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
