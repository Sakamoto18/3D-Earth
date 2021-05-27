/* eslint-disable */
import * as THREE from "three";

function line(pointArr) {
    let geometry = new THREE.BufferGeometry(); // 减少gpu上传数据的开销，世界地图点位太多，用普通的geometry太卡
    let vertices = new Float32Array(pointArr); // Float32Array类型数组代表的是平台字节顺序为32位的浮点数型数组,数据量大的时候性能更好
    /**
     * vertices,数据源，此处为处理号的坐标数据
     * 3是第二个参数，为数据被存储任意长度的矢量，此处为每三个数据一组
     * 对应geo数据中[x1,y1,z1,x2,y2,z2]三个点为一组矢量，以此类推
     */
    let attribue = new THREE.BufferAttribute(vertices, 3);
    geometry.attributes.position = attribue; // 替换图形位置信息，替换成处理好的geo数组
    let material = new THREE.LineBasicMaterial({
        color: 0x00aaaa // 线条颜色
    }); // 线条基础材质，可以调整线条粗细，颜色
    let line = new THREE.LineLoop(geometry, material);
    return line;
}

// 经纬度转坐标
function lon2xyz(R, longitude, latitude) {
    const lon = longitude * Math.PI / 180; // 经度弧度
    const lat = latitude * Math.PI / 180; // 纬度弧度
    const x = R * Math.cos(lat) * Math.sin(lon);
    const y = R * Math.sin(lat);
    const z = R * Math.cos(lon) * Math.cos(lat);
    return { x, y, z };
}

// 绘制地图轮廓
function countryLine(R, polygonArr) {
    let group = new THREE.Group();
    polygonArr.forEach(polygon => {
        let pointArr = [];
        polygon[0].forEach(elem => {
            const coordinates = lon2xyz(R, elem[0], elem[1]);
            pointArr.push(coordinates.x, coordinates.y, coordinates.z) // z轴都传0则会呈现平面地图 
        });
        group.add(line(pointArr));
    });
    return group;
}
export {lon2xyz, countryLine}