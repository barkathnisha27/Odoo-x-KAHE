export const dashboardLiveMetrics = [
  { label: 'Active trips', value: '8', detail: 'Including pending drafts' },
  { label: 'Estimated savings', value: '$4,280', detail: 'Compared to last month' },
  { label: 'Upcoming alerts', value: '3', detail: 'Review budget and check-ins' },
  { label: 'Sync status', value: 'Live', detail: 'Connected to trip engine' },
];

export const dashboardUsageSeries = [
  { day: 'Mon', sessions: 120, actions: 88 },
  { day: 'Tue', sessions: 145, actions: 105 },
  { day: 'Wed', sessions: 129, actions: 93 },
  { day: 'Thu', sessions: 173, actions: 130 },
  { day: 'Fri', sessions: 190, actions: 145 },
  { day: 'Sat', sessions: 155, actions: 112 },
  { day: 'Sun', sessions: 133, actions: 97 },
];

export const dashboardSystemHealth = [
  { label: 'CPU', value: '68%', status: 'Healthy', color: '#10B981' },
  { label: 'Memory', value: '72%', status: 'Stable', color: '#00D4FF' },
  { label: 'Storage', value: '54%', status: 'Good', color: '#8B5CF6' },
  { label: 'API latency', value: '120ms', status: 'Nominal', color: '#F59E0B' },
];

export const dashboardAlerts = [
  { title: 'Budget limit reached for Bali trip', description: 'Review your transport and dining allocations before the next booking deadline.', severity: 'warning' },
  { title: 'High travel demand in November', description: 'Seasonal peaks are expected — lock in accommodations early.', severity: 'info' },
  { title: 'Flight price alert: Tokyo', description: 'Price dropped 8% for your saved Tokyo fare search.', severity: 'success' },
];

export const dashboardLogs = [
  { time: '2m ago', event: 'Trip “European Dream Tour” was duplicated', severity: 'info' },
  { time: '9m ago', event: 'New city added to trip “Japan Cultural Immersion”', severity: 'success' },
  { time: '22m ago', event: 'Budget alert triggered for “Southeast Asia Adventure”', severity: 'warning' },
  { time: '1h ago', event: 'Shared itinerary link generated for “Greek Island Getaway”', severity: 'info' },
  { time: '3h ago', event: 'New activity suggestion added for “Middle East & India Explorer”', severity: 'success' },
];
