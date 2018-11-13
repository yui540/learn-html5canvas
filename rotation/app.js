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

    this.size = (Math.random() * 3) + 2
    this.centerX = this.canvas.width / 2
    this.centerY = this.canvas.height / 2
    this.x = 0
    this.y = 0
    this.angle = Math.random() * 360
    this.radius = (this.canvas.height * 0.9 / 2) * ((Math.random() * 0.8) + 0.2)
    this.sum = (Math.random() * 2) + 1

    this.buff = []
  }

  getAngle(angle) {
    return (Math.PI / 180) * angle
  }

  draw() {
    this.angle += this.sum

    if (this.angle >= 360) {
      this.angle = 0
    }

    const angle = this.getAngle(this.angle)

    this.x = this.radius * Math.cos(angle) + this.centerX
    this.y = this.radius * Math.sin(angle) + this.centerY

    this.buff.unshift({ x: this.x, y: this.y })
    if (this.buff.length > 30) this.buff.pop()

    this.ctx.fillStyle = this.color
    //this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.beginPath()
    this.ctx.globalAlpha = 0.1
    this.buff.forEach(c => {
      this.drawCircle(c.x, c.y, this.size)
    })
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.beginPath()
    this.ctx.globalAlpha = 1
    this.drawCircle(this.x, this.y, this.size)
    this.ctx.closePath()
    this.ctx.fill()
  }

  drawCircle(x, y, size) {
    this.ctx.moveTo(x, y)
    this.ctx.arc(x, y, size, 0, Math.PI * 2)
    this.ctx.lineTo(x, y)
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(canvas, ctx))
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
      particle.draw()
    })
    
    requestAnimationFrame(draw)
  }
  draw()

  window.addEventListener('mousemove', e => {
    particles.forEach(particle => {
      particle.centerX = e.clientX
      particle.centerY = e.clientY
    })
  })
}
