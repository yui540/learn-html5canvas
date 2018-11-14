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
}

class Paint extends DisplayObject {
  constructor(canvas, ctx, x, y, size) {
    super(canvas, ctx)

    this.x = x
    this.y = y
    this.size = size
    this.dropMaxSize = size * 0.5
    this.limit = 10

    this.drops = []
    ;[...Array(this.limit).keys()].forEach(i => {
      const _x = Math.random() * this.size + this.x
      const _y = Math.random() * this.size + this.y
      const _size = Math.random() * this.dropMaxSize + 2
      this.drops.push({ x: _x, y: _y, size: _size, state: 0 })
    })

    this.swing = Math.random() * 1
    this.add = 0
  }

  draw() {

    this.ctx.fillStyle = this.color
    this.ctx.globalCompositeOperation = 'overlay'
    this.ctx.beginPath()
    this.drops.forEach((drop, i) => {
      drop.state += this.swing
      if (drop.state >= drop.size) drop.state = drop.size
      this.ctx.moveTo(drop.x, drop.y)
      this.ctx.arc(drop.x, drop.y, drop.state / 2, 0, Math.PI * 2)
      this.ctx.lineTo(drop.x, drop.y)
    })
    this.ctx.closePath()
    this.ctx.fill()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  const collection = []
  ;[...Array(500).keys()].forEach(i => {
    const size = Math.random() * 200
    const x = Math.random() * (canvas.width - size)
    const y = Math.random() * (canvas.height - size)
    const paint = new Paint(canvas, ctx, x, y, size)
    collection.push(paint)
  })

  ;(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    collection.forEach(paint => paint.draw())

    requestAnimationFrame(arguments.callee)
  })()
}
