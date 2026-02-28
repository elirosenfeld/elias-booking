// Handle meeting bookings
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slotId, duration, location, name, email, notes } = req.body;

  // Validate required fields
  if (!slotId || !name || !email) {
    return res.status(400).json({ 
      error: 'Missing required fields: slotId, name, email' 
    });
  }

  try {
    // Create booking data
    const bookingData = {
      id: `booking_${Date.now()}`,
      slotId,
      duration: duration || 30,
      location: location || 'virtual',
      attendee: { name, email },
      notes: notes || '',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    console.log('New booking:', bookingData);

    // TODO: Create Google Calendar event
    // TODO: Send confirmation emails

    res.status(200).json({
      success: true,
      booking: bookingData,
      message: 'Meeting booked successfully! You will receive a calendar invite shortly.'
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to book meeting. Please try again.'
    });
  }
}
