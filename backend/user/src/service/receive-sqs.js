import amqp from "amqplib"; 
 
const rabbitReceiveMessage = async (queue) => {  
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        let getData = []
        process.once("SIGINT", async () => {
            await channel.close();
            await connection.close();
        })
        await channel.assertQueue(queue, { durable: false })
        await channel.consume(queue, (message) => {
            if(message){
                console.log(message.content.toString())
                getData.push(JSON.parse(message.content.toString()))
            }
            },{ noAck: true }) 
        return getData    
    }catch(err){
        console.warn(err);
    } 
}
export default rabbitReceiveMessage