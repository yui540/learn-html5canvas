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
      //'#243B62',
      '#F19923',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

class Noise extends DisplayObject {
  constructor(canvas, ctx, x, y, size) {
    super(canvas, ctx)

    this.size = size
    this.centerX = x
    this.centerY = y
    this.num = 200
    this.split = 360 / this.num
    this.diff = 5

    this.color = this.getColor()
    this.collection = []
    ;[...Array(this.num).keys()]
      .forEach(i => this.collection.push(i * this.split))
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.collection.forEach((angle, i) => {
      const radian = this.getRadian(angle)
      const r = (this.size / 2) + (Math.random() * this.diff)
      const x = Math.cos(radian) * r + this.centerX
      const y = Math.sin(radian) * r + this.centerY

      if (i === 0)
        this.ctx.moveTo(x, y)
      else
        this.ctx.lineTo(x, y)
    })
    this.ctx.closePath()
    this.ctx.fill()
  }

  mouseMove(x, y) {
    const diffX = this.centerX > x ? this.centerX - x : x - this.centerX
    const diffY = this.centerY > y ? this.centerY - y : y - this.centerY
    const diff = diffX > diffY ? diffX : diffY

    if (diff <= (this.size / 2)) {
      const per = 1 - (diff / (this.size / 2))
      this.diff = 140 * per + 5
    } else {
      this.diff = 5
    }
  }
}

{
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  addEventListener('mousemove', e => {
    const x = e.clientX
    const y = e.clientY

    noises.forEach(noise => noise.mouseMove(x, y))
  })

  const noises = []
  ;[...Array(100).keys()].forEach(i => {
    noises.push(new Noise(
      canvas,
      ctx,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 150,
    ))
  })

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    noises.forEach(noise => noise.draw())

    requestAnimationFrame(arguments.callee)
  })()
}
