export interface ProfileInfo {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  role?: string;
  type?: string;
  createdAt?: string;
}

export interface CraftsmanInfo {
  userId?: string;
  craftType?: string;
  storeAddress?: string;
  proof?: File | string | null;
  status?: "pending" | "rejected" | "accepted" | null;
}
