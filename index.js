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
const material = new THREE.PointsMaterial({
  size: 0.005,
  color: 0x87a7ca,
});
const torus = new THREE.Points(geometry, material);

// 작은 입자 만들기
const particleGeomtry = new THREE.BufferGeometry();
const particleCount = 5000;
const postionArray = new Float32Array(particleCount * 3);
for (let index = 0; index < particleCount * 3; index++) {
  postionArray[index] = Math.random();
  // 중심으로 옮기기
  // postionArray[index] = Math.random() - 0.5;
  // 사방으로 퍼뜨리기
  postionArray[index] = (Math.random() - 0.5) * 5;
}

particleGeomtry.setAttribute(
  "position",
  new THREE.BufferAttribute(postionArray, 3)
);

// 별 모양 이미지 첨가하기
const loader = new THREE.TextureLoader();
const star = loader.load("./star.png");
const paricleMaterial = new THREE.PointsMaterial({
  size: 0.005,
  map: star,
  transparent: true,
  // color: "blue",
});

const particles = new THREE.Points(particleGeomtry, paricleMaterial);
camera.position.z = 2;
scene.add(camera);
scene.add(torus);
scene.add(particles);

const clock = new THREE.Clock();
// 도형 움직이기
function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();
  torus.rotation.y = 0.5 * elapsedTime;
  renderer.render(scene, camera);
}
animate();

// canvas를 html 추가
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);
