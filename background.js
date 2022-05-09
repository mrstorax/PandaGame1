import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.001 
const mountainElems = document.querySelectorAll("[data-mountain]")

export function setupMountain() {
    setCustomProperty(mountainElems[0], "--left", 0)
    setCustomProperty(mountainElems[1], "--left", 100)
}

export function updateMountain(delta, speedScale) {
    mountainElems.forEach(mountain => {
        incrementCustomProperty(mountain, "--left", delta * SPEED  * speedScale * -1)
        if (getCustomProperty(mountain, "--left") < -100) {
            incrementCustomProperty(mountain, "--left", 200)
        }
    })
}



const SPEED2 = 0.005
const forestElems = document.querySelectorAll("[data-forest]")

export function setupForest() {
    setCustomProperty(forestElems[0], "--left", 0)
    setCustomProperty(forestElems[1], "--left", 100)
}

export function updateForest(delta, speedScale) {
    forestElems.forEach(forest => {
        incrementCustomProperty(forest, "--left", delta * SPEED2  * speedScale * -1)
        if (getCustomProperty(forest, "--left") < -100) {
            incrementCustomProperty(forest, "--left", 200)
        }
    })
}

const SPEED3 = 0.002
const skyElems = document.querySelectorAll("[data-sky]")

export function setupSky() {
    setCustomProperty(skyElems[0], "--left", 0)
    setCustomProperty(skyElems[1], "--left", 400)
}

export function updateSky(delta, speedScale) {
    skyElems.forEach(sky => {
        incrementCustomProperty(sky, "--left", delta * SPEED3  * speedScale * -1)
        if (getCustomProperty(sky, "--left") < -400) {
            incrementCustomProperty(sky, "--left", 800)
        }
    })
}