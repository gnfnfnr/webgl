import * as THREE from "./three.js-master/build/three.module.js";

class App {
  #divContainer;
  #renderer;
  #scene;
  #camera;
  #solorSystem;
  #earthSystem;
  #moonSystem;

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

    camera.position.z = 50;
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
    // 태양계
    const solarSystem = new THREE.Object3D();
    this.#scene.add(solarSystem);
    const radius = 1;
    const widthSegments = 12;
    const heightSegments = 12;
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    const sunMaterial = new THREE.MeshPhongMaterial({
      emissive: 0xffff00,
      flatShading: true,
    });

    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(3, 3, 3);
    solarSystem.add(sunMesh);

    // 지구
    const earthSystem = new THREE.Object3D();
    solarSystem.add(earthSystem);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
      flatShading: true,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthSystem.position.x = 10;
    earthMesh.scale.set(1.8, 1.8, 1.8);
    earthSystem.add(earthMesh);

    const moonSystem = new THREE.Object3D();
    moonSystem.position.x = 4;
    earthSystem.add(moonSystem);

    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
      flatShading: true,
    });

    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonSystem.add(moonMesh);
    this.#solorSystem = solarSystem;
    this.#earthSystem = earthSystem;
    this.#moonSystem = moonSystem;
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
    this.#solorSystem.rotation.y = time / 2;
    this.#earthSystem.rotation.y = time / 2;
    this.#moonSystem.rotation.y = time * 5;
  }
}

window.onload = function () {
  new App();
};
