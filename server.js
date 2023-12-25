// server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Replace 'http://your-ec2-instance-ip:8080' with the actual URL of your Spring Boot backend
app.use(createProxyMiddleware({ target: 'http://ec2-13-234-115-90.ap-south-1.compute.amazonaws.com:8080/api/v1', changeOrigin: true }));

// Serve your Next.js app as usual
app.use(express.static('out'));
app.get('*', (req, res) => res.sendFile('out/index.html', { root: __dirname }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
