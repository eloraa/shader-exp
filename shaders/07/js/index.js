import * as THREE from 'three';
import AsyncLoader from '../../../src/js/components/classes/AsyncLoader';
import { record } from '../../../src/js/utils/recorder';

let container;
let camera, scene, renderer, clock, material;
let uniforms, vertexShader, fragmentShader, t;

function init() {
  container = document.querySelector('#app');

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;

  // instantiate a loader
  const loader = new THREE.TextureLoader();

  container.appendChild(renderer.domElement);

  camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0, 0);
  let dt = 1 / 60;

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  const geometry = new THREE.PlaneGeometry(2, 2);

  uniforms = {
    u_time: { type: 'f', value: 1.0 },
    u_resolution: { type: 'v2', value: new THREE.Vector2() },
    u_mouse: { type: 'v2', value: new THREE.Vector2() },
    u_texture: { type: 't', value: null },
    u_tex_ratio: { type: 't', value: new THREE.Vector2() }
  };

  loader.load(
    '../../07/assets/texture/01.jpg',

    function (texture) {
      uniforms.u_texture.value = texture;
      uniforms.u_tex_ratio.value.x = texture.image.width;
      uniforms.u_tex_ratio.value.y = texture.image.height;
    },

    undefined,

    function (err) {
      console.error(err);
    }
  );

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader,
    fragmentShader,
  });

  const mesh = new THREE.Mesh(geometry, material);
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

loader.load('../../07/assets/shaders/vertexShader.vert', function (text) {
  vertexShader = text;
});
loader.load('../../07/assets/shaders/fragmentShader.frag', function (text) {
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
