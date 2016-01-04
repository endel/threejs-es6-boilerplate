var WIDTH = window.innerWidth
  , HEIGHT = window.innerHeight

export default class Application {

  constructor (container) {
    this.container = container;

    this.camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 5000),
    this.camera.position.set(0, 0, 500)

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.setSize(WIDTH, HEIGHT)
    this.container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xff0000);
    this.scene.add(light);

    var geometry = new THREE.BoxGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial({color: 0x000000});

    this.mesh = new THREE.Mesh( geometry, material );
    this.scene.add( this.mesh );

    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize (e) {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight

    this.renderer.setSize(WIDTH, HEIGHT)
    this.camera.aspect = WIDTH / HEIGHT
    this.camera.updateProjectionMatrix()
  }

  loop () {
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.loop.bind(this))
  }

}
