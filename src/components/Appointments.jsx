import React, { useMemo, useState } from "react";

const sampleLawyers = [
  { id: "l1", name: "Adv. Meera Sharma", speciality: "Family Law" },
  { id: "l2", name: "Adv. Rajiv Menon", speciality: "Civil Litigation" },
  { id: "l3", name: "Adv. Anjali Rao", speciality: "Property Law" },
];

function generateCode() {
  return `NY${Date.now().toString(36).toUpperCase().slice(-6)}${Math.random().toString(36).slice(2,5).toUpperCase()}`;
}

export default function Appointments({ onClose }) {
  const [stage, setStage] = useState("list");
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});

  const availableSlots = useMemo(() => {
    if (!date) return [];
    // simple deterministic slots based on date
    const base = new Date(date).getDate() % 6;
    const slots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];
    return slots.slice(base, base + 4);
  }, [date]);

  const startBooking = (lawyer) => {
    setSelected(lawyer);
    setStage("book");
    setDate("");
    setTime("");
  };

  const toPayment = () => {
    if (!date || !time) return setErrors({ booking: "Please select date and time." });
    setErrors({});
    setStage("payment");
  };

  const validateCard = () => {
    const e = {};
    if (!/^\d{13,19}$/.test(card.number.replace(/\s+/g, ""))) e.number = "Enter valid card number";
    if (!/^[A-Za-z ]{3,}$/.test(card.name)) e.name = "Enter cardholder name";
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(card.expiry)) e.expiry = "MM/YY";
    if (!/^[0-9]{3,4}$/.test(card.cvv)) e.cvv = "3 or 4 digit CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitPayment = () => {
    if (!validateCard()) return;
    // simulate processing
    setTimeout(() => {
      const code = generateCode();
      setConfirmCode(code);
      setStage("confirmed");
    }, 700);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <div className="flex gap-2">
          <button onClick={() => onClose && onClose()} className="text-sm px-3 py-2 bg-gray-800 rounded">Close</button>
        </div>
      </div>

      {stage === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleLawyers.map((l) => (
            <div key={l.id} className="bg-[#07101b] p-4 rounded-lg border border-gray-800 transform transition hover:scale-105">
              <div className="text-lg font-medium">{l.name}</div>
              <div className="text-sm text-gray-400 mb-3">{l.speciality}</div>
              <div className="text-xs text-gray-500 mb-4">Expertise and 10+ years experience.</div>
              <button onClick={() => startBooking(l)} className="px-3 py-2 bg-[#10a37f] text-black rounded">Book Appointment</button>
            </div>
          ))}
        </div>
      )}

      {stage === "book" && selected && (
        <div className="space-y-6">
          <div className="bg-[#07101b] p-4 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Booking with</div>
                <div className="text-xl">{selected.name}</div>
                <div className="text-sm text-gray-400">{selected.speciality}</div>
              </div>
              <div>
                <button onClick={() => setStage("list")} className="text-sm px-3 py-2 bg-gray-800 rounded">Back</button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Choose date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#061320] p-2 rounded border border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Available times</label>
                <div className="flex flex-wrap gap-2">
                  {availableSlots.length === 0 && <div className="text-gray-500">Select a date</div>}
                  {availableSlots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTime(s)}
                      className={`px-3 py-2 rounded ${time === s ? "bg-[#10a37f] text-black" : "bg-gray-800 text-gray-200"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {errors.booking && <div className="text-red-400 mt-3">{errors.booking}</div>}

            <div className="mt-6 flex gap-3">
              <button onClick={toPayment} className="px-4 py-2 bg-[#10a37f] text-black rounded">Proceed to Payment</button>
              <button onClick={() => setStage("list")} className="px-4 py-2 bg-gray-800 rounded">Choose another</button>
            </div>
          </div>
        </div>
      )}

      {stage === "payment" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="order-2 md:order-1">
            <div className="bg-[#07101b] p-4 rounded-lg border border-gray-800">
              <div className="text-lg font-semibold">Payment</div>
              <div className="text-sm text-gray-400 mb-4">Pay for appointment with {selected?.name}</div>

              <div className="space-y-3">
                <label className="text-xs text-gray-300">Card number</label>
                <input
                  value={card.number}
                  onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#061320] p-2 rounded border border-gray-700"
                />
                {errors.number && <div className="text-red-400 text-sm">{errors.number}</div>}

                <label className="text-xs text-gray-300">Name on card</label>
                <input
                  value={card.name}
                  onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                  placeholder="Full Name"
                  className="w-full bg-[#061320] p-2 rounded border border-gray-700"
                />
                {errors.name && <div className="text-red-400 text-sm">{errors.name}</div>}

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-300">Expiry (MM/YY)</label>
                    <input
                      value={card.expiry}
                      onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                      placeholder="MM/YY"
                      className="w-full bg-[#061320] p-2 rounded border border-gray-700"
                    />
                    {errors.expiry && <div className="text-red-400 text-sm">{errors.expiry}</div>}
                  </div>

                  <div style={{ width: 120 }}>
                    <label className="text-xs text-gray-300">CVV</label>
                    <input
                      value={card.cvv}
                      onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                      placeholder="123"
                      className="w-full bg-[#061320] p-2 rounded border border-gray-700"
                    />
                    {errors.cvv && <div className="text-red-400 text-sm">{errors.cvv}</div>}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={submitPayment} className="px-4 py-2 bg-[#10a37f] text-black rounded">Pay & Confirm</button>
                  <button onClick={() => setStage("book")} className="px-4 py-2 bg-gray-800 rounded">Back</button>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="bg-gradient-to-br from-[#0b1620] to-[#051018] p-6 rounded-lg transform transition hover:scale-102">
              <div className="mb-4 text-sm text-gray-400">Card Preview</div>
              <div className="relative rounded-lg overflow-hidden" style={{ height: 200 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] to-[#06282a] p-6 text-white rounded-lg shadow-lg animate-fade-in">
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-sm opacity-80">NyayaPay</div>
                    <div className="text-xs opacity-70">Debit • Credit</div>
                  </div>

                  <div className="text-xl tracking-widest mb-4">
                    {card.number ? card.number.replace(/(.{4})/g, "$1 ").trim() : "#### #### #### ####"}
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-70">Cardholder</div>
                      <div className="font-medium">{card.name || "FULL NAME"}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs opacity-70">Expires</div>
                      <div className="font-medium">{card.expiry || "MM/YY"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-400">Appointment: <span className="text-white">{date} {time}</span></div>
              <div className="text-sm text-gray-400">With: <span className="text-white">{selected?.name}</span></div>
            </div>
          </div>
        </div>
      )}

      {stage === "confirmed" && (
        <div className="bg-[#07101b] p-6 rounded-lg border border-gray-800 text-center">
          <div className="text-2xl font-semibold mb-2">Appointment Confirmed</div>
          <div className="text-sm text-gray-400 mb-4">Your appointment with <b>{selected?.name}</b> is booked for <b>{date} {time}</b>.</div>
          <div className="inline-block px-4 py-3 bg-[#0b1b26] rounded-md text-lg font-mono tracking-wide">{confirmCode}</div>

          <div className="mt-6">
            <button onClick={() => { setStage('list'); setSelected(null); }} className="px-4 py-2 bg-gray-800 rounded mr-2">Book another</button>
            <button onClick={() => onClose && onClose()} className="px-4 py-2 bg-[#10a37f] text-black rounded">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
