class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.color = '#67a1c2'
  }
}

class Ball extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.size = Math.random() * 5
    this.radius = this.size / 2
    this.x = -this.radius
    this.y = Math.random() * this.canvas.height

    this.lange = Math.random()
    this.add = 0
  }

  draw() {
    this.add += this.lange
    this.add *= 0.95
    this.x += this.add

    if (this.x > this.canvas.width) return

    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.fillStyle = this.color
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = 10
    this.ctx.moveTo(this.x, this.y)
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.y)
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
    
    if ((currentTime - startTime) > 50) {
      collection.push(new Ball(canvas, ctx))
    }
  
    ctx.beginPath()
    collection.forEach(ball => ball.draw())
    ctx.closePath()
    ctx.fill()

    requestAnimationFrame(arguments.callee)
  })()
}
