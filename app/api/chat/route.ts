import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Add system message to guide the AI's responses
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI travel assistant specializing in Dubai hotel bookings. 
      Help users find and book hotels by asking about:
      - Their preferred dates
      - Budget per night
      - Desired location in Dubai
      - Number of guests
      - Special requirements
      
      Be concise and friendly. Guide the conversation to collect necessary booking information.`,
    }

    // Use streamText from AI SDK
    const result = streamText({
      model: openai("gpt-4"),
      messages: [systemMessage, ...messages],
    })

    // Return the stream response with error handling
    return result.toDataStreamResponse({
      // Add error handling for the stream response
      getErrorMessage: (error) => {
        console.error("Streaming Error:", error)
        return error instanceof Error ? error.message : "An error occurred"
      }
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return Response.json(
      { error: "An error occurred during chat processing" },
      { status: 500 }
    )
  }
}
