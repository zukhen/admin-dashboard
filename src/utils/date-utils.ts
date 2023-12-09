export const convertToVietnamTime = (utcDateString:any) => {
    const utcTime = new Date(utcDateString);
    const vietnamTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);
  
    return vietnamTime
      .toISOString()
      .replace("T", " | ")
      .replace(/\.\d{3}Z/, "");
  };