import { API } from '@/constants/api';

export const fetchStreamedText = async (params: {
  prompt: string;
  onChunk: (text: string) => void;
}) => {
  const response = await fetch(API.WS.AI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: params.prompt })
  });

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      const text = decoder.decode(value);
      params.onChunk(text);
    }
  }
};

// /api/ws/ai

// export const POST = async (request: NextRequest) => {
//   const body = (await request.json()) as { prompt: string };

//   const result = await tryCatch(
//     openaiClient.chat.completions.create({
//       model: AI_MODELS.CHATGPT['4.1-nano'].name,
//       messages: [{ role: 'user', content: body.prompt }],
//       stream: true
//     })
//   );

//   if (isFailure(result)) {
//     return NextResponse.json({
//       message: 'Помилка при генерації потоку',
//       status: 500
//     });
//   }

//   const encoder = new TextEncoder();

//   const stream = new ReadableStream<Uint8Array>({
//     async start(controller) {
//       try {
//         for await (const chunk of result.data) {
//           const content = chunk.choices[0]?.delta?.content || '';
//           if (content) {
//             controller.enqueue(encoder.encode(content));
//           }
//         }
//         controller.close();
//       } catch (streamError) {
//         controller.error(streamError);
//       }
//     }
//   });

//   return new NextResponse(stream, {
//     headers: {
//       'Content-Type': 'text/plain; charset=utf-8',
//       'Transfer-Encoding': 'chunked'
//     }
//   });
// };
