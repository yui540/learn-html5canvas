class Star {
  constructor(canvas, ctx, x, y, size) {
    this.canvas = canvas
    this.ctx = ctx

    this.vmax =
      this.canvas.width > this.canvas.height ?
        this.canvas.width : this.canvas.height

    this.colors = [
      '#C45C66',
      '#C3CE5F',
      '#00ACA5',
      '#F19923',
      '#B493F3',
    ]
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

    this.angle = Math.random() * 360 * Math.PI / 180
    this.size = size
    this.radius = this.size / 2
    this.shortRadius = this.radius * 0.5
    this.centerX = x
    this.centerY = y

    this.add = 0
    this.currentPos = 0
    this.endPos = this.vmax / 2
  }

  draw() {
    this.add += 0.5
    this.currentPos += this.add

    let x = this.currentPos * Math.sin(this.angle) + this.centerX
    let y = this.currentPos * Math.cos(this.angle) + this.centerY

    this.drawStar(x, y)
  }

  drawStar(centerX, centerY) {
    const num = 5
    const split = 360 / num

    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.lineWidth = 5
    this.ctx.shadowColor = this.color
    this.ctx.shadowBlur = 50
    this.ctx.fillStyle = this.color
    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    ;[...Array(num).keys()].forEach(i => {
      let angle = ((i * split) - 90) * Math.PI / 180
      let x = this.radius * Math.cos(angle) + centerX
      let y = this.radius * Math.sin(angle) + centerY

      if (i === 0)
        this.ctx.moveTo(x, y)
      else
        this.ctx.lineTo(x, y)

      angle += (split / 2) * Math.PI / 180
      x = this.shortRadius * Math.cos(angle) + centerX
      y = this.shortRadius * Math.sin(angle) + centerY
      this.ctx.lineTo(x, y)
    })
    this.ctx.closePath()
  }
}

class FillStar extends Star {
  drawStar(centerX, centerY) {
    super.drawStar(centerX, centerY)
    this.ctx.fill()
  }
}
class StrokeStar extends Star {
  drawStar(centerX, centerY) {
    super.drawStar(centerX, centerY)
    this.ctx.stroke()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  let size = 200
  let centerX = canvas.width / 2
  let centerY = canvas.height / 2

  const collection = [new Star(canvas, ctx, centerX, centerY, size)]
  let start = Date.now()

  window.addEventListener('mousemove', e => {
    centerX = e.clientX
    centerY = e.clientY
  })

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let current = Date.now()

    if ((current - start) > 20) {
      const num = Math.round(Math.random() * 1)
      const _size = Math.random() * size + 20
      let particle = null

      if (num)
        particle = new FillStar(canvas, ctx, centerX, centerY, _size)
      else
        particle = new StrokeStar(canvas, ctx, centerX, centerY, _size)

      collection.push(particle)
    
      start = Date.now()
    }

    collection.forEach(particle => particle.draw())

    requestAnimationFrame(tick)
  })()
}
