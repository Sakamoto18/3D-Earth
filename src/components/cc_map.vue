<template>
    <div class="map" ref="map"></div>
</template>

<script>
/* eslint-disable */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import TWEEN from '@tweenjs/tween.js'
import envConifg from "../config/earth_config";

export default {
    name: "ccMap",
    data() {
        return {
            scene: null,
            camera: null,
            mapDom: null,
            renderer: null,
            orbitControls: null,
            mesh: null,
            object: new THREE.Object3D(), // 设置3d对象
            axisHelper: new THREE.AxesHelper(120), // 设置辅助线
            textureLoader: new THREE.TextureLoader() // 设置纹理加载器
        };
    },
    methods: {
        // 初始化
        init() {
            this.initTHREE();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initOrbitControls();
            this.initBg();
            // this.initTween();
            this.glRender();
        },

        // 初始化场景，将场景限制在id为map的div中
        initTHREE() {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });
            this.mapDom = this.$refs.map;
            this.renderer.setSize(this.mapDom.clientWidth, this.mapDom.clientHeight);
            this.renderer.shadowMap.enabled = true; // 第一步，渲染器支持,shadowMap.enabled设置成开启状态
            this.renderer.setClearColor(0x000000, 1.0);
            this.mapDom.appendChild(this.renderer.domElement);
        },

            // 初始化相机
        initCamera() {
            this.camera = new THREE.PerspectiveCamera(
                45,
                this.mapDom.clientWidth / this.mapDom.clientHeight,
                1,
                2000
            );
            this.camera.position.z = 200;
            this.camera.up.set(-0.235, 1, 0);
            this.camera.lookAt(0, 0, 0);
        },

        // 初始化场景和辅助线
        initScene() {
            this.scene = new THREE.Scene(); // 初始化场景
            // this.scene.add(this.axisHelper); // 初始化辅助线
        },

        // 初始化光源
        initLight() {
            const light = new THREE.DirectionalLight(0xffffff);
            light.intensity = 2.5;
            light.position.set(220, 50.5, 0);
            light.castShadow = true;
            light.target = this.object;
            light.shadow.camera.near = 5; //产生阴影的最近距离
            light.shadow.camera.far = 500; //产生阴影的最远距离
            light.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
            light.shadow.camera.right = 50; //最右边
            light.shadow.camera.top = 50; //最上边
            light.shadow.camera.bottom = -50; //最下面

            // const helper = new THREE.CameraHelper(light.shadow.camera); // 设置聚光灯辅助线
            // this.scene.add(helper);
            light.castShadow = true; // 第二步，为光设定可生成阴影属性
            this.castShadow = true
            this.scene.add(light);
        },

        // 初始化轨道控制器
        initOrbitControls() {
            const os = new OrbitControls(this.camera, this.renderer.domElement);
            os.target = new THREE.Vector3(0, 0, 0); //控制焦点
            os.autoRotate = true; //将自动旋转关闭
            os.enablePan = false; // 不禁止鼠标平移, 可以用键盘来平移
            os.maxDistance = 1000; // 最大外移动
            os.minDistance = 100; // 向内最小外移
            this.orbitControls = os;
        },

        // 初始化地球背景
        initBg() {
            // 把背景图加载过来当做纹理。
            const texture = this.textureLoader.load(envConifg.earthBg);
            /**
             * 扩展
             * SphereGeometry是专门生成球体的类，第一个参数为球体半径radius，浮点型，默认为1
             * 第二个参数为水平分段数widthSegments，最小值为3(经线分段)
             * 第三个参数为垂直分段数heightSegments,最小值为6(纬线分段)
             * phiStart — 指定水平（经线）起始角度，默认值为0。。
             * phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
             * thetaStart — 指定垂直（纬线）起始角度，默认值为0。
             * thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。
             */
            const geometry = new THREE.SphereGeometry(envConifg.r, 50, 50); // 绘制这个球
            // 放入纹理
            const material = new THREE.MeshLambertMaterial({
                map: texture,
            });
            const mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
            this.mesh = mesh;
        },

        initTween() {
            let x = 350;
            let z = 350;
            const tween = new TWEEN.Tween(this.camera.position).to({
                x: 90,
                z: 90
            }, 2000).repeat(Infinity).start();
        },

        // 渲染函数
        glRender() {
            // TWEEN.update();
            this.renderer.render(this.scene, this.camera);
            this.mesh.rotateY(0.02);
            requestAnimationFrame(this.glRender.bind(this));
        }
    },
    mounted() {
        this.init();
    },
};
</script>

<style scoped>
.map {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>