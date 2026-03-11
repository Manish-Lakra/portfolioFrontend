import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useFBX } from '@react-three/drei'
import * as THREE from 'three'

const AVATAR_URL = '/69ab27695f0ce8d116eda060.glb'

// Mixamo animations (compatible with Ready Player Me skeleton)
const IDLE_URL = '/animations/Happy Idle.fbx'
const LISTENING_URL = '/animations/Weight Shift.fbx'
const PROCESSING_URL = '/animations/Looking Around.fbx'
const TALKING_URL = '/animations/Talking.fbx'

/**
 * Filter root motion tracks that displace the model off-screen.
 */
function filterRootMotion(clip) {
    const filteredTracks = clip.tracks.filter(track => {
        const isHips = track.name.toLowerCase().includes('hips')
        if (isHips && track.name.endsWith('.position')) return false
        if (isHips && track.name.endsWith('.scale')) return false
        return true
    })
    return new THREE.AnimationClip(clip.name, clip.duration, filteredTracks)
}

export default function AvatarModel({ voiceState = 'idle' }) {
    const group = useRef()
    const { scene } = useGLTF(AVATAR_URL)
    const mixerRef = useRef(null)
    const actionsRef = useRef({})
    const prevStateRef = useRef('idle')
    const initRef = useRef(false)

    // Load FBX animations
    const idleFbx = useFBX(IDLE_URL)
    const listeningFbx = useFBX(LISTENING_URL)
    const processingFbx = useFBX(PROCESSING_URL)
    const talkingFbx = useFBX(TALKING_URL)

    // Fix frustum culling
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh || child.isSkinnedMesh) {
                child.frustumCulled = false
            }
        })
    }, [scene])

    // Setup animations
    useEffect(() => {
        if (!scene || initRef.current) return
        initRef.current = true

        const mixer = new THREE.AnimationMixer(scene)
        mixerRef.current = mixer

        const fbxList = [
            { fbx: idleFbx, name: 'idle' },
            { fbx: listeningFbx, name: 'listening' },
            { fbx: processingFbx, name: 'processing' },
            { fbx: talkingFbx, name: 'talking' },
        ]

        for (const { fbx, name } of fbxList) {
            if (fbx.animations?.[0]) {
                const rawClip = fbx.animations[0].clone()
                rawClip.name = name
                const clip = filterRootMotion(rawClip)
                const action = mixer.clipAction(clip)
                actionsRef.current[name] = action
                console.log(`[Avatar] "${name}": ${clip.tracks.length} tracks`)
            }
        }

        if (actionsRef.current.idle) {
            actionsRef.current.idle.play()
        }

        return () => {
            mixer.stopAllAction()
            mixerRef.current = null
            initRef.current = false
        }
    }, [scene, idleFbx, listeningFbx, processingFbx, talkingFbx])

    // Voice state → animation transitions
    useEffect(() => {
        const map = {
            idle: 'idle',
            listening: 'listening',
            processing: 'processing',
            speaking: 'talking',
        }
        const target = map[voiceState] || 'idle'
        const prev = map[prevStateRef.current] || 'idle'
        const actions = actionsRef.current
        if (target !== prev && actions[target]) {
            Object.values(actions).forEach(a => { if (a.isRunning()) a.fadeOut(0.4) })
            actions[target].reset().fadeIn(0.4).play()
        }
        prevStateRef.current = voiceState
    }, [voiceState])

    useFrame((_, delta) => {
        mixerRef.current?.update(delta)
    })

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    )
}

useGLTF.preload(AVATAR_URL)
