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
    document.querySelectorAll("[data-nft]").forEach(nft => {
        incrementCustomProperty(nft, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(nft, "--left") <= -100) {
            nft.remove()
        }
    })

    if (nextNFTTime <= 0) {
        createNft()
        nextNFTTime = randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
    }
    nextNFTTime -= delta
}


export function getNftRects() {
    return [...document.querySelectorAll("[data-nft]")].map(nft => {
        return NodeFilter.getBoundingClientRect()
    })
}

function createNft() {
    const nft = document.createElement("img")
    nft.dataset.createNft = true

    // TODO: Set img druggo nft
    nft.src = "assets/nft.png"
    nft.classList.add("nft")
    setCustomProperty(nft, "--left", 100)
    gameElem.append(nft)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}