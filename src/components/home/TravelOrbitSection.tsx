"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { City } from "@/lib/types";

type OrbitCity = Pick<
  City,
  | "id"
  | "name"
  | "country"
  | "centerLatitude"
  | "centerLongitude"
  | "currency"
>;

interface TravelOrbitSectionProps {
  cities: OrbitCity[];
}

interface TravelerDot {
  mesh: THREE.Mesh;
  curve: THREE.CatmullRomCurve3;
  offset: number;
  speed: number;
}

const GLOBE_RADIUS = 1.65;
const MAX_ATLAS_CITIES = 14;

function latLngToVector(latitude: number, longitude: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - latitude);
  const theta = THREE.MathUtils.degToRad(longitude + 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function seededUnit(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function buildArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  lift: number
): THREE.CatmullRomCurve3 {
  const midpoint = start
    .clone()
    .add(end)
    .normalize()
    .multiplyScalar(GLOBE_RADIUS + lift);

  return new THREE.CatmullRomCurve3([start.clone(), midpoint, end.clone()]);
}

function createStarField() {
  const starCount = 240;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i += 1) {
    const theta = seededUnit(i + 1) * Math.PI * 2;
    const phi = Math.acos(seededUnit(i + 17) * 2 - 1);
    const radius = 4.8 + seededUnit(i + 29) * 4.4;
    const offset = i * 3;

    positions[offset] = radius * Math.sin(phi) * Math.cos(theta);
    positions[offset + 1] = radius * Math.cos(phi);
    positions[offset + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xf9dacb,
      size: 0.018,
      transparent: true,
      opacity: 0.62,
      sizeAttenuation: true,
    })
  );
}

function TravelOrbitCanvas({ cities }: { cities: OrbitCity[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || cities.length === 0) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111512, 5.6, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const root = new THREE.Group();
    root.rotation.set(-0.18, -0.95, 0.06);
    scene.add(root);

    const ambientLight = new THREE.AmbientLight(0xe6fff2, 0.85);
    const keyLight = new THREE.DirectionalLight(0xfff4e8, 2.3);
    keyLight.position.set(2.8, 2.6, 3.8);
    const rimLight = new THREE.DirectionalLight(0x8ad8ff, 1.35);
    rimLight.position.set(-3.6, -1.4, -2.2);
    scene.add(ambientLight, keyLight, rimLight);

    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 40);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0x183c36,
      roughness: 0.82,
      metalness: 0.08,
      emissive: 0x071411,
      emissiveIntensity: 0.48,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    root.add(globe);

    const wireGeometry = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(GLOBE_RADIUS + 0.012, 32, 18)
    );
    const wire = new THREE.LineSegments(
      wireGeometry,
      new THREE.LineBasicMaterial({
        color: 0xb9f3de,
        transparent: true,
        opacity: 0.16,
      })
    );
    root.add(wire);

    const equatorGeometry = new THREE.TorusGeometry(
      GLOBE_RADIUS + 0.018,
      0.004,
      8,
      160
    );
    const equatorMaterial = new THREE.MeshBasicMaterial({
      color: 0xfca87e,
      transparent: true,
      opacity: 0.72,
    });
    const equator = new THREE.Mesh(equatorGeometry, equatorMaterial);
    equator.rotation.x = Math.PI / 2;
    root.add(equator);

    const pinMaterial = new THREE.MeshStandardMaterial({
      color: 0xff7757,
      emissive: 0x922911,
      emissiveIntensity: 0.65,
      roughness: 0.35,
      metalness: 0.15,
    });
    const activePinMaterial = new THREE.MeshStandardMaterial({
      color: 0x8df3c5,
      emissive: 0x16644a,
      emissiveIntensity: 0.75,
      roughness: 0.28,
      metalness: 0.2,
    });
    const stemMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd2c7,
      transparent: true,
      opacity: 0.72,
    });
    const routeMaterial = new THREE.LineBasicMaterial({
      color: 0xffb39d,
      transparent: true,
      opacity: 0.76,
    });
    const secondaryRouteMaterial = new THREE.LineBasicMaterial({
      color: 0x8ad8ff,
      transparent: true,
      opacity: 0.5,
    });
    const travelerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const cityVectors = cities.map((city) =>
      latLngToVector(city.centerLatitude, city.centerLongitude, GLOBE_RADIUS + 0.04)
    );

    cityVectors.forEach((position, index) => {
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(index < 4 ? 0.046 : 0.034, 18, 18),
        index < 4 ? activePinMaterial : pinMaterial
      );
      pin.position.copy(position);
      pin.userData.phase = index * 0.36;
      root.add(pin);

      const normal = position.clone().normalize();
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.007, 0.012, 0.18, 8),
        stemMaterial
      );
      stem.position.copy(normal.clone().multiplyScalar(GLOBE_RADIUS + 0.08));
      stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      root.add(stem);
    });

    const travelers: TravelerDot[] = [];
    for (let index = 0; index < cityVectors.length - 1; index += 1) {
      const curve = buildArc(
        cityVectors[index],
        cityVectors[index + 1],
        index % 2 === 0 ? 0.76 : 0.56
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(72)
      );
      const line = new THREE.Line(
        geometry,
        index % 2 === 0 ? routeMaterial : secondaryRouteMaterial
      );
      root.add(line);

      if (index < 7) {
        const traveler = new THREE.Mesh(
          new THREE.SphereGeometry(0.026, 16, 16),
          travelerMaterial
        );
        root.add(traveler);
        travelers.push({
          mesh: traveler,
          curve,
          offset: index / 7,
          speed: 0.055 + index * 0.004,
        });
      }
    }

    const stars = createStarField();
    scene.add(stars);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let targetRotationX = -0.18;
    let targetRotationY = -0.95;
    let autoRotation = 0;
    let rafId = 0;
    let lastTime = performance.now();
    let isVisible = true;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const isMobile = width < 768;

      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.fov = isMobile ? 43 : 36;
      camera.position.set(0, 0, isMobile ? 5.85 : 5.05);
      camera.updateProjectionMatrix();

      root.position.set(isMobile ? 0.18 : 1.05, isMobile ? -0.88 : -0.06, 0);
      root.scale.setScalar(isMobile ? 0.84 : 1);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      targetRotationY = -0.95 + x * 0.42;
      targetRotationX = -0.18 - y * 0.24;
    };

    const handlePointerLeave = () => {
      targetRotationX = -0.18;
      targetRotationY = -0.95;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
        }
      },
      { threshold: 0.08 }
    );
    intersectionObserver.observe(container);
    resize();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isVisible && !document.hidden) {
        if (!prefersReducedMotion) {
          autoRotation += delta * 0.1;
          stars.rotation.y += delta * 0.012;
        }

        root.rotation.x += (targetRotationX - root.rotation.x) * 0.055;
        root.rotation.y +=
          (targetRotationY + autoRotation - root.rotation.y) * 0.045;

        travelers.forEach((traveler, index) => {
          const t = prefersReducedMotion
            ? traveler.offset
            : (time * 0.001 * traveler.speed + traveler.offset) % 1;
          traveler.curve.getPointAt(t, traveler.mesh.position);
          const pulse = 1 + Math.sin(time * 0.003 + index) * 0.16;
          traveler.mesh.scale.setScalar(pulse);
        });

        root.children.forEach((child) => {
          if (child.userData.phase === undefined) return;
          const phase = child.userData.phase as number;
          const scale = 1 + Math.sin(time * 0.0032 + phase) * 0.12;
          child.scale.setScalar(scale);
        });

        renderer.render(scene, camera);
      }

      rafId = window.requestAnimationFrame(animate);
    };

    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [cities]);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        data-testid="travel-orbit-canvas"
      />
    </div>
  );
}

