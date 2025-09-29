import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../../core";

interface UltimateCosmicBackgroundProps {
  intensity?: "low" | "medium" | "high" | "ultra";
  showNebula?: boolean;
  showShootingStars?: boolean;
  showParticles?: boolean;
  show3DStars?: boolean;
  financialActivity?: number; // 0-1, affects particle density and movement
  className?: string;
  interactive?: boolean;
}

// 3D Particle Cloud Component
function ParticleCloud({
  count = 2000,
  intensity = 0.5,
  financialActivity = 0.5,
}: {
  count?: number;
  intensity?: number;
  financialActivity?: number;
}) {
  const meshRef = useRef<THREE.Points>(null);
  const { themeMode } = useTheme();

  // Generate particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create a more natural distribution with some clustering
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, [count]);

  // Animate particles based on financial activity
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = meshRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Gentle floating motion with financial activity influence
        const activityMultiplier = 1 + financialActivity * 2;
        positions[i3 + 1] +=
          Math.sin(time * 0.5 + i * 0.1) * 0.01 * activityMultiplier;
        positions[i3] +=
          Math.cos(time * 0.3 + i * 0.05) * 0.005 * activityMultiplier;
        positions[i3 + 2] +=
          Math.sin(time * 0.4 + i * 0.08) * 0.008 * activityMultiplier;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;

      // Rotate the entire particle system
      meshRef.current.rotation.y += 0.0005 * (1 + financialActivity);
      meshRef.current.rotation.x += 0.0002 * (1 + financialActivity);
    }
  });

  return (
    <Points
      ref={meshRef}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color={themeMode === "dark" ? "#6366f1" : "#8b5cf6"}
        size={0.05 + intensity * 0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3 + intensity * 0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// 3D Nebula Effect Component
function NebulaEffect({
  intensity = 0.5,
  financialActivity = 0.5,
}: {
  intensity?: number;
  financialActivity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { themeMode } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      // Slow rotation and pulsing
      meshRef.current.rotation.z += 0.0008 * (1 + financialActivity * 0.5);
      meshRef.current.rotation.y += 0.0005 * (1 + financialActivity * 0.3);

      // Pulsing effect based on financial activity
      const pulse = 1 + Math.sin(time * 0.5) * 0.1 * (1 + financialActivity);
      meshRef.current.scale.setScalar(pulse);

      // Update material opacity
      if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
        meshRef.current.material.opacity =
          (0.1 + intensity * 0.2) * (0.8 + Math.sin(time * 0.3) * 0.2);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]}>
      <sphereGeometry args={[25, 32, 32]} />
      <meshBasicMaterial
        color={themeMode === "dark" ? "#4c1d95" : "#7c3aed"}
        transparent
        opacity={0.1 + intensity * 0.2}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Shooting Star Component
function ShootingStar({
  startPosition,
  endPosition,
  duration = 2,
  delay = 0,
  onComplete,
}: {
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const { themeMode } = useTheme();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const progress = Math.min((time - delay) / duration, 1);

    if (progress >= 0 && progress <= 1 && meshRef.current) {
      // Interpolate position
      const x =
        startPosition[0] + (endPosition[0] - startPosition[0]) * progress;
      const y =
        startPosition[1] + (endPosition[1] - startPosition[1]) * progress;
      const z =
        startPosition[2] + (endPosition[2] - startPosition[2]) * progress;

      meshRef.current.position.set(x, y, z);

      // Update trail
      if (trailRef.current) {
        const trailLength = 2;
        const trailX = x - (endPosition[0] - startPosition[0]) * 0.1;
        const trailY = y - (endPosition[1] - startPosition[1]) * 0.1;
        const trailZ = z - (endPosition[2] - startPosition[2]) * 0.1;
        trailRef.current.position.set(trailX, trailY, trailZ);
        trailRef.current.lookAt(x, y, z);
        trailRef.current.scale.x = trailLength * (1 - progress);
      }

      // Fade out near the end
      const opacity = progress < 0.8 ? 1 : (1 - progress) / 0.2;
      if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
        meshRef.current.material.opacity = opacity;
      }
      if (trailRef.current?.material instanceof THREE.MeshBasicMaterial) {
        trailRef.current.material.opacity = opacity * 0.5;
      }
    }

    if (progress >= 1 && onComplete) {
      onComplete();
    }
  });

  return (
    <group>
      {/* Main shooting star */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color={themeMode === "dark" ? "#fbbf24" : "#f59e0b"}
          transparent
          emissive={themeMode === "dark" ? "#fbbf24" : "#f59e0b"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Trail */}
      <mesh ref={trailRef}>
        <cylinderGeometry args={[0.01, 0.03, 1, 8]} />
        <meshBasicMaterial
          color={themeMode === "dark" ? "#fbbf24" : "#f59e0b"}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Shooting Stars Manager
function ShootingStarsManager({
  frequency = 0.3,
  financialActivity = 0.5,
}: {
  frequency?: number;
  financialActivity?: number;
}) {
  const [shootingStars, setShootingStars] = useState<
    Array<{
      id: string;
      startPosition: [number, number, number];
      endPosition: [number, number, number];
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        // More shooting stars during high financial activity
        const adjustedFrequency = frequency * (1 + financialActivity);

        if (Math.random() < adjustedFrequency) {
          const id = Math.random().toString(36).substr(2, 9);

          // Random start position (off-screen)
          const startRadius = 30;
          const startAngle = Math.random() * Math.PI * 2;
          const startPosition: [number, number, number] = [
            Math.cos(startAngle) * startRadius,
            Math.sin(startAngle) * startRadius,
            -10 + Math.random() * 20,
          ];

          // Random end position (also off-screen, opposite direction)
          const endRadius = 25;
          const endAngle = startAngle + Math.PI + (Math.random() - 0.5) * 0.5;
          const endPosition: [number, number, number] = [
            Math.cos(endAngle) * endRadius,
            Math.sin(endAngle) * endRadius,
            -10 + Math.random() * 20,
          ];

          const duration = 1.5 + Math.random() * 2;
          const delay = 0;

          setShootingStars((prev) => [
            ...prev,
            {
              id,
              startPosition,
              endPosition,
              duration,
              delay,
            },
          ]);
        }
      },
      2000 / (1 + financialActivity),
    ); // More frequent with higher activity

    return () => clearInterval(interval);
  }, [frequency, financialActivity]);

  const handleShootingStarComplete = (id: string) => {
    setShootingStars((prev) => prev.filter((star) => star.id !== id));
  };

  return (
    <group>
      {shootingStars.map((star) => (
        <ShootingStar
          key={star.id}
          startPosition={star.startPosition}
          endPosition={star.endPosition}
          duration={star.duration}
          delay={star.delay}
          onComplete={() => handleShootingStarComplete(star.id)}
        />
      ))}
    </group>
  );
}

