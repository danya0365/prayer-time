export interface City {
  name: string;
  nameLocal?: string;
  country: string;
  lat: number;
  lon: number;
  population: number; // approximate, used for marker sizing
  timezone: string;
}

export const WORLD_CITIES: City[] = [
  // ─── Middle East ───────────────────────────────────────
  { name: "Makkah", nameLocal: "مكة المكرمة", country: "Saudi Arabia", lat: 21.4225, lon: 39.8262, population: 2_000_000, timezone: "Asia/Riyadh" },
  { name: "Madinah", nameLocal: "المدينة المنورة", country: "Saudi Arabia", lat: 24.4539, lon: 39.6142, population: 1_300_000, timezone: "Asia/Riyadh" },
  { name: "Riyadh", nameLocal: "الرياض", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753, population: 7_600_000, timezone: "Asia/Riyadh" },
  { name: "Jeddah", nameLocal: "جدة", country: "Saudi Arabia", lat: 21.5433, lon: 39.1728, population: 4_700_000, timezone: "Asia/Riyadh" },
  { name: "Dubai", nameLocal: "دبي", country: "UAE", lat: 25.2048, lon: 55.2708, population: 3_400_000, timezone: "Asia/Dubai" },
  { name: "Abu Dhabi", nameLocal: "أبو ظبي", country: "UAE", lat: 24.4539, lon: 54.3773, population: 1_500_000, timezone: "Asia/Dubai" },
  { name: "Doha", nameLocal: "الدوحة", country: "Qatar", lat: 25.2854, lon: 51.531, population: 2_400_000, timezone: "Asia/Qatar" },
  { name: "Kuwait City", nameLocal: "مدينة الكويت", country: "Kuwait", lat: 29.3759, lon: 47.9774, population: 3_000_000, timezone: "Asia/Kuwait" },
  { name: "Muscat", nameLocal: "مسقط", country: "Oman", lat: 23.5880, lon: 58.3829, population: 1_500_000, timezone: "Asia/Muscat" },
  { name: "Manama", nameLocal: "المنامة", country: "Bahrain", lat: 26.2285, lon: 50.5860, population: 400_000, timezone: "Asia/Bahrain" },
  { name: "Baghdad", nameLocal: "بغداد", country: "Iraq", lat: 33.3152, lon: 44.3661, population: 8_100_000, timezone: "Asia/Baghdad" },
  { name: "Tehran", nameLocal: "تهران", country: "Iran", lat: 35.6892, lon: 51.389, population: 9_000_000, timezone: "Asia/Tehran" },
  { name: "Amman", nameLocal: "عمّان", country: "Jordan", lat: 31.9454, lon: 35.9284, population: 4_000_000, timezone: "Asia/Amman" },
  { name: "Beirut", nameLocal: "بيروت", country: "Lebanon", lat: 33.8938, lon: 35.5018, population: 2_400_000, timezone: "Asia/Beirut" },
  { name: "Jerusalem", nameLocal: "القدس", country: "Palestine", lat: 31.7683, lon: 35.2137, population: 900_000, timezone: "Asia/Jerusalem" },
  { name: "Sana'a", nameLocal: "صنعاء", country: "Yemen", lat: 15.3694, lon: 44.191, population: 3_900_000, timezone: "Asia/Aden" },

  // ─── Turkey ────────────────────────────────────────────
  { name: "Istanbul", nameLocal: "İstanbul", country: "Turkey", lat: 41.0082, lon: 28.9784, population: 15_500_000, timezone: "Europe/Istanbul" },
  { name: "Ankara", country: "Turkey", lat: 39.9334, lon: 32.8597, population: 5_700_000, timezone: "Europe/Istanbul" },

  // ─── North Africa ──────────────────────────────────────
  { name: "Cairo", nameLocal: "القاهرة", country: "Egypt", lat: 30.0444, lon: 31.2357, population: 21_000_000, timezone: "Africa/Cairo" },
  { name: "Alexandria", nameLocal: "الإسكندرية", country: "Egypt", lat: 31.2001, lon: 29.9187, population: 5_200_000, timezone: "Africa/Cairo" },
  { name: "Casablanca", nameLocal: "الدار البيضاء", country: "Morocco", lat: 33.5731, lon: -7.5898, population: 3_700_000, timezone: "Africa/Casablanca" },
  { name: "Tunis", nameLocal: "تونس", country: "Tunisia", lat: 36.8065, lon: 10.1815, population: 2_700_000, timezone: "Africa/Tunis" },
  { name: "Algiers", nameLocal: "الجزائر", country: "Algeria", lat: 36.7538, lon: 3.0588, population: 3_900_000, timezone: "Africa/Algiers" },
  { name: "Tripoli", nameLocal: "طرابلس", country: "Libya", lat: 32.8872, lon: 13.1913, population: 1_100_000, timezone: "Africa/Tripoli" },
  { name: "Khartoum", nameLocal: "الخرطوم", country: "Sudan", lat: 15.5007, lon: 32.5599, population: 5_200_000, timezone: "Africa/Khartoum" },

  // ─── Sub-Saharan Africa ────────────────────────────────
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, population: 15_400_000, timezone: "Africa/Lagos" },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219, population: 4_400_000, timezone: "Africa/Nairobi" },
  { name: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lon: 39.2083, population: 6_700_000, timezone: "Africa/Dar_es_Salaam" },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.0250, lon: 38.7469, population: 4_800_000, timezone: "Africa/Addis_Ababa" },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473, population: 5_800_000, timezone: "Africa/Johannesburg" },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241, population: 4_600_000, timezone: "Africa/Johannesburg" },
  { name: "Dakar", country: "Senegal", lat: 14.7167, lon: -17.4677, population: 3_100_000, timezone: "Africa/Dakar" },
  { name: "Mogadishu", nameLocal: "مقديشو", country: "Somalia", lat: 2.0469, lon: 45.3182, population: 2_600_000, timezone: "Africa/Mogadishu" },

  // ─── South Asia ────────────────────────────────────────
  { name: "Islamabad", country: "Pakistan", lat: 33.6844, lon: 73.0479, population: 1_100_000, timezone: "Asia/Karachi" },
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011, population: 16_000_000, timezone: "Asia/Karachi" },
  { name: "Lahore", country: "Pakistan", lat: 31.5204, lon: 74.3587, population: 13_000_000, timezone: "Asia/Karachi" },
  { name: "Dhaka", nameLocal: "ঢাকা", country: "Bangladesh", lat: 23.8103, lon: 90.4125, population: 22_000_000, timezone: "Asia/Dhaka" },
  { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777, population: 20_700_000, timezone: "Asia/Kolkata" },
  { name: "Delhi", country: "India", lat: 28.7041, lon: 77.1025, population: 32_000_000, timezone: "Asia/Kolkata" },
  { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639, population: 15_000_000, timezone: "Asia/Kolkata" },
  { name: "Hyderabad", country: "India", lat: 17.3850, lon: 78.4867, population: 10_000_000, timezone: "Asia/Kolkata" },
  { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lon: 79.8612, population: 750_000, timezone: "Asia/Colombo" },

  // ─── Southeast Asia ────────────────────────────────────
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456, population: 10_600_000, timezone: "Asia/Jakarta" },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lon: 101.6869, population: 8_400_000, timezone: "Asia/Kuala_Lumpur" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, population: 5_600_000, timezone: "Asia/Singapore" },
  { name: "Bangkok", nameLocal: "กรุงเทพฯ", country: "Thailand", lat: 13.7563, lon: 100.5018, population: 10_500_000, timezone: "Asia/Bangkok" },
  { name: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842, population: 14_000_000, timezone: "Asia/Manila" },
  { name: "Pattani", nameLocal: "ปัตตานี", country: "Thailand", lat: 6.8787, lon: 101.2505, population: 200_000, timezone: "Asia/Bangkok" },
  { name: "Yala", nameLocal: "ยะลา", country: "Thailand", lat: 6.5414, lon: 101.2806, population: 150_000, timezone: "Asia/Bangkok" },
  { name: "Narathiwat", nameLocal: "นราธิวาส", country: "Thailand", lat: 6.4264, lon: 101.8235, population: 120_000, timezone: "Asia/Bangkok" },
  { name: "Songkhla", nameLocal: "สงขลา", country: "Thailand", lat: 7.1756, lon: 100.6143, population: 340_000, timezone: "Asia/Bangkok" },
  { name: "Chiang Mai", nameLocal: "เชียงใหม่", country: "Thailand", lat: 18.7883, lon: 98.9853, population: 1_200_000, timezone: "Asia/Bangkok" },
  { name: "Krabi", nameLocal: "กระบี่", country: "Thailand", lat: 8.0863, lon: 98.9063, population: 200_000, timezone: "Asia/Bangkok" },

  // ─── East Asia ─────────────────────────────────────────
  { name: "Tokyo", nameLocal: "東京", country: "Japan", lat: 35.6762, lon: 139.6503, population: 37_400_000, timezone: "Asia/Tokyo" },
  { name: "Beijing", nameLocal: "北京", country: "China", lat: 39.9042, lon: 116.4074, population: 21_500_000, timezone: "Asia/Shanghai" },
  { name: "Shanghai", nameLocal: "上海", country: "China", lat: 31.2304, lon: 121.4737, population: 28_500_000, timezone: "Asia/Shanghai" },
  { name: "Seoul", nameLocal: "서울", country: "South Korea", lat: 37.5665, lon: 126.978, population: 9_700_000, timezone: "Asia/Seoul" },
  { name: "Hong Kong", nameLocal: "香港", country: "China", lat: 22.3193, lon: 114.1694, population: 7_500_000, timezone: "Asia/Hong_Kong" },

  // ─── Central Asia ──────────────────────────────────────
  { name: "Tashkent", country: "Uzbekistan", lat: 41.2995, lon: 69.2401, population: 2_500_000, timezone: "Asia/Tashkent" },
  { name: "Almaty", country: "Kazakhstan", lat: 43.2551, lon: 76.9126, population: 2_000_000, timezone: "Asia/Almaty" },
  { name: "Baku", country: "Azerbaijan", lat: 40.4093, lon: 49.8671, population: 2_300_000, timezone: "Asia/Baku" },
  { name: "Kabul", nameLocal: "کابل", country: "Afghanistan", lat: 34.5553, lon: 69.2075, population: 4_600_000, timezone: "Asia/Kabul" },

  // ─── Europe ────────────────────────────────────────────
  { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278, population: 9_000_000, timezone: "Europe/London" },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, population: 11_000_000, timezone: "Europe/Paris" },
  { name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405, population: 3_600_000, timezone: "Europe/Berlin" },
  { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, population: 3_200_000, timezone: "Europe/Madrid" },
  { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, population: 2_800_000, timezone: "Europe/Rome" },
  { name: "Moscow", nameLocal: "Москва", country: "Russia", lat: 55.7558, lon: 37.6173, population: 12_500_000, timezone: "Europe/Moscow" },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041, population: 900_000, timezone: "Europe/Amsterdam" },
  { name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738, population: 1_900_000, timezone: "Europe/Vienna" },
  { name: "Sarajevo", country: "Bosnia", lat: 43.8563, lon: 18.4131, population: 350_000, timezone: "Europe/Sarajevo" },
  { name: "Tirana", country: "Albania", lat: 41.3275, lon: 19.8187, population: 800_000, timezone: "Europe/Tirane" },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686, population: 1_600_000, timezone: "Europe/Stockholm" },

  // ─── North America ─────────────────────────────────────
  { name: "New York", country: "USA", lat: 40.7128, lon: -74.006, population: 8_300_000, timezone: "America/New_York" },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437, population: 3_900_000, timezone: "America/Los_Angeles" },
  { name: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298, population: 2_700_000, timezone: "America/Chicago" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, population: 2_900_000, timezone: "America/Toronto" },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, population: 21_800_000, timezone: "America/Mexico_City" },
  { name: "Houston", country: "USA", lat: 29.7604, lon: -95.3698, population: 2_300_000, timezone: "America/Chicago" },
  { name: "Dearborn", country: "USA", lat: 42.3223, lon: -83.1763, population: 100_000, timezone: "America/Detroit" },

  // ─── South America ─────────────────────────────────────
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, population: 22_000_000, timezone: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, population: 15_000_000, timezone: "America/Argentina/Buenos_Aires" },
  { name: "Bogotá", country: "Colombia", lat: 4.711, lon: -74.0721, population: 11_000_000, timezone: "America/Bogota" },
  { name: "Lima", country: "Peru", lat: -12.0464, lon: -77.0428, population: 10_000_000, timezone: "America/Lima" },
  { name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693, population: 6_200_000, timezone: "America/Santiago" },

  // ─── Oceania ───────────────────────────────────────────
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, population: 5_300_000, timezone: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631, population: 5_000_000, timezone: "Australia/Melbourne" },
  { name: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633, population: 1_700_000, timezone: "Pacific/Auckland" },
];
