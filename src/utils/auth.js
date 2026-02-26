export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('nyaya_users') || '[]')
  } catch (e) {
    return []
  }
}

export function saveUsers(users) {
  localStorage.setItem('nyaya_users', JSON.stringify(users))
}

export function findUser(username) {
  if (!username) return null
  return getUsers().find(u => u.username.toLowerCase() === username.toLowerCase()) || null
}

export function createUser(user) {
  const users = getUsers()
  if (users.find(u => u.username.toLowerCase() === user.username.toLowerCase())) {
    return { error: 'username_exists' }
  }
  users.push(user)
  saveUsers(users)
  return { user }
}

export function updateUser(username, patch) {
  const users = getUsers()
  const idx = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase())
  if (idx === -1) return { error: 'not_found' }
  users[idx] = { ...users[idx], ...patch }
  saveUsers(users)
  return { user: users[idx] }
}

export function setCurrentUser(user) {
  localStorage.setItem('nyaya_current', JSON.stringify(user))
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('nyaya_current') || 'null')
  } catch (e) {
    return null
  }
}

export function logout() {
  localStorage.removeItem('nyaya_current')
}
