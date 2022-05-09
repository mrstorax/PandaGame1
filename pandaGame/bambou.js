import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.06  
const worldElem = document.querySelector("[data-world]")

let BAMBOU_INTERVAL_MIN
let BAMBOU_INTERVAL_MAX
let nextBambouTime
let numberBambou
export function setupBambou (speedScale) {
nextBambouTime = 800 * speedScale
document.querySelectorAll("[data-bambou]").forEach(bambou =>{
    bambou.remove()
})
}

export function updateBambou(delta, speedScale) {
    document.querySelectorAll("[data-bambou]").forEach(bambou => {
        incrementCustomProperty(bambou, "--left", delta * speedScale * SPEED * -1 )
        if (getCustomProperty(bambou, "--left") <= -100) {
            bambou.remove()
        }
    })

    if (nextBambouTime <= 0) {
        createBambou()
        BAMBOU_INTERVAL_MIN = 500 * speedScale
        BAMBOU_INTERVAL_MAX = 1200  * speedScale
        nextBambouTime = randomNumberBetween(BAMBOU_INTERVAL_MIN, BAMBOU_INTERVAL_MAX) / speedScale
    }
    nextBambouTime -= delta
}

export function getBambouRects(){
    return [...document.querySelectorAll("[data-bambou]")].map(bambou => {
        return bambou.getBoundingClientRect()
    })

}

function createBambou() {
    numberBambou = randomNumberBetween(0,4)
    const bambou = document.createElement("img")
    bambou.dataset.bambou = true
    switch (numberBambou) {
        case 0:
            bambou.src = "imgs/bambou-0.png"
        break;
        case 1:
            bambou.src = "imgs/bambou-1.png"
        break;
        case 2:
            bambou.src = "imgs/bambou-2.png"
        break;
        case 3:
            bambou.src = "imgs/bambou-3.png"
        break;
        case 4:
            bambou.src = "imgs/bambou-4.png"
        break;
    }
    bambou.classList.add("bambou")
    setCustomProperty(bambou, "--left", 150)
    worldElem.append(bambou)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



