// scene 만들기
const scene = new THREE.Scene();

// 화면 크기
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// 카메라 조정

const adjust = {
  FIELD_OF_VIEW: 75,
  ASPECT: size.width / size.height,
  NEAR: 0.1,
  FAR: 100,
};

// 카메라 만들기
const camera = new THREE.PerspectiveCamera(
  adjust.FIELD_OF_VIEW,
  adjust.ASPECT,
  adjust.NEAR,
  adjust.FAR
);

// 렌더 인스턴스 만들기
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#21282a"), 1);
// renderer.render(scene, camera);

// 반응형으로 만들기
window.addEventListener("resize", () => {
  // update scene size
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // update camera
  adjust.ASPECT = size.width / size.height;
  camera.updateProjectionMatrix();

  // upadate render
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 도넛형
const geometry = new THREE.TorusGeometry(0.7, 0.2, 20, 50);
const material = new THREE.MeshBasicMaterial({ color: "white" });
const torus = new THREE.Mesh(geometry, material);

camera.position.z = 2;
scene.add(camera);
scene.add(torus);

// canvas를 html 추가
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);
