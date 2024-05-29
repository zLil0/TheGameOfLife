const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


const cellSize = 5

const width = innerWidth - (innerWidth % cellSize)
const height = innerHeight - (innerHeight % cellSize)
canvas.width = width
canvas.height = height

let gen = []
let cols = canvas.width / cellSize
let rows = canvas.height / cellSize


const createGeneration = () => {
    for (let i = 0; i < cols; i++) {
        gen.push([])
        for (let j = 0; j < rows; j++) {
            if(!(i === 0 || i === cols-1 || j === 0 || j === rows-1 )){
                gen[i].push(Math.floor(Math.random()*2))
            }
            else {
                gen[i].push(0)
            }
        }
    }
}

createGeneration()

const draw = (cellSize) => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * cellSize
            const y = j * cellSize

            if(gen[i][j] === 1){
                c.beginPath()
                c.fillStyle = 'white'
                c.fillRect(x, y, cellSize, cellSize)
                c.closePath()
            }
        }
    }
}


const countNeighboors = (gen, x, y) => {
    let sum = 0
    for(let i = -1; i<2; i++){
        for(let j = -1; j<2; j++){
            sum+=gen[x + i][y + j]
        }
    }
    sum -=gen[x][y]
    return sum
}

const applyRules = (gen) =>{
    let nextGen = []
    for (let i = 0; i < cols; i++) {
        nextGen.push([])
        for (let j = 0; j < rows; j++) {
            if(!(i === 0 || i === cols-1 || j === 0 || j === rows-1 )){
                let neighboors = countNeighboors(gen, i, j)
                let state = gen[i][j]
                if(state == 0 && neighboors === 3){
                    nextGen[i][j] = 1
                }
                else if(state == 1 && (neighboors<2 || neighboors>3)){
                    nextGen[i][j] = 0
                }
                else{
                    nextGen[i][j] = state
                }
            }
            else{
                nextGen[i][j] = 0
            }
            
        }
    }

    return nextGen
}
draw(cellSize)


const animate = () => {
    let ticker = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    draw(cellSize)
    if(ticker %1 == 0){
        gen  = applyRules(gen)
    }
}
animate()

addEventListener('resize', () => {
    canvas.width = width
    canvas.height = height
})
