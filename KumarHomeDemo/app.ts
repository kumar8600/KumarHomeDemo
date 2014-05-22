// WebGLを使ったデモやるでｗ

/// <reference path="Scripts/typings/threejs/three.d.ts" />

class Demo {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;

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
        this.renderer.setClearColorHex(0x000000, 1);
        // #viewportの子にレンダラーのDOMを追加
        document.querySelector("#viewport").appendChild(this.renderer.domElement);

        //
        // カメラの作成
        //
        var fov = 100;
        var aspect = width / height;
        this.camera = new THREE.PerspectiveCamera(fov, aspect);
        this.camera.position = new THREE.Vector3(0, 0, 1000);

        //
        // シーンの作成
        //
        this.scene = new THREE.Scene();

        // 光源
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position = new THREE.Vector3(0, 0, 1);
        this.scene.add(directionalLight);

        // メッシュ
        var geometry = new THREE.CubeGeometry(500, 500, 500);
        var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        var cubeMesh = new THREE.Mesh(geometry, material)
        this.scene.add(cubeMesh);
    }

    public beginRendering() {
        this.renderer.render(this.scene, this.camera);

        

        // ブラウザに再描画の呼び出しを行わせる
        requestAnimationFrame(this.beginRendering);
    }
}

window.onload = () => {
    try {
        var demo = new Demo();
    } catch (e) {
        alert("WebGLに非対応の環境。");
        return;
    }

    demo.beginRendering();
}


//
// 
//