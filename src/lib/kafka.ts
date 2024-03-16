import { Kafka } from 'kafkajs';
import { redis } from './redis';

const getKafkaUser = ()=>{
  if(process.env.KAFKA_USER){
    return process.env.KAFKA_USER;
  }
  
  throw new Error("KAFKA URL not detected");
}

const getKafkaPass = ()=>{
  if(process.env.KAFKA_PASS){
    return process.env.KAFKA_PASS;
  }
  
  throw new Error("KAFKA PASS not detected");
}

export const kafka = new Kafka({
  brokers: ['national-orca-5285-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: getKafkaUser(),
      password: getKafkaPass()
  }
});

export const sendMessageToQueue = async (message:any)=>{
  const producer = kafka.producer();
  await producer.connect();
  console.log("kafka producer connected")

  await producer.send({
    topic: "redisBlogTopic",
    messages :[
      {
        partition: 0,
        value : message
      }
    ]
  })

  await producer.disconnect();
}

export const consumeMessage = async ()=>{
  const consumer = kafka.consumer({ groupId: 'topic-test-1-group' });
  consumer.connect();
  consumer.subscribe({ topic: 'redisBlogTopic', fromBeginning: true });
  console.log("kafka consumer connected")
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value?.toString();
      if(data){
        const parsedData = await JSON.parse(data);
        await redis.set(parsedData.id, JSON.stringify(parsedData));
        console.log({
          value: JSON.parse(data),
        });
      }
    },
  });
}
consumeMessage();