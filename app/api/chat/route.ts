import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { getCompany, validateCompanyId } from '@/lib/getCompany'
import { getUsersByCompany } from '@/lib/getUsers'
import { getTickets } from '@/lib/getTickets'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, companyId } = body

    // Validate required fields
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!companyId || typeof companyId !== 'string') {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      )
    }

    // Validate company exists
    const isValidCompany = await validateCompanyId(companyId)
    if (!isValidCompany) {
      return NextResponse.json(
        { error: 'Invalid company ID' },
        { status: 403 }
      )
    }

    // Fetch contextual data
    const [company, users, tickets] = await Promise.all([
      getCompany(companyId),
      getUsersByCompany(companyId),
      getTickets(companyId)
    ])

    // Build context for AI
    const context = {
      company: company ? {
        name: company.name,
        plan: company.plan,
        industry: company.industry,
        supportEmail: company.supportEmail
      } : null,
      userCount: users.length,
      openTickets: tickets.filter(t => t.status === 'open').length,
      recentTickets: tickets
        .slice(0, 5)
        .map(t => ({
          subject: t.subject,
          status: t.status,
          priority: t.priority
        }))
    }

    // System prompt for the AI
    const systemPrompt = `You are a helpful customer support AI assistant for ${company?.name || 'our company'}.

Company Information:
- Plan: ${company?.plan || 'N/A'}
- Industry: ${company?.industry || 'N/A'}
- Support Email: ${company?.supportEmail || 'support@company.com'}

Current Status:
- Number of users: ${context.userCount}
- Open tickets: ${context.openTickets}

Recent Tickets:
${context.recentTickets.map(t => `- ${t.subject} (${t.status}, ${t.priority} priority)`).join('\n')}

Your role:
1. Answer FAQ-style questions using the context provided
2. Be friendly, helpful, and professional
3. If a user needs help with an issue, suggest creating a support ticket
4. If a user explicitly asks to "create a ticket" or "open a ticket", acknowledge their request and let them know you'll help them create one
5. Provide accurate information based on the company's plan and context
6. Keep responses concise and helpful

Remember: You can see open tickets and company information. Use this context to provide relevant assistance.`

    // Call OpenAI using AI SDK
    const { text } = await generateText({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      maxRetries: 2 // Added maxRetries option
    })

    return NextResponse.json({ 
      response: text,
      context: {
        companyName: company?.name,
        openTickets: context.openTickets
      }
    })

  } catch (error) {
    console.error('[v0] Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
