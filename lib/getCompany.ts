// Mock company data - Replace with your actual database queries
export interface Company {
  id: string
  name: string
  plan: 'free' | 'pro' | 'enterprise'
  industry?: string
  supportEmail?: string
  createdAt: Date
}

export async function getCompany(companyId: string): Promise<Company | null> {
  // TODO: Replace with actual database query
  // Example: const company = await db.query('SELECT * FROM companies WHERE id = $1', [companyId])
  
  // Mock data for demonstration
  const mockCompanies: Record<string, Company> = {
    'company-1': {
      id: 'company-1',
      name: 'Acme Corp',
      plan: 'pro',
      industry: 'Technology',
      supportEmail: 'support@acme.com',
      createdAt: new Date('2024-01-01')
    },
    'company-2': {
      id: 'company-2',
      name: 'Widget Inc',
      plan: 'enterprise',
      industry: 'Manufacturing',
      supportEmail: 'help@widget.com',
      createdAt: new Date('2024-01-10')
    }
  }

  return mockCompanies[companyId] || null
}

export async function validateCompanyId(companyId: string): Promise<boolean> {
  const company = await getCompany(companyId)
  return company !== null
}
