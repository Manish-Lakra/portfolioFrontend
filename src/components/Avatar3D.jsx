import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import AvatarModel from './AvatarModel'

export default function Avatar3D({ voiceState = 'idle', isMinimized = false }) {
    // Dynamic camera framing based on size
    // Minimized: Show whole body standing playfully, zoomed in
    const camPos = isMinimized ? [0, 0.9, 2.5] : [0, 1.15, 0.75]
    const camFov = isMinimized ? 40 : 45
    const camTarget = isMinimized ? [0, 0.8, 0] : [0, 0.95, 0]

    return (
        <div className="avatar-container">
            <Canvas
                camera={{ position: camPos, fov: camFov }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[3, 5, 3]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <directionalLight
                    position={[-2, 3, -2]}
                    intensity={0.4}
                    color="#C2896E"
                />
                <pointLight position={[0, 2, 3]} intensity={0.5} color="#D97757" />

                <Suspense fallback={null}>
                    <AvatarModel voiceState={voiceState} isMinimized={isMinimized} />
                    <ContactShadows
                        position={[0, -1.65, 0]}
                        opacity={0.4}
                        scale={4}
                        blur={2}
                        far={4}
                    />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                    minAzimuthAngle={-Math.PI / 6}
                    maxAzimuthAngle={Math.PI / 6}
                    target={camTarget}
                />
            </Canvas>

            {/* State indicator glow */}
            <div className={`avatar-glow avatar-glow--${voiceState}`} />
        </div>
    )
}
