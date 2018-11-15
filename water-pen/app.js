class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.color = '#67a1c2'
  }
}

class Bubble extends DisplayObject {
  constructor(canvas, ctx, x, y) {
    super(canvas, ctx)

    this.size = Math.random() * 10
    this.x = x
    this.y = y

    this.addX = 20 * (Math.random() - 0.5)
    this.addY = 0
  }

  on(fn) {
    this.fn = fn
  }

  draw() {
    this.addX *= 0.94
    this.addY += 1
    this.addY *= 0.95
    
    this.x += this.addX
    this.y -= this.addY
    this.size *= 0.95

    if (this.y <= 0) this.fn()

    this.ctx.globalCompositeOperarion = 'lighter'
    this.ctx.fillStyle = this.color
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = 10
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
  }
}

class Bubbles extends DisplayObject {
  constructor(canvas, ctx, x, y) {
    super(canvas, ctx)

    this.x = x
    this.y = y

    this.startTime = Date.now()
    this.collection = []
  }

  draw() {
    const currentTime = Date.now()
    if ((currentTime - this.startTime) > 20) {
      const bubble = new Bubble(this.canvas, this.ctx, this.x, this.y)
      bubble.on(() => {
        this.collection.forEach((_bubble, i) => {
          if (bubble === _bubble) this.collection.splice(i, 1)
        })
      })

      this.collection.push(bubble)
      this.startTime = Date.now()
    }

    this.collection.forEach(bubble => bubble.draw())
  }
}

const isSP = () => {
  const useragent = navigator.userAgent.toLowerCase()
  const reg = /(iphone|ipad|ipod|android|mobile)/

  return reg.test(useragent)
}

const handleDown = (x, y) => {
  down = true
  
  collection.push(new Bubbles(
    canvas,
    ctx,
    x,
    y,
  ))
}

const handleMove = (x, y) => {
  if (!down) return

  collection.push(new Bubbles(
    canvas,
    ctx,
    x,
    y,
  ))
}

const handleUp = (x, y) => {
  down = false
}

{
  window.canvas = document.getElementById('canvas')
  window.ctx = canvas.getContext('2d')
  window.down = false
  window.collection = []

  canvas.width = innerWidth
  canvas.height = innerHeight

  if (!isSP()) {
    addEventListener('mousedown', e => {
      e.preventDefault()
      handleDown(e.clientX, e.clientY)
    })
    addEventListener('mousemove', e => {
      e.preventDefault()
      handleMove(e.clientX, e.clientY)
    })
    addEventListener('mouseup', e => {
      e.preventDefault()
      handleUp()
    })
  } else {
    addEventListener('touchstart', e => {
      e.preventDefault()
      handleDown(e.touches[0].pageX, e.touches[0].pageY)
    }, { passive: false })
    addEventListener('touchmove', e => {
      e.preventDefault()
      handleMove(e.touches[0].pageX, e.touches[0].pageY)
    }, { passive: false })
    addEventListener('touchend', e => {
      e.preventDefault()
      handleUp()
    }, { passive: false })
  }

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    collection.forEach(bubbles => bubbles.draw())
    ctx.closePath()
    ctx.fill()
  
    requestAnimationFrame(arguments.callee)
  })()
}
