import '../styles/style.css'

const Snow = {
    el: "#snow", 
    density: 10000, // higher = fewer bits
    maxHSpeed: 5, // How much do you want them to move horizontally
    minFallSpeed: 1,
    canvas: null,
    ctx: null,
    particles: [],
    colors: [],
    mp: 1,
    quit: false,
    init() {
        this.canvas = document.querySelector(this.el)
        this.ctx = this.canvas.getContext("2d")
        this.reset()
        
        requestAnimationFrame(this.render.bind(this))

        window.addEventListener("resize", this.reset.bind(this))
    },
    reset() {
        this.w = window.innerWidth
        this.h = window.innerHeight
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.particles = []
        this.mp = Math.ceil(this.w * this.h / this.density)

        for(let i = 0; i < this.mp; i++){
            let size = Math.random() * 4 + 5

            this.particles.push({
                x: Math.random() * this.w, //x-coordinate
                y: Math.random() * this.h, //y-coordinate
                w: size,
                h: size,
                vy: this.minFallSpeed + Math.random(), //density
                vx: (Math.random() * this.maxHSpeed) - this.maxHSpeed/2,
                fill: "#ffffff",
                s: (Math.random() * 0.2) - 0.1
            })
        }
    },
    
    render() {
        this.ctx.clearRect(0, 0, this.w, this.h)

        this.particles.forEach((p,i) => {
            p.y += p.vy
            p.x += p.vx
            this.ctx.fillStyle = p.fill
            this.ctx.fillRect(p.x, p.y, p.w, p.h)

            if (p.x > this.w + 5 || p.x < -5 || p.y > this.h) {
                p.x = Math.random() * this.w
                p.y = -10
            }
        })

        if (this.quit) {
            return
        }

        requestAnimationFrame(this.render.bind(this))
    },
    destroy() {
        this.quit = true
    }
}
  
var confetti = Snow.init();
let interval
let loveContainer = document.querySelector('.c-love-team-container')
let loveTeam = [...document.querySelectorAll(".c-love-team")]
let index = 0
let nextIndex = 1
let trigger = document.querySelector(".c-trigger")

const randomLove = () => {
    loveContainer.style.display = "block"

    loveTeam[index].style.display = "block"
    loveTeam[nextIndex].style.display = "none"

    index = nextIndex
    nextIndex = (index == 0) ? 1 : 0
}

document.querySelector(".c-love").addEventListener('mouseenter', () => {
    randomLove()

    interval = setInterval(() => {
        randomLove()
    }, 100)
})

document.querySelector(".c-love").addEventListener('mouseleave', () => {
    loveContainer.style.display = "none"
    clearInterval(interval)
})

trigger.addEventListener("click", () => {
    document.querySelector(".c-maria").style.display = "block"
    document.querySelector(".c-maria video").play()
})
  