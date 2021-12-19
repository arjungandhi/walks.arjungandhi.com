const MODEL_URL = "https://data.arjungandhi.com/weights";
var face_params;
async function setup_face() {
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceExpressionModel(MODEL_URL);
  await faceapi.loadAgeGenderModel(MODEL_URL);
}

async function handle_image(file) {
  if (file.type === "image") {
    kill_old_image()
    let img = document.createElement("img");
    img.src = file.data;
    img.className = 'pretty image'
    img.id = 'user_image'
    twee_box.prepend(img)
    try {
      let face_stuff = await faceapi
        .detectAllFaces(img)
        .withFaceExpressions()
        .withAgeAndGender();
      face_params = face_stuff[0];
      let person_age = face_params.age;
      age_bar.animate(person_age/100)
      age = (death_age - person_age)/shrink_factor;
      adjust_params()

    } catch {
      alert(
        "Unable to detect a face in the photo please try uploading another photo"
      );
    }
  } else {
    alert("Please Upload an Image");
  }
}

age = 0; //
max_len = 20; // det max branch len
min_len = 1; // det max branch len
lean = 0.7;
max_branch = 2;
shrink_factor = 2;
var tree;
thicc_factor = 1;
branch_index = 0;
const death_age = 78.54;

let canvas;
let bg;
let age_bar;
let progress_bar;
let twee_age_bar;
let twee_box
var s = 1;
draw_bg = true;
transperency = 0.7;

let run_button;

function adjust_params() {
  twee_age_bar.animate(age/100)
  thicc_factor= map (age, 0,50 , 1 , 3)
  lean = map( age, 0, 50 , .5, .95)
  transperency = map(age, 0,50 , .7 , .05)

}

async function setup() {
  twee_box = document.getElementById("twee-box");

  // create a label for the upload button
  l = document.createElement("label");
  l.className = "file-input";
  l.innerHTML = "Upload a picture of your face!";
  // input for image
  let input = createFileInput(handle_image);
  input.class("poof-input");
  input.parent(l);
  twee_box.appendChild(l);
  // break
  let br = document.createElement("br");
  twee_box.appendChild(br);
  let h = document.createElement("h3");
  h.innerHTML= 'About You!'
  h.style.margin = '.25em 0'
  twee_box.appendChild(h);
  //age and geneder and emotion bars
  let age_box = create_bar_box('Estimated Age:','age_box')
  age_bar = create_circle_bar('age_bar',age_box.elt.id)

  let twee_age_box = create_bar_box('Estimated Tree Age:','twee_age_box')
  twee_age_bar = create_circle_bar('twee_age_bar',twee_age_box.elt.id)

  //break again
  twee_box.appendChild(br);
  // run
  let run_button = createButton("Generate Tree");
  run_button.mousePressed(setup_sim);
  run_button.parent("twee-box");
  run_button.class("pretty button");
  // create progress bar 
  progress_bar = create_line_bar('draw_progress', 'twee-box')

  //canvas
  canvas = createCanvas(570,803);
  canvas.elt.style.height = 'auto'
  canvas.parent("twee-box");
  colorMode(RGB, 255, 255, 255, 1);
  await setup_face();

  //  save
  let save_button = createButton("Save Tree");
  save_button.mousePressed(save_canvas);
  save_button.parent("twee-box");
  save_button.class("pretty button");
}

function save_canvas() {
  save(canvas)
}

function setup_sim() {
  tree = get_tree(createVector(0, 0), tree_angle(0), age);
  let max_l = 0;
  for (let i = 0; i < tree.length; i++) {
    for (let j = 0; j < tree[i].length; j++) {
      let v = tree[i][j];
      if (v.mag() > max_l) {
        max_l = v.mag();
      }
    }
  }
  max_l = max_l * 1.5;
  s = createVector(width, height).mag() / max_l;
  draw_bg = true;
  branch_index = 0;
}

