import { useRef, useEffect } from "react";

export default function ThreeGadgetScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let frameId: number;

    (async () => {
      const THREE: any = await import('three');
      if (!mounted || !mountRef.current) return;

      const scene = new THREE.Scene();
      const width = mountRef.current.clientWidth || 300;
      const height = mountRef.current.clientHeight || 180;
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 1.2, 3);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambient);
      const dir = new THREE.DirectionalLight(0xffffff, 0.8);
      dir.position.set(5, 10, 7);
      scene.add(dir);

      const geom = new THREE.BoxGeometry(1.2, 0.9, 0.08);
      const mat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.6, roughness: 0.35 });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = -0.18;
      scene.add(mesh);

      const animate = () => {
        if (!mounted) return;
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.004;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      const handleResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);
      animate();

    })();

    return () => {
      mounted = false;
      if (frameId) cancelAnimationFrame(frameId);
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
