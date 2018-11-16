class DisplayObject {
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
  }
}

class Circle extends DisplayObject {
  constructor(canvas, ctx, x, y) {
    super(canvas, ctx)

    this.x = x
    this.y = y
    this.size = Math.random() * 100 + 20

    this.opacity = 1
    this.add = 0
    this.angle = -90
  }

  draw() {
    this.add += 1
    this.add *= 0.98
    this.angle += this.add

    if (this.angle > 270) {
      this.opacity *= .95
      this.size *= .99
    }

    const radian = this.getRadian(this.angle)

    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.globalAlpha = this.opacity
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size, this.getRadian(-90), radian)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.closePath()
    this.ctx.fill()
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const circle = new Circle(canvas, ctx, canvas.width/2, canvas.height/2)
  const collection = []

  let startTime = Date.now()

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let currentTime = Date.now()
    if ((currentTime - startTime) > 30) {
      collection.push(new Circle(
        canvas,
        ctx,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
      ))
      startTime = Date.now()
    }

    collection.forEach(circle => circle.draw())
  
    requestAnimationFrame(arguments.callee)
  })()
}
