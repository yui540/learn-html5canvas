class Particle {
  constructor(canvas, ctx, mode) {
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
    this.size = (Math.random() * 80) + 4
    this.sizeMax = this.size
    this.x = this.canvas.width * Math.random()
    this.y = this.canvas.height / 2

    this.mode = mode
    this.add = 0
    this.type = Math.round(Math.random() * 1)
  }

  drop() {
    const size = this.canvas.height - (this.canvas.height / 2)
    const progress = Math.abs((this.y - this.canvas.height) / size)
    this.add += 1
    this.size = this.sizeMax * progress

    this.y += this.add
  }

  up() {
    const progress = 1 - ((this.canvas.height / 2) - this.y) / this.canvas.height
    this.add += 1
    this.size = this.sizeMax * progress

    this.y -= this.add
  }

  draw() {
    if (this.mode === 'bottom')
      this.drop()
    else
      this.up()

    if (this.size < 0) return

    if (this.type)
      this.stroke()
    else
      this.fill()
  }
  
  stroke() {
    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = 1.5
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  fill() {
    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const mode = ['bottom', 'top']
  const particles = [new Particle(canvas, ctx, 'top')]
  let start = Date.now()

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let current = Date.now()
    if ((current - start) > 3) {
      const num = Math.round(Math.random() * 1)
      particles.push(new Particle(canvas, ctx, mode[num]))
      start = Date.now()
    }

    particles.forEach(particle => particle.draw())

    requestAnimationFrame(tick)
  })
}
