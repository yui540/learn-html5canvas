class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  getColor() {
    const colors = [
      '#C45C66',
      '#C3CE5F',
      '#00ACA5',
      '#243B62',
      '#F19923',
      '#B493F3',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  getAngle(angle) {
    return Math.PI * angle / 180
  }
}

class Ball extends DisplayObject {
  constructor(canvas, ctx, x, y, size, color) {
    super(canvas, ctx)

    this.color = color
    this.size = size
    this.centerX = x
    this.centerY = y
    this.angle = Math.random() * 360

    this.add = 0
    this.radius = 0
  }

  draw() {
    this.add += 1
    this.add *= .96
    this.radius += this.add
    this.size *= .99

    const angle = this.getAngle(this.angle)
    const x = Math.cos(angle) * this.radius + this.centerX
    const y = Math.sin(angle) * this.radius + this.centerY

    this.ctx.globalCompositeOperation = 'overlay'
    this.ctx.fillStyle = this.color
    this.ctx.globalAlpha = .05
    this.ctx.moveTo(x, y)
    this.ctx.arc(x, y, this.size, 0, Math.PI * 2)
    this.ctx.lineTo(x, y)
  }
}

class Paint extends DisplayObject {
  constructor(canvas, ctx, x, y) {
    super(canvas, ctx)

    this.x = x
    this.y = y
    this.color = this.getColor()
    this.collection = []
    this.startTime = Date.now()
  }

  draw() {
    const currentTime = Date.now()
    if ((currentTime - this.startTime) > 50) {
      const size = Math.random() * 30
      this.collection.push(new Ball(
        this.canvas,
        this.ctx,
        this.x,
        this.y,
        size,
        this.color,
      ))
      this.collection.push(new Ball(
        this.canvas,
        this.ctx,
        this.x,
        this.y,
        size,
        this.color,
      ))
      this.collection.push(new Ball(
        this.canvas,
        this.ctx,
        this.x,
        this.y,
        size,
        this.color,
      ))
      this.collection.push(new Ball(
        this.canvas,
        this.ctx,
        this.x,
        this.y,
        size,
        this.color,
      ))


      this.startTime = Date.now()
    }

    this.ctx.beginPath()
    this.collection.forEach(ball => ball.draw())
    this.ctx.closePath()
    this.ctx.fill()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const collection = []
  let startTime = Date.now()

  ;(function() {
    let currentTime = Date.now()
    if ((currentTime - startTime) > 500) {
      collection.push(new Paint(
        canvas,
        ctx,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
      ))

      startTime = Date.now()
    }

    collection.forEach(paint => paint.draw())

    requestAnimationFrame(arguments.callee)
  })()
}
