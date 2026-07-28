export interface Tenant {
  id: string;
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  status: string;
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTenantRequest {

  business_name: string;

  contact_person: string;

  email: string;

  phone: string;

  subscription_status: string;

}

export interface TenantResponse {
  success: boolean;
  message: string;
  tenant?: Tenant;
}