// 3D Cosmic Scene
function CosmicScene({
  intensity,
  financialActivity,
  showNebula,
  showShootingStars,
  showParticles,
}: {
  intensity: number;
  financialActivity: number;
  showNebula: boolean;
  showShootingStars: boolean;
  showParticles: boolean;
}) {
  const { themeMode } = useTheme();

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight
        intensity={0.1}
        color={themeMode === "dark" ? "#1e1b4b" : "#f8fafc"}
      />

      {/* Directional light for depth */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.2}
        color="#6366f1"
      />

      {/* Background stars */}
      <Stars
        radius={100}
        depth={80}
        count={3000}
        factor={6}
        saturation={0}
        fade
        speed={0.1 + financialActivity * 0.2}
      />

      {/* Enhanced sparkles */}
      <Sparkles
        count={100}
        scale={50}
        size={2 + intensity * 3}
        speed={0.3 + financialActivity * 0.5}
        opacity={0.3 + intensity * 0.4}
        color={themeMode === "dark" ? "#8b5cf6" : "#6366f1"}
      />

      {/* Particle clouds */}
      {showParticles && (
        <>
          <ParticleCloud
            count={1500 + Math.floor(intensity * 1000)}
            intensity={intensity}
            financialActivity={financialActivity}
          />
          <ParticleCloud
            count={800}
            intensity={intensity * 0.7}
            financialActivity={financialActivity * 0.8}
          />
        </>
      )}

      {/* Nebula effect */}
      {showNebula && (
        <>
          <NebulaEffect
            intensity={intensity}
            financialActivity={financialActivity}
          />
          <NebulaEffect
            intensity={intensity * 0.6}
            financialActivity={financialActivity * 0.7}
          />
        </>
      )}

      {/* Shooting stars */}
      {showShootingStars && (
        <ShootingStarsManager
          frequency={0.2 + intensity * 0.3}
          financialActivity={financialActivity}
        />
      )}
    </>
  );
}

