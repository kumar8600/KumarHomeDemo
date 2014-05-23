// WebGLを使ったデモやるでｗ

/// <reference path="Scripts/typings/threejs/three.d.ts" />

class Demo {
    private clock: THREE.Clock;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private noiseMaterial: THREE.ShaderMaterial;

    constructor() {
        // 
        // レンダラーの作成
        //
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        // サイズ
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(width, height);
        // 背景色
        this.renderer.setClearColor(0x444444, 1);
        // #viewportの子にレンダラーのDOMを追加
        document.querySelector("#viewport").appendChild(this.renderer.domElement);
        // クロックの開始
        this.clock = new THREE.Clock(true);

        //
        // カメラの作成
        //
        var fov = 100;
        var aspect = width / height;
        this.camera = new THREE.PerspectiveCamera(fov, aspect);
        this.camera.position = new THREE.Vector3(0, 0, 100);

        //
        // シーンの作成
        //
        this.scene = new THREE.Scene();

        // 光源
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position = new THREE.Vector3(0, 0, 1);
        this.scene.add(directionalLight);

        // ノイズで波打つシェーダーのマテリアルの作成
        var vShader = document.getElementById('vshader').textContent;
        var fShader = document.getElementById('fshader').textContent;
        var uniforms = {
            time: {
                type: "f",
                value: this.clock.getElapsedTime()
            },
            resolution: {
                type: "v2",
                value: new THREE.Vector2(width, height)
            }
        };
        this.noiseMaterial = new THREE.ShaderMaterial({
            vertexShader: vShader,
            fragmentShader: fShader,
            uniforms: uniforms,
            wireframe: true
        });

        // 波打つメッシュ
        var planeGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        var noisedMesh = new THREE.Mesh(planeGeometry, this.noiseMaterial);
        noisedMesh.rotation.x = - Math.PI / 2.0;
        noisedMesh.position.set(0, -100, 0);
        this.scene.add(noisedMesh);

        /*
        // 既成のワイヤーフレームなマテリアルの作成
        var wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        });

        // タイトルのメッシュ
        var titleGeometry = new THREE.TextGeometry("kumar8600", {
            size: 80,
            height: 20,
            curveSegments: 2,
            font: "helvetiker",
            weight: "bold"
        });
        var titleMesh = new THREE.Mesh(titleGeometry, wireframeMaterial);
        this.scene.add(titleMesh);
*/
    }

    public render() {
        this.noiseMaterial.uniforms.time.value = this.clock.getElapsedTime() / 10.0;
        this.renderer.render(this.scene, this.camera);
    }
}

window.onload = () => {
    var demo = new Demo();

    var loopRendering = function () {
        // ブラウザに再描画の呼び出しを行わせる
        requestAnimationFrame(loopRendering);

        demo.render();
    }

    loopRendering();
}


//
// 
//