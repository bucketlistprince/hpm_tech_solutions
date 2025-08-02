import { format } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  return format(new Date(dateString), 'MMM d, yyyy');
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'Not set';
  return format(new Date(dateString), 'MMM d, yyyy h:mm a');
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'Not specified';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatStatus = (status) => {
  if (!status) return '';
  return status.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');
};
