class Bg {
  constructor(canvas, ctx, src) {
    this.canvas = canvas
    this.ctx = ctx

    this.img = new Image()
    this.img.onload = () => {
      this.load = true
    }
    this.img.src = src
  }

  draw() {
    if (!this.load) return false
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height)
  }
}

class Particle {
  constructor(canvas, ctx, bottom) {
    this.canvas = canvas
    this.ctx = ctx

    this.size = (Math.random() * 34) + 4
    this.x = Math.random() * this.canvas.width
    this.y = -this.size
    this.add = 0
    this.bottom = bottom
  }

  draw() {
    this.add += 1
    this.add *= 0.95
    this.y += this.add

    if (this.y > this.bottom - this.size) {
      this.y = this.bottom - this.size
      this.add *= -1
    }

    this.ctx.globalCompositeOperation = 'destination-in'
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
  }
}

class Bubble {
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
    this.size = (Math.random() * 8) + 1
    this.x = Math.random() * this.canvas.width
    this.y = -this.size
    this.add = 0
  }

  draw() {
    this.add += 0.5
    this.add *= 0.95
    this.y += this.add

    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.fillStyle = this.color
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.closePath()
    this.ctx.fill()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 800
  canvas.height = 420

  const bg = new Bg(canvas, ctx, 'ogp.png')

  const particles = [new Particle(canvas, ctx, canvas.height)]
  const bubbles = [new Bubble(canvas, ctx)]

  let start = Date.now()
  let start2 = Date.now()
  let bottom = canvas.height

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let current = Date.now()
    if ((current - start) > 10) {
      particles.push(new Particle(canvas, ctx, bottom))
      start = Date.now()
      bottom -= 0.5
    }
    if ((current - start2) > 40) {
      bubbles.push(new Bubble(canvas, ctx))
      start2 = Date.now()
    }

    bg.draw()
    
    ctx.beginPath()
    particles.forEach(particle => particle.draw())
    ctx.closePath()
    ctx.fill()
    
    bubbles.forEach(bubble => bubble.draw())

    requestAnimationFrame(tick)
  })()
}
