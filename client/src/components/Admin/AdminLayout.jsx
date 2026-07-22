import React, { useState } from 'react';
import { LayoutDashboard, Gift, ShoppingBag, Box, Tag, Calendar, Sparkles, Store, ShieldCheck, FileText, Layers, Users, Sliders, Menu, X } from 'lucide-react';

export default function AdminLayout({ activeTab, onTabChange, onExitAdmin, children }) {
  const [mobileAdminOpen, setMobileAdminOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'orders', label: 'Order Management', icon: <ShoppingBag size={18} /> },
    { id: 'users', label: 'Registered Clients', icon: <Users size={18} /> },
    { id: 'products', label: 'Product Catalog & Stock', icon: <Box size={18} /> },
    { id: 'categories', label: 'Category Manager', icon: <Layers size={18} /> },
    { id: 'coupons', label: 'Coupons & Promos', icon: <Tag size={18} /> },
    { id: 'settings', label: 'Website Customizer', icon: <Sliders size={18} /> },
    { id: 'calendar', label: 'Wedding Calendar', icon: <Calendar size={18} /> },
    { id: 'ai-copywriter', label: 'AI Copy & Marketing', icon: <Sparkles size={18} />, badge: 'AI' }
  ];

  const handleSelectTab = (id) => {
    onTabChange(id);
    setMobileAdminOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1E1E1E', color: '#E0E0E0' }}>
      
      {/* Mobile Admin Top Bar */}
      <div 
        className="mobile-admin-header"
        style={{
          background: '#282828',
          borderBottom: '1px solid rgba(200, 164, 93, 0.3)',
          padding: '12px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 80
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #C8A45D' }} />
          <div>
            <div style={{ color: '#F4E8C1', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'var(--font-serif)' }}>Blossom Studio</div>
            <div style={{ fontSize: '0.65rem', color: '#C98BA2', fontWeight: 600 }}>ADMIN CONTROL PANEL</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setMobileAdminOpen(!mobileAdminOpen)}
            style={{ background: '#333', color: '#C8A45D', border: '1px solid #C8A45D', borderRadius: '8px', padding: '6px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            {mobileAdminOpen ? <X size={16} /> : <Menu size={16} />} Menu
          </button>
          <button onClick={onExitAdmin} style={{ background: '#C8A45D', color: '#1E1E1E', border: 'none', borderRadius: '8px', padding: '6px 10px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
            Store
          </button>
        </div>
      </div>

      {/* Main Admin Flex Wrapper */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 58px)' }}>
        
        {/* Desktop Sidebar / Mobile Slide-Out Drawer */}
        <aside 
          className={`admin-sidebar ${mobileAdminOpen ? 'mobile-open' : ''}`}
          style={{
            width: '260px',
            background: '#282828',
            borderRight: '1px solid rgba(200, 164, 93, 0.25)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div>
            {/* Admin Header (Desktop) */}
            <div className="desktop-only-admin-header" style={{ padding: '0 8px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/logo.png" alt="Blossom By Vartika Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'contain', border: '1.5px solid #C8A45D', background: '#FFF', padding: '2px' }} />
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
                  onClick={() => handleSelectTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeTab === item.id ? 'linear-gradient(135deg, #C8A45D 0%, #9A7734 100%)' : 'transparent',
                    color: activeTab === item.id ? '#FFFFFF' : '#AAA',
                    fontWeight: activeTab === item.id ? '600' : '400',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span 
                      style={{ 
                        background: activeTab === item.id ? '#FFFFFF' : '#C8A45D', 
                        color: activeTab === item.id ? '#9A7734' : '#1E1E1E',
                        fontSize: '0.68rem', 
                        padding: '2px 8px', 
                        borderRadius: '10px', 
                        fontWeight: 700 
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer Exit Button (Desktop) */}
          <div className="desktop-only-admin-header" style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={onExitAdmin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(200, 164, 93, 0.4)',
                background: '#1E1E1E',
                color: '#F4E8C1',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Store size={18} color="#C8A45D" /> Back to Live Storefront
            </button>
          </div>
        </aside>

        {/* Content Body */}
        <main style={{ flex: 1, padding: '24px', overflowX: 'auto', background: '#1E1E1E', minWidth: 0 }}>
          {children}
        </main>

      </div>
    </div>
  );
}
