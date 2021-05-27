<template>
    <div class="geo-map" ref="geoMap"></div>
</template>

<script>
/* eslint-disable */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import worldGeo from "../assets/geojson/world_geo.js";
import { lon2xyz, countryLine }  from "../utils/calc_position.js";
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
            this.initEarth();
            this.glRender();
        },
        initEarth() {
            const R = envConifg.r;
            worldGeo.features.forEach((country) => {
                if (country.geometry.type === "Polygon") {
                    country.geometry.coordinates = [country.geometry.coordinates];
                }
                let line = countryLine(R, country.geometry.coordinates);
                this.scene.add(line);
            });
        },
       

        // 初始化场景，将场景限制在id为map的div中
        initTHREE() {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            this.mapDom = this.$refs.geoMap;
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
            this.camera.position.z = 130;
            // this.camera.up.set(-0.235, 1, 0);
            this.camera.lookAt(0, 0, 0);
        },

        // 初始化场景和辅助线
        initScene() {
            this.scene = new THREE.Scene(); // 初始化场景
            // this.scene.add(this.axisHelper); // 初始化辅助线
        },

        // 初始化光源
        initLight() {
            const light = new THREE.AmbientLight(0xffffff);
            light.intensity = 2.5;
            light.distance = 30;
            light.position.set(220, 50.5, 0);
            light.target = this.object;
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

        // 渲染函数
        glRender() {
            // TWEEN.update();
            this.renderer.render(this.scene, this.camera);
            // this.mesh.rotateY(0.02);
            requestAnimationFrame(this.glRender.bind(this));
        }
    },
    mounted() {
        this.init();
    },
};
</script>

<style scoped>
.geo-map {
    box-sizing: border-box;
    border: 1px solid #cccccc;
    width: 50vw;
}
</style>