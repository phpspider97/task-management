import CircuitBreaker from 'opossum'

function asyncFunctionThatCouldFail(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then((response)=>{
            return response.json()
        }).then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err.message)
        })
    })
}
  
const options = {
  timeout: 2000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 10, // When 50% of requests fail, trip the circuit
  resetTimeout: 5000 // After 30 seconds, try again.
};
const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);
 
breaker.fire('https://fakestoreapi.com/products').then((response)=>{
    console.log('0_',response)
}).catch((err)=>{
    console.log(err.message)
})

breaker.fallback(() => 'unavailable right now. Try later.')
breaker.on('success', (result) => console.log('1_',result))
breaker.on('timeout', (result) => console.log('2_',result))
breaker.on('reject', (result) => console.log('3_',result.message))
breaker.on('open', (result) => console.log('4_',result))
breaker.on('halfOpen', (result) => console.log('5_',result))
breaker.on('close', (result) => console.log('6_',result))
breaker.on('fallback', (result) => console.log('7_',result))