interface LocalStorageModel {
  // Đặt giá trị vào localStorage
  setTokenA(key: string, value: string): void;
  setTokenR(key: string, value: string): void;
  setUUID(key: string, value: string): void;
  setUserData(key: string, value: string): void;
  // Lấy giá trị từ localStorage
  getTokenA(key?: string): string | null;
  getUUID(key: string, value: string): void;
  getTokenR(key?: string): string | null;
  getUserData(key?: string): string | null;

  // Xóa giá trị từ localStorage
  removeAll(): void;
}
