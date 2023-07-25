import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 2000
const gameElem = document.querySelector("[data-game]")

let nextNFTTime
export function setupNft() {
    nextNFTTime = OBSTACLE_INTERVAL_MIN
    // remove NFTs before the game starts again
    document.querySelectorAll("[data-nft]").forEach(nft => {
        nft.remove()
    })
}

export function updateNft(delta, speedScale) {
    
}