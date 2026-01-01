
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cable, 
  Lightbulb, 
  Settings, 
  Zap, 
  Sun, 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Truck, 
  PhoneCall, 
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Star,
  Quote
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, TESTIMONIALS } from './constants';
import { Page, Product, Testimonial } from './types';
import { getElectricalAdvice } from './services/gemini';

// --- Sub-components ---

const Navbar: React.FC<{ 
  currentPage: Page, 
  onNavigate: (page: Page) => void,
  isScrolled: boolean 
}> = ({ currentPage, onNavigate, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className={`p-2 rounded-lg bg-blue-600 text-white mr-3 group-hover:bg-blue-700 transition-colors`}>
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <span className={`text-xl font-bold tracking-tight block ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                AMCO CHIDY
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-blue-600 block leading-none">
                Electrical
              </span>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                  currentPage === link.page ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('products')}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center hover:bg-slate-800 transition-all active:scale-95"
            >
              Request Quote
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-effect border-t border-slate-100 h-screen overflow-hidden">
          <div className="px-4 pt-8 pb-3 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setIsOpen(false);
                }}
                className="block w-full text-left text-2xl font-bold text-slate-900 hover:text-blue-600 py-2"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => {
                onNavigate('products');
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 text-white px-5 py-4 rounded-xl text-lg font-bold mt-8"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const ProductCard: React.FC<{ 
  product: Product, 
  onSelect: (p: Product) => void 
}> = ({ product, onSelect }) => (
  <div 
    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer"
    onClick={() => onSelect(product)}
  >
    <div className="relative aspect-[4/5] overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900">
        {product.category.replace('-', ' ')}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </button>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
      <p className="text-slate-500 text-sm mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-blue-600 font-bold">{product.price}</span>
        <span className="text-slate-300 text-[10px] font-mono">SKU: {product.sku}</span>
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
    <div className="absolute -top-4 -right-4 text-blue-50/50 group-hover:text-blue-50 transition-colors">
      <Quote size={120} />
    </div>
    <div className="relative z-10">
      <div className="flex space-x-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} className={i < testimonial.rating ? "text-yellow-400" : "text-slate-200"} />
        ))}
      </div>
      <p className="text-slate-600 text-lg leading-relaxed italic mb-8">"{testimonial.quote}"</p>
      <div className="flex items-center space-x-4">
        <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
        <div>
          <h4 className="font-extrabold text-slate-900">{testimonial.name}</h4>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{testimonial.role}</p>
          <p className="text-[10px] text-slate-400 font-medium">{testimonial.company}</p>
        </div>
      </div>
    </div>
  </div>
);

const ExpertChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your AMCO CHIDY expert assistant. How can I help you with your electrical needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getElectricalAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] glass-effect border border-slate-200 shadow-2xl rounded-3xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Zap size={16} />
              </div>
              <span className="font-bold">Expert AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask technical question..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center space-x-2 group"
        >
          <MessageSquare size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold text-sm">Talk to an Expert</span>
        </button>
      )}
    </div>
  );
};

// --- Pages ---

const HomePage: React.FC<{ onNavigate: (page: Page) => void, onSelectProduct: (p: Product) => void }> = ({ onNavigate, onSelectProduct }) => (
  <div className="animate-in fade-in duration-700">
    {/* Hero Section */}
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558223108-637df2fd9940?q=80&w=2000" 
          alt="Electrical Engineer Working" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            <span>Premium Electrical Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Reliable Energy <br /> <span className="text-blue-500">Solutions</span> for Every Project.
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed font-light">
            Quality residential, commercial, and industrial electrical supplies at your fingertips. Built on trust, powered by excellence.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => onNavigate('products')}
              className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all group active:scale-95"
            >
              Browse Catalog
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-slate-800/50 backdrop-blur-md text-white border border-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-95"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Verified Quality", desc: "Every product in our catalog meets international safety and durability standards." },
            { icon: Truck, title: "Bulk Distribution", desc: "Reliable logistics for large-scale industrial projects across the country." },
            { icon: Clock, title: "Technical Support", desc: "Expert advice available for complex industrial and solar installations." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Categories Grid */}
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Main Categories</h2>
            <p className="text-slate-500 mt-2">Comprehensive solutions for all sectors.</p>
          </div>
          <button 
            onClick={() => onNavigate('products')}
            className="text-blue-600 font-bold flex items-center hover:underline group"
          >
            Explore All <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => onNavigate('products')}
            >
              <img src={cat.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-slate-300 text-sm font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.description}</p>
                <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Featured Equipment</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">Top-rated supplies from leading manufacturers including Philips, Schneider, and ABB.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Voices of Trust</h2>
            <p className="text-slate-500 mt-4 leading-relaxed">Hear from the industry experts who rely on AMCO CHIDY every day.</p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-3xl font-black text-slate-900">4.9/5</span>
            <div className="flex flex-col">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Rating</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Zap size={200} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Need Industrial Grade Bulk Pricing?</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            We offer special discounts for contractors, real estate developers, and industrial facilities. Get in touch with our sales desk today.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-extrabold text-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
          >
            Contact Sales Team
          </button>
        </div>
      </div>
    </section>
  </div>
);

// ... Rest of the components (ProductsPage, ProductDetailPage, ContactPage, AboutPage, Footer, App) remain largely the same, but ensuring navigation is smooth ...

const ProductsPage: React.FC<{ onSelectProduct: (p: Product) => void }> = ({ onSelectProduct }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProducts = PRODUCTS.filter(p => 
    (filter === 'all' || p.category === filter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Product Catalog</h1>
          <p className="text-slate-500 text-lg">Browse our professional range of electrical supplies.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products, SKUs, or keywords..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              All Products
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${filter === cat.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <ShoppingBag className="mx-auto text-slate-300 mb-6" size={64} />
            <h3 className="text-2xl font-bold text-slate-900">No products found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetailPage: React.FC<{ product: Product, onBack: () => void }> = ({ product, onBack }) => (
  <div className="pt-32 pb-24 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 font-semibold mb-8 hover:text-blue-600 transition-colors group"
      >
        <ArrowRight className="mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="aspect-square rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
             {[1,2,3].map(i => (
               <div key={i} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                 <img src={product.image} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="Gallery" />
               </div>
             ))}
          </div>
        </div>

        <div>
          <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            {product.category.replace('-', ' ')}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-8">
            <span className="text-3xl font-bold text-blue-600">{product.price}</span>
            <span className="text-slate-400 font-mono text-sm bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">SKU: {product.sku}</span>
          </div>
          
          <div className="prose prose-slate max-w-none mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Product Description</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          {product.specs && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <ShieldCheck size={18} className="text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
            <button className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
              Request Price Quote
            </button>
            <button className="flex-1 bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-extrabold text-lg hover:border-slate-900 transition-all active:scale-95">
              Contact Sales
            </button>
          </div>
          
          <p className="mt-8 flex items-center text-sm text-slate-500">
            <Truck size={16} className="mr-2" />
            Standard shipping and bulk delivery options available.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-slate-500 text-lg mb-12 leading-relaxed">
            Have a project in mind? Our team of engineers and sales specialists are ready to provide technical support and competitive pricing.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 border border-slate-100">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Main Showroom</h4>
                <p className="text-slate-500 leading-relaxed mt-1">123 Electrical Way, Industrial Park,<br />Lagos, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 border border-slate-100">
                <PhoneCall size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Call Support</h4>
                <p className="text-slate-500 leading-relaxed mt-1">+234 (0) 800-CHIDY-ELEC<br />Mon-Fri: 8am - 6pm</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 border border-slate-100">
                <Mail size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Email Us</h4>
                <p className="text-slate-500 leading-relaxed mt-1">sales@amcochidy.com<br />support@amcochidy.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h3>
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Project Type</label>
              <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>Residential Wiring</option>
                <option>Industrial Equipment</option>
                <option>Solar Installation</option>
                <option>Bulk Parts Order</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Message</label>
              <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-extrabold text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="pt-32 pb-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1590644365607-1c5a519a9a37?q=80&w=1000" alt="Team Work" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="lg:w-1/2">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h2 className="text-5xl font-extrabold text-slate-900 mb-8 leading-tight">Legacy of Quality & <br />Reliability.</h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-6">
            AMCO CHIDY ELECTRICAL was founded on the principle that quality electrical supplies shouldn't be hard to find. For over a decade, we have served as a bridge between world-class manufacturers and the local market.
          </p>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            From industrial transformers powering factories to smart LED solutions for modern homes, we curate the best equipment to ensure safety, efficiency, and longevity for your projects.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-4xl font-black text-slate-900 mb-1">15k+</h4>
              <p className="text-slate-400 font-bold text-sm uppercase">Satisfied Clients</p>
            </div>
            <div>
              <h4 className="text-4xl font-black text-slate-900 mb-1">500+</h4>
              <p className="text-slate-400 font-bold text-sm uppercase">Stock Items</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Our Values</h2>
          <p className="text-slate-500 text-lg">The core beliefs that drive every transaction and partnership.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Integrity", text: "We never compromise on product quality. If it's in our store, it's safe and genuine." },
            { title: "Expertise", text: "We don't just sell parts; we offer deep technical consultation for every order." },
            { title: "Availability", text: "We maintain a robust inventory to ensure your projects never stall due to logistics." }
          ].map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{v.title}</h3>
              <p className="text-slate-500 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

const Footer: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <footer className="bg-slate-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center mb-8">
            <div className="p-2 rounded-lg bg-blue-600 text-white mr-3">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-black tracking-tighter">AMCO CHIDY</span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-8">
            Your source for premium electrical supplies. Powering the future of residential and industrial development.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-8">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => onNavigate(item.toLowerCase() as Page)} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-8">Main Categories</h4>
          <ul className="space-y-4">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <button 
                  onClick={() => onNavigate('products')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-8">Newsletter</h4>
          <p className="text-slate-400 text-sm mb-6">Stay updated with new stock arrivals and pricing updates.</p>
          <div className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-slate-800 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      
      <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} AMCO CHIDY ELECTRICAL. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (newPage: Page) => {
    setPage(newPage);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const selectProduct = (p: Product) => {
    setSelectedProduct(p);
    setPage('product-detail');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={page} onNavigate={navigate} isScrolled={isScrolled} />
      
      <main>
        {page === 'home' && <HomePage onNavigate={navigate} onSelectProduct={selectProduct} />}
        {page === 'products' && <ProductsPage onSelectProduct={selectProduct} />}
        {page === 'product-detail' && selectedProduct && <ProductDetailPage product={selectedProduct} onBack={() => navigate('products')} />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />
      
      <ExpertChat />
    </div>
  );
}
