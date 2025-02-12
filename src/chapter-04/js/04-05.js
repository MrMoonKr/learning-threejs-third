import * as THREE from 'three';
import * as dat from 'dat.gui';

import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare' ;

import {
    initStats,
    initTrackballControls,
    initRenderer,
    initCamera,
} from '../../js/helper.js';


function init() 
{

    // use the defaults
    var stats = initStats();
    var renderer = initRenderer();
    var camera = initCamera();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    // var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    // var renderer = new THREE.WebGLRenderer();

    // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMapEnabled = false;

    // position and point the camera to the center of the scene
    // camera.position.x = -40;
    // camera.position.y = 40;
    // camera.position.z = 40;
    // camera.lookAt(scene.position);

    // add subtle ambient lighting
    //        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    //        scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add( spotLight );

    var group = new THREE.Mesh();
    // add all the rubik cube elements
    var mats = [];
    mats.push( new THREE.MeshBasicMaterial( {
        color: 0x009e60
    } ) );
    // mats.push(new THREE.MeshBasicMaterial({
    // color: 0x009e60
    // }));
    mats.push( new THREE.MeshBasicMaterial( {
        color: 0x0051ba
    } ) );
    // mats.push(new THREE.MeshBasicMaterial({
    // color: 0x0051ba
    // }));
    mats.push( new THREE.MeshBasicMaterial( {
        color: 0xffd500
    } ) );
    // mats.push(new THREE.MeshBasicMaterial({
    // color: 0xffd500
    // }));
    mats.push( new THREE.MeshBasicMaterial( {
        color: 0xff5800
    } ) );
    // mats.push(new THREE.MeshBasicMaterial({
    // color: 0xff5800
    // }));
    mats.push( new THREE.MeshBasicMaterial( {
        color: 0xC41E3A
    } ) );
    // mats.push(new THREE.MeshBasicMaterial({
    // color: 0xC41E3A
    // }));
    mats.push( new THREE.MeshBasicMaterial( {
        color: 0xffffff
    } ) );
    // mats.push(new THREE.MeshBasicMaterial({
    // color: 0xffffff
    // }));

    for ( var x = 0; x < 3; x++ ) {
        for ( var y = 0; y < 3; y++ ) {
            for ( var z = 0; z < 3; z++ ) {
                var cubeGeom = new THREE.BoxGeometry( 2.9, 2.9, 2.9 );
                var cube = new THREE.Mesh( cubeGeom, mats );
                cube.position.set( x * 3 - 3, y * 3 - 3, z * 3 - 3 );

                group.add( cube );
            }
        }
    }


    group.scale.copy( new THREE.Vector3( 2, 2, 2 ) )
    // call the render function
    scene.add( group );
    var step = 0;

    var controls = new function () {
        this.rotationSpeed = 0.01;
        this.numberOfObjects = scene.children.length;
    };

    var gui = new dat.GUI();
    gui.add( controls, 'rotationSpeed', 0, 0.5 );

    render();

    debugger;

    function render() {
        stats.update();

        group.rotation.y = step += controls.rotationSpeed;
        group.rotation.z = step -= controls.rotationSpeed;
        group.rotation.x = step += controls.rotationSpeed;
        // render using requestAnimationFrame
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
