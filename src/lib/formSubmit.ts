import { supabase } from '@/lib/supabase';

interface SheetsPayload {
  type: 'Contact' | 'Prayer Request' | 'Testimony';
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}

async function sendToSheets(payload: SheetsPayload) {
  const webhookUrl = import.meta.env.VITE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Sheets logging is best-effort — don't block the user if it fails
  }
}

export async function submitContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  const { error } = await supabase.from('contact_messages').insert([data]);
  if (error) throw error;

  await sendToSheets({
    type: 'Contact',
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });
}

export async function submitPrayerRequest(data: { name: string; email: string; phone: string; request: string }) {
  const { error } = await supabase.from('prayer_requests').insert([{
    name: data.name,
    email: data.email || null,
    phone: data.phone || null,
    request: data.request,
    is_private: false,
  }]);
  if (error) throw error;

  await sendToSheets({
    type: 'Prayer Request',
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.request,
  });
}

export async function submitTestimony(data: { name: string; title: string; body: string }) {
  const { error } = await supabase.from('testimonies').insert([{
    name: data.name,
    title: data.title,
    body: data.body,
    approved: false,
  }]);
  if (error) throw error;

  await sendToSheets({
    type: 'Testimony',
    name: data.name,
    subject: data.title,
    message: data.body,
  });
}
