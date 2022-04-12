import plateform  from "img/platform.png";

console.log(plateform);

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.5

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30
    }
    draw() {
      c.fillStyle = 'red'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update()  { 
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 
        
       if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }

}

class Plateform { 
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = 'blue'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()

const plateforms = [new Plateform({
    x: 200,
    y: 100
}), new Plateform({
    x:600,
    y:300
})]


const keys = {
    right: {
        pressed: false
    }, 
    left: {
        pressed: false
    }
}

let srcollOffset = 0

function animate () {
requestAnimationFrame(animate)
c.clearRect(0, 0, canvas.width, canvas.height)
 player.update() 
 plateforms.forEach(plateform => {
      plateform.draw()
 }) 

    if (keys.right.pressed && player.position.x <= 400) {
        plateforms.forEach(plateform => {
            plateform.draw()
       }) 
        player.velocity.x = 5;
    } else if(keys.left.pressed && player.position.x >= 100 ) {
        player.velocity.x = -5
    }
    else {player.velocity.x = 0

        if (keys.right.pressed) {
            srcollOffset -= 5 
            plateforms.forEach(plateform => {
            
                plateform.position.x -= 5 
           }) 
        
        } else if (keys.left.pressed) {
            srcollOffset += 5
            plateforms.forEach(plateform => {
                plateform.position.x += 5
           }) 
           
        }
    }
    plateforms.forEach(plateform => {
    if (player.position.y + player.height <= plateform.position.y && player.position.y + player.height + player.velocity.y >= plateform.position.y && player.position.x + player.width >= plateform.position.x && player.position.x <= plateform.position.x + plateform.width) {
        player.velocity.y = 0
    }
}) 
if (srcollOffset > 200) { 
    console.log("win");
}

}



animate()

window.addEventListener('keydown', function ({ keyCode }) {
        switch (keyCode) {
            case 83:
                keys.left.pressed = true
                break
            case 69:
                
                break
            case 70:
                keys.right.pressed = true
                break

        }
    })



window.addEventListener('keyup', function ({ keyCode }) {
        switch (keyCode) {
            case 83:

                keys.left.pressed = false
                break
            case 69:
                player.velocity.y -= 20
                break
            case 70:
                keys.right.pressed = false
                break

        }
    })