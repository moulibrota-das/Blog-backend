import { Redis } from "ioredis";

const getRedisUrl = ()=>{
  if(process.env.REDIS_URL){
    return process.env.REDIS_URL;
  }
  
  throw new Error("Redis URL not detected");
}

export const redis = new Redis(getRedisUrl())