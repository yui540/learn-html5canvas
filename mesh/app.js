class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  getRadian(angle) {
    return angle * Math.PI / 180
  }
}

class Line1 extends DisplayObject {
  constructor(canvas, ctx, y) {
    super(canvas, ctx)

    this.diff = Math.random() * 40 + 10
    this.num = 50
    this.size = canvas.width / this.num
    this.y = y
    this.speed = Math.random() * 3 + .5
    this.lineWidth = .5

    this.gradient = this.ctx.createLinearGradient(0, this.y, this.canvas.width, this.y)
    this.gradient.addColorStop(0, '#6699de')
    this.gradient.addColorStop(1, '#66ffde')
    this.collection = []
    ;[...Array(this.num).keys()].forEach(i => this.collection.push((i * 10)))
  }

  draw() {
    this.ctx.strokeStyle = this.gradient
    this.ctx.lineWidth = this.lineWidth
    this.collection.forEach((angle, i) => {
      this.collection[i] += this.speed
      const x = i * this.size
      const y = Math.cos(this.getRadian(angle)) * this.diff + this.y

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

  const num = 400
  const size = canvas.height / num
  const collection = []
  ;[...Array(num).keys()].forEach(i => {
    const y = size * i
    collection.push(new Line1(canvas, ctx, y))
  })

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    collection.forEach(line => line.draw())
    ctx.stroke()

    requestAnimationFrame(arguments.callee)
  })()
}
