import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const COLORS = [0x7C3AED, 0x06B6D4, 0x10B981, 0xA78BFA, 0x67E8F9];
const PARTICLE_COUNT = 200;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function HeroScene({ reducedMotion }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // Camera
      const aspect = window.innerWidth / window.innerHeight;
      const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
      camera.position.z = 5;

      // Scene
      const scene = new THREE.Scene();

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const dirLight = new THREE.DirectionalLight(0xA78BFA, 1.5);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      // Particles
      const geometry = new THREE.IcosahedronGeometry(0.3, 0);
      const meshes = [];
      const velocities = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const material = new THREE.MeshStandardMaterial({ color: COLORS[i % COLORS.length] });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(rand(-10, 10), rand(-10, 10), rand(-5, 5));
        scene.add(mesh);
        meshes.push(mesh);
        velocities.push({ x: rand(-0.002, 0.002), y: rand(-0.002, 0.002) });
      }

      // Mouse parallax
      const onMouseMove = (e) => {
        mouseRef.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        };
      };
      window.addEventListener('mousemove', onMouseMove);

      // Animation loop
      const animate = () => {
        for (let i = 0; i < meshes.length; i++) {
          meshes[i].rotation.y += 0.003;
          meshes[i].position.x += velocities[i].x;
          meshes[i].position.y += velocities[i].y;
          if (meshes[i].position.x > 10) meshes[i].position.x = -10;
          if (meshes[i].position.x < -10) meshes[i].position.x = 10;
          if (meshes[i].position.y > 10) meshes[i].position.y = -10;
          if (meshes[i].position.y < -10) meshes[i].position.y = 10;
        }

        camera.rotation.x += (-mouseRef.current.y * 0.05 - camera.rotation.x) * 0.05;
        camera.rotation.y += (mouseRef.current.x * 0.05 - camera.rotation.y) * 0.05;

        renderer.render(scene, camera);

        if (!reducedMotion) {
          animFrameRef.current = requestAnimationFrame(animate);
        }
      };
      animate();

      // Resize handler
      const onResize = () => {
        if (!renderer.domElement.isConnected) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(animFrameRef.current);
        renderer.dispose();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    } catch (err) {
      setWebglFailed(true);
    }
  }, [reducedMotion]);

  if (webglFailed) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, #1C1C2E 0%, #0A0A0F 70%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
