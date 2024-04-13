import { Client } from '@elastic/elasticsearch'
const client = new Client({
    node: 'https://d195fc79ad5a4d1bb5e98ad5adc3e9cd.us-central1.gcp.cloud.es.io:443',
    auth: {
        apiKey: 'dmFDMVFZNEIxY0F1VzVlbEgzV0g6LVhNeFdCZ0VTR09KV0s3WTQ4Z1hwZw=='
    }
})  
// const resp = await client.info()
// console.log(resp) 
const addElasticData = async (indexName,document) => { 
    try{
        const response = await client.index({
            index: indexName,
            body: document
        })
        return response
    }catch(error){
        console.error(error)
    }
}

export {
    addElasticData
}

// {
//     "id": "vaC1QY4B1cAuW5elH3WH",
//     "name": "test",
//     "expiration": 1715683372935,
//     "api_key": "-XMxWBgESGOJWK7Y48gXpg",
//     "encoded": "dmFDMVFZNEIxY0F1VzVlbEgzV0g6LVhNeFdCZ0VTR09KV0s3WTQ4Z1hwZw==",
//     "beats_logstash_format": "vaC1QY4B1cAuW5elH3WH:-XMxWBgESGOJWK7Y48gXpg"
//   }

//docker run -d --name task-container -v task:/data task