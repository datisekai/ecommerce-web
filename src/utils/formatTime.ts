export const calculateCreatedTime = (timeCreated: string) => {
    const periods: any = {
      year: 365 * 30 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
    };
  
    const diff = Date.now() - +new Date(`${timeCreated}`).getTime();
  
    for (const key in periods) {
      if (diff >= periods[key]) {
        const result = Math.floor(diff / periods[key]);
        return `${result} ${result === 1 ? key : key + "s"} trước`;
      }
    }
  
    return "1 phút trước";
  };
  
  export const calculateCreatedTime2 = (timeCreated: string) => {
    const periods = {
      year: 365 * 30 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
    };
  
    const diff = Date.now() - +timeCreated;
  
    for (const key in periods) {    
      if (diff >= periods[key]) {
        const result = Math.floor(diff / periods[key]);
        return `${result} ${result === 1 ? key : key + "s"} trước`;
      }
    }
  
    return "Ngay bây giờ";
  };