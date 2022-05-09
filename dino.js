import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.40
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity


export function setupDino(){
    isJumping = false 
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
    document.addEventListener("mousedown", onJump)

}

export function updateDino(delta, speedScale){
    handleRun(delta, speedScale)
    handleJump(delta)
}

function handleRun(delta, speedScale) {
    if (isJumping){
        dinoElem.src = `imgs/panda-jump.png`
        return
    }
    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `imgs/panda-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = `imgs/panda-lose.png`
}

export function setDinoSmall() {
    dinoElem.style.height = "10%";
}
export function setDinoNormal() {
    dinoElem.style.height = "30%";
}


function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
    
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if ( (e.code !== "Space" && e.type !== "mousedown") || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}

