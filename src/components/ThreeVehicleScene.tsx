import { useEffect, useRef } from "react";

export default function ThreeVehicleScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let frameId = 0;
    let renderer: any;
    let resizeHandler: (() => void) | undefined;

    void (async () => {
      const THREE: any = await import("three");
      const mount = mountRef.current;
      if (!mounted || !mount) return;

      const width = mount.clientWidth || 300;
      const height = mount.clientHeight || 180;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0.8, 4);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(-5, 5, 5);
      scene.add(directionalLight);

      const vehicle = new THREE.Group();
      const bodyGeometry = new THREE.BoxGeometry(2.6, 0.6, 1.1);
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x071126, metalness: 0.6, roughness: 0.2 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.1;
      vehicle.add(body);

      const wheelGeometry = new THREE.CylinderGeometry(0.28, 0.28, 0.6, 24);
      const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(1, -0.25, 0.6);
      vehicle.add(wheel);

      const oppositeWheel = wheel.clone();
      oppositeWheel.position.z = -0.6;
      vehicle.add(oppositeWheel);
      vehicle.rotation.x = 0.12;
      scene.add(vehicle);

      const animate = () => {
        if (!mounted) return;
        vehicle.rotation.y += 0.007;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      resizeHandler = () => {
        const currentMount = mountRef.current;
        if (!currentMount) return;
        const nextWidth = currentMount.clientWidth || 300;
        const nextHeight = currentMount.clientHeight || 180;
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(nextWidth, nextHeight);
      };

      window.addEventListener("resize", resizeHandler);
      animate();
    })();

    return () => {
      mounted = false;
      cancelAnimationFrame(frameId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      renderer?.dispose();
      mountRef.current?.replaceChildren();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
