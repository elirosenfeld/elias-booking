// Check calendar availability
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { duration = 30 } = req.query;
  
  // Mock availability slots - will connect to your Google Calendar later
  const mockSlots = [
    {
      id: 'slot_1',
      display: 'Monday, March 3rd at 10:00 AM',
      start: '2024-03-03T10:00:00-08:00',
      duration: parseInt(duration)
    },
    {
      id: 'slot_2',
      display: 'Monday, March 3rd at 2:30 PM', 
      start: '2024-03-03T14:30:00-08:00',
      duration: parseInt(duration)
    },
    {
      id: 'slot_3',
      display: 'Tuesday, March 4th at 9:15 AM',
      start: '2024-03-04T09:15:00-08:00',
      duration: parseInt(duration)
    },
    {
      id: 'slot_4',
      display: 'Wednesday, March 5th at 11:00 AM',
      start: '2024-03-05T11:00:00-08:00',
      duration: parseInt(duration)
    }
  ];

  res.status(200).json({
    success: true,
    slots: mockSlots,
    message: `Found ${mockSlots.length} available ${duration}-minute slots`
  });
}
