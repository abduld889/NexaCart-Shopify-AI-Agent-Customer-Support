import { useEffect, useRef, useState } from 'react'
import './App.css'

const WEBHOOK_URL = 'http://localhost:5678/webhook/shopify-ai-support'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! 👋 Welcome to NexaCart Support. How can I help you today?',
    },
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, loading])

  const handleSend = async (e) => {
    e.preventDefault()

    const message = input.trim()

    if (!message || loading) {
      return
    }

    const customerMessage = {
      id: Date.now(),
      sender: 'customer',
      text: message,
    }

    setMessages((prev) => [...prev, customerMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          email: 'test@example.com',
          customer_id: 'web_customer_001',
          conversation_id: `web_${Date.now()}`,
        }),
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const data = await response.json()

      const aiResponse =
        data.response ||
        data.message ||
        'Sorry, I could not generate a response right now.'

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponse,
        },
      ])
    } catch (error) {
      console.error(error)

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'Sorry, I’m having trouble connecting to NexaCart Support right now. Please try again.',
          error: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="chat-container">

        {/* Header */}
        <header className="chat-header">
          <div className="brand-icon">N</div>

          <div>
            <h1>NexaCart Support</h1>

            <p>
              <span className="status-dot"></span>
              AI Customer Support
            </p>
          </div>
        </header>

        {/* Welcome */}
        <div className="welcome-section">
          <h2>How can we help?</h2>

          <p>
            Ask us about orders, products, shipping, returns, refunds, and more.
          </p>
        </div>

        {/* Chat messages */}
        <main className="messages-area">

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${
                message.sender === 'customer'
                  ? 'customer-row'
                  : 'ai-row'
              }`}
            >

              {/* AI avatar */}
              {message.sender === 'ai' && (
                <div className="avatar ai-avatar">
                  N
                </div>
              )}

              <div
                className={`message-wrapper ${
                  message.sender === 'customer'
                    ? 'customer-wrapper'
                    : 'ai-wrapper'
                }`}
              >

                {/* Message label */}
                <div className="message-label">
                  {message.sender === 'customer'
                    ? 'YOU'
                    : 'NEXACART AI'}
                </div>

                {/* Message bubble */}
                <div
                  className={`message-bubble ${
                    message.sender === 'customer'
                      ? 'customer-bubble'
                      : 'ai-bubble'
                  } ${message.error ? 'error-bubble' : ''}`}
                >
                  {message.text}
                </div>
              </div>

              {/* Customer avatar */}
              {message.sender === 'customer' && (
                <div className="avatar customer-avatar">
                  You
                </div>
              )}

            </div>
          ))}

          {/* AI typing indicator */}
          {loading && (
            <div className="message-row ai-row">

              <div className="avatar ai-avatar">
                N
              </div>

              <div className="message-wrapper ai-wrapper">

                <div className="message-label">
                  NEXACART AI
                </div>

                <div className="message-bubble ai-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>

        </main>

        {/* Message input */}
        <form className="input-area" onSubmit={handleSend}>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
          >
            {loading ? '...' : 'Send'}
          </button>

        </form>

        {/* Footer */}
        <div className="footer">
          Powered by NexaCart AI Support
        </div>

      </div>
    </div>
  )
}

export default App
