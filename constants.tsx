
import { Product, Category, Testimonial } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'cables',
    name: 'Cables & Management',
    description: 'High-quality domestic and industrial wiring solutions.',
    icon: 'Cable',
    image: 'https://images.unsplash.com/photo-1558434078-438997576569?q=80&w=800'
  },
  {
    id: 'lighting',
    name: 'Lighting & LED',
    description: 'Energy-efficient solar and smart LED lighting.',
    icon: 'Lightbulb',
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800'
  },
  {
    id: 'industrial',
    name: 'Industrial Equipment',
    description: 'Power distribution and motor protection units.',
    icon: 'Settings',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800'
  },
  {
    id: 'switches',
    name: 'Switches & Sockets',
    description: 'Modern wall switches and modular components.',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=800'
  },
  {
    id: 'solar',
    name: 'Power & Solar',
    description: 'Sustainable energy solutions and LiFePO4 storage.',
    icon: 'Sun',
    image: 'https://images.unsplash.com/photo-1508514177221-18d1427d5a4f?q=80&w=800'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Single-Core 2.5mm Cable',
    category: 'cables',
    description: 'Premium quality single-core cable for domestic wiring. High conductivity and fire-retardant insulation.',
    price: 'Contact for Quote',
    image: 'https://images.unsplash.com/photo-1558434078-438997576569?q=80&w=800',
    sku: 'CAB-25-RD',
    specs: ['Size: 2.5mm', 'Insulation: PVC', 'Current Rating: 25A', 'Standard: IEC 60227']
  },
  {
    id: 'p2',
    name: 'Philips SmartBright LED Panel',
    category: 'lighting',
    description: 'Ultra-slim LED panel providing uniform light for office spaces. Flicker-free technology for eye comfort.',
    price: '₦12,500',
    image: 'https://images.unsplash.com/photo-1596230529625-7ee10f7609b8?q=80&w=800',
    sku: 'LED-PHI-SB',
    specs: ['Wattage: 40W', 'Lumens: 4000lm', 'Color: 6500K', 'Life: 30,000 hrs']
  },
  {
    id: 'p3',
    name: '800W Solar Flood Light',
    category: 'lighting',
    description: 'Industrial-grade outdoor solar flood light with remote control. Weatherproof and motion-sensing.',
    price: '₦45,000',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800',
    sku: 'SOL-FL-800',
    specs: ['Power: 800W', 'Battery: 60Ah LiFePO4', 'Working Time: 12-15hrs', 'IP Rating: IP67']
  },
  {
    id: 'p4',
    name: '200kVA Distribution Transformer',
    category: 'industrial',
    description: 'High-efficiency oil-immersed distribution transformer for stable grid power management.',
    price: 'Contact Sales',
    image: 'https://images.unsplash.com/photo-1617255819151-1f3080c44360?q=80&w=800',
    sku: 'TRA-200-DIST',
    specs: ['Rating: 200kVA', 'Voltage: 11kV/415V', 'Cooling: ONAN', 'Standard: IEC']
  },
  {
    id: 'p5',
    name: 'LiFePO4 Solar Battery 200Ah',
    category: 'solar',
    description: 'Deep-cycle lithium iron phosphate battery for solar storage. Ultra-long cycle life and zero maintenance.',
    price: '₦280,000',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800',
    sku: 'BAT-LIFE-200',
    specs: ['Capacity: 200Ah', 'Voltage: 12.8V', 'Cycles: >4000', 'BMS: Integrated']
  },
  {
    id: 'p6',
    name: '7.5kVA Smart Hybrid Inverter',
    category: 'solar',
    description: 'Advanced hybrid inverter with MPPT solar charge controller. Seamless power switching for sensitive equipment.',
    price: '₦550,000',
    image: 'https://images.unsplash.com/photo-1548543604-a87c9909afec?q=80&w=800',
    sku: 'INV-HYB-75',
    specs: ['Output: 7.5kVA/7500W', 'Solar Input: 6000W', 'Efficiency: 98%', 'Warranty: 2 Years']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Engr. Emeka Nwosu',
    role: 'Lead Project Consultant',
    company: 'Skyline Construction',
    quote: "AMCO CHIDY is our go-to for all large-scale residential wiring projects. Their single-core cables are consistently the best quality we've found in the market.",
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
    rating: 5
  },
  {
    id: 't2',
    name: 'Sarah Adeyemi',
    role: 'Procurement Manager',
    company: 'Apex Hotels & Suites',
    quote: "We recently upgraded our entire solar backup system with AMCO CHIDY's hybrid inverters and batteries. The energy efficiency gains have been remarkable.",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
    rating: 5
  },
  {
    id: 't3',
    name: 'David Okafor',
    role: 'Facility Engineer',
    company: 'GreenField Industrial',
    quote: "The technical support provided by AMCO CHIDY is unmatched. They helped us specify the right distribution transformers for our factory expansion.",
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400',
    rating: 5
  }
];
