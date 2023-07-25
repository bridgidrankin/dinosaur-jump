import { updateGround, setupGround } from "./ground.js"
import { updatePlayer, setupPlayer, getPlayerRect } from "./player.js"
import { updateObstacle, setupObstacle, getObstacleRects } from "./obstacle.js"
import { updateNft, setupNft, getNftRects } from "./nft.js"



const GAME_WIDTH = 100
const GAME_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const gameElem = document.querySelector("data-game")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const gweiTotalScoreElem = document.querySelector("[data-wei-total-score]")
const nftTotalScoreElem = document.querySelector("[data-nft-total-score]")
const nftScoreElem = document.querySelector("[data-nft-score]")

setPixelToGameScale()
window.addEventListener("resize", setPixelToGameScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale 
let score
let nftScore = 0

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
    updateNft(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    checkIfWeGotNft()

    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(update)
    
}



function setPixelToGameScale() {
    let gameToPixelScale
    if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
        gameToPixelScale = window.innerWidth / GAME_WIDTH
    } else {
        gameToPixelScale = window.innerHeight / GAME_HEIGHT
    }

    gameElem.computedStyleMap.width = '${GAME_WIDTH * gameToPixelScale}px'
    gameElem.computedStyleMap.height = '${GAME_HEIGHT * gameToPixelScale}px'
}