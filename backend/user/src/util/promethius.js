import client from 'prom-client'
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({ register: client.register })
//https://gist.github.com/piyushgarg-dev/7c4016b12301552b628bbac21a11e6ab