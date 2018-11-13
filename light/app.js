class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx

    this.colors = [
      '#C45C66',
      '#C3CE5F',
      '#00ACA5',
      '#243B62',
      '#F19923',
      '#B493F3',
    ]
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
    this.x = this.canvas.width / 2
    this.y = this.canvas.height / 2

    this.sum = (Math.random() * 2) + 0.1
    this.add = 0
    this.radius = (this.canvas.height * 0.9 / 2)
    this.r = 0
    
    this.size = Math.floor(Math.random() * 30)
    this.angle = (Math.PI / 180) * ((Math.random() * 360) - 90)
  }

  drop() {
    this.add += this.sum
    this.add *= 0.95
    this.r += this.add

    if (this.r > this.radius - this.size) {
      this.r = this.radius - this.size
      this.add *= -1
    }

    this.x = this.r * Math.cos(this.angle) + (canvas.width / 2)
    this.y = this.r * Math.sin(this.angle) + (canvas.height / 2)
  }

  draw() {
    this.drop()
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fill()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = [new Particle(canvas, ctx)]
  let start = new Date().getTime()

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let current = new Date().getTime()
    if ((current - start) >= 10 && particles.length < 500) {
      particles.push(new Particle(canvas, ctx))

      start = new Date().getTime()
    }

    particles.forEach(particle => {
      particle.draw()
    })

    requestAnimationFrame(draw)
  }
  draw()
}
