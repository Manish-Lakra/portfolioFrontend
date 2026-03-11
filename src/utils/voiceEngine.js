/**
 * Voice Engine — Web Speech API + OpenAI via FastAPI
 * 
 * Simple flow: click mic → listen → detect speech → stop → call API → speak response
 * Also supports text input as fallback.
 */

const API_URL = '/api/chat'

class VoiceEngine {
    constructor() {
        this.recognition = null
        this.synthesis = window.speechSynthesis
        this.state = 'idle' // idle | listening | processing | speaking
        this.onStateChange = null
        this.onTranscript = null
        this.onAiMessage = null
        this.onAction = null
        this.sessionId = `session_${Date.now()}`
        this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
        this._finalTranscript = ''

        if (this.isSupported) {
            this._initRecognition()
        }

        // Pre-load TTS voices
        if (this.synthesis) {
            this.synthesis.getVoices()
            if (typeof this.synthesis.onvoiceschanged !== 'undefined') {
                this.synthesis.onvoiceschanged = () => this.synthesis.getVoices()
            }
        }

        console.log('[Voice] Ready. Browser supported:', this.isSupported)
    }

    _initRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = false  // Stop after one utterance
        this.recognition.interimResults = true
        this.recognition.lang = 'en-US'

        this.recognition.onresult = (event) => {
            let interim = ''
            let final = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    final += event.results[i][0].transcript
                } else {
                    interim += event.results[i][0].transcript
                }
            }

            if (final) {
                this._finalTranscript = final.trim()
                console.log('[Voice] Got final:', this._finalTranscript)
                if (this.onTranscript) this.onTranscript(this._finalTranscript, true)
            } else if (interim && this.onTranscript) {
                this.onTranscript(interim, false)
            }
        }

        this.recognition.onerror = (event) => {
            console.log('[Voice] Error:', event.error)
            if (event.error === 'no-speech') {
                // No speech detected — just go back to idle
                this._setState('idle')
            } else if (event.error !== 'aborted') {
                this._setState('idle')
            }
        }

        this.recognition.onend = () => {
            console.log('[Voice] Recognition ended. Had transcript:', !!this._finalTranscript)
            // When recognition ends, process any captured transcript
            if (this._finalTranscript && this.state === 'listening') {
                this._processTranscript(this._finalTranscript)
                this._finalTranscript = ''
            } else if (this.state === 'listening') {
                this._setState('idle')
            }
        }
    }

    _setState(newState) {
        if (this.state === newState) return
        console.log('[Voice]', this.state, '→', newState)
        this.state = newState
        if (this.onStateChange) this.onStateChange(newState)
    }

    start() {
        if (!this.isSupported) return
        if (this.state === 'processing') return

        if (this.state === 'speaking') {
            this.synthesis.cancel()
        }

        this._finalTranscript = ''

        try {
            this.recognition.start()
            this._setState('listening')
        } catch (e) {
            // Already running — abort and retry
            try {
                this.recognition.abort()
                setTimeout(() => {
                    try {
                        this.recognition.start()
                        this._setState('listening')
                    } catch (e2) { /* give up */ }
                }, 200)
            } catch (e2) { /* give up */ }
        }
    }

    stop() {
        if (this.state === 'listening') {
            this.recognition.stop() // This triggers onend which processes transcript
        } else if (this.state === 'speaking') {
            this.synthesis.cancel()
            this._setState('idle')
        }
    }

    toggle() {
        if (this.state === 'idle') {
            this.start()
        } else if (this.state === 'listening' || this.state === 'speaking') {
            this.stop()
        }
    }

    async _processTranscript(transcript) {
        if (!transcript) {
            this._setState('idle')
            return
        }

        this._setState('processing')
        console.log('[Voice] Sending to API:', transcript)

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcript, session_id: this.sessionId }),
            })

            if (!response.ok) throw new Error(`HTTP ${response.status}`)

            const data = await response.json()
            console.log('[Voice] Got actions:', data.actions?.length)
            await this._executeActions(data.actions || [])
        } catch (error) {
            console.error('[Voice] API error:', error)
            if (this.onAiMessage) {
                this.onAiMessage("Sorry, something went wrong. Please try again or type your message.")
            }
            this._setState('idle')
        }
    }

    async _executeActions(actions) {
        for (const action of actions) {
            if (this.onAction) this.onAction(action)

            switch (action.action) {
                case 'navigate':
                    this._navigate(action.target)
                    break
                case 'read':
                    if (action.target) this._navigate(action.target)
                    if (action.message) {
                        if (this.onAiMessage) this.onAiMessage(action.message)
                        await this._speak(action.message)
                    }
                    break
                case 'contact_fill':
                    this._fillContactForm(action.data || {})
                    if (action.message) {
                        if (this.onAiMessage) this.onAiMessage(action.message)
                        await this._speak(action.message)
                    }
                    break
                case 'open_link':
                    this._openLink(action.target)
                    if (action.message) {
                        if (this.onAiMessage) this.onAiMessage(action.message)
                        await this._speak(action.message)
                    }
                    break
                case 'respond':
                    if (action.message) {
                        if (this.onAiMessage) this.onAiMessage(action.message)
                        await this._speak(action.message)
                    }
                    break
                default:
                    if (action.message) {
                        if (this.onAiMessage) this.onAiMessage(action.message)
                        await this._speak(action.message)
                    }
            }
        }
        this._setState('idle')
    }

    _navigate(sectionId) {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    _fillContactForm(data) {
        const setVal = (id, val) => {
            const el = document.getElementById(id)
            if (!el || !val) return
            const setter = Object.getOwnPropertyDescriptor(
                el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value'
            )?.set
            if (setter) setter.call(el, val)
            else el.value = val
            el.dispatchEvent(new Event('input', { bubbles: true }))
        }
        if (data.name) setVal('contact-name', data.name)
        if (data.email) setVal('contact-email', data.email)
        if (data.message) setVal('contact-message', data.message)
        this._navigate('contact')
    }

    _openLink(url) {
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
    }

    _speak(text) {
        return new Promise((resolve) => {
            if (!text) { resolve(); return }

            this.synthesis.cancel()
            this._setState('speaking')

            const utt = new SpeechSynthesisUtterance(text)
            utt.rate = 1.0
            utt.pitch = 1.0

            const voices = this.synthesis.getVoices()
            const voice = voices.find(v =>
                v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex'))
            ) || voices.find(v => v.lang.startsWith('en'))
            if (voice) utt.voice = voice

            utt.onend = resolve
            utt.onerror = resolve

            this.synthesis.speak(utt)
        })
    }
}

// Singleton — never destroyed
let instance = null
export function getVoiceEngine() {
    if (!instance) instance = new VoiceEngine()
    return instance
}

export default VoiceEngine
