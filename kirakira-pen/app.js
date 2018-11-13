class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }
}

class Dot extends DisplayObject {
  constructor(canvas, ctx, x, y, color, force) {
    super(canvas, ctx)

    this.color = color
    this.force = force
    this.size = 10 * force
    this.x = x
    this.y = y
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = 10
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
  }
}

class Pen extends DisplayObject {
  constructor(canvas, ctx, color) {
    super(canvas, ctx)

    this.color = color
    this.dots = []
  }

  put(x, y) {
    const dot = new Dot(
      this.canvas,
      this.ctx,
      x,
      y,
      this.color,
      1
    )
    this.dots.unshift({ x, y })
  }

  draw() {
    this.ctx.beginPath()
    this.dots.forEach((pos, i) => {
      this.ctx.globalCompositeOperation = 'lighter'
      this.ctx.shadowColor = this.color
      this.ctx.shadowBlur = 30
      this.ctx.lineWidth = 10
      this.ctx.lineJoin = 'round'
      this.ctx.lineCap = 'round'
      this.ctx.strokeStyle = this.color

      if (i === 0)
        this.ctx.moveTo(pos.x, pos.y)
      else
        this.ctx.lineTo(pos.x, pos.y)
    })
    this.ctx.stroke()
  }
}

class Ball {
  constructor(canvas, ctx, x, y, color, force) {
    this.canvas = canvas
    this.ctx = ctx

    this.color = color
    this.size = (Math.PI * 10) * force
    this.radius = 0
    this.radian = this.getRadian(Math.random() * 360)
    this.centerX = x
    this.centerY = y

    this.x = this.centerX
    this.y = this.centerY

    this.vx = 20 * (Math.random() - 0.5)
    this.vy = 0
  }

  draw() {
    this.vx *= 0.98
    this.vy -= 1
    this.vy *= 0.98
    this.size *= 0.97

    this.x += this.vx
    this.y += this.vy

    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = 30
    this.ctx.fillStyle = this.color
    this.ctx.moveTo(this.x + this.size, this.y)
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.lineTo(this.x + this.size, this.y)
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

class Bubble {
  constructor(canvas, ctx, x, y, force, color) {
    this.canvas = canvas
    this.ctx = ctx

    this.x = x
    this.y = y

    this.color = color
    this.force = force
    this.collection = []
    this.limit = 20
    this.startTime = Date.now()
  }

  on(fn) {
    this.fn = fn
  }

  draw() {
    // 終了監視
    let count = 0
    this.collection.forEach((ball, i) => {
      if (ball.y <= 0) {
        count += 1
      }
    })

    if (count >= this.limit) {
      if (this.fn) this.fn()
    }

    const currentTime = Date.now()

    if ((currentTime - this.startTime) > 10) {
      if (this.collection.length <= this.limit - 1) {
        this.collection.push(new Ball(
          this.canvas,
          this.ctx,
          this.x,
          this.y,
          this.color,
          this.force
        ))
      }

      this.startTime = Date.now()
    }

    this.collection.forEach(ball => ball.draw())
  }
}

const getColor = (num) => {
  return `hsl(${num}, 100%, 50%)`
}

{
  // #67a1c2
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const bubbles = []
  const pens = []
  let count = 0
  let currentColor = getColor(count)
  let currentPen = null

  const handleDown = (e, x, y, _force) => {
    console.log(e)
    e.preventDefault()

    let force = _force
    if (!force) force = 0.5
    const bubble = new Bubble(canvas, ctx, x, y, force, currentColor)
    bubble.on(function() {
      bubbles.forEach((bubble, i) => {
        if (bubble === this) {
          bubbles.splice(i, 1)
        }
      })
    }.bind(bubble))
    bubbles.push(bubble)

    currentPen = new Pen(canvas, ctx, currentColor)
    currentPen.put(x, y)

    pens.push(currentPen)
  }

  const handleMove = (e, x, y, _force) => {
    e.preventDefault()

    let force = _force
    if (!force) force = 0.5
    if (!currentPen) return
    
    const bubble = new Bubble(canvas, ctx, x, y, force, currentColor)
    bubble.on(function() {
      bubbles.forEach((bubble, i) => {
        if (bubble === this) {
          bubbles.splice(i, 1)
        }
      })
    }.bind(bubble))
    bubbles.push(bubble)

    currentPen.put(x, y)
  }

  const handleUp = (e, x, y) => {
    e.preventDefault()

    currentPen = null
  }

  // event
  addEventListener('mousedown', e => handleDown(e, e.clientX, e.clientY))
  addEventListener('mousemove', e => handleMove(e, e.clientX, e.clientY))
  addEventListener('mouseup', e => handleUp(e, e.clientX, e.clientY))
  
  addEventListener('touchstart', e => {
    handleDown(e, e.touches[0].pageX, e.touches[0].pageY, e.touches[0].force)
  }, {passive: false})
  addEventListener('touchmove', e => {
    handleMove(e, e.touches[0].pageX, e.touches[0].pageY, e.touches[0].force)
  }, {passive: false})
  addEventListener('touchend', e => {
    handleUp(e, e.touches[0].pageX, e.touches[0].pageY, e.touches[0].force)
  }, {passive: false})

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (count >= 360) count = 0
    count += 1
    currentColor = getColor(count)
  
    pens.forEach(pen => pen.draw())

    ctx.beginPath()
    bubbles.forEach(bubble => bubble.draw())
    ctx.closePath()
    ctx.fill()

    requestAnimationFrame(arguments.callee)
  })()
}
