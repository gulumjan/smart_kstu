"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import styles from "./Campus3d.module.scss";

// Компонент П-образного главного корпуса (единое целое)
function MainBuildingPShape({
  isHovered,
  onHover,
}: {
  isHovered: boolean;
  onHover: (hover: boolean) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [showLabel, setShowLabel] = useState(false);

  const mainColor = "#e8e8e8"; // Светло-серый (почти белый)
  const floors = 5;

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.06;
    } else if (meshRef.current) {
      meshRef.current.position.y = 0;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => {
        onHover(true);
        setShowLabel(true);
      }}
      onPointerOut={() => {
        onHover(false);
        setShowLabel(false);
      }}
    >
      {/* Левое крыло */}
      <mesh position={[-3.5, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 5, 4.5]} />
        <meshStandardMaterial
          color={
            isHovered
              ? mainColor
              : new THREE.Color(mainColor).multiplyScalar(0.9)
          }
          emissive={mainColor}
          emissiveIntensity={isHovered ? 0.15 : 0.02}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Центральная часть (соединяет крылья) */}
      <mesh position={[0, 2.5, -2.25]} castShadow receiveShadow>
        <boxGeometry args={[7, 5, 2]} />
        <meshStandardMaterial
          color={
            isHovered
              ? mainColor
              : new THREE.Color(mainColor).multiplyScalar(0.9)
          }
          emissive={mainColor}
          emissiveIntensity={isHovered ? 0.15 : 0.02}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Правое крыло */}
      <mesh position={[3.5, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 5, 4.5]} />
        <meshStandardMaterial
          color={
            isHovered
              ? mainColor
              : new THREE.Color(mainColor).multiplyScalar(0.9)
          }
          emissive={mainColor}
          emissiveIntensity={isHovered ? 0.15 : 0.02}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Окна - левое крыло */}
      {Array.from({ length: floors }).map((_, floor) =>
        Array.from({ length: 8 }).map((_, i) => {
          const y = -2.5 + 5 * (floor / floors) + 0.5;
          const x = -5.5 + i * 0.4;
          return (
            <mesh key={`left-${floor}-${i}`} position={[x, y, 2.26]}>
              <planeGeometry args={[0.12, 0.18]} />
              <meshStandardMaterial
                color="#3b82f6"
                emissive="#60a5fa"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })
      )}

      {/* Окна - центр */}
      {Array.from({ length: floors }).map((_, floor) =>
        Array.from({ length: 14 }).map((_, i) => {
          const y = -2.5 + 5 * (floor / floors) + 0.5;
          const x = -3.5 + i * 0.4;
          return (
            <mesh key={`center-${floor}-${i}`} position={[x, y, -3.26]}>
              <planeGeometry args={[0.12, 0.18]} />
              <meshStandardMaterial
                color="#3b82f6"
                emissive="#60a5fa"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })
      )}

      {/* Окна - правое крыло */}
      {Array.from({ length: floors }).map((_, floor) =>
        Array.from({ length: 8 }).map((_, i) => {
          const y = -2.5 + 5 * (floor / floors) + 0.5;
          const x = 1.5 + i * 0.4;
          return (
            <mesh key={`right-${floor}-${i}`} position={[x, y, 2.26]}>
              <planeGeometry args={[0.12, 0.18]} />
              <meshStandardMaterial
                color="#3b82f6"
                emissive="#60a5fa"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })
      )}

      {/* Общая крыша */}
      <mesh position={[-3.5, 5.1, 0]} castShadow>
        <boxGeometry args={[4.2, 0.2, 4.7]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      <mesh position={[0, 5.1, -2.25]} castShadow>
        <boxGeometry args={[7.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      <mesh position={[3.5, 5.1, 0]} castShadow>
        <boxGeometry args={[4.2, 0.2, 4.7]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Солнечные панели */}
      <mesh position={[-3.5, 5.25, 0]}>
        <boxGeometry args={[3.8, 0.03, 4.3]} />
        <meshStandardMaterial
          color="#1e3a8a"
          emissive="#3b82f6"
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 5.25, -2.25]}>
        <boxGeometry args={[6.8, 0.03, 1.8]} />
        <meshStandardMaterial
          color="#1e3a8a"
          emissive="#3b82f6"
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[3.5, 5.25, 0]}>
        <boxGeometry args={[3.8, 0.03, 4.3]} />
        <meshStandardMaterial
          color="#1e3a8a"
          emissive="#3b82f6"
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Освещение */}
      <pointLight
        position={[0, 3, 0]}
        color={isHovered ? "#22c55e" : mainColor}
        intensity={isHovered ? 0.6 : 0.15}
        distance={8}
      />

      {/* Подпись */}
      {(showLabel || isHovered) && (
        <Html position={[0, 6, 0]} center>
          <div className={styles.buildingLabel}>
            <div className={styles.labelText}>Главный корпус</div>
            <div className={styles.labelFloors}>5 этажей</div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Остальные здания
const otherBuildings = [
  {
    id: 2,
    name: "Учебный корпус №2",
    position: [0, 2, -9] as [number, number, number],
    size: [5, 4, 2.5] as [number, number, number],
    color: "#6b7280",
    floors: 4,
  },
  {
    id: 3,
    name: "Учебный корпус №3",
    position: [-7, 1.5, -9] as [number, number, number],
    size: [3.5, 3, 2] as [number, number, number],
    color: "#9ca3af",
    floors: 3,
  },
  {
    id: 4,
    name: "№4 ОКУ корпусу",
    position: [-10, 2.5, -3] as [number, number, number],
    size: [2.5, 5, 2] as [number, number, number],
    color: "#d1d5db",
    floors: 5,
  },
  {
    id: 5,
    name: "№5 ОКУ корпусу",
    position: [-10, 2.5, 0] as [number, number, number],
    size: [2.5, 5, 2] as [number, number, number],
    color: "#d1d5db",
    floors: 5,
  },
  {
    id: 6,
    name: "Учебный корпус №6",
    position: [7, 1.8, -10] as [number, number, number],
    size: [2.5, 3.6, 2] as [number, number, number],
    color: "#9ca3af",
    floors: 4,
  },
  {
    id: 7,
    name: "Учебный корпус №7",
    position: [10, 1.5, -10] as [number, number, number],
    size: [2.5, 3, 1.8] as [number, number, number],
    color: "#9ca3af",
    floors: 3,
  },
  {
    id: 8,
    name: "Политехнический колледж",
    position: [-7.5, 1, 2] as [number, number, number],
    size: [3, 2, 2.5] as [number, number, number],
    color: "#fecdd3",
    floors: 2,
  },
  {
    id: 9,
    name: "Столовая",
    position: [-7.5, 0.6, 6] as [number, number, number],
    size: [2.5, 1.2, 2] as [number, number, number],
    color: "#fef3c7",
    floors: 1,
  },
  {
    id: 10,
    name: "Общежитие",
    position: [-10, 2.5, 8] as [number, number, number],
    size: [2.5, 5, 3.5] as [number, number, number],
    color: "#9ca3af",
    floors: 5,
  },
  {
    id: 11,
    name: "Общежитие №2",
    position: [10, 2.5, 3] as [number, number, number],
    size: [2.5, 5, 4] as [number, number, number],
    color: "#9ca3af",
    floors: 5,
  },
  {
    id: 12,
    name: "Общежитие №3",
    position: [11, 2.5, 9] as [number, number, number],
    size: [2, 5, 3.5] as [number, number, number],
    color: "#9ca3af",
    floors: 5,
  },
  {
    id: 13,
    name: "Общежитие №1",
    position: [12, 2.5, -6] as [number, number, number],
    size: [1.8, 5, 3] as [number, number, number],
    color: "#9ca3af",
    floors: 5,
  },
  {
    id: 14,
    name: "Учебный полигон 'Политех'",
    position: [9, 1, -3] as [number, number, number],
    size: [2.5, 2, 2] as [number, number, number],
    color: "#fed7aa",
    floors: 2,
  },
  {
    id: 15,
    name: "Учебная мастерская",
    position: [9, 1, 0.5] as [number, number, number],
    size: [2.5, 2, 2] as [number, number, number],
    color: "#fed7aa",
    floors: 2,
  },
];

function Building({
  building,
  isHovered,
  onHover,
}: {
  building: (typeof otherBuildings)[0];
  isHovered: boolean;
  onHover: (hover: boolean) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [showLabel, setShowLabel] = useState(false);

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.position.y =
        building.position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.06;
    } else if (meshRef.current) {
      meshRef.current.position.y = building.position[1];
    }
  });

  return (
    <group
      ref={meshRef}
      position={building.position}
      onPointerOver={() => {
        onHover(true);
        setShowLabel(true);
      }}
      onPointerOut={() => {
        onHover(false);
        setShowLabel(false);
      }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={building.size} />
        <meshStandardMaterial
          color={
            isHovered
              ? building.color
              : new THREE.Color(building.color).multiplyScalar(0.85)
          }
          emissive={building.color}
          emissiveIntensity={isHovered ? 0.2 : 0.03}
          roughness={0.75}
          metalness={0.15}
        />
      </mesh>

      {/* Окна */}
      {Array.from({ length: building.floors }).map((_, floor) =>
        Array.from({ length: Math.floor(building.size[0] / 0.35) }).map(
          (_, i) => {
            const y =
              -building.size[1] / 2 +
              (building.size[1] / building.floors) * floor +
              0.5;
            const x = -building.size[0] / 2 + i * 0.35 + 0.2;
            return (
              <mesh
                key={`${floor}-${i}`}
                position={[x, y, building.size[2] / 2 + 0.01]}
              >
                <planeGeometry args={[0.12, 0.18]} />
                <meshStandardMaterial
                  color="#3b82f6"
                  emissive="#60a5fa"
                  emissiveIntensity={0.5}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            );
          }
        )
      )}

      <mesh position={[0, building.size[1] / 2 + 0.1, 0]} castShadow>
        <boxGeometry
          args={[building.size[0] + 0.1, 0.2, building.size[2] + 0.1]}
        />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      <pointLight
        position={[0, building.size[1] / 2, 0]}
        color={isHovered ? "#22c55e" : building.color}
        intensity={isHovered ? 0.6 : 0.15}
        distance={5}
      />

      {(showLabel || isHovered) && (
        <Html position={[0, building.size[1] / 2 + 0.7, 0]} center>
          <div className={styles.buildingLabel}>
            <div className={styles.labelText}>{building.name}</div>
            <div className={styles.labelFloors}>{building.floors} этажа</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function CampusGround() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#86efac" roughness={0.95} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 1]}
        receiveShadow
      >
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, -5]}
        receiveShadow
      >
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[28, 1.5]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-7, 0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[1.2, 25]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[7, 0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[1.2, 25]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    </>
  );
}

function GreenZones() {
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-3.5, 0.005, 5]}
        receiveShadow
      >
        <planeGeometry args={[5, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.95} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[3.5, 0.005, 5]}
        receiveShadow
      >
        <planeGeometry args={[5, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.95} />
      </mesh>
    </>
  );
}

function Trees() {
  const allTrees: [number, number, number][] = [
    ...Array.from(
      { length: 15 },
      (_, i) => [-14 + i * 2, 0, -12] as [number, number, number]
    ),
    [-5, 0, 4],
    [-4, 0, 5],
    [-3, 0, 4],
    [-4, 0, 6],
    [-5, 0, 7],
    [-3, 0, 7],
    [3, 0, 4],
    [4, 0, 5],
    [5, 0, 4],
    [4, 0, 6],
    [3, 0, 7],
    [5, 0, 7],
    ...Array.from(
      { length: 12 },
      (_, i) => [14, 0, -11 + i * 2] as [number, number, number]
    ),
    ...Array.from(
      { length: 8 },
      (_, i) => [-12, 0, -8 + i * 2] as [number, number, number]
    ),
  ];

  return (
    <>
      {allTrees.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
            <meshStandardMaterial color="#78350f" roughness={0.95} />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow>
            <coneGeometry args={[0.5, 0.8, 6]} />
            <meshStandardMaterial color="#15803d" />
          </mesh>
          <mesh position={[0, 1.4, 0]} castShadow>
            <coneGeometry args={[0.4, 0.6, 6]} />
            <meshStandardMaterial color="#16a34a" />
          </mesh>
          <mesh position={[0, 1.7, 0]} castShadow>
            <coneGeometry args={[0.3, 0.4, 6]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Scene() {
  const [hoveredBuilding, setHoveredBuilding] = useState<
    string | number | null
  >(null);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[25, 35, 25]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight position={[-20, 25, -20]} intensity={0.5} />
      <hemisphereLight intensity={0.5} color="#87ceeb" groundColor="#86efac" />
      <fog attach="fog" args={["#e0f2fe", 40, 75]} />

      <CampusGround />
      <GreenZones />

      <MainBuildingPShape
        isHovered={hoveredBuilding === "main"}
        onHover={(hover) => setHoveredBuilding(hover ? "main" : null)}
      />

      {otherBuildings.map((building) => (
        <Building
          key={building.id}
          building={building}
          isHovered={hoveredBuilding === building.id}
          onHover={(hover) => setHoveredBuilding(hover ? building.id : null)}
        />
      ))}

      <Trees />

      <Text
        position={[0, 11, -20]}
        fontSize={2.8}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#ffffff"
      >
        КГТУ им. И. Раззакова
      </Text>

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={15}
        maxDistance={65}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 2, 0]}
      />
    </>
  );
}

export default function Campus3D() {
  return (
    <div className={styles.container}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className={styles.controls}>
        <div className={styles.controlItem}>🖱️ Вращать</div>
        <div className={styles.controlItem}>🔍 Зум</div>
        <div className={styles.controlItem}>👆 Наведи на здание</div>
      </div>
    </div>
  );
}
