/**
 * Format a number as Nigerian Naira currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "₦1,234.56")
 */
export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format date to Nigerian format (DD/MM/YYYY)
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Get today's date in YYYY-MM-DD format for database queries
 * @returns Today's date string
 */
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get the first day of current month in YYYY-MM-DD format
 * @returns First day of month string
 */
export const getMonthStart = (): string => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split('T')[0];
};

/**
 * Calculate revenue from bags sold (₦400 per bag)
 * @param bagsSold - Number of bags sold
 * @returns Revenue amount
 */
export const calculateRevenue = (bagsSold: number): number => {
  return bagsSold * 400;
};
