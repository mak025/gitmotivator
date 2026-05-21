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

/**
 * Triggers a celebration on the Sense HAT.
 * @param message The message to display during celebration
 */
export async function triggerCelebrationOnPi(message: string = 'MILESTONE!'): Promise<boolean> {
  try {
    const response = await fetch(`${senseHatUrl}/celebration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    
    if (!response.ok) {
      console.warn(`Sense HAT backend responded with status: ${response.status}`)
    }
    
    return response.ok
  } catch (error) {
    console.error('Failed to trigger celebration on Sense HAT:', error)
    return false
  }
}

/**
 * Clears the Sense HAT display.
 */
export async function clearPiDisplay(): Promise<boolean> {
  try {
    const response = await fetch(`${senseHatUrl}/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.warn(`Sense HAT backend responded with status: ${response.status}`)
    }
    
    return response.ok
  } catch (error) {
    console.error('Failed to clear Sense HAT display:', error)
    return false
  }
}
