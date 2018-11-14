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

class Paint extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.size = Math.random() * 80
    this.x = Math.random() * this.canvas.width
    this.y = -(this.size / 2)

    this.add = 0
  }

  draw() {
    this.add += 0.1
    this.add *= 0.98
    this.y += this.add
    this.size *= 0.998

    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
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
    //ctx.clearRect(0, 0, canvas.width, canvas.height)

    if ((currentTime - startTime) > 100) {
      collection.push(new Paint(canvas, ctx))
      startTime = Date.now()
    }

    collection.forEach(paint => paint.draw())

    requestAnimationFrame(arguments.callee)
  })()
}
