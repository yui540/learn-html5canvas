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
  constructor(canvas, ctx, x, y, force) {
    this.canvas = canvas
    this.ctx = ctx

    this.x = x
    this.y = y

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
          '#67a1c2',
          this.force
        ))
      }

      this.startTime = Date.now()
    }

    this.collection.forEach(ball => ball.draw())
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = innerWidth
  canvas.height = innerHeight

  const bubbles = []

  const handleDown = (x, y, force) => {
    const bubble = new Bubble(canvas, ctx, x, y, force)
    
    // 終了
    bubble.on(function() {
      bubbles.forEach((bubble, i) => {
        if (bubble === this) {
          bubbles.splice(i, 1)
        }
      })
    }.bind(bubble))

    bubbles.push(bubble)
  }

  addEventListener('mousedown', e => {
    e.preventDefault()
    handleDown(e.clientX, e.clientY, 1)
  })
  addEventListener('touchstart', e => {
    e.preventDefault()
    document.getElementById('num').innerHTML = e.touches[0].force
    handleDown(e.changedTouches[0].pageX, e.changedTouches[0].pageY, e.touches[0].force)
  }, {passive: false})
  addEventListener('touchmove', e => {
    e.preventDefault()
    document.getElementById('num').innerHTML = e.touches[0].force
    handleDown(e.changedTouches[0].pageX, e.changedTouches[0].pageY, e.touches[0].force)
  }, {passive: false})
  addEventListener('touchend', e => {
    e.preventDefault()
    document.getElementById('num').innerHTML = 0
  }, {passive: false})

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    bubbles.forEach(bubble => bubble.draw())
    ctx.closePath()
    ctx.fill()

    requestAnimationFrame(arguments.callee)
  })()
}
