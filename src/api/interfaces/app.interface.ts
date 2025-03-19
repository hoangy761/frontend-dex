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
