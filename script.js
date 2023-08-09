import { updateGround, setupGround } from "./ground.js"
import { updatePlayer, setupPlayer, getPlayerRect, setPlayerLose } from "./player.js"
import { updateObstacle, setupObstacle, getObstacleRects } from "./obstacle.js"
import { updateGem, setupGem, getGemRects } from "./gem.js"

const GAME_WIDTH = 100
const GAME_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const gameElem = document.querySelector("[data-game]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const distanceTotalScoreEleme = document.querySelector("[data-distance-total-score]")
const gemTotalScoreElem = document.querySelector("[data-gem-total-score]")

const gemScoreElem = document.querySelector("[data-gem-score ]")

setPixelToGameScale()
window.addEventListener("resize", setPixelToGameScale)
document.addEventListener("mousedown", handleStart, { once: true })

let lastTime
let speedScale
let score
let gemScore = 0

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updatePlayer(delta, speedScale)
  updateObstacle(delta, speedScale)
  updateGem(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  checkIfWeGotGem()

  // if there is a collision, lose the game
  if (checkLose()) return handleLose()
  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const playerRect = getPlayerRect()
  return getObstacleRects().some(rect => isCollision(rect, playerRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top 
  )
}

function checkIfWeGotGem() {
  const playerRect = getPlayerRect()
  if(getGemRects().some(rect => isCollision(rect, playerRect))) {
    const gemToRemove = document.querySelectorAll("[data-gem]")[0]
    gemToRemove.remove()
    gemScore += 1
    gemScoreElem.textContent = `Gems: ${gemScore}`
  }
  return getGemRects().some(rect => isCollision(rect, playerRect))
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = `Meters: ${Math.floor(score)}` 
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupPlayer()
  setupObstacle()
  setupGem()
  startScreenElem.classList.add("hide")
  // call this only when screen refreshes
  window.requestAnimationFrame(update)
}

window.totalGemScore = 0
window.totalDistanceScore = 0

function handleLose() {
  window.totalDistanceScore += Math.floor(score)  
  window.totalGemScore += gemScore

  gemTotalScoreElem.textContent = `Total Gems Collected: ${window.totalGemScore}`
  distanceTotalScoreEleme.textContent = `Total Distance Traveled: ${window.totalDistanceScore}`

  gemScore = 0
  gemScoreElem.textContent = `Gems: ${gemScore}`
  setPlayerLose()
  // save
  setTimeout(() => {
    document.addEventListener("click", handleStart, {once: TextTrackCueList})
    startScreenElem.classList.remove("hide")
  }, 100)
}

function setPixelToGameScale() {
  let gameToPixelScale
  if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
    gameToPixelScale = window.innerWidth / GAME_WIDTH
  } else {
    gameToPixelScale = window.innerHeight / GAME_HEIGHT
  }

  gameElem.style.width = `${GAME_WIDTH * gameToPixelScale}px`
  gameElem.style.height = `${GAME_HEIGHT * gameToPixelScale}px`
}