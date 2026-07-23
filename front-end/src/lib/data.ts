export const products = [
  { id: 1, name: "آيفون 15 برو ماكس", nameEn: "iPhone 15 Pro Max", price: 5299, oldPrice: 5999, image: "https://images.unsplash.com/photo-1696446702183-cbd60c3b01f5?w=400&h=400&fit=crop&auto=format", rating: 4.9, reviews: 2847, category: "إلكترونيات", badge: "الأكثر مبيعاً", seller: "آبل متجر", stock: 14 },
  { id: 2, name: "سامسونج جالاكسي S24", nameEn: "Samsung Galaxy S24", price: 3899, oldPrice: 4299, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop&auto=format", rating: 4.7, reviews: 1923, category: "إلكترونيات", badge: "عرض خاص", seller: "سامسونج رسمي", stock: 28 },
  { id: 3, name: "ماك بوك برو 14", nameEn: "MacBook Pro 14", price: 8999, oldPrice: 9999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format", rating: 4.8, reviews: 987, category: "حواسيب", badge: "جديد", seller: "آبل متجر", stock: 7 },
  { id: 4, name: "سماعة سوني WH-1000XM5", nameEn: "Sony WH-1000XM5", price: 1299, oldPrice: 1599, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format", rating: 4.8, reviews: 3412, category: "صوتيات", badge: "خصم 19%", seller: "سوني مصر", stock: 43 },
  { id: 5, name: "ساعة آبل الجيل 9", nameEn: "Apple Watch Series 9", price: 1999, oldPrice: 2299, image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop&auto=format", rating: 4.7, reviews: 1567, category: "ساعات ذكية", badge: "", seller: "آبل متجر", stock: 19 },
  { id: 6, name: "تلفاز سامسونج QLED 65", nameEn: "Samsung QLED 65", price: 4599, oldPrice: 5299, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop&auto=format", rating: 4.6, reviews: 876, category: "تلفازات", badge: "فلاش سيل", seller: "الإلكترونيات المتحدة", stock: 5 },
  { id: 7, name: "كاميرا كانون EOS R6", nameEn: "Canon EOS R6", price: 9499, oldPrice: 10500, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&auto=format", rating: 4.9, reviews: 654, category: "كاميرات", badge: "", seller: "كانون مصر", stock: 3 },
  { id: 8, name: "لاب توب ديل XPS 15", nameEn: "Dell XPS 15", price: 7299, oldPrice: 7999, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop&auto=format", rating: 4.6, reviews: 432, category: "حواسيب", badge: "", seller: "ديل مصر", stock: 11 },
];

export const categories = [
  { name: "إلكترونيات", nameEn: "Electronics", icon: "📱", count: 1240, color: "#2563eb" },
  { name: "حواسيب", nameEn: "Computers", icon: "💻", count: 845, color: "#7c3aed" },
  { name: "صوتيات", nameEn: "Audio", icon: "🎧", count: 523, color: "#06b6d4" },
  { name: "ساعات ذكية", nameEn: "Smart Watches", icon: "⌚", count: 312, color: "#10b981" },
  { name: "تلفازات", nameEn: "Televisions", icon: "📺", count: 421, color: "#f59e0b" },
  { name: "كاميرات", nameEn: "Cameras", icon: "📷", count: 287, color: "#ef4444" },
  { name: "ألعاب", nameEn: "Gaming", icon: "🎮", count: 698, color: "#8b5cf6" },
  { name: "أجهزة منزلية", nameEn: "Home Appliances", icon: "🏠", count: 934, color: "#059669" },
];

export const revenueData = [
  { month: "يناير", revenue: 245000, orders: 1240, users: 342 },
  { month: "فبراير", revenue: 312000, orders: 1580, users: 421 },
  { month: "مارس", revenue: 289000, orders: 1450, users: 387 },
  { month: "أبريل", revenue: 398000, orders: 2010, users: 543 },
  { month: "مايو", revenue: 456000, orders: 2340, users: 621 },
  { month: "يونيو", revenue: 523000, orders: 2670, users: 712 },
  { month: "يوليو", revenue: 487000, orders: 2490, users: 687 },
  { month: "أغسطس", revenue: 612000, orders: 3120, users: 823 },
  { month: "سبتمبر", revenue: 578000, orders: 2950, users: 791 },
  { month: "أكتوبر", revenue: 695000, orders: 3540, users: 934 },
  { month: "نوفمبر", revenue: 834000, orders: 4250, users: 1123 },
  { month: "ديسمبر", revenue: 921000, orders: 4690, users: 1287 },
];

export const pieData = [
  { name: "إلكترونيات", value: 38, color: "#2563eb" },
  { name: "حواسيب", value: 24, color: "#7c3aed" },
  { name: "صوتيات", value: 18, color: "#06b6d4" },
  { name: "ساعات", value: 12, color: "#10b981" },
  { name: "أخرى", value: 8, color: "#f59e0b" },
];

export const orders = [
  { id: "#ORD-2024-8821", date: "15 ديسمبر 2024", items: 3, total: 7498, status: "delivered", product: "آيفون 15 برو ماكس" },
  { id: "#ORD-2024-8756", date: "12 ديسمبر 2024", items: 1, total: 1299, status: "shipped", product: "سماعة سوني WH-1000XM5" },
  { id: "#ORD-2024-8701", date: "8 ديسمبر 2024", items: 2, total: 5898, status: "processing", product: "ساعة آبل الجيل 9" },
  { id: "#ORD-2024-8645", date: "5 ديسمبر 2024", items: 1, total: 3899, status: "cancelled", product: "سامسونج جالاكسي S24" },
];

export const reviews = [
  { name: "محمد أحمد", avatar: "م", rating: 5, date: "منذ أسبوعين", text: "منتج رائع جداً، الجودة ممتازة والتوصيل سريع. سأشتري مرة أخرى بالتأكيد!", verified: true },
  { name: "سارة محمد", avatar: "س", rating: 5, date: "منذ 3 أسابيع", text: "تجربة تسوق مميزة جداً. المنتج مطابق تماماً للوصف والتغليف احترافي.", verified: true },
  { name: "أحمد خالد", avatar: "أ", rating: 4, date: "منذ شهر", text: "الجهاز ممتاز لكن التوصيل تأخر يوماً. بشكل عام تجربة إيجابية.", verified: false },
];

export const topSellers = [
  { name: "آبل متجر الرسمي", sales: 234500, rating: 4.9, products: 87, badge: "موثق" },
  { name: "سامسونج مصر", sales: 198200, rating: 4.8, products: 124, badge: "بلاتيني" },
  { name: "سوني العالمية", sales: 167800, rating: 4.7, products: 93, badge: "ذهبي" },
  { name: "الإلكترونيات المتحدة", sales: 143200, rating: 4.6, products: 312, badge: "فضي" },
];

export const usersData = [
  { name: "محمد إبراهيم", email: "m.ibrahim@email.com", role: "عميل", status: "نشط", joined: "يناير 2024", orders: 24, spent: 34500 },
  { name: "نور الدين", email: "nour@email.com", role: "بائع", status: "نشط", joined: "مارس 2024", orders: 187, spent: 0 },
  { name: "فاطمة علي", email: "fatima@email.com", role: "عميل", status: "نشط", joined: "فبراير 2024", orders: 12, spent: 18200 },
  { name: "خالد منصور", email: "khalid@email.com", role: "مدير", status: "نشط", joined: "يناير 2024", orders: 0, spent: 0 },
  { name: "ريم سعيد", email: "reem@email.com", role: "عميل", status: "موقوف", joined: "أبريل 2024", orders: 3, spent: 4200 },
];
