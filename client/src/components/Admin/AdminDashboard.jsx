import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Clock, Users, Gift, Eye, ArrowUpRight, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    totalRevenue: 385000,
    monthlyRevenue: 142000,
    totalOrders: 48,
    todayOrders: 3,
    pendingOrders: 12,
    completedOrders: 36,
    newInquiries: 7,
    totalCustomers: 124,
    websiteVisitors: 3840,
    totalProducts: 18
  });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.stats) setStats(data.stats);
      })
      .catch(err => console.warn("Admin stats API fallback:", err));
  }, []);

  return (
    <div>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#F4E8C1', margin: 0 }}>
            Executive Dashboard
          </h1>
          <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
            Realtime revenue analytics, trousseau pipeline, and stock overview.
          </p>
        </div>

        <button onClick={() => onNavigate('custom-orders')} className="btn-gold" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
          <Gift size={16} /> View Custom Requests (7 New)
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        <div style={{ background: '#282828', borderRadius: '18px', padding: '20px', border: '1px solid rgba(200, 164, 93, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C8A45D', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>Total Revenue</span>
            <TrendingUp size={18} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#4CAF50' }}>+18.4% from last month</span>
        </div>

        <div style={{ background: '#282828', borderRadius: '18px', padding: '20px', border: '1px solid rgba(232, 183, 201, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#E8B7C9', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>Monthly Revenue</span>
            <DollarSign size={18} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>
            ₹{stats.monthlyRevenue.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#AAA' }}>Current Month Target: ₹2.5L</span>
        </div>

        <div style={{ background: '#282828', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F4E8C1', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>Active Orders</span>
            <ShoppingBag size={18} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>
            {stats.pendingOrders} Orders
          </div>
          <span style={{ fontSize: '0.75rem', color: '#C8A45D' }}>12 In Crafting / Packing</span>
        </div>

        <div style={{ background: '#282828', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C98BA2', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>Unique Visitors</span>
            <Users size={18} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF' }}>
            {stats.websiteVisitors.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#4CAF50' }}>Jaipur & Metro Cities</span>
        </div>

      </div>

      {/* Analytics Visual Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        
        {/* Chart 1: Monthly Revenue Trend */}
        <div style={{ background: '#282828', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#F4E8C1', marginBottom: '16px' }}>
            6-Month Sales & Revenue Trend
          </h4>

          {/* SVG Bar Chart */}
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', padding: '10px 0 0' }}>
            {[
              { month: 'Feb', val: 42, label: '₹1.1L' },
              { month: 'Mar', val: 58, label: '₹1.4L' },
              { month: 'Apr', val: 65, label: '₹1.6L' },
              { month: 'May', val: 78, label: '₹1.9L' },
              { month: 'Jun', val: 88, label: '₹2.2L' },
              { month: 'Jul', val: 95, label: '₹2.5L' }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.68rem', color: '#C8A45D' }}>{bar.label}</span>
                <div 
                  style={{
                    width: '100%',
                    height: `${bar.val}%`,
                    background: 'linear-gradient(180deg, #C8A45D 0%, #9A7734 100%)',
                    borderRadius: '6px 6px 0 0'
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: '#AAA' }}>{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Category Revenue Breakdown */}
        <div style={{ background: '#282828', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#F4E8C1', marginBottom: '16px' }}>
            Orders by Category Share
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '10px' }}>
            {[
              { cat: 'Wedding Collection (Trousseau)', pct: 45, color: '#C8A45D' },
              { cat: 'Festival Hampers (Diwali/Rakhi)', pct: 25, color: '#E8B7C9' },
              { cat: 'Corporate Executive Kits', pct: 18, color: '#9A7734' },
              { cat: 'Birthday & Baby Shower', pct: 12, color: '#C98BA2' }
            ].map((c, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ color: '#DDD' }}>{c.cat}</span>
                  <span style={{ fontWeight: 700, color: c.color }}>{c.pct}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
