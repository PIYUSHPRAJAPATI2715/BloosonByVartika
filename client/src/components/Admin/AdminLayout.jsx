import React from 'react';
import { LayoutDashboard, Gift, ShoppingBag, Box, Tag, Calendar, Sparkles, Store, ShieldCheck, FileText, Layers, Users, Sliders } from 'lucide-react';

export default function AdminLayout({ activeTab, onTabChange, onExitAdmin, children }) {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'custom-orders', label: 'Custom Requests', icon: <Gift size={18} />, badge: 'New' },
    { id: 'orders', label: 'Order Management', icon: <ShoppingBag size={18} /> },
    { id: 'users', label: 'Registered Clients', icon: <Users size={18} /> },
    { id: 'products', label: 'Product Catalog & Stock', icon: <Box size={18} /> },
    { id: 'categories', label: 'Category Manager', icon: <Layers size={18} /> },
    { id: 'coupons', label: 'Coupons & Promos', icon: <Tag size={18} /> },
    { id: 'settings', label: 'Website Customizer', icon: <Sliders size={18} /> },
    { id: 'calendar', label: 'Wedding Calendar', icon: <Calendar size={18} /> },
    { id: 'ai-copywriter', label: 'AI Copy & Marketing', icon: <Sparkles size={18} />, badge: 'AI' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#1E1E1E', color: '#E0E0E0' }}>
      
      {/* Sidebar */}
      <aside 
        style={{
          width: '260px',
          background: '#282828',
          borderRight: '1px solid rgba(200, 164, 93, 0.25)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* Admin Header */}
          <div style={{ padding: '0 8px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#C8A45D', color: '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                👑
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#F4E8C1', margin: 0 }}>
                  Blossom Studio
                </h3>
                <span style={{ fontSize: '0.72rem', color: '#C98BA2', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  ADMIN CONTROL PANEL
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeTab === item.id ? 'linear-gradient(135deg, #C8A45D 0%, #9A7734 100%)' : 'transparent',
                  color: activeTab === item.id ? '#FFFFFF' : '#B0B0B0',
                  fontWeight: activeTab === item.id ? 600 : 400,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{ background: activeTab === item.id ? '#FFFFFF' : '#E8B7C9', color: '#1E1E1E', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Exit Admin Button */}
        <div>
          <button
            onClick={onExitAdmin}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid rgba(200, 164, 93, 0.4)',
              background: 'transparent',
              color: '#F4E8C1',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Store size={16} /> Exit to Storefront
          </button>
        </div>

      </aside>

      {/* Main Admin Area */}
      <main style={{ flex: 1, padding: '36px', overflowY: 'auto', background: '#1E1E1E' }}>
        {children}
      </main>

    </div>
  );
}
