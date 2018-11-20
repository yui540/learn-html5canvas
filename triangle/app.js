class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  getColor() {
    const color = [
      '#C9608B',
      '#E9C2D0',
    ]
    
    return color[Math.round(Math.random() * (color.length - 1))]
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

class Triangle extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.x = this.canvas.width * ((Math.random() + Math.random()) / 2)
    this.y = 0
    this.color = this.getColor()
    this.points = []
    ;[...Array(3).keys()].forEach(i => {
      const r = Math.random() * 100 + 50
      const angle = Math.random() * 360
      this.points.push({ r, angle })
    })

    this.add = 0
  }

  draw() {
    this.add += 1
    this.add *= .95
    this.y += this.add

    this.ctx.globalCompositeOperation = 'overlay'
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.points.forEach((point, i) => {
      point.angle += 2
      const radian = this.getRadian(point.angle)
      const x = Math.cos(radian) * point.r + this.x
      const y = Math.sin(radian) * point.r + this.y

      if (i === 0)
        this.ctx.moveTo(x, y)
      else
        this.ctx.lineTo(x, y)
    })
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let currentTime = Date.now()
    if ((currentTime - startTime) > 30) {
      collection.push(new Triangle(canvas, ctx))
      collection.push(new Triangle(canvas, ctx))
      collection.push(new Triangle(canvas, ctx))
    
      startTime = Date.now()
    }

    collection.forEach(triangle => triangle.draw())
  
    requestAnimationFrame(arguments.callee)
  })
}
