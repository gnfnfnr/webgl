import * as THREE from "./three.js-master/build/three.module.js";
import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js";

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
    this.#setupControls();

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

  //물체 만드는 코드
  #setupModel() {
    // 직사각형, 정사각형 만들기
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 원 만들기
    // const geometry = new THREE.CircleGeometry(1, 32, Math.PI / 2, Math.PI);
    // 콘 만들기
    // const geometry = new THREE.ConeGeometry(1, 2, 32, 1, false, 0, Math.PI * 2);
    // 실린더 만들기
    // const geometry = new THREE.CylinderGeometry(1, 1, 1, 32, 1, false, 0, Math.PI * 2);
    // 구 만들기
    // const geometry = new THREE.SphereGeometry(1,32,16,0, Math.PI * 2, 0, Math.PI);
    // 링 만들기
    // const geometry = new THREE.RingGeometry(0.5, 1, 32, 1, 0, Math.PI * 2);
    // 사각형 만들기
    // const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    // 도넛 모양 만들기
    const geometry = new THREE.TorusKnotGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });
    this.#cube = new THREE.Mesh(geometry, material);

    const lineMaterial = new THREE.LineBasicMaterial({ color: "red" });
    // 선 형태의 도형 만들기
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      lineMaterial
    );
    const group = new THREE.Group();
    group.add(this.#cube);
    group.add(line);
    this.#cube = group;
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
    // this.#cube.rotation.x = time;
    // this.#cube.rotation.y = time;
  }

  #setupControls() {
    new OrbitControls(this.#camera, this.#divContainer);
  }
}

window.onload = function () {
  new App();
};
