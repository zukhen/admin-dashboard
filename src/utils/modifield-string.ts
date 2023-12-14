

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
// // international symbol is "VND".
// export const convertVNDCurrencyformatting = (str:any):string=>{
//  return str = str.toLocaleString('it-IT', {style : 'currency', currency : '₫'});

// }
//The national symbol is "d", the

export const convertVNDCurrencyformatting = (str: any): string => {
  return str.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('VND', '₫');
}
