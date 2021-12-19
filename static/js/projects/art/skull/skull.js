const num_particles = 3000;
let distance_slider;
let skull;
let smile;
let warn;
let particles;
let target;

function setup() {
  box = document.getElementById("box");

  distance_slider = create_slider();

  // break
  box.append(document.createElement("br"));

  //canvas
  canvas = createCanvas(650, 650);
  canvas.elt.style.height = "auto";
  canvas.parent(box.id);
  colorMode(RGB, 255, 255, 255, 1);
  particles = [];
  background("#4C566A");
  //init target
  target = warn;
}

function draw() {
  translate(width / 2, height / 2);
  for (let i = 0; i < 500; i++) {
    p = new Particle();
    p.display();
  }
}

function create_slider() {
  //slider conatianer
  d = createDiv();
  d.class("slider-box");
  d.parent(box);
  // year slider
  let dl = document.createElement("label");
  dl.innerHTML = "Distance:";
  dl.for = "distance";
  d.elt.append(dl);

  let slider = createSlider(0, 12, 6);
  slider.class("slider");
  slider.elt.name = dl.for;
  slider.parent(d);

  t = createElement("text", slider.value());
  t.parent(d);

  slider.input((e) => {
    t.elt.innerHTML = e.target.value;
    prev_target = target
    if (e.target.value < 4) {
      target = skull
    } else if (e.target.value < 8) {
      target = warn
    } else {
      target = smile
    }
    if (target != prev_target) {
      background('#4C566A')
    }
  });
  return slider;
}

class Particle {
  constructor() {
    this.position = createVector(
      random(-width / 2, width / 2),
      random(-height / 2, height / 2)
    );
    this.radius = 10;
  }

  display() {
    let c = target.get(
      this.position.x + target.width / 2,
      this.position.y + target.height / 2
    );
    fill(c);
    noStroke();
    circle(this.position.x, this.position.y, this.radius);
  }
}
