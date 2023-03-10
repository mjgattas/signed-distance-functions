
// random number generator, defaulting to Math.random(0,1) if no argument is provided, but Math.random(0,a) otherwise
let R = (a=1)=>Math.random()*a;
let L = (x,y)=>(x*x+y*y)**0.5; //Euclidian distance formula


// setup function
function setup() {
  createCanvas(400,400);
  background('#FFFFCC');
}

// function that draws a circle
function draw_circle([x,y],r,c) {
  noStroke(); fill(c);
  circle((x+1)*width/2, (y+1)*width/2, r/2);
}

function sdf_circle([x,y], [cx, cy], r) {
  x -= cx;
  y -= cy;
  return L(x, y) - r;
}

function sdf_box([x,y], [cx,cy], [w,h]){
  x -= cx;
  y -= cy;
  return k(abs(x)-w, abs(y)-h);
}

let k = (a,b)=>a>0&&b>0?L(a,b):a>b?a:b;

function sdf_rep(x, r) {
  x /= r;
  x -= Math.floor(x);
  x *= r;
  return x;
}

function sdf([x,y]){
  let bal = sdf_circle([x,y], [0,0], .6);

  let box = sdf_box([x,y], [0,.3], [.05,.05]);
  let box2 = sdf_box([x,y], [0,.5], [.1,.15]);
  let box3 = sdf_box([x,y], [0,.7], [.2,.15]);
  let box4 = sdf_box([x,y], [0,.8], [.3,.2]);
  // let lin = abs(x)-.5;
  // let lin2 = abs(y)-.5;

  bal = abs(bal) - .2;
  bal = abs(bal) - .1;
  bal = abs(bal) - .05;
  bal = abs(bal) - .025;

  let bbl = sdf_circle([x/3, y/3], [0,0], .2);
  bbl = abs(bbl) - .1;
  bbl = abs(bbl) - .05;
  bbl = abs(bbl) - .025;

  let what = sdf_rep(y, .05);

  return Math.min(what, box, box2, box3, box4, bal, bbl);
  // y = sdf_rep(y, .3);
  // return sdf_box([x,y], [0,0], [.2,.2]);
}

function draw() {
  if (frameCount === 1){
    capturer.start();
  }

  for (let k = 0; k < 2000; k++) {
    let p = [R(2)-1, R(2)-1];
    let d = sdf(p);
    let col = "#ffff";
    if (d < -.01) col = "#66CC99";
    if (d > .01) col = "#FFCC99";
      draw_circle(p, 2, col);
  }

  if (frameCount < 901) {
    capturer.capture(canvas);
  } else if (frameCount === 901) {
    capturer.save();
    capturer.stop();
  }
  }
