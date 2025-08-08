import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'

export default function BackgroundScene() {
    const meshRef = useRef()

    useFrame(({ clock }) => {
        meshRef.current.rotation.x = clock.getElapsedTime() * 0.05
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.05
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <group ref={meshRef}>
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />
            </group>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                rotateSpeed={0.5}
            />
        </>
    )
}