import { WebSocketServer } from 'ws';
import { WS_PORT } from './config';

const wss = new WebSocketServer({ port: WS_PORT });
let ipList = []
let count = 0

// it will listen to devices broadcasting to the WS server
export const ipListConnectedViaWs = async () => {

    console.log('Listing all devices via WS')
      
    wss.on('connection', function connection(ws, req) {
            
        const ipFull = req.socket.remoteAddress;
        const ip = (ipFull.slice(ipFull.indexOf('.')-3))
        const found = ipList.findIndex(element => element === ip);

        console.log('Count',count)
        console.log('Array Start:',ipList)
        
        // make sure the list has only unique values
        if(found===-1){
            ipList.push(ip)
        }
        console.log('Array:',ipList)
        
        if (count < ipList.length) {
            console.log('Array Length:', ipList.length)
            count = ipList.length
        } else {
            console.log('Terminate connection')
            ws.terminate();
            console.log('Close connection')
            ws.close();
        }
    });
    
    wss.on('close', function close() {
        console.log('closing')
        return ipList
    });
        
}

