import amqp from "amqplib"
 
const rabbitSqs = async (queue,data) =>{    
    let connection;
    try {
        connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
 
        await channel.assertQueue(queue, { durable: false })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data))) 
        await channel.close()
    }catch (err) {
        console.warn(err)
    } finally {
        if (connection) await connection.close()
    } 
}
export default rabbitSqs
//brew services start rabbitmq