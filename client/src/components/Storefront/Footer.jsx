import React from 'react';
import { Heart, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ websiteSettings }) {
  const address = websiteSettings?.address || "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021";
  const phone = websiteSettings?.contactPhone || "+91 98280 23641";
  const email = websiteSettings?.contactEmail || "vartika1594@gmail.com";

  return (
    <footer style={{ background: '#2E2E2E', color: '#FFFFFF', paddingTop: '70px', paddingBottom: '30px', borderTop: '3px solid #C8A45D' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', paddingBottom: '50px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/logo.png" alt="Blossom By Vartika Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'contain', border: '1.5px solid #C8A45D', background: '#FFF', padding: '2px' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#F4E8C1' }}>
                Blossom by Vartika
              </span>
            </div>
            <p style={{ color: '#AAA', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Handcrafted Premium Gifts | Customized Keychains | Creative Explosion Boxes | Vaishali Nagar Studio, Jaipur.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#F4E8C1', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Instagram size={16} /></a>
              <a href="#" style={{ background: 'rgba(255,255,255,0.1)', color: '#F4E8C1', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Facebook size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.1rem', marginBottom: '16px' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#services" style={{ color: '#CCC', textDecoration: 'none' }}>Categories & Collections</a></li>
              <li><a href="#collection" style={{ color: '#CCC', textDecoration: 'none' }}>Storefront Gallery</a></li>
              <li><a href="#contact" style={{ color: '#CCC', textDecoration: 'none' }}>Contact & Inquiry</a></li>
            </ul>
          </div>

          {/* Business Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.1rem', marginBottom: '16px' }}>Boutique Specialties</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#CCC' }}>
              <li>Bridal & Groom Trousseau Packing</li>
              <li>Mirror & Zari Shagun Trays</li>
              <li>Baby Announcement Chests</li>
              <li>Gold Embossed Diwali Trunks</li>
              <li>Corporate VIP Branding Gifts</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.1rem', marginBottom: '16px' }}>Jaipur Studio</h4>
            <p style={{ color: '#CCC', fontSize: '0.85rem', marginBottom: '8px' }}>📍 {address}</p>
            <p style={{ color: '#CCC', fontSize: '0.85rem', marginBottom: '8px' }}>📞 {phone}</p>
            <p style={{ color: '#CCC', fontSize: '0.85rem' }}>✉️ {email}</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: '#888' }}>
          <div>
            © {new Date().getFullYear()} Blossom by Vartika. All Rights Reserved. Founded by Vartika Gupta.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Handcrafted with <Heart size={14} color="#C98BA2" fill="#C98BA2" /> in Jaipur, India
          </div>
        </div>

      </div>
    </footer>
  );
}
