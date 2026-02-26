import React, { useState } from "react";
import { updateUser, logout, setCurrentUser } from "./utils/auth";

export default function Profile({ user, onLogout, onUpdate, onClose, onSwitch }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [msg, setMsg] = useState("");

  const save = async () => {
    const res = updateUser(user.username, {
      name: form.name,
      email: form.email,
      phone: form.phone,
    });
    if (res.error) {
      setMsg("Could not update");
      return;
    }
    setCurrentUser(res.user);
    onUpdate && onUpdate(res.user);
    setMsg("Saved");
    setEditing(false);
  };

  const doLogout = () => {
    logout();
    onLogout && onLogout();
  };
  // If there's no user, show login/signup prompt so the user can re-authenticate
  if (!user) {
    return (
      <div className="relative max-w-md mx-auto bg-[#07101a] p-6 rounded-lg border border-gray-800 text-sm">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close profile"
          className="
            absolute
            top-3
            right-3
            text-gray-400
            hover:text-white
            transition
          "
        >
          ✕
        </button>

        <div className="flex flex-col items-center justify-start gap-2 mb-4">
          <h2 className="text-lg font-semibold">Not signed in</h2>
          <div className="text-xs text-gray-400">You are not signed in to NyayaBot</div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-gray-300">Please log in or create an account to access your profile.</div>
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => onSwitch && onSwitch('login')}
              className="bg-[#10a37f] text-black px-3 py-1 rounded"
            >
              Log in
            </button>

            <button
              onClick={() => onSwitch && onSwitch('signup')}
              className="text-sm text-gray-400 underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative max-w-md mx-auto bg-[#07101a] p-6 rounded-lg border border-gray-800 text-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close profile"
        className="
          absolute
          top-3
          right-3
          text-gray-400
          hover:text-white
          transition
        "
      >
        ✕
      </button>

      <div className="flex flex-col items-center justify-start gap-2 mb-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="text-xs text-gray-400">{user.role}</div>
      </div>

      {msg && <div className="text-xs text-green-400 mb-2">{msg}</div>}

      {!editing ? (
        <div className="space-y-2">
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Phone:</strong> {user.phone}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => setEditing(true)}
              className="bg-[#10a37f] text-black px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={doLogout}
              className="text-sm text-red-400 underline"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-gray-300">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-300">Email</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-300">Phone</label>
            <input
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              className="w-full mt-1 p-2 rounded bg-[#081522] border border-gray-700"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              className="bg-[#10a37f] text-black px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="text-gray-400 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
