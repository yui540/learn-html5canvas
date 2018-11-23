class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

class Ball extends DisplayObject {
  constructor(canvas, ctx, x, y, size, i) {
    super(canvas, ctx)

    this.i = i
    this.size = size
    this.color = '#C45C66'
    this.centerX = x
    this.centerY = y
    this.x = this.centerX
    this.y = -this.size/2

    this.add = 0
    this.speed = Math.random() + 0.2
    this.emitTime = Math.random() * 1000
  }

  draw() {
    const currentTime = Date.now()
    if ((currentTime - startTime) <= this.emitTime) return

    this.add += this.speed
    this.add *= .95
    this.y += this.add

    if (this.y > this.centerY - this.size / 2) {
      this.y = this.centerY - this.size / 2
      this.add *= -1
    }
    this.ctx.fillStyle = this.color
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
  }
}

class Text extends DisplayObject {
  constructor(canvas, ctx, x, y, collection) {
    super(canvas, ctx)

    this.x = x
    this.y = y
    this.collection = collection
    this.particles = []
    this.collection.forEach((data, i) => {
      const x = data.x + this.x
      const y = data.y + this.y
      const size = 1
      this.particles.push(new Ball(
        canvas, ctx,
        x, y, size, i
      ))
    })
  }

  draw() {
    this.ctx.beginPath()
    this.particles.forEach(ball => ball.draw())
    this.ctx.fill()
  }
}

{
  const canvas = document.getElementById('canvas')
  const offScreen = document.getElementById('hidden-canvas')
  const ctx = canvas.getContext('2d')
  const c = offScreen.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight
  offScreen.width = innerWidth
  offScreen.height = innerHeight

  const fontSize = 200
  c.font = `${fontSize}px sans-serif`
  c.fillStyle = '#000'
  c.textAlign = 'left'
  c.textBaseline = 'top'
  c.fillText('動', 0, 0)

  const width = c.measureText('動').width
  const height = fontSize
  const data = c.getImageData(0, 0, width, height)

  const collection = []
  for (let i = 0, c = 0; i < data.data.length; i += 4, c++) {
    if (data.data[i+3] > 100) {
      const y = Math.floor(c / width)
      const x = c - (width * y)

      collection.push({ x, y })
    }
  }

  const text = new Text(canvas, ctx, canvas.width/2-width/2, canvas.height/2-height/2, collection)

  window.startTime = Date.now()
  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    text.draw()

    requestAnimationFrame(arguments.callee)
  })()
}
