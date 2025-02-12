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
    addLargeGroundPlane( scene );

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -0, 30, 60 );
    spotLight.castShadow = true;
    spotLight.intensity = 0.6;
    scene.add( spotLight );

    // call the render function
    var step = 0;
    var material = new THREE.MeshPhongMaterial( {
        color: 0x7777ff
    } )
    var controls = new function () {
        this.color = material.color.getStyle();
        this.emissive = material.emissive.getStyle();
        this.specular = material.specular.getStyle();
    };

    var gui = new dat.GUI();

    addBasicMaterialSettings( gui, controls, material );
    addMeshSelection( gui, controls, material, scene );
    var spGui = gui.addFolder( "THREE.MeshPhongMaterial" );
    spGui.addColor( controls, 'color' ).onChange( function ( e ) {
        material.color.setStyle( e )
    } );
    spGui.addColor( controls, 'emissive' ).onChange( function ( e ) {
        material.emissive = new THREE.Color( e );
    } );
    spGui.addColor( controls, 'specular' ).onChange( function ( e ) {
        material.specular = new THREE.Color( e );
    } );
    spGui.add( material, 'shininess', 0, 100, )
    spGui.add( material, 'wireframe' );
    spGui.add( material, 'wireframeLinewidth', 0, 20 );

    camera.lookAt( controls.selected.position );
    render();

    function render() {
        stats.update();

        if ( controls.selected ) controls.selected.rotation.y = step += 0.01;

        // render using requestAnimationFrame
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
