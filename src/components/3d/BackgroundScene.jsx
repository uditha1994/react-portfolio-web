// import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { Stars, OrbitControls } from '@react-three/drei'

// export default function BackgroundScene() {
//     const meshRef = useRef()

//     useFrame(({ clock }) => {
//         meshRef.current.rotation.x = clock.getElapsedTime() * 0.05
//         meshRef.current.rotation.y = clock.getElapsedTime() * 0.05
//     })

//     return (
//         <>
//             <ambientLight intensity={0.5} />
//             <pointLight position={[10, 10, 10]} />
//             <group ref={meshRef}>
//                 <Stars
//                     radius={100}
//                     depth={50}
//                     count={5000}
//                     factor={4}
//                     saturation={0}
//                     fade
//                     speed={0.5}
//                 />
//             </group>
//             <OrbitControls
//                 enableZoom={false}
//                 enablePan={false}
//                 enableRotate={true}
//                 rotateSpeed={0.5}
//             />
//         </>
//     )
// }

//new 

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FloatingBoat } from './FloatingObjects'

export default function OceanScene() {
    const oceanRef = useRef()
    const waveUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(1.5, 1.5) },
        uBigWavesSpeed: { value: 0.75 },
        uDepthColor: { value: new THREE.Color('#1b4f8f') },
        uSurfaceColor: { value: new THREE.Color('#4dabf7') },
        uColorOffset: { value: 0.25 },
        uColorMultiplier: { value: 2 }
    }), [])

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        waveUniforms.uTime.value = elapsedTime

        if (oceanRef.current) {
            oceanRef.current.rotation.z = elapsedTime * 0.05
        }
    })

    const oceanShader = {
        uniforms: waveUniforms,
        vertexShader: `
      uniform float uTime;
      uniform vec2 uBigWavesFrequency;
      uniform float uBigWavesElevation;
      uniform float uBigWavesSpeed;
      
      varying float vElevation;
      
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        
        // Wave animation
        float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                         sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                         uBigWavesElevation;
        
        modelPosition.y += elevation;
        
        vElevation = elevation;
        
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
      }
    `,
        fragmentShader: `
      uniform vec3 uDepthColor;
      uniform vec3 uSurfaceColor;
      uniform float uColorOffset;
      uniform float uColorMultiplier;
      
      varying float vElevation;
      
      void main() {
        float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
        vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
    }

    return (
        <>
            <ambientLight intensity={0.5} />
            <FloatingBoat />
            <directionalLight
                position={[1, 1, 1]}
                intensity={0.8}
                castShadow
            />

            <mesh ref={oceanRef} rotation-x={-Math.PI * 0.5}>
                <planeGeometry args={[100, 100, 512, 512]} />
                <shaderMaterial
                    {...oceanShader}
                    side={THREE.DoubleSide}
                    wireframe={false}
                />
            </mesh>
        </>
    )
}