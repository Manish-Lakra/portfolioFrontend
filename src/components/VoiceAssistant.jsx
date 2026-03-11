import { useState, useEffect, useRef, useCallback } from 'react'
import { getVoiceEngine } from '../utils/voiceEngine'
import Avatar3D from './Avatar3D'

const WAVEFORM_BARS = 12

export default function VoiceAssistant() {
    const [state, setState] = useState('idle')
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [currentTranscript, setCurrentTranscript] = useState('')
    const [showHint, setShowHint] = useState(true)
    const [textInput, setTextInput] = useState('')
    const messagesEndRef = useRef(null)
    const engineRef = useRef(null)
    const initRef = useRef(false)

    useEffect(() => {
        if (initRef.current) return
        initRef.current = true

        const engine = getVoiceEngine()
        engineRef.current = engine

        engine.onStateChange = (newState) => {
            setState(newState)
        }

        engine.onTranscript = (transcript, isFinal) => {
            if (isFinal) {
                setMessages((prev) => [...prev, { type: 'user', text: transcript }])
                setCurrentTranscript('')
                setIsOpen(true)
            } else {
                setCurrentTranscript(transcript)
            }
        }

        engine.onAiMessage = (message) => {
            setMessages((prev) => [...prev, { type: 'ai', text: message }])
        }

        const handleStartVoice = () => {
            engine.start()
            setIsOpen(true)
            setShowHint(false)
        }
        window.addEventListener('startVoice', handleStartVoice)

        const hintTimer = setTimeout(() => setShowHint(false), 6000)

        return () => {
            window.removeEventListener('startVoice', handleStartVoice)
            clearTimeout(hintTimer)
        }
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleMicClick = useCallback(() => {
        const engine = engineRef.current
        if (!engine) return

        if (!engine.isSupported) {
            setMessages((prev) => [
                ...prev,
                { type: 'ai', text: 'Voice not supported. Use text input below, or switch to Chrome.' },
            ])
            setIsOpen(true)
            return
        }

        setShowHint(false)
        setIsOpen(true)

        if (state === 'idle') {
            engine.start()
        } else if (state === 'listening' || state === 'speaking') {
            engine.stop()
        }
    }, [state])

    const handleTextSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (!textInput.trim()) return

        const query = textInput.trim()
        setTextInput('')
        setMessages((prev) => [...prev, { type: 'user', text: query }])

        const engine = engineRef.current
        if (engine) {
            if (engine.state === 'listening') engine.stop()
            await engine._processTranscript(query)
        }
    }, [textInput])

    const stateLabel = {
        idle: 'Tap mic or type below',
        listening: '🔴 Listening...',
        processing: '⏳ Thinking...',
        speaking: '🔊 Speaking...',
    }

    const stateIcon = {
        idle: '🎙️',
        listening: '⏹️',
        processing: '⏳',
        speaking: '🔊',
    }

    const stateClass = {
        idle: '',
        listening: 'voice-btn--listening',
        processing: 'voice-btn--processing',
        speaking: 'voice-btn--speaking',
    }

    const statusClass = {
        idle: '',
        listening: 'voice-transcript__status--listening',
        processing: 'voice-transcript__status--processing',
        speaking: 'voice-transcript__status--speaking',
    }

    return (
        <>
            {/* Hint tooltip */}
            <div className={`voice-hint ${showHint ? 'voice-hint--visible' : ''}`}>
                🎙️ Try talking to me!
            </div>

            {/* Assistant panel with Avatar */}
            <div className={`voice-transcript ${isOpen ? 'voice-transcript--open' : ''}`}>
                {/* 3D Avatar (Expanded) */}
                {isOpen && (
                    <div className="avatar-wrapper">
                        <Avatar3D voiceState={state} />
                    </div>
                )}

                <div className="voice-transcript__header">
                    <span className="voice-transcript__title">
                        🤖 AI Assistant
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            onClick={handleMicClick}
                            className={`voice-btn-small ${stateClass[state]}`}
                            aria-label={stateLabel[state]}
                            title={stateLabel[state]}
                        >
                            {stateIcon[state]}
                        </button>
                        <span className={`voice-transcript__status ${statusClass[state]}`}>
                            {stateLabel[state]}
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: 'none', border: 'none', color: 'var(--text-muted)',
                                cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.25rem'
                            }}
                            aria-label="Close"
                        >✕</button>
                    </div>
                </div>

                <div className="voice-transcript__messages">
                    {messages.length === 0 && (
                        <div className="voice-message voice-message--ai">
                            Hi! I'm Manish's AI assistant. 🎙️ Click the mic and speak, or type below.<br /><br />
                            Try: "Tell me about your skills" or "Go to experience"
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <div key={i} className={`voice-message voice-message--${msg.type}`}>
                            {msg.text}
                        </div>
                    ))}
                    {currentTranscript && (
                        <div className="voice-message voice-message--user" style={{ opacity: 0.6 }}>
                            {currentTranscript}...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Waveform */}
                {(state === 'listening' || state === 'speaking') && (
                    <div className="voice-waveform voice-waveform--active">
                        {Array.from({ length: WAVEFORM_BARS }).map((_, i) => (
                            <div key={i} className="voice-waveform__bar" />
                        ))}
                    </div>
                )}

                {/* Text input fallback */}
                <form onSubmit={handleTextSubmit} className="voice-text-form">
                    <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Type a command..."
                        disabled={state === 'processing'}
                        className="voice-text-input"
                    />
                    <button
                        type="submit"
                        disabled={state === 'processing' || !textInput.trim()}
                        className="voice-text-send"
                    >Send</button>
                </form>
            </div>

            {/* Floating Avatar Button */}
            {!isOpen && (
                <div className="voice-assistant">
                    <button
                        className={`voice-btn voice-btn--avatar ${stateClass[state]}`}
                        onClick={handleMicClick}
                        aria-label={stateLabel[state]}
                        title={stateLabel[state]}
                    >
                        <div className="avatar-chat-bubble">
                            Try talking to Manish!
                        </div>
                        <div className="mini-avatar-wrapper">
                            <Avatar3D voiceState={state} isMinimized={true} />
                        </div>
                    </button>
                </div>
            )}
        </>
    )
}
