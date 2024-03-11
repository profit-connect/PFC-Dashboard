export const useTimeSince = () => {
  const calculateTimeSince = (dateStr, timeStr = '00:00:00') => {
    const date = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now'; // Check if less than 60 seconds

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return `${minutes} minutes ago`;
  };

  return { calculateTimeSince };
};

  