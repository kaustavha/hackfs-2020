const axios = require('axios');
const fs = require('fs');

const pinata_api_key = "8aef24ddf09c0c08b8d7"
const pinata_secret_api_key = "47f6434462c32cb9416f3e7202446955566540417c60b1c895e5bad357201f11"
const settings_path = "./pow_host.json" // {host: <url>}
const settings = fs.existsSync(settings_path) ? JSON.parse(fs.readFileSync(settings_path)) : dummy_host;
let jsondata = fs.existsSync(settings.data_path) ? JSON.parse(fs.readFileSync(settings.data_path)) : {};


const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(
            url,
            JSONBody,
            {
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            }
        ).then(function (response) {
            console.log(response)
            //handle response here
        })
        .catch(function (error) {
            console.log(error)
            //handle error here
        });
};

pinJSONToIPFS(pinata_api_key, pinata_secret_api_key, jsondata)
