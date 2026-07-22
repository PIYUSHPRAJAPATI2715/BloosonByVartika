import React, { useState, useEffect } from 'react';
import Navbar from './components/Storefront/Navbar';
import Hero from './components/Storefront/Hero';
import AboutSection from './components/Storefront/AboutSection';
import ServicesGrid from './components/Storefront/ServicesGrid';
import ProductGallery from './components/Storefront/ProductGallery';
import ProductModal from './components/Storefront/ProductModal';
import OrderTrackerModal from './components/Storefront/OrderTrackerModal';
import AllProductsModal from './components/Storefront/AllProductsModal';
import CartDrawer from './components/Storefront/CartDrawer';
import AuthModal from './components/Storefront/AuthModal';
import Testimonials from './components/Storefront/Testimonials';
import ProcessSection from './components/Storefront/ProcessSection';
import InstagramFeed from './components/Storefront/InstagramFeed';
import ContactSection from './components/Storefront/ContactSection';
import Footer from './components/Storefront/Footer';
import PetalCanvas from './components/PetalCanvas';
import SoundToggle from './components/SoundToggle';
import { getApiUrl } from './config/api';

// Admin imports
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminOrders from './components/Admin/AdminOrders';
import AdminUsers from './components/Admin/AdminUsers';
import AdminProducts from './components/Admin/AdminProducts';
import AdminCategories from './components/Admin/AdminCategories';
import AdminCoupons from './components/Admin/AdminCoupons';
import AdminSettings from './components/Admin/AdminSettings';
import AdminCalendar from './components/Admin/AdminCalendar';
import AdminAiAssistant from './components/Admin/AdminAiAssistant';

