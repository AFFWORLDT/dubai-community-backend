"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Button } from "@/components/ui/button"
import { PremiumCard } from "@/components/ui/premium-card"
import { CuboidIcon as Cube, Eye, HeadsetIcon as VrHeadset } from 'lucide-react'
import { motion } from "framer-motion"

function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url)
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001
    }
  })

  return <primitive ref={modelRef} object={gltf.scene} scale={1.5} position={[0, -1, 0]} />
}

export function PropertyViewer3D() {
  const [view, setView] = useState<"3d" | "vr">("3d")

  return (
    <PremiumCard variant="diamond" className="relative aspect-[16/9]">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant={view === "3d" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("3d")}
        >
          <Cube className="w-4 h-4 mr-2" />
          3D View
        </Button>
        <Button
          variant={view === "vr" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("vr")}
        >
          <VrHeadset className="w-4 h-4 mr-2" />
          VR Mode
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full"
      >
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            {/* <Model url="./../assets/3d/duck.glb" /> */}
            <Environment preset="city" />
            <OrbitControls
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Click and drag to explore the property in 3D
          </motion.div>
        </div>
      </motion.div>
    </PremiumCard>
  )
}

