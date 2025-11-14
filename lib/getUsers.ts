// Mock user data - Replace with your actual database queries
export interface User {
  id: string
  name: string
  email: string
  companyId: string
  createdAt: Date
}

export async function getUser(userId: string): Promise<User | null> {
  // TODO: Replace with actual database query
  // Example: const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
  
  // Mock data for demonstration
  const mockUsers: Record<string, User> = {
    'user-1': {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      companyId: 'company-1',
      createdAt: new Date('2024-01-15')
    },
    'user-2': {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      companyId: 'company-2',
      createdAt: new Date('2024-02-20')
    }
  }

  return mockUsers[userId] || null
}

export async function getUsersByCompany(companyId: string): Promise<User[]> {
  // TODO: Replace with actual database query
  // Example: const users = await db.query('SELECT * FROM users WHERE company_id = $1', [companyId])
  
  // Mock data for demonstration
  const allUsers: User[] = [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      companyId: 'company-1',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      companyId: 'company-2',
      createdAt: new Date('2024-02-20')
    }
  ]

  return allUsers.filter(user => user.companyId === companyId)
}
