const pgc = require("@textile/powergate-client")
const { createPow } = pgc;

const fs = require('fs');

// $ while sleep 100; do   node main.js; done
const host = "http://0.0.0.0:6002" // or whatever powergate instance you want

const pow = createPow({ host })
main()

async function main() {
    const filesyncpath = 'peersync4.json'
    const { peersList } = await pow.net.peers()
    
    console.log(peersList)

    let jsondata = fs.existsSync(filesyncpath) ? JSON.parse(fs.readFileSync(filesyncpath)) : [];
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
