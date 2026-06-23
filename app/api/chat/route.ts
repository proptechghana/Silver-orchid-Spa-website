import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();
    
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      // Provide a fallback if not configured yet
      return NextResponse.json({ 
        reply: "It looks like the n8n webhook URL hasn't been configured yet. Please set N8N_WEBHOOK_URL in your environment variables." 
      });
    }

    if (webhookUrl === 'https://your-n8n-instance.com/webhook/chat') {
      return NextResponse.json({ 
        reply: "Please replace the placeholder N8N_WEBHOOK_URL in your environment variables with your actual n8n webhook URL." 
      });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatInput: message,
        sessionId: sessionId || "session-1234",
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ 
          reply: "The n8n webhook URL returned a 404 Not Found error. Please ensure your n8n workflow is active, listening for test or production webhooks, and that the URL is correct." 
        });
      }
      if (response.status === 500) {
        return NextResponse.json({ 
          reply: "The n8n workflow encountered an internal error (500). Please check your n8n workflow execution logs to see which node failed or if the response node is misconfigured." 
        });
      }
      throw new Error(`Failed to communicate with n8n endpoint: ${response.status} ${response.statusText}`);
    }

    const textResponse = await response.text();
    
    if (!textResponse) {
      return NextResponse.json({ reply: "Received an empty response from the n8n workflow." });
    }

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      // If it's not valid JSON, assume n8n returned plain text directly
      return NextResponse.json({ reply: textResponse });
    }
    
    // Attempt to extract the response out of the n8n JSON output.
    // If you return a direct string from n8n webhooks, it might just be the string payload
    // If you return an object like { output: 'Hello!' }, extract that.
    let reply = '';
    if (typeof data === 'string') {
      reply = data;
    } else if (data.output) {
      reply = data.output;
    } else if (data.text) {
      reply = data.text;
    } else {
      // Fallback
      reply = JSON.stringify(data);
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({ reply: 'Sorry, I am having trouble connecting right now.' }, { status: 500 });
  }
}
