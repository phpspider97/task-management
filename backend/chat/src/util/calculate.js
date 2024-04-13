import { parentPort } from 'worker_threads'
 
const result = heavyCPUOperation()
parentPort.postMessage(result)

function heavyCPUOperation(){
    let sum = 0 
    for(let i=0; i<1000000; i++){
        sum +=i
    }
    return sum
}