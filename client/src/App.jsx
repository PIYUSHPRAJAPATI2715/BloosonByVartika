import React, { useState, useEffect } from 'react';
import Navbar from './components/Storefront/Navbar';
import Hero from './components/Storefront/Hero';
import AboutSection from './components/Storefront/AboutSection';
import ServicesGrid from './components/Storefront/ServicesGrid';
import ProductGallery from './components/Storefront/ProductGallery';
import ProductModal from './components/Storefront/ProductModal';
import HamperBuilderModal from './components/Storefront/HamperBuilderModal';
import GiftQuizModal from './components/Storefront/GiftQuizModal';
import TrousseauPlanner from './components/Storefront/TrousseauPlanner';
import CustomOrderModal from './components/Storefront/CustomOrderModal';
import OrderTrackerModal from './components/Storefront/OrderTrackerModal';
import CartDrawer from './components/Storefront/CartDrawer';
import Testimonials from './components/Storefront/Testimonials';
import ProcessSection from './components/Storefront/ProcessSection';
import InstagramFeed from './components/Storefront/InstagramFeed';
import ContactSection from './components/Storefront/ContactSection';
import Footer from './components/Storefront/Footer';
import PetalCanvas from './components/PetalCanvas';
import SoundToggle from './components/SoundToggle';

// Admin imports
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminCustomOrders from './components/Admin/AdminCustomOrders';
import AdminOrders from './components/Admin/AdminOrders';
import AdminProducts from './components/Admin/AdminProducts';
import AdminCategories from './components/Admin/AdminCategories';
import AdminCoupons from './components/Admin/AdminCoupons';
import AdminCalendar from './components/Admin/AdminCalendar';
import AdminAiAssistant from './components/Admin/AdminAiAssistant';

export default function App() {
  // Navigation & Store State
  const [activeAdmin, setActiveAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  
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
  const [isHamperBuilderOpen, setIsHamperBuilderOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch products from backend API on mount
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(err => console.warn("API products fallback:", err));
  }, []);

  const handleAddToCart = (product, variantName = 'Standard', quantity = 1, customMsg = '') => {
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
          {adminTab === 'custom-orders' && <AdminCustomOrders />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'categories' && <AdminCategories />}
          {adminTab === 'coupons' && <AdminCoupons />}
          {adminTab === 'calendar' && <AdminCalendar />}
          {adminTab === 'ai-copywriter' && <AdminAiAssistant />}
        </AdminLayout>
      ) : (
        /* --- STOREFRONT USER VIEW --- */
        <div>
          <Navbar 
            cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            onOpenHamperBuilder={() => setIsHamperBuilderOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenPlanner={() => setIsPlannerOpen(true)}
            onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
            activeAdmin={activeAdmin}
            onToggleAdmin={() => setActiveAdmin(true)}
          />

          <Hero 
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            onOpenHamperBuilder={() => setIsHamperBuilderOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />

          <AboutSection />

          <ServicesGrid 
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('collection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
          />

          <ProductGallery 
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onQuickView={(p) => setActiveQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 'Standard', 1)}
            onOpenHamperBuilder={() => setIsHamperBuilderOpen(true)}
          />

          <ProcessSection />

          <Testimonials />

          <InstagramFeed />

          <ContactSection />

          <Footer 
            onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
            onOpenHamperBuilder={() => setIsHamperBuilderOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        </div>
      )}

      {/* --- STOREFRONT MODALS --- */}
      {activeQuickViewProduct && (
        <ProductModal 
          product={activeQuickViewProduct}
          onClose={() => setActiveQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isHamperBuilderOpen && (
        <HamperBuilderModal 
          onClose={() => setIsHamperBuilderOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isQuizOpen && (
        <GiftQuizModal 
          products={products}
          onClose={() => setIsQuizOpen(false)}
          onSelectProduct={(p) => setActiveQuickViewProduct(p)}
        />
      )}

      {isPlannerOpen && (
        <TrousseauPlanner 
          onClose={() => setIsPlannerOpen(false)}
          onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        />
      )}

      {isCustomOrderOpen && (
        <CustomOrderModal 
          onClose={() => setIsCustomOrderOpen(false)}
        />
      )}

      {isOrderTrackerOpen && (
        <OrderTrackerModal 
          onClose={() => setIsOrderTrackerOpen(false)}
        />
      )}

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
