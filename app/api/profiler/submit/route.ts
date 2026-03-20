import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    const { contact, project } = body
    if (!contact?.name || !contact?.email || !contact?.privacyAccepted) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Profiler] New submission:', JSON.stringify(body, null, 2))
    }

    // ── Email via Resend (optional — set RESEND_API_KEY in env) ──────────────
    if (process.env.RESEND_API_KEY) {
      const estimateText = body.estimate
        ? `€${body.estimate.min.toLocaleString('it-IT')} – €${body.estimate.max.toLocaleString('it-IT')}`
        : 'Non disponibile'

      // Email to client
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Advenire <noreply@advenire.it>',
          to: contact.email,
          subject: 'La tua stima preliminare — Advenire',
          html: buildClientEmail(contact.name, estimateText, project),
        }),
      })

      // Internal notification
      if (process.env.TEAM_EMAIL) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Advenire Profiler <noreply@advenire.it>',
            to: process.env.TEAM_EMAIL,
            subject: `[Lead] Nuovo preventivo — ${contact.name}`,
            html: buildTeamEmail(body),
          }),
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Profiler] Submit error:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}

function buildClientEmail(name: string, estimate: string, project: Record<string, unknown>): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="background:#05380d;color:#F5F0E8;font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto;">
      <h1 style="font-size:2rem;font-weight:300;letter-spacing:-0.02em;margin-bottom:1.5rem;">
        La tua stima preliminare
      </h1>
      <p style="font-size:14px;line-height:1.6;color:rgba(245,240,232,0.6);margin-bottom:2rem;">
        Caro ${name},<br><br>
        grazie per aver completato il modulo di profilazione. Di seguito trovi la tua stima preliminare basata sui dati forniti.
      </p>
      <div style="border:1px solid rgba(253,167,126,0.3);padding:1.5rem;margin-bottom:2rem;">
        <p style="font-size:9px;letter-spacing:0.2em;color:rgba(253,167,126,0.8);margin-bottom:1rem;">STIMA PRELIMINARE</p>
        <p style="font-size:2rem;font-weight:300;letter-spacing:-0.02em;margin-bottom:0.5rem;">${estimate}</p>
        <p style="font-size:11px;color:rgba(245,240,232,0.4);">totale stimato</p>
      </div>
      <p style="font-size:11px;line-height:1.6;color:rgba(245,240,232,0.35);">
        Il nostro team ti contatterà entro 24 ore per discutere nel dettaglio il tuo progetto.<br><br>
        <em>La stima è puramente indicativa e non costituisce offerta contrattuale.</em>
      </p>
    </body>
    </html>
  `
}

function buildTeamEmail(payload: Record<string, unknown>): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family:monospace;padding:20px;max-width:700px;">
      <h2>Nuovo lead — Profiler Edilizio</h2>
      <pre style="background:#f5f5f5;padding:16px;overflow:auto;">${JSON.stringify(payload, null, 2)}</pre>
    </body>
    </html>
  `
}
