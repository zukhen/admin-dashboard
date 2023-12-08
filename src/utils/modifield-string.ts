export const modifiedString = (item: any): string => {

  return convertToVietnamTime(item.createdAt);
};

export const splitTotalString = (str: string): string[] => str.split("T");

export const getFirstName = (item: any): String =>
  item.name.toString().split(" ")[0];
export const getLastName = (item: any): String =>
  item.name.toString().split(" ").slice(1).join(" ");
export const truncateName = (name: String) => {
  if (name.length > 20) {
    return name.substring(0, 20 - 3) + "...";
  }
  return name;
};

export const modifyFirstCharacterString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertToVietnamTime = (timestamp:any) => {
  const utcTime = new Date(timestamp);
  const vietnamTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);
  return vietnamTime
    .toISOString()
    .replace("T", " | ")
    .replace(/\.\d{3}Z/, "");
};