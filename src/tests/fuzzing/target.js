const { FuzzedDataProvider } = require('@jazzer.js/core');
const axios = require('axios');
const assert = require('assert');
const fs = require('fs');

const appUrl = 'http://localhost:3030';
const extensions = ['png', 'jpg', 'pdf'];
const notableEventsPath = './fuzzerlog-'+crypto.randomUUID()+'.txt';

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
  } catch {

  }
}

async function brute_files(data){
    const provider = new FuzzedDataProvider(data);
    const fuzzedData = provider.consumeString(25, "utf-8");
    //var stream = fs.createWriteStream(notableEventsPath, {flags: 'a'});

    for (ext in extensions) {
        try {
            await axios.get(`${appUrl}/static/${fuzzedData}.${ext}`, {
              responseType: 'json',
            });
          } catch (error) {
            const { response } = error;

            var stream = fs.createWriteStream(notableEventsPath, {flags: 'a'});
              //stream.write('Input: '+ fuzzedData + ' | Axios Response: ' + JSON.stringify(response, getCircularReplacer()) + '\n');
              //stream.end();

            //Log notable events
            if (response?.status < 400) {
              //var stream = fs.createWriteStream(notableEventsPath, {flags: 'a'});
              stream.write('Input: '+ fuzzedData + ' | Axios Response: ' + JSON.stringify(response, getCircularReplacer()) + '\n');
              //stream.end();
            }
            stream.end();

            // if (response === undefined) {
            //     continue; // For purpose of running indefinitely
            // } else {
            //     //assert.ok([400, 404].includes(response.status));
            //     // if not expected values, 
            //     //if([400, 404].includes(response.status)) {
          }
    }
    invocationCount++;
}

console.log("Logging on ", notableEventsPath);

module.exports.fuzz = function (data) {
    brute_files(data);
}

// function random(data){
//     //const fuzzerData = data.toString(); -> return fuzzerData instead
//     return data;
//     //const provider = new FuzzedDataProvider(data);
//     //return provider.consumeString(25);
// }

//     } 