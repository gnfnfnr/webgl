import * as THREE from "./three.js-master/build/three.module.js";

class App {
  #divContainer;
  #renderer;
  #scene;
  #camera;
  #cube;

  constructor() {
    this.#divContainer = document.querySelector("#webgl-container");

    this.#renderer = new THREE.WebGL1Renderer({ antialias: true });
    this.#renderer.setPixelRatio(window.devicePixelRatio);
    this.#divContainer.appendChild(this.#renderer.domElement);

    this.#scene = new THREE.Scene();

    this.#setupCamera();
    this.#setupLight();
    this.#setupModel();

    window.onresize = this.resize.bind(this);
    this.resize();
    requestAnimationFrame(this.render.bind(this));
  }

  #setupCamera() {
    const width = this.#divContainer.clientWidth;
    const height = this.#divContainer.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    camera.position.z = 2;
    this.#camera = camera;
  }
  #setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.#scene.add(light);
  }

  #setupModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });

    this.#cube = new THREE.Mesh(geometry, material);

    this.#scene.add(this.#cube);
  }

  resize() {
    const width = this.#divContainer.clientWidth;
    const height = this.#divContainer.clientHeight;

    this.#camera.aspect = width / height;
    this.#camera.updateWorldMatrix();

    this.#renderer.setSize(width, height);
  }

  render(time) {
    this.#renderer.render(this.#scene, this.#camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001;
    this.#cube.rotation.x = time;
    this.#cube.rotation.y = time;
  }
}

window.onload = function () {
  new App();
};
