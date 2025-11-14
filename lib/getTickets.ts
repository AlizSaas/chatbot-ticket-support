// Mock ticket data - Replace with your actual database queries
export interface Ticket {
  id: string
  companyId: string
  userId?: string
  subject: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: Date
  updatedAt: Date
}

export async function getTickets(companyId: string): Promise<Ticket[]> {
  // TODO: Replace with actual database query
  // Example: const tickets = await db.query('SELECT * FROM tickets WHERE company_id = $1 ORDER BY created_at DESC', [companyId])
  
  // Mock data for demonstration
  const allTickets: Ticket[] = [
    {
      id: 'ticket-1',
      companyId: 'company-1',
      userId: 'user-1',
      subject: 'Login issue',
      description: 'Cannot log in to dashboard',
      status: 'open',
      priority: 'high',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10')
    },
    {
      id: 'ticket-2',
      companyId: 'company-1',
      userId: 'user-1',
      subject: 'Feature request',
      description: 'Need export functionality',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2024-03-08'),
      updatedAt: new Date('2024-03-09')
    },
    {
      id: 'ticket-3',
      companyId: 'company-2',
      userId: 'user-2',
      subject: 'Billing question',
      description: 'Inquiry about invoice',
      status: 'resolved',
      priority: 'low',
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-07')
    }
  ]

  return allTickets.filter(ticket => ticket.companyId === companyId)
}

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  // TODO: Replace with actual database query
  // Example: const ticket = await db.query('SELECT * FROM tickets WHERE id = $1', [ticketId])
  
  // Mock data - in production this would query your database
  const allTickets = [
    {
      id: 'ticket-1',
      companyId: 'company-1',
      userId: 'user-1',
      subject: 'Login issue',
      description: 'Cannot log in to dashboard',
      status: 'open' as const,
      priority: 'high' as const,
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10')
    }
  ]

  return allTickets.find(t => t.id === ticketId) || null
}

export async function createTicket(data: {
  companyId: string
  userId?: string
  subject: string
  description: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}): Promise<Ticket> {
  // TODO: Replace with actual database insert
  // Example: const ticket = await db.query('INSERT INTO tickets (company_id, user_id, subject, description, priority, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [...])
  
  const newTicket: Ticket = {
    id: `ticket-${Date.now()}`,
    companyId: data.companyId,
    userId: data.userId,
    subject: data.subject,
    description: data.description,
    status: 'open',
    priority: data.priority || 'medium',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  console.log('[v0] Created ticket:', newTicket)
  
  return newTicket
}
