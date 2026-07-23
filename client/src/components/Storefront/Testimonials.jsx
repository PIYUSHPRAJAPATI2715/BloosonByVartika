import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Plus, Send, CheckCircle2 } from 'lucide-react';
import { getApiUrl } from '../../config/api';

const DEFAULT_REVIEWS = [
  {
    _id: '1',
    customerName: "Priyanka Ranawat",
    location: "Jaipur, Rajasthan",
    occasion: "Bridal Trousseau Box Set",
    rating: 5,
    reviewText: "Vartika and her team at Blossom made my wedding trousseau look like a royal museum exhibit! Every box was detailed with zardosi lace, personalized initials, and fresh fragrance.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    _id: '2',
    customerName: "Siddharth & Meera",
    location: "Delhi NCR",
    occasion: "Mehendi Favors & Shagun Trays",
    rating: 5,
    reviewText: "We ordered 80 Mehendi hampers from Jaipur to Delhi. Not a single petal was displaced during transit. Absolutely magnificent quality, ribbon work, and prompt communication!",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    _id: '3',
    customerName: "Ananya Singhania",
    location: "Mumbai",
    occasion: "Executive Diwali Corporate Hampers",
    rating: 5,
    reviewText: "Our VIP clients were blown away by the gold embossed leatherette trunks and solid brass diyas. Vartika Gupta is truly the finest gifting studio founder in Rajasthan.",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    location: 'Jaipur, Rajasthan',
    occasion: 'Bridal Trousseau',
    rating: 5,
    reviewText: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetch(getApiUrl('/api/reviews'))
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setReviews(data.data);
        }
      })
      .catch(err => console.warn("Reviews API fallback:", err));
  }, []);

  const safeReviews = (reviews && reviews.length > 0) ? reviews : DEFAULT_REVIEWS;
  const nextReview = () => setActiveIndex((activeIndex + 1) % safeReviews.length);
  const prevReview = () => setActiveIndex((activeIndex - 1 + safeReviews.length) % safeReviews.length);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(getApiUrl('/api/reviews'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setReviews([data.data, ...safeReviews]);
      } else {
        setReviews([{ ...newReview, _id: Date.now().toString() }, ...safeReviews]);
      }
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowReviewModal(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err) {
      setReviews([{ ...newReview, _id: Date.now().toString() }, ...safeReviews]);
      setShowReviewModal(false);
    }
  };

  const active = safeReviews[activeIndex % safeReviews.length] || DEFAULT_REVIEWS[0];


  return (
    <section style={{ padding: '90px 24px', background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        <span className="ribbon-tag" style={{ marginBottom: '12px' }}>Customer Stories</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#2E2E2E', marginBottom: '16px' }}>
          Loved by Brides & <span className="title-blush-gradient">Luxury Shoppers</span>
        </h2>
        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '40px' }}>
          Real feedback from our wedding trousseau and festive hamper clients.
        </p>

        {/* 3D Review Card */}
        {active && (
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid rgba(200, 164, 93, 0.4)',
              boxShadow: '0 20px 40px rgba(232, 183, 201, 0.3)',
              padding: '48px 36px',
              position: 'relative',
              margin: '0 auto'
            }}
          >
            <Quote size={48} color="#E8B7C9" style={{ opacity: 0.5, marginBottom: '16px' }} />
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
              {[...Array(active.rating || 5)].map((_, i) => (
                <Star key={i} size={20} color="#C8A45D" fill="#C8A45D" />
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#2E2E2E', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '28px', maxWidth: '750px', margin: '0 auto 28px' }}>
              "{active.reviewText}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <img src={active.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"} alt={active.customerName} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C8A45D' }} />
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', margin: 0 }}>{active.customerName}</h4>
                <span style={{ fontSize: '0.8rem', color: '#9A7734', fontWeight: 600 }}>{active.occasion} • {active.location}</span>
              </div>
            </div>
          </div>
        )}

        {/* Carousel Controls & Add Review Button */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '28px' }}>
          <button onClick={prevReview} className="btn-outline-gold" style={{ padding: '10px 16px' }}>
            <ChevronLeft size={18} />
          </button>
          
          <button onClick={() => setShowReviewModal(true)} className="btn-gold" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <Plus size={16} /> Share Your Review
          </button>

          <button onClick={nextReview} className="btn-outline-gold" style={{ padding: '10px 16px' }}>
            <ChevronRight size={18} />
          </button>
        </div>

      </div>

      {/* Add Review Modal */}
      {showReviewModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '32px', maxWidth: '520px', width: '100%', border: '2px solid #C8A45D', position: 'relative' }}>
            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <CheckCircle2 size={48} color="#C8A45D" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#2E2E2E' }}>Thank You for Your Feedback!</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Your review has been added to our studio feed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#2E2E2E', fontSize: '1.6rem', marginBottom: '8px' }}>
                  Write a Review for Blossom
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
                  Tell us about your experience with our trousseau packing & gift hampers.
                </p>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Your Name *</label>
                  <input type="text" required value={newReview.customerName} onChange={e => setNewReview({...newReview, customerName: e.target.value})} placeholder="e.g. Radhika Sharma" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Location</label>
                    <input type="text" value={newReview.location} onChange={e => setNewReview({...newReview, location: e.target.value})} placeholder="Jaipur, Rajasthan" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Occasion</label>
                    <input type="text" value={newReview.occasion} onChange={e => setNewReview({...newReview, occasion: e.target.value})} placeholder="Bridal Trousseau" style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Rating</label>
                  <select value={newReview.rating} onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }}>
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Outstanding)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Great)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Good)</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Your Review *</label>
                  <textarea rows={3} required value={newReview.reviewText} onChange={e => setNewReview({...newReview, reviewText: e.target.value})} placeholder="Describe your hamper quality, delivery experience..." style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setShowReviewModal(false)} className="btn-outline-gold" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                  <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>
                    <Send size={16} /> Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
