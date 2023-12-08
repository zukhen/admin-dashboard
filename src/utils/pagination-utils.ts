export const calculateTotalPages = (totalItems:number, itemsPerPage:number=10) => {
    return Math.ceil(totalItems / itemsPerPage);
  };