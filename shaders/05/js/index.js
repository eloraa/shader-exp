import * as THREE from 'three';
import AsyncLoader from '../../../src/js/components/classes/AsyncLoader';
import { record } from '../../../src/js/utils/recorder';

let container;
let camera, scene, renderer, clock;
let uniforms, vertexShader, fragmentShader, t;


function init() {
  container = document.querySelector('#app');

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;

  container.appendChild(renderer.domElement);

  camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0, 0);
  let dt = 1 / 60;

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  var geometry = new THREE.PlaneGeometry(2, 2);

  uniforms = {
    u_time: { type: 'f', value: 1.0 },
    u_resolution: { type: 'v2', value: new THREE.Vector2() },
    u_mouse: { type: 'v2', value: new THREE.Vector2() },
  };

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader,
    fragmentShader,
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
  container.addEventListener('mousemove', e => {
    uniforms.u_mouse.value.x = e.clientX;
    uniforms.u_mouse.value.y = e.clientY;
  });
}

function onWindowResize(event) {
  renderer.setSize(container.clientWidth, container.clientHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += clock.getDelta();
  renderer.render(scene, camera);
}

const manager = new AsyncLoader.manager();
const loader = new AsyncLoader.loader(manager);

loader.load('../../05/assets/shaders/vertexShader.vert', function (text) {
  vertexShader = text;
});
loader.load('../../05/assets/shaders/fragmentShader.frag', function (text) {
  fragmentShader = text;
});
// manager.onProgress = function ( item, loaded, total ) {
//     update(loaded/total)
// };

manager.onLoad = () => {
  console.log('loaded');
  init();
  animate();

  // record(3.164413, document.querySelector('canvas'))
};