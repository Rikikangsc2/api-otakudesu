const axios = require("axios");

// API Keys
const zenRowsApiKey = '26c7d85d7f3af6a1288d96a38705b1419688e27e';
const zyteApiKey = '61671b406b4743278980bb891919da21';

// ZenRows fetch function
async function fetchWithZenRows(url) {
    try {
        const zenRowsUrl = `https://api.zenrows.com/v1/?apikey=${zenRowsApiKey}&url=${encodeURIComponent(url)}&js_render=true&premium_proxy=true`;
        const response = await axios.get(zenRowsUrl);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('ZenRows Error:', error.response?.data || error.message);
        throw new Error('ZenRows request failed');
    }
}

// Zyte fallback function
async function fetchWithZyte(url) {
    try {
        const zyteUrl = `https://api.zyte.com/v1/extract`;
        const response = await axios.post(zyteUrl,
        {
        url: url,
        "httpResponseBody": true 
            },
            {
              auth: { username: '61671b406b4743278980bb891919da21' }
            });/*
        "https://api.zyte.com/v1/extract",
  {
    "url": "https://books.toscrape.com/",  
    "httpResponseBody": true 
  },
  {
    auth: { username: '61671b406b4743278980bb891919da21' }
  }*/
  console.log(response.data.httpResponseBody)
        return {
          data: response.data.httpResponseBody
        };
    } catch (error) {
        console.error('Zyte Error:', error.response?.data || error.message);
        throw new Error('Zyte request failed');
    }
}

// Main fetch function
const Service = {
fetchService: async(url, res) => {
    try {
        const zenRowsData = await fetchWithZenRows(url);
        return {
            status: 200,
            service: 'ZenRows',
            data: zenRowsData,
        };
    } catch (error) {
        console.log('Falling back to Zyte...');
     /*   try {
            // If ZenRows fails, try Zyte
         //   const zyteData = await fetchWithZyte(url);
            return zyteData
        } catch (zyteError) {
            res.json({
                status: false,
                message: 'Both ZenRows and Zyte requests failed',
                data: zyteError
            });
        }*/
    }
}
}
module.exports = Service

