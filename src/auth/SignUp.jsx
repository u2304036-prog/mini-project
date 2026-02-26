import React, { useState } from 'react'
import { createUser, setCurrentUser, findUser } from '../utils/auth'

export default function SignUp({ onAuth, onSwitch }) {
  const [form, setForm] = useState({ name: '', username: '', email: '', phone: '', password: '', confirm: '', role: 'Legal Seeker' })
  const [error, setError] = useState('')

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    if (!form.name || !form.username || !form.email || !form.phone || !form.password) {
      setError('Please fill all required fields')
      return false
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return false
    }
    if (findUser(form.username)) {
      setError('Username already taken')
      return false
    }
    return true
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!validate()) return
    const user = {
      name: form.name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role,
      createdAt: Date.now()
    }
    const res = createUser(user)
    if (res.error) {
      setError('Could not create user')
      return
    }
    setCurrentUser(user)
    onAuth && onAuth(user)
  }

  return (
    <div className="max-w-md mx-auto bg-[#07101a] p-6 rounded-lg border border-gray-800">
      <h2 className="text-lg font-semibold mb-4">Create an account</h2>
      {error && <div className="text-sm text-red-400 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3 text-sm">
        <div>
          <label className="block text-gray-300">Name</label>
          <input value={form.name} onChange={e => handle('name', e.target.value)} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
        </div>
        <div>
          <label className="block text-gray-300">Username</label>
          <input value={form.username} onChange={e => handle('username', e.target.value)} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-300">Email</label>
            <input value={form.email} onChange={e => handle('email', e.target.value)} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
          <div>
            <label className="block text-gray-300">Phone</label>
            <input value={form.phone} onChange={e => handle('phone', e.target.value)} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
          </div>
        </div>
        <div>
          <label className="block text-gray-300">Password</label>
          <input type="password" value={form.password} onChange={e => handle('password', e.target.value)} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
        </div>
        <div>
          <label className="block text-gray-300">Confirm Password</label>
          <input type="password" value={form.confirm} onChange={e => handle('confirm', e.target.value)} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700" />
        </div>
        <div>
          <label className="block text-gray-300">User type</label>
          <select value={form.role} onChange={e => handle('role', e.target.value)} className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700">
            <option>Legal Seeker</option>
            <option>Legal Provider</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="flex items-center justify-between pt-2">
          <button className="bg-[#10a37f] text-black px-4 py-2 rounded">Sign up</button>
          <button type="button" onClick={() => onSwitch && onSwitch('login')} className="text-sm text-gray-400 underline">Have an account? Log in</button>
        </div>
      </form>
    </div>
  )
}
