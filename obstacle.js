import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 2000
const worldElems = document.querySelector("[data-game]")

let nextObstacleTime
export function setupObstacles() {
    nextObstacleTime = OBSTACLE_INTERVAL_MIN

    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
        obstacle.remove()
    })
}

export function updateObstacle(delta, speedScale) {
    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
        incrementCustomProperty(obstacle, "--left", delta * speedScale * SPEED * -1) 
        if (getCustomProperty(obstacle, "--left") <= 100) {
            obstacle.remove()
        }
    })

    if (nextObstacleTime <= 0) {
        createObstacle()

        nextObstacleTime = randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
    }

    nextObstacleTime -= delta
}

export function getObstacleRects() {
    return [...document.querySelectorAll("[data-obstacle]")].map(obstacle => {
        return obstacle.getBoundingClientRect()
    })
}

function createObstacle() {
    const obstacle = document.createElement("img")
    obstacle.dataset.obstacle = true

    obstacle.src = "assets/obstacle.png"
    obstacle.classList.add("obstacle")
    setCustomProperty(obstacle, "--left", 100)
    worldElems.append(obstacle)
}