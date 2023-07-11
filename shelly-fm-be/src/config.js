export const BROKER_IP = '192.168.0.139:1883'       // MQTT server IP
export const NMAP_IP_RANGE = "192.168.0-5.0-255"    // Home


// export const MONGO = "mongodb://127.0.0.1:27017/shelly-dcc";   // running without docker
// export const NMAP_IP_RANGE = "192.168.0-15.0-255"    // Office

// export const NMAP_IP_RANGE = "192.168.0-255.0-255"   // The correct range can be found by getting the gateway 

// MQTT server
// export const BROKER_IP = '192.168.15.226:2022'     // laptop
// export const BROKER_IP = '192.168.0.147:1883'     // server



// define where the server running nodejs is
export const BE_IP = 'localhost'    // frontend
export const PORT = 5050;           // backend
export const WS_PORT = 7011;        // Web Socket Port
export const NMAP_OPTIONS = '-n -sn -T5 --max-rtt-timeout 1s --min-parallelism 100'
export const MONGO = "mongodb://mongo_local:27017"; // running with docker container 