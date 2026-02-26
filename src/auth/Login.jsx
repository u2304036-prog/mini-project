import React, { useState } from 'react'
import { findUser, setCurrentUser, updateUser } from '../utils/auth'

export default function Login({ onAuth, onSwitch }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [forgot, setForgot] = useState({ username: '', phone: '', newPassword: '', confirm: '' })

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const user = findUser(form.username)
    if (!user || user.password !== form.password) {
      setError('Invalid username or password')
      return
    }
    setCurrentUser(user)
    onAuth && onAuth(user)
  }

  const submitForgot = (e) => {
    e.preventDefault()
    setError('')
    const user = findUser(forgot.username)
    if (!user) {
      setError('User not found')
      return
    }
    if (user.phone !== forgot.phone) {
      setError('Phone does not match our records')
      return
    }
    if (!forgot.newPassword || forgot.newPassword !== forgot.confirm) {
      setError('Passwords must match')
      return
    }
    updateUser(user.username, { password: forgot.newPassword })
    setError('Password reset — you can now login')
    setShowForgot(false)
  }

  return (
    <div className="max-w-md mx-auto bg-[#07101a] p-6 rounded-lg border border-gray-800">
      <h2 className="text-lg font-semibold mb-4">Log in</h2>
      {error && <div className="text-sm text-red-400 mb-2">{error}</div>}

      {!showForgot ? (
        <form onSubmit={submit} className="space-y-3 text-sm">
          <div>
            <label className="block text-gray-300">Username</label>
            <input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
          <div>
            <label className="block text-gray-300">Password</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <button className="bg-[#10a37f] text-black px-4 py-2 rounded">Login</button>
            <div className="space-x-3 text-sm">
              <button type="button" onClick={() => onSwitch && onSwitch('signup')} className="text-gray-400 underline">Sign up</button>
              <button type="button" onClick={() => setShowForgot(true)} className="text-gray-400 underline">Forgot?</button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={submitForgot} className="space-y-3 text-sm">
          <div>
            <label className="block text-gray-300">Username</label>
            <input value={forgot.username} onChange={e => setForgot(f => ({ ...f, username: e.target.value }))} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
          <div>
            <label className="block text-gray-300">Phone (for verification)</label>
            <input value={forgot.phone} onChange={e => setForgot(f => ({ ...f, phone: e.target.value }))} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
          <div>
            <label className="block text-gray-300">New password</label>
            <input type="password" value={forgot.newPassword} onChange={e => setForgot(f => ({ ...f, newPassword: e.target.value }))} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
          <div>
            <label className="block text-gray-300">Confirm password</label>
            <input type="password" value={forgot.confirm} onChange={e => setForgot(f => ({ ...f, confirm: e.target.value }))} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <button className="bg-[#10a37f] text-black px-4 py-2 rounded">Reset</button>
            <button type="button" onClick={() => setShowForgot(false)} className="text-gray-400 underline">Back to login</button>
          </div>
        </form>
      )}
    </div>
  )
}