function draw() {
  if (draw_bg) {
    background(bg);
    draw_bg = false;
  }

  translate(width / 2, height);
  scale(s, -s);
  let prev = createVector(0, 0);
  if (tree !== undefined) {
    if (tree[branch_index] !== undefined) {
      for (
        let draw_index = 0;
        draw_index < tree[branch_index].length;
        draw_index++
      ) {
        let v = tree[branch_index][draw_index];
        stroke(118, 92, 72, transperency);
        if (draw_index > tree[branch_index].length - age * 0.4) {
          stroke(56, 188, 28, transperency);
        }

        strokeWeight(thicc_factor * (tree[branch_index].length - draw_index));

        line(prev.x, prev.y, v.x, v.y);
        prev = v;
      }
    } else {
      console.log(tree, branch_index);
    }
    let progress = (branch_index) / tree.length;
    progress_bar.set(progress)
    branch_index++;

    if (branch_index >= tree.length) {
      tree = undefined;
    }
  }
}

function get_tree(v, a, iter) {
  let branch_length = random(min_len * iter, max_len * iter);
  let num_branch = random(max_branch);

  let move = createVector(cos(a) * branch_length, sin(a) * branch_length);
  let new_v = p5.Vector.add(v, move);
  let gen_tree = [];
  if (iter > 0) {
    for (let i = 0; i < num_branch; i++) {
      branches = get_tree(new_v, tree_angle(lean), iter - 1);
      for (j = 0; j < branches.length; j++) {
        gen_tree.push(branches[j]);
      }
    }
  }
  if (gen_tree.length === 0) {
    gen_tree = [[]];
  }

  for (let i = 0; i < gen_tree.length; i++) {
    gen_tree[i].unshift(new_v);
  }

  return gen_tree;
}

function map_to_canvas(num, x = true) {
  if (x) {
    return map(num, 0, width, width / 2, (3 * width) / 2);
  } else {
    return map(num, 0, height, height, 0);
  }
}

function tree_angle(lean_multiplier) {
  return random(
    TAU / 4 - (TAU / 8) * (lean_multiplier + 1),
    TAU / 4 + (TAU / 8) * (lean_multiplier + 1)
  );
}

function create_bar_box(label, id) {
  d = createDiv()
  d.class('bar_box')
  d.elt.id = id
  let h = document.createElement("h4");
  h.style.margin = '.25em'
  h.innerHTML= label
  d.child(h)
  d.parent('twee-box')
  return d
}

function create_circle_bar(id, container_id){
  bar_container = createDiv();
  bar_container.class('bar_container')
  bar_container.elt.id = id

  bar_container.parent(container_id);
  let b = new ProgressBar.Circle('#'+id, {
    color: "#d8dee9",
    duration: 1.5,
    strokeWidth: 5,
    duration: 3000,
    easing: "easeInOut",
    step: (state, bar) => {
      var value = Math.round(bar.value() * 100);
        bar.setText(value);
  
      bar.text.style.color = state.color;
    }
  });
  return b
}

function create_line_bar(id, container_id) {
  bar_container = createDiv();
  bar_container.class('line_bar_container')
  bar_container.elt.id = id
  bar_container.parent(container_id)
  var bar = new ProgressBar.Line('#'+id, {
    strokeWidth: 5,
    easing: 'easeInOut',

    svgStyle: {width: '100%', height: '100%'},
    text: {
      style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: "#d8dee9",
          position: 'absolute',
          right: '-4em',
          top: '0',
          padding: 0,
          margin: 0,
          transform: null
        },
    },
    from: {color: '#BC4838'},
    to: {color: '#76c732'},
    step: (state, bar) => {
      bar.setText(Math.round(bar.value() * 100) + ' %');
      bar.path.setAttribute('stroke', state.color);
    }
  });
  return bar
}

function kill_old_image() {
  let i = document.getElementById('user_image')

  if (i) {
      i.remove()
  }
}