const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Static files (HTML) ကို public folder ထဲမှ ပို့ပေးမည်
app.use(express.static('public'));

// Real-time Socket ချိတ်ဆက်မှု စနစ်
io.on('connection', (socket) => {
  console.log('User ချိတ်ဆက်လာပါပြီ');

  // စာ ရောက်ရှိလာပါက လူတိုင်းထံ ပို့ပေးမည်
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User ထွက်သွားပါပြီ');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`SXOPOP Server running on http://localhost:${PORT}`);
});
