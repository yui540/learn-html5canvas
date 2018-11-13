class Particle {
  constructor(canvas, ctx, x, y, color) {
    this.canvas = canvas
    this.ctx = ctx

    this.color = color
    this.size = (Math.random() * 40) + 10
    this._size = this.size
    this.radius = this.size / 2
    this.centerX = x
    this.centerY = y
    this.x = this.centerX
    this.y = this.centerY

    this.vx = 20 * (Math.random() - 0.5)
    this.vy = 0
  }

  draw() {
    this.vx *= 0.98
    this.vy -= 1
    this.vy *= 0.98
    this.radius *= 0.97

    this.x += this.vx
    this.y += this.vy

    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.fillStyle = this.color
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = 30
    this.ctx.moveTo(this.x + this.radius, this.y)
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.lineTo(this.x + this.radius, this.y)
  }
}

class Bubble {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas
    this.ctx = ctx

    this.color = '#67a1c2'
    this.x = x
    this.y = y
    
    this.limit = 20
    this.interval = 30
    this.startTime = Date.now()

    this._collection = [new Particle(
      canvas,
      ctx,
      this.x,
      this.y,
      this.color,
    )]
  }

  draw() {
    const currentTime = Date.now()

    if ((currentTime - this.startTime) > this.interval) {
      if (this._collection.length <= this.limit - 1) {
        this._collection.push(new Particle(
          this.canvas,
          this.ctx,
          this.x,
          this.y,
          this.color,
        ))
      }

      this.startTime = Date.now()
    }
  
    this.ctx.beginPath()
    this._collection.forEach(particle => particle.draw())
    this.ctx.closePath()
    this.ctx.fill()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  /*const collection = [new Bubble(
    canvas,
    ctx,
    Math.random() * canvas.width,
    Math.random() * canvas.height,
  )]*/
  const collection = []
  let startTime = Date.now()

  let s = Date.now()
  addEventListener('mousemove', e => {
    let c = Date.now()

    if ((c - s) > 40) {
      collection.push(new Bubble(
        canvas,
        ctx,
        e.clientX,
        e.clientY,
      ))

      s = Date.now()
    }
  })

  ;(function tick() {
    let currentTime = Date.now()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    /*if ((currentTime - startTime) > 50) {
      collection.push(new Bubble(
        canvas,
        ctx,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
      ))

      startTime = Date.now()
    }*/

    collection.forEach(bubble => bubble.draw())

    requestAnimationFrame(tick)
  })()
}
