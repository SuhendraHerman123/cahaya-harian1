export interface Quote {
  id: number
  text: string
  author: string
  category: 'motivation' | 'stress-relief' | 'life' | 'mindfulness'
  imageKeyword: string
  imageUrl: string
  accent: string
}

export const quotes: Quote[] = [
  {
    id: 1,
    text: "Dalam setiap hari baru, tersembunyi kekuatan yang belum pernah kamu gunakan sebelumnya.",
    author: "Ralph Waldo Emerson",
    category: "motivation",
    imageKeyword: "sunrise mountains",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    accent: "#FF6B35"
  },
  {
    id: 2,
    text: "Ambil napas dalam-dalam. Kamu lebih kuat dari yang kamu kira, dan lebih dicintai dari yang kamu bayangkan.",
    author: "Unknown",
    category: "stress-relief",
    imageKeyword: "calm ocean beach",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    accent: "#4ECDC4"
  },
  {
    id: 3,
    text: "Hidup bukan soal menunggu badai berlalu, tapi belajar menari di bawah hujan.",
    author: "Vivian Greene",
    category: "life",
    imageKeyword: "rain forest green",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    accent: "#45B7D1"
  },
  {
    id: 4,
    text: "Satu langkah kecil ke depan masih tetap kemajuan. Jangan berhenti bergerak.",
    author: "Unknown",
    category: "motivation",
    imageKeyword: "path forest walk",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    accent: "#96CEB4"
  },
  {
    id: 5,
    text: "Ketenangan bukan berarti tidak ada masalah, melainkan kedamaian di tengah masalah itu.",
    author: "Unknown",
    category: "stress-relief",
    imageKeyword: "meditation lake reflection",
    imageUrl: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80",
    accent: "#DDA0DD"
  },
  {
    id: 6,
    text: "Kamu tidak harus sempurna untuk memulai, tapi kamu harus memulai untuk menjadi sempurna.",
    author: "Joe Sabah",
    category: "motivation",
    imageKeyword: "mountain peak clouds",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    accent: "#F7DC6F"
  },
  {
    id: 7,
    text: "Saat pikiranmu tenang, kamu bisa melihat solusi yang selama ini sudah ada di depanmu.",
    author: "Unknown",
    category: "mindfulness",
    imageKeyword: "zen garden stones",
    imageUrl: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1200&q=80",
    accent: "#A8D8EA"
  },
  {
    id: 8,
    text: "Setiap matahari terbenam membawa janji matahari terbit baru yang penuh kemungkinan.",
    author: "Ralph Waldo Emerson",
    category: "life",
    imageKeyword: "golden sunset horizon",
    imageUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&q=80",
    accent: "#FF8C69"
  },
  {
    id: 9,
    text: "Beri dirimu izin untuk beristirahat. Recharge bukan kelemahan, itu kebijaksanaan.",
    author: "Unknown",
    category: "stress-relief",
    imageKeyword: "cozy morning coffee",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
    accent: "#D4A574"
  },
  {
    id: 10,
    text: "Kepercayaan diri bukan dari selalu benar, melainkan dari tidak takut salah.",
    author: "Peter T. Mcintyre",
    category: "motivation",
    imageKeyword: "eagle flying sky",
    imageUrl: "https://images.unsplash.com/photo-1444464616949-d3567a3609c6?w=1200&q=80",
    accent: "#85C1E9"
  },
  {
    id: 11,
    text: "Tubuhmu mendengar semua yang dikatakan pikiranmu. Bersikap baiklah pada dirimu sendiri.",
    author: "Unknown",
    category: "mindfulness",
    imageKeyword: "wildflower field bloom",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88df5691cc0a?w=1200&q=80",
    accent: "#F1948A"
  },
  {
    id: 12,
    text: "Hari-hari sulit membuat kamu lebih kuat, pengalaman buruk membuatmu lebih bijak.",
    author: "Unknown",
    category: "life",
    imageKeyword: "storm lighthouse strong",
    imageUrl: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&q=80",
    accent: "#7FB3D3"
  },
]

export function getDailyQuote(): Quote {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)
  return quotes[dayOfYear % quotes.length]
}

export function getCategoryLabel(category: Quote['category']): string {
  const labels = {
    'motivation': '🔥 Motivasi',
    'stress-relief': '🌊 Stress Relief',
    'life': '✨ Filosofi Hidup',
    'mindfulness': '🧘 Mindfulness',
  }
  return labels[category]
}
