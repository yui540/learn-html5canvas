class DisplayObject {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  getRadian(angle) {
    return Math.PI * angle / 180
  }
}

class Frag extends DisplayObject {
  constructor(canvas, ctx, x, y) {
    super(canvas, ctx)

    this.x = x
    this.y = y
    this.num = Math.round(Math.random() * 10) + 20

    this.points = []
    let oldAngle = 0
    ;[...Array(this.num).keys()].forEach(i => {
      const angle = Math.random() * 360 + oldAngle
      const r = Math.random() * 200 + 100
      this.points.push({ r, angle })

      oldAngle += angle
    })
  }

  draw() {
    this.ctx.beginPath()
    this.points.forEach((point, i) => {
      const radian = this.getRadian(point.angle)
      const x = Math.cos(radian) * point.r + this.x
      const y = Math.sin(radian) * point.r + this.y

      if (i === 0)
        this.ctx.moveTo(x, y)
      else
        this.ctx.lineTo(x, y)
    })
    this.ctx.closePath()
  }
}

{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  ;(function() {

    ctx.fillStyle = '#333'
    const frag = new Frag(canvas, ctx, Math.random()*canvas.width, Math.random()*canvas.height)
    frag.draw()
    const frag2 = new Frag(canvas, ctx, Math.random()*canvas.width, Math.random()*canvas.height)
    frag2.draw()
    const frag3 = new Frag(canvas, ctx, Math.random()*canvas.width, Math.random()*canvas.height)
    frag3.draw()
    const frag4 = new Frag(canvas, ctx, Math.random()*canvas.width, Math.random()*canvas.height)
    frag4.draw()
    const frag5 = new Frag(canvas, ctx, Math.random()*canvas.width, Math.random()*canvas.height)
    frag5.draw()
    ctx.fill()

    ctx.globalCompositeOperation = 'soft-light'
    ctx.fillStyle = 'rgba(255,255,255,0.07)'
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()

    requestAnimationFrame(arguments.callee)
  })()
}
