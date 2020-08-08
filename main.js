const pgc = require("@textile/powergate-client")
const { createPow } = pgc;
const fs = require('fs');

// Example cmd to run this and collect data on a loop:
//
// $ while sleep 100; do   node main.js; done

// This is done to protect the url of the hosted powergate instance
const dummy_host = "http://0.0.0.0:6002" // or whatever powergate instance you want
const secret_host_settings = "./pow_host.json" // {host: <url>}
const host = fs.existsSync(secret_host_settings) ? JSON.parse(fs.readFileSync(secret_host_settings)).host : dummy_host;

const pow = createPow({ host })
main()

async function main() {
    const filesyncpath = 'peersync3.json'
    const { peersList } = await pow.net.peers()
    
    console.log(peersList)

    let jsondata = fs.existsSync(filesyncpath) ? JSON.parse(fs.readFileSync(filesyncpath)) : {};
    jsondata = dedupe(jsondata.concat(peersList))

    fs.writeFileSync(filesyncpath, JSON.stringify(jsondata), 'utf8');
}

function dedupe(arr) {
    let set = {};
    let res = [];
    arr.forEach((ele) => {
        let id = ele.addrInfo.id;
        if (!set[id]) {
            set[id] = true;
            res.push(ele)
        }
    });
    return res;
}
