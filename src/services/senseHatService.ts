const senseHatUrl = import.meta.env.VITE_SENSE_HAT_URL?.trim().replace(/\/$/, '') || 'http://localhost:5000'

/**
 * Sends the current commit count to the Sense HAT backend on the Raspberry Pi.
 * @param count The total number of commits to display
 */
export async function sendCommitCountToPi(count: number): Promise<boolean> {
  try {
    const response = await fetch(`${senseHatUrl}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: count.toString() }),
    })
    
    if (!response.ok) {
      console.warn(`Sense HAT backend responded with status: ${response.status}`)
    }
    
    return response.ok
  } catch (error) {
    console.error('Failed to communicate with Sense HAT:', error)
    return false
  }
}
