const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0, 'white')
gradient.addColorStop(0.5, 'magenta')
gradient.addColorStop(1, 'blue')

ctx.fillStyle = gradient

ctx.strokeStyle = '#fff';

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 5 + 2;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5
    this.vy = Math.random() * 1 - 0.5
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    // context.stroke()
  }
  update(){
    this.x += this.vx;
    if(this.x > this.effect.width - this.radius || this.x < this.radius){
      this.vx *= -1
    }
    this.y += this.vy;
    if(this.y > this.effect.height - this.radius || this.y < this.radius){
      this.vy *= -1
    }
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.noOfParticles = 100;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.noOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    effect.connectParticles(context)
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update()
    });
  }
  connectParticles(context){
    const maxDistance = 100
    for(let i = 0; i < this.particles.length; i++){
      for(let j = i; j < this.particles.length; j++){
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;

        const distance = Math.sqrt(dx * dx + dy * dy)

        if(distance < maxDistance){
          context.save()
          const opacity = 1 - (distance/maxDistance)
          context.globalAlpha = opacity
          context.beginPath()
          context.moveTo(this.particles[i].x, this.particles[i].y)
          context.lineTo(this.particles[j].x, this.particles[j].y)
          context.stroke()
          context.restore()
        }
      }
    }
  }
}

const effect = new Effect(canvas);


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  effect.handleParticles(ctx);
  window.requestAnimationFrame(animate)
}
animate()