class Line {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    
    this.vmin =
      this.canvas.width > this.canvas.height ?
        this.canvas.height : this.canvas.height

    this.startPoint = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
    }

    this.colors = [
      '#C45C66',
      '#C3CE5F',
      '#00ACA5',
      '#243B62',
      '#F19923',
      '#B493F3',
    ]
    this.size = Math.random() * 1
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
    this.angle = Math.random() * 360
    this.radius = this.vmin * Math.random()
    this.r = 0
    this.add = 0
  }

  draw() {
    this.add += 5
    this.r += this.add

    if (this.r > this.radius) {
      this.r = this.radius
    }

    const radian = this.angle * Math.PI / 180
    const x = this.r * Math.sin(radian) + this.startPoint.x
    const y = this.r * Math.cos(radian) + this.startPoint.y

    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.size
    this.ctx.lineCap = 'round'
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.globalAlpha = 0.6
    this.ctx.beginPath()
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y)
    this.ctx.lineTo(x, y)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}

class Text {
  constructor(canvas, ctx, src) {
    this.canvas = canvas
    this.ctx = ctx
    
    this.vmin =
      this.canvas.width > this.canvas.height ?
        this.canvas.height : this.canvas.height

    this.size = this.vmin
    this.x = (this.canvas.width / 2) - (this.size / 2)
    this.y = (this.canvas.height / 2) - (this.size / 2)
    
    this.img = new Image()
    this.img.onload = () => {
      this.load = true
    }
    this.img.src = src
  }

  draw() {
    if (!this.load) return false

    this.ctx.globalCompositeOperation = 'destination-in'
    this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size)
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const text = new Text(canvas, ctx, 'sister.png')
  const lines = [new Line(canvas, ctx)]
  let start = Date.now()

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let current = Date.now()
    if ((current - start) > 10) {
      start = Date.now()
      lines.push(new Line(canvas, ctx))
    }

    lines.forEach(line => line.draw())
    text.draw()
  
    requestAnimationFrame(tick)
  })()
}
