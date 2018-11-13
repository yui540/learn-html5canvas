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

  getAngle(angle) {
    return angle * Math.PI / 180
  }
}

class Box extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.size = (Math.random() * 60) + 10
    this.px = (this.canvas.width / 2) - (this.size / 2)
    this.py = (this.canvas.height / 2) - (this.size / 2)

    this.speed = (Math.random() * 0.4) + 0.1
    this.add = 0
    this.x = -this.size
    this.y = Math.random() * (this.canvas.height - this.size)
  }

  draw() {
    this.add += this.speed
    this.x += this.add

    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.beginPath()
    this.ctx.lineWidth = Math.random() * 6
    this.ctx.lineJoin = 'round'
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = Math.random() * 45
    this.ctx.fillStyle = this.color
    this.ctx.strokeStyle = this.color
    this.ctx.translate(this.x + (this.size / 2), this.y + (this.size / 2))
    this.ctx.rotate(this.getAngle(this.add))
    this.ctx.rect(-(this.size / 2), -(this.size / 2), this.size, this.size)
    this.ctx.closePath()
  }
}

class FillBox extends Box {
  draw() {
    this.ctx.save()
    super.draw()
    this.ctx.fill()
    this.ctx.restore()
  }
}

class StrokeBox extends Box {
  draw() {
    this.ctx.save()
    super.draw()
    this.ctx.stroke()
    this.ctx.restore()
  }
}

class Star extends DisplayObject {
  constructor(canvas, ctx) {
    super(canvas, ctx)

    this.x = this.canvas.width / 2
    this.y = this.canvas.height / 2
    this.size = (Math.random() * 60) + 10
    this.radius = this.size / 2
    this.shortRadius = this.radius * 0.5
    this.num = 5
    this.split = 360 / this.num
    
    this.speed = (Math.random() * 0.4) + 0.1
    this.add = 0
    this.x = -this.size
    this.y = Math.random() * (this.canvas.height - this.size)
  }

  draw() {
    this.add += this.speed
    this.x += this.add

    this.ctx.beginPath()
    this.ctx.lineWidth = Math.random() * 6
    this.ctx.lineJoin = 'round'
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = Math.random() * 45
    this.ctx.fillStyle = this.color
    this.ctx.strokeStyle = this.color
    this.ctx.translate(this.x + (this.size / 2), this.y + (this.size / 2))
    this.ctx.rotate(this.getAngle(this.add))
    this.drawStar(-(this.size / 2), -(this.size / 2))
    this.ctx.closePath()
  }

  drawStar(centerX, centerY) {
    ;[...Array(this.num).keys()].forEach(i => {
      let angle = this.getAngle(i * this.split - 90)
      let x = this.radius * Math.cos(angle) + centerX
      let y = this.radius * Math.sin(angle) + centerY

      if (i === 0)
        this.ctx.moveTo(x, y)
      else
        this.ctx.lineTo(x, y)

      angle += this.getAngle(this.split / 2)
      x = this.shortRadius * Math.cos(angle) + centerX
      y = this.shortRadius * Math.sin(angle) + centerY

      this.ctx.lineTo(x, y)
    })
  }
}

class FillStar extends Star {
  draw() {
    this.ctx.save()
    super.draw()
    this.ctx.fill()
    this.ctx.restore()
  }
}

class StrokeStar extends Star {
  draw() {
    this.ctx.save()
    super.draw()
    this.ctx.stroke()
    this.ctx.restore()
  }
}

class Text {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx

    this.text = 'おやすみ。'
    this.x = this.canvas.width / 2
    this.y = this.canvas.height / 2
    this.size = 80
  }

  draw() {
    this.ctx.save()
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.fillStyle = '#C45C66'
    this.ctx.font = `${this.size}px sans-sarif`
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(this.text, this.x, this.y)
    this.ctx.restore()
  }
}


{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const collection = [new StrokeBox(canvas, ctx)]
  let start = Date.now()

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    let current = Date.now()
    if ((current - start) > 40) {
      const num = Math.round(Math.random() * 1)
      switch (num) {
        case 0:
          particle = new StrokeBox(canvas, ctx)
          break
        case 1:
          particle = new StrokeStar(canvas, ctx)
          break
      }
      collection.push(particle)
    
      start = Date.now()
    }

    collection.forEach(particle => particle.draw())
  
    requestAnimationFrame(arguments.callee)
  })()
}
