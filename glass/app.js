class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  getColor() {
    const color = [
      '#B462AE',
      '#4A5599',
      '#C286B6',
      '#8E88CC',
    ]

    return color[Math.round(Math.random() * (color.length - 1))]
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

class Triangle extends DisplayObject {
  constructor(canvas, ctx, color) {
    super(canvas, ctx)

    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height

    this.color = color
    this.collection = []
    ;[...Array(3).keys()].forEach(i => {
      const r = Math.random() * 100 + 50
      const angle = Math.random() * 360
      this.collection.push({ r, angle })
    })
    
    this.add = Math.random() + 0.1
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.globalAlpha = 0.4
    this.collection.forEach((point, i) => {
      point.angle += this.add
      const radian = this.getRadian(point.angle)
      const x = Math.cos(radian) * point.r + this.x
      const y = Math.sin(radian) * point.r + this.y

      if (i === 0)
        this.ctx.moveTo(x, y)
      else
        this.ctx.lineTo(x, y)
    })
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const collection1 = []
  const collection2 = []
  const collection3 = []
  const collection4 = []
  ;[...Array(100).keys()].forEach(i => {
    collection1.push(new Triangle(canvas, ctx, '#B462AE'))
    collection2.push(new Triangle(canvas, ctx, '#4A5599'))
    collection3.push(new Triangle(canvas, ctx, '#C286B6'))
    collection4.push(new Triangle(canvas, ctx, '#8E88CC'))
  })

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    collection1.forEach(triangle => triangle.draw())
    ctx.fill()
    ctx.beginPath()
    collection2.forEach(triangle => triangle.draw())
    ctx.fill()
    ctx.beginPath()
    collection4.forEach(triangle => triangle.draw())
    ctx.fill()
    ctx.beginPath()
    collection3.forEach(triangle => triangle.draw())
    ctx.fill()

    requestAnimationFrame(arguments.callee)
  })()
}
