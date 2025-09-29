import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  Text,
  OrbitControls,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "../../hooks/useTheme";
import { useAccessibility } from "../../hooks/useAccessibility";
import { cn } from "../../libs/utils";

interface WealthPlanetProps {
  netWorth: number;
  previousNetWorth: number;
  growth: number;
  className?: string;
}

// 3D Wealth Planet Component
function WealthPlanet({
  netWorth,
  growth,
}: {
  netWorth: number;
  growth: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { themeMode } = useTheme();

  // Calculate planet size based on net worth (logarithmic scale for better visualization)
  const planetSize = useMemo(() => {
    const baseSize = 1.5;
    const scaleFactor = Math.log10(Math.max(netWorth / 10000, 1)) * 0.3;
    return Math.min(baseSize + scaleFactor, 3); // Cap at 3 units
  }, [netWorth]);

  // Planet color based on growth
  const planetColor = useMemo(() => {
    if (growth > 0) return themeMode === "dark" ? "#10B981" : "#059669"; // Green for positive
    if (growth < 0) return themeMode === "dark" ? "#EF4444" : "#DC2626"; // Red for negative
    return themeMode === "dark" ? "#6366F1" : "#4F46E5"; // Blue for neutral
  }, [growth, themeMode]);

  // Animate planet rotation and pulsing
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;

      // Gentle pulsing animation based on growth
      const pulseIntensity = Math.abs(growth) / 10000;
      const pulse =
        Math.sin(state.clock.elapsedTime * 2) * pulseIntensity * 0.1;
      meshRef.current.scale.setScalar(planetSize + pulse);
    }
  });

  return (
    <group>
      {/* Main Planet */}
      <Sphere ref={meshRef} args={[planetSize, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={planetColor}
          metalness={0.3}
          roughness={0.4}
          emissive={planetColor}
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Planet Atmosphere Glow */}
      <Sphere args={[planetSize * 1.1, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={planetColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Sparkles for positive growth */}
      {growth > 0 && (
        <Sparkles
          count={20}
          scale={planetSize * 2}
          size={2}
          speed={0.5}
          color={planetColor}
        />
      )}

      {/* Net Worth Text */}
      <Text
        position={[0, planetSize + 0.8, 0]}
        fontSize={0.3}
        color={themeMode === "dark" ? "#FFFFFF" : "#1F2937"}
        anchorX="center"
        anchorY="middle"
      >
        ฿{(netWorth / 1000).toFixed(0)}K
      </Text>

      {/* Growth Indicator */}
      <Text
        position={[0, planetSize + 0.4, 0]}
        fontSize={0.2}
        color={planetColor}
        anchorX="center"
        anchorY="middle"
      >
        {growth > 0 ? "+" : ""}฿{(growth / 1000).toFixed(1)}K
      </Text>
    </group>
  );
}

// Orbital Rings Component
function OrbitalRings() {
  const ringsRef = useRef<THREE.Group>(null);
  const { themeMode } = useTheme();

  useFrame(() => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.002;
    }
  });

  const ringColor = themeMode === "dark" ? "#8B5CF6" : "#7C3AED";

  return (
    <group ref={ringsRef}>
      {/* Inner Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 8, 100]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.6} />
      </mesh>

      {/* Outer Ring */}
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[3.2, 0.015, 8, 100]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Scene Setup Component
function Scene({ netWorth, growth }: { netWorth: number; growth: number }) {
  const { themeMode } = useTheme();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={themeMode === "dark" ? 1000 : 500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Wealth Planet */}
      <WealthPlanet netWorth={netWorth} growth={growth} />

      {/* Orbital Rings */}
      <OrbitalRings />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function InteractiveWealthPlanet({
  netWorth,
  previousNetWorth: _previousNetWorth,
  growth,
  className,
}: WealthPlanetProps) {
  const { isPlayMode, themeMode } = useTheme();
  const { accessibilityMode } = useAccessibility();

  // Disable 3D for elder mode or if user prefers reduced motion
  const disable3D = accessibilityMode === "elder";

  if (!isPlayMode || disable3D) {
    // Fallback to 2D visualization for Clarity mode or accessibility
    return (
      <div className={cn("relative aspect-square max-w-md mx-auto", className)}>
        <motion.div
          className={cn(
            "w-full h-full rounded-full flex items-center justify-center relative overflow-hidden",
            "bg-gradient-to-br",
            growth > 0
              ? "from-green-400 to-green-600"
              : growth < 0
                ? "from-red-400 to-red-600"
                : "from-blue-400 to-blue-600",
            themeMode === "dark" && "shadow-2xl shadow-purple-500/20",
          )}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Planet Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

          {/* Net Worth Display */}
          <div className="text-center text-white z-10">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              ฿{(netWorth / 1000).toFixed(0)}K
            </div>
            <div
              className={cn(
                "text-lg font-medium",
                growth > 0
                  ? "text-green-100"
                  : growth < 0
                    ? "text-red-100"
                    : "text-blue-100",
              )}
            >
              {growth > 0 ? "+" : ""}฿{(growth / 1000).toFixed(1)}K
            </div>
          </div>

          {/* Growth Particles */}
          {growth > 0 && (
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/60 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [-20, -40],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // 3D Canvas for Play Mode
  return (
    <div className={cn("relative aspect-square max-w-md mx-auto", className)}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{
          background:
            themeMode === "dark"
              ? "radial-gradient(circle, #1e1b4b 0%, #0f0f23 100%)"
              : "radial-gradient(circle, #ddd6fe 0%, #e0e7ff 100%)",
        }}
      >
        <Scene netWorth={netWorth} growth={growth} />
      </Canvas>

      {/* Interactive Overlay */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center text-white">
          <div className="text-sm font-medium mb-1">Planet of Wealth</div>
          <div className="text-xs opacity-80">
            Drag to rotate • Scroll to zoom • Auto-rotating
          </div>
        </div>
      </motion.div>

      {/* Growth Status Indicator */}
      <motion.div
        className={cn(
          "absolute top-4 right-4 px-3 py-2 rounded-full text-sm font-medium",
          growth > 0
            ? "bg-green-500/20 text-green-300 border border-green-500/30"
            : growth < 0
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : "bg-blue-500/20 text-blue-300 border border-blue-500/30",
        )}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {growth > 0 ? "🚀 Growing" : growth < 0 ? "📉 Declining" : "📊 Stable"}
      </motion.div>
    </div>
  );
}
