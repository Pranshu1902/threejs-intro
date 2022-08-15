import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x00fff0,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const coneGeometry = new THREE.ConeGeometry(10, 20, 30);
const coneMaterial = new THREE.MeshBasicMaterial({
  color: 0x00fff0,
  // wireframe: true,
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(0, 0, 0);
// scene.add(cone);

const capsule = new THREE.CapsuleGeometry(1, 3, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({
  color: 0x00fff0,
  wireframe: true,
});
const capsuleMesh = new THREE.Mesh(capsule, capsuleMaterial);
// scene.add(capsuleMesh);

const circleGeometry = new THREE.CircleGeometry(5, 32);
const circleMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff0f0,
});
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
// scene.add(circle);

const dodeGeometry = new THREE.IcosahedronGeometry(5.0, 0);
const dodeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
  wireframeLinewidth: 3.0,
});
const dode = new THREE.Mesh(dodeGeometry, dodeMaterial);
scene.add(dode);

// car
const carBodyGeometry = new THREE.BoxGeometry(2, 1, 5);
const carBodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);
scene.add(carBody);
carBody.position.x += 20;

// car upper body
const carUpGeometry = new THREE.BoxGeometry(1, 1, 1);
const carUpMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const carUp = new THREE.Mesh(carUpGeometry, carUpMaterial);
scene.add(carUp);
carUp.position.x += 20;
carUp.position.y += 1;

// car front left wheel
const frontLeftWheelGeometry = new THREE.CircleGeometry(1, 32);
const frontLeftWheelMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff0f0,
  wireframe: true,
});
const frontLeftWheel = new THREE.Mesh(
  frontLeftWheelGeometry,
  frontLeftWheelMaterial
);
scene.add(frontLeftWheel);
frontLeftWheel.rotation.y += 80;
frontLeftWheel.position.x += 21;
frontLeftWheel.position.y -= 1;
frontLeftWheel.position.z += 1.5;

// car front right wheel
const frontRightWheelGeometry = new THREE.CircleGeometry(1, 32);
const frontRightWheelMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff0f0,
  wireframe: true,
});
const frontRightWheel = new THREE.Mesh(
  frontRightWheelGeometry,
  frontRightWheelMaterial
);
scene.add(frontRightWheel);
frontRightWheel.rotation.y += 80;
frontRightWheel.position.x += 21;
frontRightWheel.position.y -= 1;
frontRightWheel.position.z -= 1.5;

// car back left wheel
const LeftWheelGeometry = new THREE.CircleGeometry(1, 32);
const LeftWheelMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff0f0,
  wireframe: true,
});
const LeftWheel = new THREE.Mesh(LeftWheelGeometry, LeftWheelMaterial);
scene.add(LeftWheel);
LeftWheel.rotation.y += 80;
LeftWheel.position.x += 19;
LeftWheel.position.y -= 1;
LeftWheel.position.z -= 1.5;

// car back right wheel
const RightWheelGeometry = new THREE.CircleGeometry(1, 32);
const RightWheelMaterial = new THREE.MeshBasicMaterial({
  color: 0xfff0f0,
  wireframe: true,
});
const RightWheel = new THREE.Mesh(RightWheelGeometry, RightWheelMaterial);
scene.add(RightWheel);
RightWheel.rotation.y += 80;
RightWheel.position.x += 19;
RightWheel.position.y -= 1;
RightWheel.position.z += 1.5;

// car wheels end

const pointLight = new THREE.PointLight(0x00fff0);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0x00fff0);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const computerImage = new THREE.TextureLoader().load("/computer.png");
const computer = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: computerImage })
);
scene.add(computer);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function moveCar(keyCode) {
  const speed = 1;

  if (keyCode == 87) {
    carBody.position.z -= speed;
    carUp.position.z -= speed;
    frontLeftWheel.position.z -= speed;
    frontRightWheel.position.z -= speed;
    RightWheel.position.z -= speed;
    LeftWheel.position.z -= speed;
    camera.position.z -= speed;
  } else if (keyCode == 83) {
    carBody.position.z += speed;
    carUp.position.z += speed;
    frontLeftWheel.position.z += speed;
    frontRightWheel.position.z += speed;
    RightWheel.position.z += speed;
    LeftWheel.position.z += speed;
    // update camera position
    camera.position.z += speed;
  } else if (keyCode == 65) {
    carBody.position.x -= speed;
    carUp.position.x -= speed;
    frontLeftWheel.position.x -= speed;
    frontRightWheel.position.x -= speed;
    RightWheel.position.x -= speed;
    LeftWheel.position.x -= speed;
    camera.position.x -= speed;
  } else if (keyCode == 68) {
    carBody.position.x += speed;
    carUp.position.x += speed;
    frontLeftWheel.position.x += speed;
    frontRightWheel.position.x += speed;
    RightWheel.position.x += speed;
    LeftWheel.position.x += speed;
    camera.position.x += speed;
  } else if (keyCode == 32) {
    // clear objects
    scene.remove(torus);
    scene.remove(dode);
    carBody.position.set(0, 0, 0);
    carUp.position.set(0, 1, 0);
    frontLeftWheel.position.set(-1, -1, 1.5);
    frontRightWheel.position.set(1, -1, 1.5);
    RightWheel.position.set(1, -1, -1.5);
    LeftWheel.position.set(-1, -1, -1.5);
    camera.position.set(0, 0, 30);
  }
}

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  circle.rotation.x += 0.02;
  circle.rotation.y += 0.02;

  dode.rotation.x += 0.03;
  dode.rotation.y += 0.03;

  computer.rotation.x += 0.03;
  computer.rotation.y += 0.03;

  controls.update();

  renderer.render(scene, camera);
}

// move based on key press
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  moveCar(keyCode);
}

animate();
