export interface CreateAppInterface {
  name: string;
  description?: string;
}
export interface UpdateAppInterface {
  name: string;
  description?: string;
  whitelistDomains?: {
    domain: string;
  }[];
}

export interface WhitelistDomainsInterface {
  domain: string;
}

export interface ApiKeyInterface {
  id: string;
  key: string;
  accessLevel: string;
  type: string;
  description: string;
}
export interface AppDetailInterface {
  id: string;
  isActve: boolean;
  name: string;
  description: string;
  apiKey: ApiKeyInterface;
  createdAt: string;
  updatedAt: string;
  whitelistDomains: WhitelistDomainsInterface[];
}
