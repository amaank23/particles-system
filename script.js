const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Particle {
    constructor(effect){
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = 15
    }
    draw(context){
       context.beginPath();
       context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
       context.fill() 
    }
}


class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.noOfParticles = 20;
    }
    createParticles(){
        for(let i = 0; i < this.noOfParticles; i++){
            this.particles.push(new Particle(this))
        }
    }
}


function animate(){

}