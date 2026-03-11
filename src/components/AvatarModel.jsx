import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useFBX } from '@react-three/drei'
import * as THREE from 'three'

const AVATAR_URL = '/69ab27695f0ce8d116eda060.glb'

// Mixamo animations
const IDLE_URL = '/animations/Happy Idle.fbx'
const LISTENING_URL = '/animations/Weight Shift.fbx'
const PROCESSING_URL = '/animations/Looking Around.fbx'
const TALKING_URL = '/animations/Talking.fbx'

const DANCE_URLS = [
    '/animations/dancing/Breakdance Ending 1.fbx',
    '/animations/dancing/Hip Hop Dancing-2.fbx',
    '/animations/dancing/Hip Hop Dancing.fbx',
    '/animations/dancing/Silly Dancing.fbx',
    '/animations/dancing/Wave Hip Hop Dance.fbx'
]

/**
 * Filter root motion tracks. Zeroes out X and Z position to prevent drifting 
 * off-screen, but preserves Y position so dancing jumps and squats look natural.
 */
function filterRootMotion(clip) {
    const filteredTracks = []
    for (const track of clip.tracks) {
        const isHips = track.name.toLowerCase().includes('hips')
        if (isHips && track.name.endsWith('.scale')) continue

        if (isHips && track.name.endsWith('.position')) {
            // Keep Y, zero out X and Z
            const newValues = new Float32Array(track.values.length)
            for (let i = 0; i < track.values.length; i += 3) {
                newValues[i] = 0 // X
                newValues[i + 1] = track.values[i + 1] // Y
                newValues[i + 2] = 0 // Z
            }
            const newTrack = new THREE.VectorKeyframeTrack(track.name, track.times, newValues)
            filteredTracks.push(newTrack)
            continue
        }
        filteredTracks.push(track)
    }
    return new THREE.AnimationClip(clip.name, clip.duration, filteredTracks)
}

export default function AvatarModel({ voiceState = 'idle', isMinimized = false }) {
    const group = useRef()
    const { scene } = useGLTF(AVATAR_URL)
    const mixerRef = useRef(null)
    const actionsRef = useRef({})
    const prevStateRef = useRef('idle')
    const initRef = useRef(false)

    const [currentDance, setCurrentDance] = useState('dance_0')

    // Load FBX animations
    const idleFbx = useFBX(IDLE_URL)
    const listeningFbx = useFBX(LISTENING_URL)
    const processingFbx = useFBX(PROCESSING_URL)
    const talkingFbx = useFBX(TALKING_URL)

    // Load Dancing FBXs
    const dances = [
        useFBX(DANCE_URLS[0]),
        useFBX(DANCE_URLS[1]),
        useFBX(DANCE_URLS[2]),
        useFBX(DANCE_URLS[3]),
        useFBX(DANCE_URLS[4])
    ]

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

        dances.forEach((fbx, i) => {
            fbxList.push({ fbx, name: `dance_${i}`, isDance: true })
        })

        for (const { fbx, name, isDance } of fbxList) {
            if (fbx.animations?.[0]) {
                const rawClip = fbx.animations[0].clone()
                rawClip.name = name
                const clip = filterRootMotion(rawClip)
                const action = mixer.clipAction(clip)

                if (isDance) {
                    action.setLoop(THREE.LoopOnce, 1)
                    action.clampWhenFinished = true
                }

                actionsRef.current[name] = action
            }
        }

        const initialAction = (voiceState === 'idle' && isMinimized) ? currentDance : 'idle'
        if (actionsRef.current[initialAction]) {
            actionsRef.current[initialAction].play()
            prevStateRef.current = initialAction
        }

        return () => {
            mixer.stopAllAction()
            mixerRef.current = null
            initRef.current = false
        }
    }, [scene, idleFbx, listeningFbx, processingFbx, talkingFbx, ...dances])

    // Mixer finished event to sequence dances continuously
    useEffect(() => {
        if (!mixerRef.current) return

        const onFinished = (e) => {
            const actionName = e.action.getClip().name
            if (actionName.startsWith('dance')) {
                // Pick a new random dance different from the current one
                let nextDanceIndex
                do {
                    nextDanceIndex = Math.floor(Math.random() * 5)
                } while (`dance_${nextDanceIndex}` === actionName)

                setCurrentDance(`dance_${nextDanceIndex}`)
            }
        }

        mixerRef.current.addEventListener('finished', onFinished)
        return () => mixerRef.current?.removeEventListener('finished', onFinished)
    }, [])

    // Voice state → animation transitions
    useEffect(() => {
        let target = 'idle'
        if (voiceState === 'idle' && isMinimized) {
            target = currentDance
        } else {
            const map = {
                idle: 'idle',
                listening: 'listening',
                processing: 'processing',
                speaking: 'talking',
            }
            target = map[voiceState] || 'idle'
        }

        const prev = prevStateRef.current
        const actions = actionsRef.current

        if (target !== prev && actions[target] && actions[prev]) {
            actions[prev].fadeOut(0.4)
            actions[target].reset().fadeIn(0.4).play()
        }

        prevStateRef.current = target
    }, [voiceState, isMinimized, currentDance])

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
