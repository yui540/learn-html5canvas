const getTextData = (text, fontSize) => {
  const canvas = document.getElementById('off-canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  ctx.font = `${fontSize}px sans-serif`
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const width = ctx.measureText(text).width
  const height = fontSize

  ctx.fillText(text, 0, 0)

  const data = ctx.getImageData(0, 0, width, height).data

  const collection = []
  for (let i=0, c=0; i < data.length; i += 4, c++) {
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
  constructor(canvas, ctx, x, y, size, i) {
    super(canvas, ctx)

    this.i = i
    this.size = Math.random() * 2 + 0.5
    this.centerX = x
    this.centerY = y
    this.x = this.centerX
    this.y = this.centerY

    this.r = Math.random() * 250 + 10
    this.speed = Math.random() * 8 + 0.5
    this.angle = 0
  }

  draw() {
    this.angle += this.speed

    const r = this.r * this.per + 1
    const size = this.size
    const radian = this.getRadian(this.angle)
    const x = Math.cos(radian) * r + this.x
    const y = Math.sin(radian) * r + this.y

    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.fillStyle = '#67a1c2'
    this.ctx.shadowColor = '#67a1c2'
    this.ctx.shadowBlur = 10
    this.ctx.moveTo(x, y)
    this.ctx.arc(x, y, size, 0, Math.PI * 2)
    this.ctx.lineTo(x, y)
  }
}

class Text extends DisplayObject {
  constructor(canvas, ctx, x, y, data, per) {
    super(canvas, ctx)

    this.per = per
    this.x = x
    this.y = y
    this.data = data
    this.particles = []
    this.data.forEach((data, i) => {
      this.particles.push(new Ball(
        canvas,
        ctx,
        (data.x * this.per) + this.x,
        (data.y * this.per) + this.y,
        1,
        i,
      ))
    })
  }

  draw() {
    this.ctx.beginPath()
    this.particles.forEach(ball => ball.draw())
    this.ctx.fill()
  }

  setPer(per) {
    this.particles.forEach(ball => {
      ball.per = per
    })
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const size = 80
  const largeSize = 350
  const data = getTextData('動', size)
  const text = new Text(
    canvas,
    ctx,
    canvas.width/2 - largeSize/2,
    canvas.height/2 - largeSize/2,
    data,
    largeSize/size
  )
  text.setPer(1)

  addEventListener('mousemove', e => {
    const centerX = canvas.width/2
    const centerY = canvas.height/2
    const x = e.clientX
    const y = e.clientY
    const diffX = x > centerX ? x - centerX : centerX - x
    const diffY = y > centerY ? y - centerY : centerY - y
    const diff = diffX > diffY ? diffX : diffY

    if (diff <= largeSize / 2) {
      const per = diff / (largeSize / 2)
      text.setPer(per)
    } else {
      text.setPer(1)
    }
  })

  ;(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    text.draw()

    requestAnimationFrame(arguments.callee)
  })()
}
