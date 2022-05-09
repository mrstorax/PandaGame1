import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.06  
const worldElem = document.querySelector("[data-world]")

let SHROOM_INTERVAL_MIN 
let SHROOM_INTERVAL_MAX 
let nextShroomTime
export function setupShroom (speedScale) {
nextShroomTime = 10000 * speedScale
document.querySelectorAll("[data-shroom]").forEach(shroom =>{
    shroom.remove()
})
}

export function updateShroom(delta, speedScale) {
    document.querySelectorAll("[data-shroom]").forEach(shroom => {
        incrementCustomProperty(shroom, "--left", delta * speedScale * SPEED * -1 )
        if (getCustomProperty(shroom, "--left") <= -100) {
            shroom.remove()
        }
    })

    if (nextShroomTime <= 0) {
        createShroom()

        SHROOM_INTERVAL_MIN = 10000 * speedScale
        SHROOM_INTERVAL_MAX = 15000 * speedScale
        nextShroomTime = randomNumberBetween(SHROOM_INTERVAL_MIN, SHROOM_INTERVAL_MAX) / speedScale
    }
    nextShroomTime -= delta
}

export function getShroomRects(){
    return [...document.querySelectorAll("[data-shroom]")].map(shroom => {
        return shroom.getBoundingClientRect()
    })

}

function createShroom() {
    const shroom = document.createElement("img")
    shroom.dataset.shroom = true
    shroom.src = "imgs/coin.png"
    shroom.classList.add("shroom")
    setCustomProperty(shroom, "--left", 100)
    worldElem.append(shroom)
}

export function deleteShroom(){
    document.querySelectorAll("[data-shroom]").forEach(shroom => {
    if ( getCustomProperty(shroom, "--left") < 1000) {
        shroom.remove()
    }
})

}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


