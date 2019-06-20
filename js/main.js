window.addEventListener('DOMContentLoaded', init);
var init = function() {
	$("#loader").fadeOut(400, function(){ $(this).remove(); });
  // canvas
    const container = document.getElementById('canvas-container');
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setTimeout(init, 3000);

// パーリンノイズ
    function perlin () {
    let stageW = 0;
    let stageH = 0;
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    noise.seed(Math.random());
    resize();
    tick();
    window.addEventListener('resize', resize);

    function tick() {
      requestAnimationFrame(tick);
      const time = Date.now() / 4000;
      draw(time);
    }
    function draw(time) {
      context.clearRect(0, 0, stageW, stageH);
      context.lineWidth = 0.3;
      if (canvas.width > 600) {
        var amplitude = stageH / 5;
      } else {
        var amplitude = stageH / 4;
      }
      const lineNum = 50;
      const segmentNum = 150;
      [...Array(lineNum).keys()].forEach(j => {
        const coefficient = 50 + j;
        context.beginPath();
        const h = Math.round(j / lineNum * 360);
        const s = 100;
        const l = Math.round(j / lineNum * 100);
        context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;
        [...Array(segmentNum).keys()].forEach(i => {
          const x = i / (segmentNum - 1) * stageW;
          const px = i / coefficient;
          const py = (j / 50 + time);

          if (canvas.width > 600) {
            var y = amplitude * noise.perlin2(px, py) + stageH / 4;
          } else {
            var y = amplitude * noise.perlin2(px, py) + stageH / 6;
          }

          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();
      });
    }
    function resize() {
      stageW = innerWidth * devicePixelRatio;
      stageH = innerHeight * devicePixelRatio;
      canvas.width = stageW;
      canvas.height = stageH;
    }

    }
    perlin();

// top logo
function blotter () {
    var text = new Blotter.Text("R", {
      family : "serif",
      size : 60,
      fill : "black",
    });

var material = new Blotter.FliesMaterial();
material.uniforms.uPointCellWidth.value = 0.015;
material.uniforms.uPointRadius.value = 1;
material.uniforms.uSpeed.value = 5;
var blotter = new Blotter(material, {
    texts : text,
});
var scope = blotter.forText(text);
  var top = document.getElementById("top");
  scope.appendTo(top);
}
blotter();

// glitch
function glitch () {
    setTimeout(() => document.body.classList.add('render'), 60);
    const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
    const total = navdemos.length;
    const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
    const navigate = (linkEl) => {
        document.body.classList.remove('render');
        document.body.addEventListener('transitionend', () => window.location = linkEl.href);
    };

    document.addEventListener('keydown', (ev) => {
        const keyCode = ev.keyCode || ev.which;
        let linkEl;
        if ( keyCode === 37 ) {
            linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
        }
        else if ( keyCode === 39 ) {
            linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
        }
        else {
            return false;
        }
        navigate(linkEl);
    });
    imagesLoaded('.glitch__img', { background: true }, () => {
        document.body.classList.remove('loading');
        document.body.classList.add('imgloaded');
    });
}
glitch();

// aos
AOS.init();

// topparallax
 function parallaxTop () {
 var scene = document.getElementById('scene');

 var parallexInstance = new Parallax(scene, {
     scalarX: 10,
     scalarY: 10,
     frictionX: 0.3,
     frictionY: 0.3,
     originX: 0.5,
     originY: 0.5,
     hoverOnly: false
 });

 parallexInstance.friction(0.1, 0.1);
 };

 parallaxTop();

 // back to
 $(function(){
 $('a[href^="#"]').click(function() {
    var speed = 800;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
 });
 });
