class Particle {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas
    this.ctx = ctx

    this.size = Math.random() * 80
    this.radius = this.size / 2
    this.centerX = x
    this.centerY = y
    this.x = this.centerX
    this.y = this.centerY

    this.dire = [1, -1][Math.round(Math.random() * 1)]
    this.swing = Math.random() * 90 * this.dire
    this.color = '#00ACA5'

    this.addX = this.dire * (Math.random() * 20)
    this.addY = 0
  }

  draw() {
    this.addY -= 1
    this.addX *= 0.95
    this.addY *= 0.95
    this.radius *= 0.98
    this.x += this.addX
    this.y += this.addY

    this.ctx.beginPath()
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = 30
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.fillStyle = this.color
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.closePath()
    this.ctx.fill()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const particles = [new Particle(canvas, ctx, canvas.width/2, canvas.height-30)]
  let start = Date.now()

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    let current = Date.now()
    if ((current - start) > 10) {
      particles.push(new Particle(canvas, ctx, canvas.width/2, canvas.height-30))
      particles.push(new Particle(canvas, ctx, canvas.width/2, canvas.height-30))
    
      start = Date.now()
    }

    particles.forEach(particle => particle.draw())
  
    requestAnimationFrame(tick)
  })()
}
