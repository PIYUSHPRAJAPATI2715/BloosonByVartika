import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, User, CheckCircle2 } from 'lucide-react';

export default function AdminCalendar() {
  const [events, setEvents] = useState([
    { id: '1', title: 'Ananya & Rohan Wedding Trousseau Dispatch', eventDate: '2026-07-28', eventType: 'Wedding', clientName: 'Ananya Sharma', status: 'Scheduled' },
    { id: '2', title: 'Oberoi Group 40 Corporate Trunks Delivery', eventDate: '2026-08-05', eventType: 'Delivery Dispatch', clientName: 'Vikram Mehta', status: 'Scheduled' },
    { id: '3', title: 'Studio Consultation: Radhika Khandelwal', eventDate: '2026-07-22', eventType: 'VIP Client Meeting', clientName: 'Radhika K.', status: 'Completed' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    eventDate: new Date().toISOString().split('T')[0],
    eventType: 'Wedding',
    clientName: '',
    status: 'Scheduled'
  });

  useEffect(() => {
    fetch('/api/calendar-events')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setEvents(data.data);
      })
      .catch(err => console.warn("Calendar events fetch fallback:", err));
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/calendar-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setEvents([...events, data.data]);
      } else {
        setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
      }
    } catch (err) {
      setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    }
    setShowAddModal(false);
    setNewEvent({ title: '', eventDate: new Date().toISOString().split('T')[0], eventType: 'Wedding', clientName: '', status: 'Scheduled' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
            Wedding & Dispatch Calendar
          </h1>
          <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
            Schedule trousseau delivery dates, studio client meetings, and festive production rushes.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-gold" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Schedule Event
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {events.map((evt) => (
          <div key={evt._id || evt.id} style={{ background: '#282828', borderRadius: '16px', border: '1px solid rgba(200, 164, 93, 0.3)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ background: '#C8A45D', color: '#1E1E1E', padding: '10px', borderRadius: '50%' }}>
                <CalendarIcon size={20} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FFF', margin: '0 0 4px' }}>{evt.title}</h4>
                <span style={{ fontSize: '0.8rem', color: '#AAA' }}>Client: {evt.clientName} • Category: {evt.eventType}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, color: '#F4E8C1', fontSize: '0.95rem' }}>
                {typeof evt.eventDate === 'string' ? evt.eventDate.split('T')[0] : '2026-07-28'}
              </div>
              <span style={{ background: '#1E1E1E', color: '#4CAF50', padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>{evt.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', maxWidth: '480px', width: '100%', border: '1px solid #C8A45D' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.3rem', marginBottom: '16px' }}>
              Schedule Booking / Delivery Event
            </h3>

            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Event Title *</label>
                <input type="text" required placeholder="e.g. Radhika Bridal Trousseau Dispatch" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Client Name</label>
                <input type="text" placeholder="e.g. Radhika K." value={newEvent.clientName} onChange={e => setNewEvent({...newEvent, clientName: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Event Date</label>
                  <input type="date" required value={newEvent.eventDate} onChange={e => setNewEvent({...newEvent, eventDate: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Event Type</label>
                  <select value={newEvent.eventType} onChange={e => setNewEvent({...newEvent, eventType: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }}>
                    <option value="Wedding">Wedding</option>
                    <option value="Delivery Dispatch">Delivery Dispatch</option>
                    <option value="Festival Rush">Festival Rush</option>
                    <option value="VIP Client Meeting">VIP Client Meeting</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
