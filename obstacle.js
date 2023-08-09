import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  // ground and obstacle should move at the same speeed
  const SPEED = 0.05
  const OBSTACLE_INTERVAL_MIN = 750
  const OBSTACLE_INTERVAL_MAX = 2500
  const worldElem = document.querySelector("[data-game]")
  
  let nextObstacleTime
  export function setupObstacle() {
    // spawn an obstacle quickly once the game starts
    nextObstacleTime = OBSTACLE_INTERVAL_MIN
    // remove all obstacles before the game starts again
    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
      obstacle.remove()
    })
  }
  
  export function updateObstacle(delta, speedScale) {
    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
      incrementCustomProperty(obstacle, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(obstacle, "--left") <= -100) {
        obstacle.remove()
      }
    })
  
    if (nextObstacleTime <= 0) {
      createObstacle()
      nextObstacleTime =
        randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
    }
    // make the next obstacle time smaller to eventually reach 0 and spawn new obstacle
    nextObstacleTime -= delta
  }
  
  export function getObstacleRects() {
    return [...document.querySelectorAll("[data-obstacle]")].map(obstacle => {
      // this getBoundingClientRect gives out the dimensions for our obstacle
      return obstacle.getBoundingClientRect()
    })
  }
  
  function createObstacle() {
    const obstacle = document.createElement("img")
    obstacle.dataset.obstacle = true
    obstacle.src = "imgs/obstacle.png"
    obstacle.classList.add("obstacle")
    setCustomProperty(obstacle, "--left", 100)
    worldElem.append(obstacle)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }