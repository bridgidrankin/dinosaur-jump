import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 2000
const gameElem = document.querySelector("[data-game]")

let nextGemTime
export function setupGem() {
  nextGemTime = OBSTACLE_INTERVAL_MIN
  // remove all obstacles before the game starts again
  document.querySelectorAll("[data-gem]").forEach(gem => {
    gem.remove()
  })
}

export function updateGem(delta, speedScale) {
  document.querySelectorAll("[data-gem]").forEach(gem => {
    incrementCustomProperty(gem, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(gem, "--left") <= -100) {
      gem.remove()
    }
  })

  if (nextGemTime <= 0) {
      createGem()
    nextGemTime =
      randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
  }
  nextGemTime -= delta
}

export function getGemRects() {
  return [...document.querySelectorAll("[data-gem]")].map(gem => {
    return gem.getBoundingClientRect()
  })
}

function createGem() {
  const gem = document.createElement("img")
  gem.dataset.gem = true
  gem.src = "imgs/blueGem.png"
  gem.classList.add("gem")
  setCustomProperty(gem, "--left", 100)
  gameElem.append(gem)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
