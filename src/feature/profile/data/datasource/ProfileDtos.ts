export interface UserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  role: string;
  type: string;
}

export interface CraftsmanInfo {
  craftType: string;
  storeAddress: string;
  proof: File | null;
}
