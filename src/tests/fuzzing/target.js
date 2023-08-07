const { FuzzedDataProvider } = require('@jazzer.js/core');
const axios = require('axios');
const fs = require('fs');

const appUrl = 'http://localhost:3030';
const extensions = ['png', 'jpg', 'pdf'];
const notableEventsFiles = './fuzzerlog-bruteFile-'+crypto.randomUUID()+'.txt';
const notableEventsURL =  './fuzzerlog-brutePath-'+crypto.randomUUID()+'.txt';

let invocationCount = 0;

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

async function brute_url(data){
  const provider = new FuzzedDataProvider(data);
  const fuzzedData = provider. consumeRemainingAsString("utf-8");

  try {
    await axios.get('${appUrl}/${fuzzedData}', {
      responseType: 'json',
    });
  } catch (error) {
    const { response } = error;
    var stream = fs.createWriteStream(notableEventsURL, {flags: 'a'});

    var msg = ''
    // Log notable events
    if (response?.status > 500) {
      msg = new Date() + ' FOUND SOMETHING | Input: '+ fuzzedData + ' | Axios Response: ' + JSON.stringify(response.data, getCircularReplacer()) + '\n';
    }
    stream.write(msg);
    stream.end();

  }
}

async function brute_files(data){
    const provider = new FuzzedDataProvider(data);
    const fuzzedData = provider.consumeString(25, "utf-8");

    for (ext in extensions) {
        try {
            await axios.get(`${appUrl}/static/${fuzzedData}.${ext}`, {
              responseType: 'json',
            });
          } catch (error) {
            const { response } = error;
            var stream = fs.createWriteStream(notableEventsFiles, {flags: 'a'});

            var msg = '';
            //Log notable events
            if (response?.status < 400) {
              msg = new Date() + ' FOUND SOMETHING |Input: '+ fuzzedData + ' | Axios Response: ' + JSON.stringify(response.data, getCircularReplacer()) + '\n';
            } 
            stream.write(msg);
            stream.end();
          }
    }
    invocationCount++;
}

console.log("Logging static files : Notable events on ", notableEventsFiles);
console.log("Logging URL paths : Notable events on ", notableEventsURL);

module.exports.fuzz = function (data) {
    brute_files(data);
    brute_url(data)
}