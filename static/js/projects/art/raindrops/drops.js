const data_url = "https://data.arjungandhi.com/";

let canvas;
let box;
let census_data;
let mortality_data;
let zip;
let inc;
let year_slider;
let zip_input;
let drops;
let age_dist;
let zip_data;
let mortality_dist;
increment_rate = 0.25;
birthrate = 0.10;
let max_pop;

async function preload() {
  census_data = await (
    await fetch(data_url + "censtats/json/censtats.json")
  ).json();
  mortality_data = await (
    await fetch(data_url + "mortality/mortality.json")
  ).json();
  console.log("Data Loaded");
}

function setup() {
  box = document.getElementById("box");
  //zip inputs
  let zip_l = document.createElement("label");
  zip_l.innerHTML = "Zip Code:";
  zip_l.for = "zip";
  box.append(zip_l);

  zip_input = createInput("30097");
  zip_input.class("pretty input");
  zip_input.elt.name = zip_l.for;
  zip_input.parent(box.id);

  // break
  box.append(document.createElement("br"));

  year_slider = create_slider();

  // break
  box.append(document.createElement("br"));
  //  start
  let start_button = createButton("Start Simulation");
  start_button.mousePressed(setup_sim);
  start_button.parent(box.id);
  start_button.class("pretty button");

  //canvas
  canvas = createCanvas(650, 650);
  canvas.elt.style.height = "auto";
  canvas.parent(box.id);
  colorMode(RGB, 255, 255, 255, 1);

  //  save
  let save_button = createButton("Save Simulation");
  save_button.mousePressed(save_canvas);
  save_button.parent(box.id);
  save_button.class("pretty button");

  background("#4C566A");
}

function save_canvas() {
  save(canvas);
}

function draw() {
  if (drops !== undefined) {
    let l = year_slider.value() / increment_rate;
    if (inc <= l) {
      background("#4C566A");
      if (drops.length < max_pop) {
        if (random(1) < birthrate / increment_rate) {
          drops.push(new Drop());
        }
      }

      drops = drops.filter((drop) => drop.age >= 0);

      drops.forEach((drop) => {
        drop.loop(increment_rate);
        drop.does_die(increment_rate);
        strokeWeight(2);
        stroke("d8dee9");
        noFill();
        circle(drop.pos.x, drop.pos.y, drop.age);
      });
      inc++;
    } else {
      drops = undefined;
    }
  }
}

function setup_sim() {
  if (census_data !== undefined) {
  inc = 0;
  drops = [];
  get_dists();
  let t = Object.values(age_dist).reduce((a, b) => a + b, 0)
  max_pop = map(t, 0, 150000, 0, 750)
  } else {
    alert('Please wait 30 seconds for all the data to load and then try again!')
  }
}

function create_slider() {
  //slider conatianer
  d = createDiv();
  d.class("slider-box");
  d.parent(box);
  // year slider
  let year_l = document.createElement("label");
  year_l.innerHTML = "Simulation Years:";
  year_l.for = "year";
  d.elt.append(year_l);

  let year_slider = createSlider(0, 1000, 50);
  year_slider.class("slider");
  year_slider.elt.name = year_l.for;
  year_slider.parent(d);

  t = createElement("text", year_slider.value());
  t.parent(d);

  year_slider.input((e) => (t.elt.innerHTML = e.target.value));
  return year_slider;
}

// Drops

class Drop {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.max_age = this.__max_lifetime();
    this.dying = false;
    this.age = 0.0;
  }

  loop(increment) {
    if (this.dying) {
      this.age -= increment * 3;
    } else if (this.age < this.max_age) {
      this.age += increment * 1;
    }
  }

  does_die(modifier) {
    let death_chance = this.__get_category(this.age, mortality_dist);
    if (random(1) < death_chance * modifier) {
      this.dying = true;
    }
  }

  __max_lifetime() {
    let age = this.__max_age();
    let age_list = Object.keys(age_dist);
    let i = age_list.indexOf(age);
    age_list = age_list.map((el) => parseInt(el));
    age_list.push(0);
    return Math.round(random(age_list[i - 1], age_list[i]));
  }

  __max_age() {
    let total = Object.values(age_dist).reduce((a, b) => a + b, 0);
    let loc = random(0, total);
    for (var k in age_dist) {
      if (age_dist.hasOwnProperty(k)) {
        loc -= age_dist[k];
        if (loc < 0) {
          return k;
        }
      }
    }
    return Object.keys(age_dist).slice(-1)[0];
  }

  __get_category(val, data) {
    let result = Object.values(data)[0];
    let k = Object.keys(data)
    k = k.filter( o => o < val)
    if (k.length > 0) {
      result = data[k.slice(-1)[0]]
    }



    return result
  }
}

function get_dists() {

  a = census_data.filter((area) => area.zcta == zip_input.value());
  zip_data = a[0];

  k_converter = {
    age_0_to_9_years: 9,
    age_10_to_19_years: 19,
    age_20_to_29_years: 29,
    age_30_to_39_years: 39,
    age_40_to_49_years: 49,
    age_50_to_59_years: 59,
    age_60_to_69_years: 69,
    age_70_years_and_over: 100,
  };

  age_dist = {};

  for (var k in zip_data.age_and_sex.male) {
    if (zip_data.age_and_sex.male.hasOwnProperty(k)) {
      age_dist[k_converter[k]] =
        parseInt(zip_data.age_and_sex.male[k]) +
        parseInt(zip_data.age_and_sex.female[k]);
    }
  }

  mortality_dist = mortality_data[zip_data.state[0]];
}