// 2D Overlay Effects
function CosmicOverlay({
  intensity,
  financialActivity,
  themeMode,
}: {
  intensity: number;
  financialActivity: number;
  themeMode: string;
}) {
  // Generate floating particles for 2D overlay
  const overlayParticles = useMemo(() => {
    const count = Math.floor(50 + intensity * 100);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 1 + Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.4,
    }));
  }, [intensity]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating 2D particles */}
      {overlayParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: themeMode === "dark" ? "#6366f1" : "#8b5cf6",
            boxShadow: `0 0 ${particle.size * 2}px ${themeMode === "dark" ? "#6366f1" : "#8b5cf6"}`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [
              particle.opacity * 0.3,
              particle.opacity,
              particle.opacity * 0.3,
            ],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration * (1 + financialActivity * 0.5),
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${
            themeMode === "dark"
              ? `rgba(99, 102, 241, ${0.05 + intensity * 0.1})`
              : `rgba(139, 92, 246, ${0.03 + intensity * 0.05})`
          } 0%, transparent 50%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${
            themeMode === "dark"
              ? `rgba(139, 92, 246, ${0.08 + intensity * 0.12})`
              : `rgba(99, 102, 241, ${0.04 + intensity * 0.06})`
          } 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

export function UltimateCosmicBackground({
  intensity = "medium",
  showNebula = true,
  showShootingStars = true,
  showParticles = true,
  show3DStars = true,
  financialActivity = 0.5,
  className = "",
  interactive = false,
}: UltimateCosmicBackgroundProps) {
  const { themeMode } = useTheme();

  // Convert intensity to numeric value
  const intensityValue = {
    low: 0.3,
    medium: 0.6,
    high: 0.8,
    ultra: 1.0,
  }[intensity];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 3D Cosmic Scene */}
      {show3DStars && (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{
              background: "transparent",
              pointerEvents: interactive ? "auto" : "none",
            }}
          >
            <CosmicScene
              intensity={intensityValue}
              financialActivity={financialActivity}
              showNebula={showNebula}
              showShootingStars={showShootingStars}
              showParticles={showParticles}
            />
          </Canvas>
        </div>
      )}

      {/* 2D Overlay Effects */}
      <CosmicOverlay
        intensity={intensityValue}
        financialActivity={financialActivity}
        themeMode={themeMode}
      />

      {/* Additional atmospheric effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 30%, ${
            themeMode === "dark"
              ? `rgba(30, 27, 75, ${0.1 + intensityValue * 0.2})`
              : `rgba(248, 250, 252, ${0.05 + intensityValue * 0.1})`
          } 50%, transparent 70%)`,
        }}
      />

      {/* Pulsing cosmic energy */}
      <AnimatePresence>
        {financialActivity > 0.7 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle, ${
                themeMode === "dark"
                  ? "rgba(99, 102, 241, 0.1)"
                  : "rgba(139, 92, 246, 0.05)"
              } 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
