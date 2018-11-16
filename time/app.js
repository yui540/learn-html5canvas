class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.colors = [
      '#C45C66',
      '#C3CE5F',
      '#00ACA5',
      '#F19923',
      '#B493F3',
    ]
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
  }
}

class Circle extends DisplayObject {
  constructor(canvas, ctx, x, y, size) {
    super(canvas, ctx)

    this.size = size
    this.x = x
    this.y = y

    this.v = Math.random() * .3
    this.add1 = 0
    this.add2 = 0
    this.angle1 = -90
    this.angle2 = -90
  }

  on(fn) {
    this.fn = fn
  }

  draw() {
    this.add2 += this.v
    this.angle2 += this.add2

    if (this.angle2 >= 270) {
      this.angle2 = 270
      this.add2 = 0

      this.add1 += this.v
      this.angle1 += this.add1

      if (this.angle2 >= 270 && this.angle1 >= 270) {
        this.angle1 = 270
        this.angle2 = 270
      }
    }

    const radian1 = this.getRadian(this.angle1)
    const radian2 = this.getRadian(this.angle2)

    this.ctx.globalCompositeOperation = 'multiply'
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size, radian1, radian2)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.closePath()
    this.ctx.fill()

    if (this.angle2 >= 270 && this.angle1 >= 270) {
      this.fn()
    }
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

  const collection = []
  let startTime = Date.now()

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let currentTime = Date.now()
    if ((currentTime - startTime) > 100) {
      const size = Math.random() * 50 + 10
      const circle = new Circle(
        canvas,
        ctx,
        Math.random() * canvas.width - size,
        Math.random() * canvas.height - size,
        //canvas.height / 2,
        size
      )
      circle.on(() => {})

      collection.push(circle)
      startTime = Date.now()
    }

    collection.forEach(circle => circle.draw())
    
    requestAnimationFrame(arguments.callee)
  })()
}
