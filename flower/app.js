class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx

    this.colors = [
      '#C45C66',
      '#C3CE5F',
      '#00ACA5',
      '#F19923',
    ]
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
  }
}

class Flower extends DisplayObject {
  constructor(canvas, ctx, x, y, force) {
    super(canvas, ctx)

    this.limit = 4
    this.num = 5
    this.split = 360 / this.num
    this.force = force
    this.size = 200 * force
    this.x = x
    this.y = y
    this.collection = []
    
    ;[...Array(1).keys()].forEach(i => {
      const x = Math.random() * this.size + this.x
      const y = Math.random() * this.size + this.y
      const size = Math.random() * (this.size * 0.4) + 10
      const state = 0
      this.collection.push({ x, y, size, state })
    })
  }

  draw() {
    this.ctx.globalCompositeOperation = 'overlay'
    this.ctx.fillStyle = this.color
    //this.ctx.shadowColor = this.color
    //this.ctx.shadowBlur = 6
    this.ctx.beginPath()
    this.collection.forEach(data => {
      this.drawFlower(data)
    })
    this.ctx.closePath()
    this.ctx.fill()
  }

  drawFlower(data) {
    data.state += 0.3
    if (data.state >= data.size) data.state = data.size

    const size = data.state * 0.4
    const radius = data.state / 2
      
    this.ctx.moveTo(data.x, data.y)
    this.ctx.arc(data.x, data.y, size, 0, Math.PI * 2)
    this.ctx.lineTo(data.x, data.y)

    ;[...Array(this.num).keys()].forEach(i => {
      const radian = this.getRadian(i * this.split - 90)
      const x = Math.cos(radian) * radius + data.x
      const y = Math.sin(radian) * radius + data.y

      this.ctx.moveTo(x, y)
      this.ctx.arc(x, y, size, 0, Math.PI * 2)
      this.ctx.lineTo(x, y)
    })
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const flowers = []
  let startTime = Date.now()

  ;(function() {
    let currentTime = Date.now()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if ((currentTime - startTime) > 60) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const force = Math.random()
      flowers.push(new Flower(canvas, ctx, x, y, force))
      startTime = Date.now()
    }

    flowers.forEach(flower => flower.draw())

    requestAnimationFrame(arguments.callee)
  })()
}
