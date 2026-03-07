export type ThemeType =
  | "original"
  | "orange"
  | "green"
  | "space"
  | "mecca"
  | "ocean"
  | "modern"
  | "classic"
  | "minimal"
  | "gradient";

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
    prayer: {
      fajr: string;
      dhuhr: string;
      asr: string;
      maghrib: string;
      isha: string;
      current: string;
    };
  };
  styles: {
    borderRadius: string;
    spacing: string;
    shadows: string;
    animation: string;
  };
}

export const AVAILABLE_THEMES: Record<ThemeType, ThemeConfig> = {
  original: {
    id: "original",
    name: "Original",
    description: "The original Prayer Times Dashboard design",
    colors: {
      primary: "bg-blue-600",
      secondary: "bg-blue-50",
      accent: "bg-blue-500",
      background: "bg-gray-50",
      surface: "bg-white",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        accent: "text-blue-600",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-indigo-500 to-purple-600",
        dhuhr: "bg-gradient-to-r from-yellow-400 to-orange-500",
        asr: "bg-gradient-to-r from-orange-400 to-red-500",
        maghrib: "bg-gradient-to-r from-pink-500 to-rose-500",
        isha: "bg-gradient-to-r from-purple-600 to-indigo-600",
        current: "bg-gradient-to-r from-green-400 to-blue-500",
      },
    },
    styles: {
      borderRadius: "rounded-lg",
      spacing: "p-6",
      shadows: "shadow-lg",
      animation: "transition-all duration-300",
    },
  },
  orange: {
    id: "orange",
    name: "Orange",
    description: "Warm orange theme with vibrant sunset colors",
    colors: {
      primary: "bg-orange-600",
      secondary: "bg-orange-50",
      accent: "bg-orange-500",
      background: "bg-orange-25",
      surface: "bg-white",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        accent: "text-orange-600",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-orange-800 to-red-800",
        dhuhr: "bg-gradient-to-r from-yellow-400 to-orange-400",
        asr: "bg-gradient-to-r from-orange-400 to-red-400",
        maghrib: "bg-gradient-to-r from-orange-500 to-pink-500",
        isha: "bg-gradient-to-r from-orange-700 to-red-700",
        current: "bg-gradient-to-r from-orange-500 to-yellow-500",
      },
    },
    styles: {
      borderRadius: "rounded-xl",
      spacing: "p-6",
      shadows: "shadow-lg",
      animation: "transition-all duration-300 ease-in-out",
    },
  },
  green: {
    id: "green",
    name: "Green",
    description: "Fresh green theme inspired by nature and tranquility",
    colors: {
      primary: "bg-emerald-600",
      secondary: "bg-emerald-50",
      accent: "bg-emerald-500",
      background: "bg-emerald-25",
      surface: "bg-white",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        accent: "text-emerald-600",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-emerald-800 to-teal-800",
        dhuhr: "bg-gradient-to-r from-lime-400 to-emerald-400",
        asr: "bg-gradient-to-r from-emerald-400 to-green-400",
        maghrib: "bg-gradient-to-r from-emerald-500 to-cyan-500",
        isha: "bg-gradient-to-r from-emerald-700 to-teal-700",
        current: "bg-gradient-to-r from-emerald-500 to-lime-500",
      },
    },
    styles: {
      borderRadius: "rounded-xl",
      spacing: "p-6",
      shadows: "shadow-lg",
      animation: "transition-all duration-300 ease-in-out",
    },
  },
  space: {
    id: "space",
    name: "Space",
    description: "Cosmic space theme with stellar design and galactic colors",
    colors: {
      primary: "bg-indigo-600",
      secondary: "bg-indigo-50",
      accent: "bg-purple-500",
      background: "bg-slate-900",
      surface: "bg-slate-800",
      text: {
        primary: "text-white",
        secondary: "text-slate-300",
        accent: "text-purple-400",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-indigo-900 to-purple-900",
        dhuhr: "bg-gradient-to-r from-yellow-400 to-orange-400",
        asr: "bg-gradient-to-r from-orange-400 to-red-400",
        maghrib: "bg-gradient-to-r from-purple-500 to-pink-500",
        isha: "bg-gradient-to-r from-indigo-700 to-purple-700",
        current: "bg-gradient-to-r from-cyan-400 to-blue-500",
      },
    },
    styles: {
      borderRadius: "rounded-2xl",
      spacing: "p-6",
      shadows: "shadow-2xl",
      animation: "transition-all duration-500 ease-out",
    },
  },
  mecca: {
    id: "mecca",
    name: "Mecca",
    description: "Sacred Mecca theme inspired by the holy city and Kaaba",
    colors: {
      primary: "bg-amber-600",
      secondary: "bg-amber-50",
      accent: "bg-yellow-500",
      background: "bg-stone-50",
      surface: "bg-white",
      text: {
        primary: "text-stone-900",
        secondary: "text-stone-600",
        accent: "text-amber-700",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-slate-700 to-stone-700",
        dhuhr: "bg-gradient-to-r from-amber-400 to-yellow-400",
        asr: "bg-gradient-to-r from-orange-400 to-amber-400",
        maghrib: "bg-gradient-to-r from-rose-400 to-pink-400",
        isha: "bg-gradient-to-r from-indigo-600 to-purple-600",
        current: "bg-gradient-to-r from-amber-500 to-yellow-500",
      },
    },
    styles: {
      borderRadius: "rounded-xl",
      spacing: "p-6",
      shadows: "shadow-lg",
      animation: "transition-all duration-300 ease-in-out",
    },
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    description: "Deep ocean theme with flowing waves and marine life",
    colors: {
      primary: "bg-blue-600",
      secondary: "bg-cyan-50",
      accent: "bg-teal-500",
      background: "bg-blue-50",
      surface: "bg-white",
      text: {
        primary: "text-slate-900",
        secondary: "text-slate-600",
        accent: "text-blue-700",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-slate-600 to-blue-800",
        dhuhr: "bg-gradient-to-r from-cyan-400 to-blue-400",
        asr: "bg-gradient-to-r from-blue-400 to-teal-400",
        maghrib: "bg-gradient-to-r from-purple-500 to-blue-500",
        isha: "bg-gradient-to-r from-indigo-700 to-blue-800",
        current: "bg-gradient-to-r from-teal-400 to-cyan-400",
      },
    },
    styles: {
      borderRadius: "rounded-2xl",
      spacing: "p-6",
      shadows: "shadow-xl",
      animation: "transition-all duration-500 ease-in-out",
    },
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with vibrant colors",
    colors: {
      primary: "bg-blue-600",
      secondary: "bg-blue-100",
      accent: "bg-blue-500",
      background: "bg-gray-50",
      surface: "bg-white",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        accent: "text-blue-600",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-indigo-500 to-purple-600",
        dhuhr: "bg-gradient-to-r from-yellow-400 to-orange-500",
        asr: "bg-gradient-to-r from-orange-400 to-red-500",
        maghrib: "bg-gradient-to-r from-pink-500 to-rose-600",
        isha: "bg-gradient-to-r from-purple-600 to-indigo-700",
        current: "bg-gradient-to-r from-green-400 to-blue-500",
      },
    },
    styles: {
      borderRadius: "rounded-xl",
      spacing: "p-6",
      shadows: "shadow-lg",
      animation: "transition-all duration-300 ease-in-out",
    },
  },
  classic: {
    id: "classic",
    name: "Classic",
    description: "Traditional Islamic design with warm earth tones",
    colors: {
      primary: "bg-emerald-700",
      secondary: "bg-emerald-50",
      accent: "bg-emerald-600",
      background: "bg-stone-100",
      surface: "bg-white",
      text: {
        primary: "text-stone-900",
        secondary: "text-stone-600",
        accent: "text-emerald-700",
      },
      prayer: {
        fajr: "bg-slate-600",
        dhuhr: "bg-amber-600",
        asr: "bg-orange-600",
        maghrib: "bg-rose-600",
        isha: "bg-indigo-700",
        current: "bg-emerald-600",
      },
    },
    styles: {
      borderRadius: "rounded-lg",
      spacing: "p-5",
      shadows: "shadow-md",
      animation: "transition-colors duration-200",
    },
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Simple and clean design focused on content",
    colors: {
      primary: "bg-gray-900",
      secondary: "bg-gray-100",
      accent: "bg-gray-700",
      background: "bg-white",
      surface: "bg-gray-50",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-500",
        accent: "text-gray-700",
      },
      prayer: {
        fajr: "bg-gray-700",
        dhuhr: "bg-gray-600",
        asr: "bg-gray-500",
        maghrib: "bg-gray-600",
        isha: "bg-gray-700",
        current: "bg-gray-900",
      },
    },
    styles: {
      borderRadius: "rounded-md",
      spacing: "p-4",
      shadows: "shadow-sm",
      animation: "transition-opacity duration-150",
    },
  },
  gradient: {
    id: "gradient",
    name: "Gradient",
    description: "Vibrant gradients with dynamic color transitions",
    colors: {
      primary: "bg-gradient-to-r from-purple-600 to-blue-600",
      secondary: "bg-gradient-to-r from-purple-50 to-blue-50",
      accent: "bg-gradient-to-r from-purple-500 to-blue-500",
      background: "bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50",
      surface: "bg-white/80 backdrop-blur-sm",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        accent:
          "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
      },
      prayer: {
        fajr: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",
        dhuhr: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
        asr: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
        maghrib: "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500",
        isha: "bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700",
        current: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
      },
    },
    styles: {
      borderRadius: "rounded-2xl",
      spacing: "p-8",
      shadows: "shadow-2xl",
      animation: "transition-all duration-500 ease-out",
    },
  },
};