export default function App() {
  // Navigation & Store State
  const [activeAdmin, setActiveAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');

  // User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('blossom_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('user');

  // Dynamic Settings State
  const [websiteSettings, setWebsiteSettings] = useState({
    announcementText: "👑 JAIPUR STUDIO OPEN FOR LUXURY BRIDAL TROUSSEAU & FESTIVAL BOOKINGS",
    heroHeading: "Every Gift Tells a Story",
    heroSubheading: "Luxury Handmade Hampers & Trousseau Packaging crafted with love in Jaipur.",
    contactEmail: "vartika1594@gmail.com",
    contactPhone: "+91 98280 23641",
    address: "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021"
  });
  
  const [products, setProducts] = useState([
    {
      _id: '1',
      name: "Royal Pink Jaipur Bridal Trousseau Box Set",
      sku: "BV-TROUSSEAU-01",
      category: "Wedding Collection",
      subCategory: "Bridal Trousseau",
      price: 18500,
      discountPrice: 16500,
      rating: 5.0,
      reviewCount: 42,
      images: [
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Handcrafted 5-piece royal bridal trouseau packaging set crafted with plush blush pink velvet, zari border work, customized brass lock buckles, and dried botanicals.",
      materialUsed: "Blush Velvet, Antique Brass Accents, Zari Ribbons, Rose Petals",
      dimensions: "24 x 18 x 10 inches",
      deliveryTime: "3-5 Business Days (Jaipur express available)",
      isFeatured: true,
      variants: [
        { name: "3-Piece Standard", price: 12500 },
        { name: "5-Piece Royal Edition", price: 16500 },
        { name: "7-Piece Grand Maharani", price: 28000 }
      ]
    },
    {
      _id: '2',
      name: "Peacock Mirror Shagun Tray & Ring Ceremony Hamper",
      sku: "BV-WED-02",
      category: "Wedding Collection",
      subCategory: "Shagun Trays",
      price: 6800,
      discountPrice: 5950,
      rating: 4.9,
      reviewCount: 31,
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Intricately carved mirror shagun tray lined with gold lace and pearl tassels, specifically curated for engagement rings and auspicious shagun gifts.",
      materialUsed: "Mirror Glass, Gold Brocade, Pearl Strands",
      dimensions: "16 x 12 x 4 inches",
      deliveryTime: "2-4 Business Days",
      isFeatured: true,
      variants: [{ name: "Standard Tray", price: 5950 }]
    },
    {
      _id: '3',
      name: "Golden Royale Diwali & Festive Gift Trunk",
      sku: "BV-FEST-01",
      category: "Festival Collection",
      subCategory: "Diwali Hampers",
      price: 8500,
      discountPrice: 7600,
      rating: 5.0,
      reviewCount: 19,
      images: [
        "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Gold embossed leatherette trunk featuring premium artisanal dry fruits, brass lotus diyas, scented soy candles, and personalized festive message card.",
      materialUsed: "Gold Embossed Leatherette, Solid Brass Diyas",
      dimensions: "14 x 10 x 6 inches",
      deliveryTime: "3-5 Business Days",
      isFeatured: true,
      variants: [{ name: "Classic Trunk", price: 7600 }, { name: "VIP Executive Gold", price: 11500 }]
    },
    {
      _id: '4',
      name: "Little Prince / Princess Newborn Welcome Chest",
      sku: "BV-BABY-01",
      category: "Baby Collection",
      subCategory: "Newborn Welcome",
      price: 9200,
      discountPrice: 8400,
      rating: 4.8,
      reviewCount: 14,
      images: [
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Soft pastel pink and mint velvet trunk complete with customized baby milestone cards, organic cotton swaddle wrap, plush teddy, and baby detail keepsake box.",
      materialUsed: "Pastel Velvet, Organic Cotton",
      dimensions: "15 x 11 x 7 inches",
      deliveryTime: "3-5 Business Days",
      isFeatured: true,
      variants: [{ name: "Pastel Keepsake Box", price: 8400 }]
    },
    {
      _id: '5',
      name: "Customized 3D Floral Explosion Box & Memory Album",
      sku: "BV-HANDMADE-01",
      category: "Handmade Products",
      subCategory: "Explosion Boxes",
      price: 3400,
      discountPrice: 2990,
      rating: 4.9,
      reviewCount: 56,
      images: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
      ],
      description: "A 4-layer interactive explosion box unfolding to reveal custom photograph pop-ups, mini message scrolls, dried pressed flowers, and a central gift compartment.",
      materialUsed: "Imported 300GSM Craft Paper, Satin Ribbon",
      dimensions: "6 x 6 x 6 inches",
      deliveryTime: "2-4 Business Days",
      isFeatured: true,
      variants: [{ name: "3-Layer Box", price: 2990 }, { name: "4-Layer Deluxe Box", price: 3900 }]
    },
    {
      _id: '6',
      name: "Executive Artisan Velvet Corporate Hamper",
      sku: "BV-CORP-01",
      category: "Corporate Gifting",
      subCategory: "Executive Kits",
      price: 4500,
      discountPrice: 3990,
      rating: 4.9,
      reviewCount: 22,
      images: [
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
      ],
      description: "Refined corporate kit with customized leather journal, brass pen, gold foil coaster set, gourmet dragees, and laser-engraved company logo tag.",
      materialUsed: "Faux Leather, Stainless Brass",
      dimensions: "12 x 9 x 4 inches",
      deliveryTime: "3-5 Business Days",
      isFeatured: true,
      variants: [{ name: "Single Executive Box", price: 3990 }]
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  
  // Modals visibility
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch Website Settings from Backend API
  useEffect(() => {
    fetch(getApiUrl('/api/settings'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setWebsiteSettings(prev => ({ ...prev, ...data.data }));
        }
      })
      .catch(err => console.warn("Failed to load settings:", err));
  }, []);

  // Keyboard shortcut listener Ctrl + Alt + A for Admin login
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setAuthModalMode('admin');
        setAuthModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Google Analytics Realtime Pageview Event Dispatcher
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('config', 'G-J290RKLB19', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname
        });
        window.gtag('event', 'page_view', {
          send_to: 'G-J290RKLB19',
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname
        });
      }
    } catch (err) {
      console.warn("Analytics event dispatch fallback:", err);
    }
  }, [activeAdmin, isAllProductsOpen]);

  // Fetch products & website settings from REST API on mount
  useEffect(() => {
    fetch(getApiUrl('/api/products'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setProducts(data.data);
      })
      .catch(err => console.warn("API products fallback:", err));

    fetch(getApiUrl('/api/settings'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setWebsiteSettings(data.data);
      })
      .catch(err => console.warn("API settings fallback:", err));
  }, []);

  const handleAuthSuccess = (user, token, isAdmin = false) => {
    setCurrentUser(user);
    localStorage.setItem('blossom_user', JSON.stringify(user));
    if (token) localStorage.setItem('blossom_token', token);

    if (isAdmin) {
      setActiveAdmin(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('blossom_user');
    localStorage.removeItem('blossom_token');
    setActiveAdmin(false);
  };

  const handleAddToCart = (product, variantName = 'Standard', quantity = 1, customMsg = '') => {
    if (!currentUser) {
      setAuthModalMode('user');
      setAuthModalOpen(true);
      return;
    }

    const existingIndex = cartItems.findIndex(i => i.id === product._id && i.variant === variantName);
    const itemPrice = product.discountPrice || product.price;

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product._id || product.sku,
          name: product.name,
          price: itemPrice,
          variant: variantName,
          quantity: quantity,
          images: product.images,
          customMsg: customMsg
        }
      ]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      const updated = [...cartItems];
      updated[index].quantity = newQty;
      setCartItems(updated);
    }
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* Floating Petals and Ambient Sound */}
      <PetalCanvas />
      <SoundToggle />

      {activeAdmin ? (
        /* --- ADMIN PANEL VIEW --- */
        <AdminLayout 
          activeTab={adminTab} 
          onTabChange={setAdminTab} 
          onExitAdmin={() => setActiveAdmin(false)}
        >
          {adminTab === 'dashboard' && <AdminDashboard onNavigate={setAdminTab} />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'users' && <AdminUsers />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'categories' && <AdminCategories />}
          {adminTab === 'coupons' && <AdminCoupons />}
          {adminTab === 'settings' && <AdminSettings onSettingsUpdated={setWebsiteSettings} />}
          {adminTab === 'calendar' && <AdminCalendar />}
          {adminTab === 'ai-copywriter' && <AdminAiAssistant />}
        </AdminLayout>
      ) : (
        /* --- STOREFRONT USER VIEW --- */
        <div>
          <Navbar 
            cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
            currentUser={currentUser}
            onOpenAuthModal={(m) => { setAuthModalMode(m); setAuthModalOpen(true); }}
            onLogout={handleLogout}
            onTriggerAdminAuth={() => { setAuthModalMode('admin'); setAuthModalOpen(true); }}
            websiteSettings={websiteSettings}
          />

          <Hero 
            settings={websiteSettings}
          />

          <AboutSection websiteSettings={websiteSettings} />

          <ServicesGrid 
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('collection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <ProductGallery 
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onQuickView={(p) => setActiveQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 'Standard', 1)}
            onOpenAllProducts={() => setIsAllProductsOpen(true)}
          />

          <ProcessSection websiteSettings={websiteSettings} />

          <Testimonials />

          <InstagramFeed />

          <ContactSection websiteSettings={websiteSettings} />

          <Footer 
            websiteSettings={websiteSettings}
          />
        </div>
      )}

      {/* --- STOREFRONT MODALS --- */}
      <AuthModal 
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {activeQuickViewProduct && (
        <ProductModal 
          product={activeQuickViewProduct}
          onClose={() => setActiveQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isOrderTrackerOpen && (
        <OrderTrackerModal 
          onClose={() => setIsOrderTrackerOpen(false)}
        />
      )}

      <AllProductsModal
        isOpen={isAllProductsOpen}
        onClose={() => setIsAllProductsOpen(false)}
        products={products}
        onQuickView={(p) => setActiveQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

    </div>
  );
}
