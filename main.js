const pgc = require("@textile/powergate-client")
const { createPow } = pgc;

const fs = require('fs');

const host = "http://0.0.0.0:6002" // or whatever powergate instance you want

const pow = createPow({ host })
main()

async function main() {
    const filesyncpath = 'peersync2.json'
    const { peersList } = await pow.net.peers()
    
    console.log(peersList)

    let jsondata = fs.existsSync(filesyncpath) ? JSON.parse(fs.readFileSync(filesyncpath)) : [];
    jsondata = jsondata.concat(peersList)

    fs.writeFileSync(filesyncpath, JSON.stringify(jsondata), 'utf8');
}
