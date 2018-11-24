const getImageData = (text, size) => {
  const canvas = document.getElementById('off-canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  ctx.font = `${size}px sans-serif`
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'top'
  ctx.textAlign = 'left'
  ctx.fillText(text, 0, 0)

  const width = ctx.measureText(text).width
  const height = size

  const data = ctx.getImageData(0, 0, width, height).data
  const collection = []

  for (let i=0,c=0; i < data.length; i+=4,c++) {
    if (data[i+3] > 0) {
      const y = Math.floor(c / width)
      const x = c - (y * width)

      collection.push({ x, y })
    }
  }

  return collection
}

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
  constructor(canvas, ctx, x, y) {
    super(canvas, ctx)

    this.size = 5
    this.x = x
    this.y = y

    this.r = Math.random() * 500
    this.angle = Math.random() * 360
    this.speed = Math.random() * 3 + 0.2
    this.per = 1
    this.loss = -0.002
  }

  draw() {
    this.angle += this.speed
    this.per += this.loss

    if (this.per < 0) {
      this.loss = 0
      this.per = 0
    }

    const radian = this.getRadian(this.angle)
    const size = this.size
    const r = this.r * this.per + 10
    const x = Math.cos(radian) * r + this.x
    const y = Math.sin(radian) * r + this.y

    this.ctx.moveTo(x, y)
    this.ctx.arc(x, y, size, 0, Math.PI * 2)
    this.ctx.lineTo(x, y)
  }
}

class Text extends DisplayObject {
  constructor(canvas, ctx, x, y, data, size, per) {
    super(canvas, ctx)

    this.per = per
    this.size = size
    this.x = x
    this.y = y
    this.data = data
    this.balls = []

    this.data.forEach((pos, i) => {
      this.balls.push(new Ball(
        canvas,
        ctx,
        (pos.x * this.per) + (this.x - (this.size / 2)),
        (pos.y * this.per) + (this.y - (this.size / 2)),
      ))
    })
  }

  draw() {
    const color = '#00ACA5'
    this.ctx.fillStyle = color
    this.ctx.strokeStyle = color
    this.ctx.shadowColor = color
    this.ctx.shadowBlur = 30
    this.ctx.beginPath()
    this.balls.forEach((ball, i) => {
      ball.draw()

      if (i === 0)
        this.ctx.moveTo(ball.x, ball.y)
      else
        this.ctx.lineTo(ball.x, ball.y)
    })
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const size = 40
  const largeSize = 300
  const data = getImageData('光', size)
  const text = new Text(
    canvas,
    ctx,
    canvas.width/2,
    canvas.height/2,
    data,
    largeSize,
    largeSize/size
  )

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    text.draw()

    requestAnimationFrame(arguments.callee)
  })()
}
