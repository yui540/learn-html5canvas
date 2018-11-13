class Thumb {
  constructor(canvas, ctx, src) {
    this.canvas = canvas
    this.ctx = ctx

    this.img = new Image()
    this.img.onload = () => {
      this.load = true
    }
    this.img.src = src
  }

  draw() {
    if (!this.load) return false
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height)
  }
}

class Particle {
  constructor(canvas, ctx, x, y, size) {
    this.canvas = canvas
    this.ctx = ctx

    this.x = x
    this.y = 0
    this.size = size
    this._size = 0

    this.axis = y
    this.start = -this.size
    this.add = 0
  }

  draw() {
    this.add += 0.05
    this._size += this.add
    /*this.add *= 0.95
    this.y += this.add

    if (this.y > this.axis - this.size) {
      this.y = this.axis - this.size
      this.add *= -1
    }*/

    if (this._size > this.size) {
      this._size = this.size
    }

    this.ctx.globalCompositeOperation = 'destination-in'
    this.ctx.moveTo(this.x, this.axis)
    this.ctx.arc(this.x, this.axis, this._size, 0, Math.PI * 2)
    this.ctx.lineTo(this.x, this.axis)
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 600
  canvas.height = 600

  const thumb = new Thumb(canvas, ctx, 'yui540.jpg')

  const size = 10
  const row = Math.ceil(canvas.width / size)
  const column = Math.ceil(canvas.height / size) + 1
  const collection = []
  const flg = []
  const table = {}
  ;[...Array(column).keys()].forEach(y => {
    ;[...Array(row).keys()].forEach(x => {
      table[collection.length] = collection.length
      flg.push(false)
      collection.push(new Particle(
        canvas,
        ctx,
        x * size,
        y * size,
        size / 2
      ))
    })
  })

  let start = Date.now()
  let time = 100

  ;(function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let current = Date.now()
    if ((current - start) > 5) {
      const length = Object.keys(table).length
      const num = Object.keys(table)[Math.floor(Math.random() * length)]
      flg[num] = true
      delete table[num]

      start = Date.now()
    }

    thumb.draw()

    ctx.beginPath()
    collection.forEach((particle, i) => {
      if (flg[i]) particle.draw()
    })
    ctx.closePath()
    ctx.fill()

    requestAnimationFrame(tick)
  })()
}
