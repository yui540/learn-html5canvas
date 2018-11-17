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
      '#F19923',
      '#B493F3',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }
}

class Circle extends DisplayObject {
  constructor(canvas, ctx, x, y, size) {
    super(canvas, ctx)

    this.size = size
    this.x = x
    this.y = y
    this.num = 5
    this.max = 360
    this.color = this.getColor()
    
    this.collection = []
    ;[...Array(this.num - 1).keys()].forEach(i => {
      const sum = this.getSum(this.collection)
      const diff = this.max - sum

      const angle = Math.random() * diff
      this.collection.push({
        angle,
        radius: 0,
        state: 0,
        speed: Math.random() * .5 + .1,
        opacity: 1,
      })
    })

    const sum = this.getSum(this.collection)
    const angle = this.max - sum

    this.collection.push({
      angle,
      radius: 0,
      state: 0,
      speed: Math.random() * .3 + .1,
      opacity: 1,
    })
  }

  getSum(arr) {
    let sum = 0
    arr.forEach(data => {
      sum += data.angle
    })
    return sum
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()

    let endAngle = 0
    this.collection.forEach(data => {
      const startAngle = endAngle
      endAngle += data.angle
      const diff = (endAngle - startAngle) / 2

      data.opacity *= .95
      data.state += data.speed
      data.state *= .94
      data.radius += data.state

      const x = Math.cos(this.getRadian(startAngle + diff)) * data.radius + this.x
      const y = Math.sin(this.getRadian(startAngle + diff)) * data.radius + this.y

      this.ctx.globalAlpha = data.opacity
      this.ctx.moveTo(x, y)
      this.ctx.arc(
        x,
        y,
        this.size,
        this.getRadian(startAngle),
        this.getRadian(endAngle)
      )
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
    if ((currentTime - startTime) > 100) {
      const size = Math.random() * 140 + 5
      collection.push(new Circle(
        canvas,
        ctx,
        Math.random() * (canvas.width - size),
        Math.random() * (canvas.height - size),
        size
      ))
      startTime = Date.now()
    }

    collection.forEach(circle => circle.draw())
  
    requestAnimationFrame(arguments.callee)
  })()
}
