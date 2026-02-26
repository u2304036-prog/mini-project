import React, { useEffect, useRef } from 'react'
import Message from './Message'

export default function ChatWindow({ messages = [], mode = 'nyaya' }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="px-4 h-full">
      <div className="mx-auto max-w-3xl bg-transparent h-full flex flex-col">
        {/* messages area: fill available space and anchor content to bottom */}
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col justify-end space-y-6 pb-6">
            {messages.map(msg => (
              <Message key={msg.id} role={msg.role} text={msg.text} />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  )
}