export default function TravelOrbitSection({ cities }: TravelOrbitSectionProps) {
  const atlasCities = useMemo(
    () => cities.slice(0, MAX_ATLAS_CITIES),
    [cities]
  );
  const featuredCities = atlasCities.slice(0, 4);
  const featuredCityNames = featuredCities.map((city) => city.name).join(", ");
  const featuredCurrencies = Array.from(
    new Set(featuredCities.map((city) => city.currency))
  ).join(" / ");

  if (atlasCities.length < 2) return null;

  return (
    <section className="relative isolate mt-24 min-h-[760px] overflow-hidden bg-[#101511] text-white sm:min-h-[720px] lg:min-h-[680px]">
      <TravelOrbitCanvas cities={atlasCities} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#101511]/94 via-[#101511]/58 to-[#101511]/92 md:bg-gradient-to-r md:from-[#101511]/96 md:via-[#101511]/68 md:to-[#101511]/20" />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col justify-between px-6 py-14 sm:min-h-[720px] sm:py-16 lg:min-h-[680px]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8df3c5]">
            3D route atlas
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-6xl">
            Spin the world before you pick a street.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/76 sm:text-lg">
            A living globe gives Traveler the same cinematic depth as the
            reference, but keeps the product practical: budget cities, route
            arcs, and quick paths into the real map views.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cities"
              className="rounded-md bg-coral-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-soft transition hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-[#8df3c5]"
            >
              Explore Cities
            </Link>
            <Link
              href="/templates"
              className="rounded-md border border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-cocoa-800 focus:outline-none focus:ring-2 focus:ring-[#8df3c5]"
            >
              Build a Trip
            </Link>
          </div>
        </div>

        <div className="grid gap-5 border-t border-white/15 pt-6 text-sm text-white/78 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-semibold tracking-normal text-white">
              {cities.length}
            </p>
            <p className="mt-1">budget-friendly cities in the atlas</p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-normal text-white">
              {featuredCities.length}
            </p>
            <p className="mt-1">
              opening pins from {featuredCityNames}
            </p>
          </div>
          <div>
            <p className="break-words text-2xl font-semibold tracking-normal text-white sm:text-3xl">
              {featuredCurrencies}
            </p>
            <p className="mt-1">currencies visible across the first orbit</p>
          </div>
        </div>
      </div>
    </section>
  );
}
