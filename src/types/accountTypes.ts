import { BaseResponse } from './responseTypes';

export interface Account {
  id: number;
  name: string;
  email: string;
  uid: string;
  image: string;
  defaultProfileId: number;
}

export interface CombinedAccount {
  id: number;
  name: string;
  email: string | null;
  uid: string;
  image: string | null;
  defaultProfileId: number | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  disabled: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
    lastRefreshTime: string | null;
  };
  databaseCreatedAt: Date;
}

export interface AccountResponse extends BaseResponse {
  result: Account;
}

export interface CreateAccountRequest {
  name: string;
  email: string;
  uid: string;
  image?: string;
}

export interface UpdateAccountRequest {
  id: number;
  name?: string;
  image?: string;
  defaultProfileId?: number;
}
