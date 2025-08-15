import { CalculationMethodType } from '../utils/prayer-utils';

export interface CalculationMethodInfo {
  key: CalculationMethodType;
  name: string;
  description: string;
  region: string;
}

/**
 * Available calculation methods for prayer times
 * Ordered by preference with MuslimWorldLeague as default and first
 */
export const CALCULATION_METHODS: CalculationMethodInfo[] = [
  // Default & Most Widely Used
  {
    key: 'MuslimWorldLeague',
    name: 'Muslim World League',
    description: 'Used in Europe, Far East, parts of US (Default & Recommended)',
    region: 'Europe & International'
  },
  
  // North America
  {
    key: 'MoonsightingCommittee',
    name: 'Moonsighting Committee',
    description: 'Used in North America',
    region: 'North America'
  },
  
  // Middle East & Saudi Arabia
  {
    key: 'UmmAlQura',
    name: 'Umm Al-Qura University, Makkah',
    description: 'Used in Saudi Arabia',
    region: 'Saudi Arabia'
  },
  
  // Africa & Middle East
  {
    key: 'Egyptian',
    name: 'Egyptian General Authority',
    description: 'Used in Africa, Syria, Iraq, Lebanon, Malaysia, Parts of US',
    region: 'Africa & Middle East'
  },
  
  // South Asia
  {
    key: 'Karachi',
    name: 'University of Islamic Sciences, Karachi',
    description: 'Used in Pakistan, Bangladesh, India, Afghanistan, Parts of Europe',
    region: 'South Asia'
  },
  
  // Southeast Asia
  {
    key: 'Singapore',
    name: 'Singapore',
    description: 'Used in Singapore, Malaysia, and Indonesia',
    region: 'Southeast Asia'
  },
  
  // Gulf Countries
  {
    key: 'Dubai',
    name: 'Dubai (unofficial)',
    description: 'Used in UAE',
    region: 'UAE'
  },
  {
    key: 'Qatar',
    name: 'Qatar',
    description: 'Modified version of Umm Al-Qura used in Qatar',
    region: 'Qatar'
  },
  {
    key: 'Kuwait',
    name: 'Kuwait',
    description: 'Method used in Kuwait',
    region: 'Kuwait'
  },
  
  // Turkey
  {
    key: 'Turkey',
    name: 'Turkey',
    description: 'Used in Turkey',
    region: 'Turkey'
  }
];

/**
 * Get calculation method info by key
 */
export const getCalculationMethodInfo = (key: CalculationMethodType): CalculationMethodInfo | undefined => {
  return CALCULATION_METHODS.find(method => method.key === key);
};

/**
 * Get calculation methods grouped by region
 */
export const getCalculationMethodsByRegion = (): Record<string, CalculationMethodInfo[]> => {
  return CALCULATION_METHODS.reduce((acc, method) => {
    if (!acc[method.region]) {
      acc[method.region] = [];
    }
    acc[method.region].push(method);
    return acc;
  }, {} as Record<string, CalculationMethodInfo[]>);
};

/**
 * Default calculation method - MuslimWorldLeague (most widely used)
 */
export const DEFAULT_CALCULATION_METHOD: CalculationMethodType = 'MuslimWorldLeague';
