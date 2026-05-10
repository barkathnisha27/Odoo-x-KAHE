import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 Traveloop Backend is running!
📡 URL: http://localhost:${PORT}
📁 Environment: ${process.env.NODE_ENV || 'development'}
  `);
});
