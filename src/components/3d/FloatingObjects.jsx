import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingBoat() {
    const boatRef = useRef()

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        if (boatRef.current) {
            boatRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.2
            boatRef.current.rotation.z = Math.sin(elapsedTime * 0.3) * 0.1
        }
    })

    return (
        <group ref={boatRef} position={[-3, 0.5, -5]}>
            <mesh rotation={[0, Math.PI * 0.25, 0]}>
                <boxGeometry args={[1.5, 0.2, 0.5]} />
                <meshStandardMaterial color="#d4a76a" />
            </mesh>
            <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI * 0.5]}>
                <planeGeometry args={[1, 1.5]} />
                <meshStandardMaterial color="#f5f5f5" side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}