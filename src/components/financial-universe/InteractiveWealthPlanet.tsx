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
import { useTranslation } from "../../libs/i18n";

interface WealthPlanetProps {
  netWorth: number;
  previousNetWorth: number;
  growth: number;
  className?: string;
}

// Enhanced 3D Wealth Planet Component with Realistic Materials
function WealthPlanet({
  netWorth,
  growth,
}: {
  netWorth: number;
  growth: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  // Calculate planet size based on net worth (more dramatic scaling)
  const planetSize = useMemo(() => {
    const baseSize = 1.8;
    const scaleFactor = Math.log10(Math.max(netWorth / 5000, 1)) * 0.4;
    return Math.min(baseSize + scaleFactor, 3.5); // Larger max size
  }, [netWorth]);

  // Dynamic planet appearance based on wealth and growth
  const planetMaterial = useMemo(() => {
    let baseColor, emissiveColor, atmosphereColor, ringColor;

    if (netWorth > 1000000) {
      // Millionaire planet - Gold with purple atmosphere
      baseColor = "#FFD700";
      emissiveColor = "#FFA500";
      atmosphereColor = "#9333EA";
      ringColor = "#F59E0B";
    } else if (netWorth > 500000) {
      // High net worth - Silver with blue atmosphere
      baseColor = "#C0C0C0";
      emissiveColor = "#E5E7EB";
      atmosphereColor = "#3B82F6";
      ringColor = "#6B7280";
    } else if (growth > 5000) {
      // High growth - Vibrant green
      baseColor = "#10B981";
      emissiveColor = "#059669";
      atmosphereColor = "#34D399";
      ringColor = "#10B981";
    } else if (growth > 0) {
      // Positive growth - Green to blue gradient
      baseColor = "#22C55E";
      emissiveColor = "#16A34A";
      atmosphereColor = "#86EFAC";
      ringColor = "#22C55E";
    } else if (growth < -2000) {
      // Significant loss - Deep red
      baseColor = "#DC2626";
      emissiveColor = "#B91C1C";
      atmosphereColor = "#F87171";
      ringColor = "#DC2626";
    } else {
      // Stable/neutral - Blue with cosmic purple
      baseColor = "#3B82F6";
      emissiveColor = "#2563EB";
      atmosphereColor = "#93C5FD";
      ringColor = "#6366F1";
    }

    return { baseColor, emissiveColor, atmosphereColor, ringColor };
  }, [netWorth, growth]);

  // Enhanced animations
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += 0.004;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

      // Dynamic pulsing based on growth
      const pulseIntensity = Math.abs(growth) / 20000;
      const pulse =
        Math.sin(state.clock.elapsedTime * 1.5) * pulseIntensity * 0.08;
      meshRef.current.scale.setScalar(1 + pulse);
    }

    if (atmosphereRef.current) {
      // Counter-rotate atmosphere
      atmosphereRef.current.rotation.y -= 0.002;
      atmosphereRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    if (ringsRef.current) {
      // Rotate rings
      ringsRef.current.rotation.z += 0.01;
      ringsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <group>
      {/* Enhanced Main Planet */}
      <Sphere ref={meshRef} args={[planetSize, 128, 128]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={planetMaterial.baseColor}
          metalness={0.2}
          roughness={0.6}
          clearcoat={0.4}
          clearcoatRoughness={0.1}
          emissive={planetMaterial.emissiveColor}
          emissiveIntensity={0.2}
          transmission={0.1}
          thickness={0.5}
        />
      </Sphere>

      {/* Multi-layered Atmosphere */}
      <Sphere
        ref={atmosphereRef}
        args={[planetSize * 1.2, 64, 64]}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial
          color={planetMaterial.atmosphereColor}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Inner Glow */}
      <Sphere args={[planetSize * 1.08, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={planetMaterial.emissiveColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Orbital Rings for High Net Worth */}
      {netWorth > 300000 && (
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[planetSize * 2.2, planetSize * 2.4, 64]} />
            <meshBasicMaterial
              color={planetMaterial.ringColor}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          {netWorth > 800000 && (
            <mesh rotation={[Math.PI / 1.8, 0, Math.PI / 4]}>
              <ringGeometry args={[planetSize * 2.8, planetSize * 3.0, 64]} />
              <meshBasicMaterial
                color={planetMaterial.atmosphereColor}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      )}

      {/* Enhanced Sparkles */}
      {growth > 0 && (
        <Sparkles
          count={Math.min(150, Math.floor(netWorth / 5000))}
          scale={planetSize * 4}
          size={4}
          speed={0.4}
          color={planetMaterial.emissiveColor}
        />
      )}

      {/* Floating Wealth Display */}
      <Text
        position={[0, planetSize + 1.5, 0]}
        fontSize={0.5}
        color={themeMode === "dark" ? "#FFFFFF" : "#1F2937"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor={themeMode === "dark" ? "#000000" : "#FFFFFF"}
      >
        ฿{(netWorth / 1000).toFixed(0)}K
      </Text>

      {/* Growth Status with Emoji */}
      <Text
        position={[0, planetSize + 1.0, 0]}
        fontSize={0.3}
        color={planetMaterial.baseColor}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={themeMode === "dark" ? "#000000" : "#FFFFFF"}
      >
        {growth > 5000
          ? "🚀 +"
          : growth > 0
            ? "📈 +"
            : growth < -2000
              ? "📉 "
              : "📊 "}
        ฿{Math.abs(growth / 1000).toFixed(1)}K
      </Text>

      {/* Wealth Status Badge */}
      <Text
        position={[0, -planetSize - 1.2, 0]}
        fontSize={0.25}
        color={themeMode === "dark" ? "#94A3B8" : "#64748B"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor={themeMode === "dark" ? "#000000" : "#FFFFFF"}
      >
        {netWorth > 1000000
          ? t(
              "features.financialUniverse.wealthPlanet.wealthStatus.millionaire",
            )
          : netWorth > 500000
            ? t(
                "features.financialUniverse.wealthPlanet.wealthStatus.highNetWorth",
              )
            : netWorth > 100000
              ? t(
                  "features.financialUniverse.wealthPlanet.wealthStatus.buildingWealth",
                )
              : netWorth > 50000
                ? t(
                    "features.financialUniverse.wealthPlanet.wealthStatus.growingStrong",
                  )
                : t(
                    "features.financialUniverse.wealthPlanet.wealthStatus.startingJourney",
                  )}
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
      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.2} color="#1e1b4b" />

      {/* Key Light - Main illumination */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />

      {/* Fill Light - Softer secondary light */}
      <pointLight
        position={[-8, 5, 8]}
        intensity={0.8}
        color="#4f46e5"
        distance={20}
        decay={2}
      />

      {/* Rim Light - Creates edge glow */}
      <pointLight
        position={[0, -10, -10]}
        intensity={1.2}
        color="#9333ea"
        distance={25}
        decay={1.5}
      />

      {/* Accent Light - Dynamic color based on growth */}
      <pointLight
        position={[15, 0, 0]}
        intensity={0.6}
        color={growth > 0 ? "#10b981" : growth < 0 ? "#ef4444" : "#3b82f6"}
        distance={30}
        decay={2}
      />

      {/* Enhanced Background Stars */}
      <Stars
        radius={150}
        depth={80}
        count={themeMode === "dark" ? 2000 : 1200}
        factor={6}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Cosmic Sparkles */}
      <Sparkles
        count={300}
        scale={25}
        size={2}
        speed={0.2}
        opacity={0.8}
        color="#ffffff"
      />

      {/* Additional Colored Sparkles for Wealth */}
      {netWorth > 100000 && (
        <Sparkles
          count={100}
          scale={15}
          size={3}
          speed={0.4}
          opacity={0.6}
          color="#ffd700"
        />
      )}

      {/* Wealth Planet */}
      <WealthPlanet netWorth={netWorth} growth={growth} />

      {/* Orbital Rings */}
      <OrbitalRings />

      {/* Enhanced Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={6}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.3}
        enableDamping={true}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
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
  const { t } = useTranslation();

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

  // 3D Canvas for Play Mode - Seamlessly integrated with universe theme
  return (
    <div className={cn("relative aspect-square max-w-md mx-auto", className)}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{
          background: "transparent", // Make canvas transparent to blend with universe background
        }}
      >
        <Scene netWorth={netWorth} growth={growth} />
      </Canvas>

      {/* Enhanced Interactive Overlay */}
      <motion.div
        className={cn(
          "absolute bottom-4 left-4 right-4 rounded-lg p-3 border",
          "bg-gradient-to-r from-black/30 via-purple-900/20 to-black/30",
          "backdrop-blur-md border-purple-500/20",
          "shadow-lg shadow-purple-500/10",
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center text-white">
          <div className="text-sm font-medium mb-1 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            {t("features.financialUniverse.wealthPlanet.title")}
          </div>
          <div className="text-xs opacity-80">
            {t("features.financialUniverse.wealthPlanet.instructions")}
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
        {growth > 0
          ? t("features.financialUniverse.wealthPlanet.status.growing")
          : growth < 0
            ? t("features.financialUniverse.wealthPlanet.status.declining")
            : t("features.financialUniverse.wealthPlanet.status.stable")}
      </motion.div>
    </div>
  );
}
