const pgc = require("@textile/powergate-client")
const { createPow } = pgc;

const fs = require('fs');

// const host = "http://0.0.0.0:6002" // or whatever powergate instance you want
const host = "http://pow.hackfs.textile.io:6002" // or whatever powergate instance you want

const pow = createPow({ host })
main()

async function main() {
    const filesyncpath = 'peersync3.json'
    const { peersList } = await pow.net.peers()
    
    console.log(peersList)

    let jsondata = fs.existsSync(filesyncpath) ? JSON.parse(fs.readFileSync(filesyncpath)) : [];
    jsondata = jsondata.concat(peersList)
    jsondata = dedupe(jsondata)

    fs.writeFileSync(filesyncpath, JSON.stringify(jsondata), 'utf8');
}

function dedupe(arr) {
    let set = {};
    let res = [];
    arr.forEach((ele, index) => {
        let id = ele.addrInfo.id;
        // console.log(ele)
        if (!set[id]) {
            set[id] = true;
            res.push(ele)
        }
    });
    return res;
}
