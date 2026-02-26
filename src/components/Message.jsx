import React from 'react'

function renderText(text) {
  // very small formatting: support triple-backtick code blocks and simple pre-formatting
  if (typeof text !== 'string') return text
  if (text.includes('```')) {
    const parts = text.split('```')
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <pre key={idx} className="bg-gray-900 text-green-200 p-3 rounded mt-2 overflow-auto text-sm"><code>{part}</code></pre>
        )
      }
      return <span key={idx} className="whitespace-pre-wrap">{part}</span>
    })
  }
  return <span className="whitespace-pre-wrap">{text}</span>
}

export default function Message({ role = 'bot', text }) {
  const isUser = role === 'user'
  return (
    <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mr-3 mt-1">
          <div className="h-8 w-8 rounded-md bg-[#10a37f] flex items-center justify-center text-black font-bold">N</div>
        </div>
      )}

      <div className={`${isUser ? 'bg-[#0b1220] text-white' : 'bg-white text-gray-900'} rounded-xl p-4 shadow-sm max-w-[80%] border ${isUser ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="text-sm leading-6">
          {renderText(text)}
        </div>
      </div>

      {isUser && (
        <div className="ml-3 mt-1">
          <div className="h-8 w-8 rounded-md bg-[#7c3aed] flex items-center justify-center text-white font-semibold">U</div>
        </div>
      )}
    </div>
  )
}
