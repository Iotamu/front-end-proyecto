export const isValidDate = (dateStr: string): boolean => {
  
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) return false;
  
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  };
  
  export const isValidTime = (timeStr: string): boolean => {

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(timeStr);
  };