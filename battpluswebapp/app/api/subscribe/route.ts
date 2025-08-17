// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;
    const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email: email,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });
    } else {
      const errorData = await response.json();
      // Use a more generic error message on the client for security
      console.error('ConvertKit API Error:', errorData);
      return NextResponse.json({ message: 'There was an issue with your subscription.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Subscription Endpoint Error:', error);
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}