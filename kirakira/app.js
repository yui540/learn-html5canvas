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

    this.swing = Math.random() * 100
    this.addX = 0
    this.addY = Math.random() * 4 + 3
  }

  draw() {
    this.addX += 1.5
    this.x = Math.sin(this.addX * Math.PI / 180) * this.swing + this._x
    this.y -= this.addY
  }
}

class Ball extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.size = (Math.random() * 30) + 5
    this.radius = this.size / 2
    this.x = (Math.random() * (this.canvas.width - this.size)) + this.radius
    this._x = (Math.random() * (this.canvas.width - this.size)) + this.radius
    this.y = this.canvas.height + this.radius
  }

  draw() {
    super.draw()

    if (this.y <= 0) return false

    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.shadowBlur = 10
    this.ctx.shadowColor = this.color
    this.ctx.lineWidth = 5
    this.ctx.fillStyle = this.color
    this.ctx.strokeStyle = this.color
    this.ctx.moveTo(this.x + this.radius, this.y)
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.lineTo(this.x + this.radius, this.y)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}

class Box extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.size = (Math.random() * 30) + 5
    this.radius = this.size / 2
    this.x = (Math.random() * (this.canvas.width - this.size)) + this.radius
    this._x = (Math.random() * (this.canvas.width - this.size)) + this.radius
    this.y = this.canvas.height + this.radius
  }

  draw() {
    super.draw()

    if (this.y <= 0) return false

    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.shadowBlur = 10
    this.ctx.shadowColor = this.color
    this.ctx.lineWidth = 5
    this.ctx.fillStyle = this.color
    this.ctx.rect(this.x - this.radius, this.y - this.radius, this.size, this.size)
    this.ctx.strokeStyle = this.color
    this.ctx.closePath()
    this.ctx.stroke()
  }
}

class Star extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.size = (Math.random() * 80) + 20
    this.radius = this.size / 2
    this.x = (Math.random() * (this.canvas.width - this.size)) + this.radius
    this._x = (Math.random() * (this.canvas.width - this.size)) + this.radius
    this.y = this.canvas.height + this.radius
  }

  draw() {
    super.draw()

    if (this.y <= 0) return false

    this.ctx.beginPath()
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.shadowBlur = 10
    this.ctx.shadowColor = this.color
    this.ctx.lineWidth = 5
    this.ctx.fillStyle = this.color
    this.ctx.strokeStyle = this.color
    this.drawStar(this.x, this.y)
    this.ctx.closePath()
    this.ctx.fill()
  }

  drawStar(centerX, centerY) {
    const num = 5
    const split = 360 / num
    ;[...Array(num).keys()].forEach(i => {
      let radians = this.getAngle(i * split - 90)
      let x = Math.cos(radians) * this.radius + centerX
      let y = Math.sin(radians) * this.radius + centerY

      if (i === 0) this.ctx.moveTo(x, y)
      else this.ctx.lineTo(x, y)

      radians += this.getAngle(split / 2)
      x = Math.cos(radians) * (this.radius * 0.5) + centerX
      y = Math.sin(radians) * (this.radius * 0.5) + centerY

      this.ctx.lineTo(x, y)
    })
  }

  getAngle(angle) {
    return Math.PI * angle / 180
  }
}

class Text {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.text = `きらきら。`

    this.colors = [
      '#C45C66',
      '#C3CE5F',
      '#00ACA5',
      '#F19923',
      '#B493F3',
    ]

    this.x = this.canvas.width / 2
    this.y = this.canvas.height / 2
    this.fontSize = 120
    
    this.color1 = this.colors[Math.floor(Math.random() * this.colors.length)]
    this.color2 = this.colors[Math.floor(Math.random() * this.colors.length)]
    this.color3 = this.colors[Math.floor(Math.random() * this.colors.length)]
    
    this.add = 0
  }

  draw() {
    this.fillText(this.x, this.y, this.color1)
    this.fillText(this.x, this.y, this.color2)
    this.fillText(this.x, this.y, this.color3)

    const swing = 8
    this.add += 12
    this.strokeText(Math.sin(Math.PI * this.add / 180) * swing + this.x, this.y, this.color1)
    this.strokeText(this.x, Math.cos(Math.PI * this.add / 180) * swing + this.y, this.color2)
    this.strokeText(Math.cos(Math.PI * this.add / 180) * swing + this.x, this.y, this.color1)
    this.strokeText(this.x, Math.sin(Math.PI * this.add / 180) * swing + this.y, this.color2)
  }

  fillText(x, y, color) {
    this.ctx.fillStyle = color
    this.ctx.shadowColor = color
    this.ctx.shadowBlur = 10
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.font = `${this.fontSize}px sans-serif`
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(this.text, x, y)
  }
  
  strokeText(x, y, color) {
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = color
    this.ctx.shadowColor = color
    this.ctx.shadowBlur = 10
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.font = `${this.fontSize}px sans-serif`
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.strokeText(this.text, x, y)
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
  })

  const collection = [new Ball(canvas, ctx)]
  let start = Date.now()
  const text = new Text(canvas, ctx)

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let current = Date.now()
    if ((current - start) > 60) {
      const num = Math.round(Math.random() * 2)
      switch (num) {
        case 0:
          collection.push(new Ball(canvas, ctx))
          break
        case 1:
          collection.push(new Box(canvas, ctx))
          break
        case 2:
          collection.push(new Star(canvas, ctx))
          break
      }

      start = Date.now()
    }
  
    collection.forEach(particle => particle.draw())

    text.draw()

    requestAnimationFrame(arguments.callee)
  })()
}
