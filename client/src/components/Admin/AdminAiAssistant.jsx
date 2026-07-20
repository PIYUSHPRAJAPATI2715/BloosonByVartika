import React, { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Instagram, Search } from 'lucide-react';

export default function AdminAiAssistant() {
  const [taskType, setTaskType] = useState('description');
  const [productName, setProductName] = useState('Royal Pink Jaipur Bridal Trousseau Box Set');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      let result = '';
      if (taskType === 'description') {
        result = `🌸 Handcrafted Luxury for Unforgettable Celebrations 🌸\n\nThe ${productName} by Blossom by Vartika is crafted in our Jaipur studio using plush blush velvet, hand-carved hardboard casing, and authentic zari borders. Designed for brides and luxury gift givers who demand royal elegance.\n\n✨ 100% Handcrafted in Jaipur\n👑 Personalized Gold Foil Monograms Available\n💐 Includes Rose Essence & Anti-Tarnish Velvet Lining`;
      } else if (taskType === 'whatsapp') {
        result = `👑 *ROYAL WEDDING TROUSSEAU ANNOUNCEMENT* 👑\n\nDear Client,\nMake your big day truly unforgettable with handcrafted trouseau packaging from *Blossom by Vartika* (Jaipur).\n\n✨ Custom Monograms\n✨ Mirror Shagun Trays\n✨ Nationwide Express Shipping\n\n👉 Reply to this message or visit our studio to reserve your wedding dates!`;
      } else if (taskType === 'instagram') {
        result = `Unwrapping pure Jaipur royalty ✨👑 Every stitch on our ${productName} tells a story of heritage craftsmanship and modern Parisian elegance.\n\nCrafted with love by @blossombyvartika 🌸\n\n#BridalTrousseau #LuxuryGifting #JaipurWeddings #BlossomByVartika #WeddingFavors #HandcraftedIndia`;
      } else if (taskType === 'seo') {
        result = `Title: Luxury ${productName} | Handcrafted Jaipur Wedding Packaging\nMeta Description: Buy handcrafted ${productName} by Vartika Gupta. Premium velvet bridal trouseau boxes, mirror shagun trays & custom hampers in Jaipur. Express delivery available.`;
      }
      setGeneratedOutput(result);
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles color="#C8A45D" size={24} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
            AI Boutique Marketing Copywriter
          </h1>
        </div>
        <p style={{ color: '#AAA', fontSize: '0.88rem', marginTop: '4px' }}>
          Generate luxury product descriptions, Instagram captions, SEO titles, and WhatsApp campaign copy instantly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        
        {/* Controls Panel */}
        <div style={{ background: '#282828', borderRadius: '20px', padding: '24px', border: '1px solid #C8A45D' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.2rem', marginBottom: '16px' }}>
            Select AI Task
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[
              { id: 'description', label: 'Luxury Product Description' },
              { id: 'whatsapp', label: 'WhatsApp Campaign Message' },
              { id: 'instagram', label: 'Instagram Reel Caption & Hashtags' },
              { id: 'seo', label: 'Google SEO Title & Meta Tags' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTaskType(t.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: taskType === t.id ? '2px solid #C8A45D' : '1px solid rgba(255,255,255,0.1)',
                  background: taskType === t.id ? '#3D2D35' : '#1E1E1E',
                  color: taskType === t.id ? '#F4E8C1' : '#CCC',
                  fontWeight: taskType === t.id ? 700 : 400,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>
              Product / Campaign Focus Keyword:
            </label>
            <input 
              type="text" 
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="e.g. Royal Jaipur Bridal Trousseau Box"
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="btn-gold" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            <Sparkles size={16} />
            <span>{loading ? 'Generating Copy...' : 'Generate Luxury Copy ✨'}</span>
          </button>
        </div>

        {/* Generated Output Preview */}
        <div style={{ background: '#282828', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.2rem', margin: 0 }}>
                Generated Output
              </h4>

              {generatedOutput && (
                <button onClick={handleCopy} style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {copied ? <Check size={14} color="#4CAF50" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              )}
            </div>

            <textarea 
              rows={12}
              readOnly
              value={generatedOutput || 'Click "Generate Luxury Copy" on the left to create tailored marketing copy.'}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid rgba(200,164,93,0.3)',
                background: '#1E1E1E',
                color: '#F4E8C1',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                outline: 'none',
                fontFamily: 'monospace'
              }}
            />
          </div>

          <p style={{ fontSize: '0.75rem', color: '#777', marginTop: '12px', textAlign: 'center' }}>
            Powered by Blossom AI Engine • Instant copy ready for Instagram, WhatsApp, or Google catalog.
          </p>
        </div>

      </div>
    </div>
  );
}
