import { Server } from "socket.io";
import Redis from 'ioredis'
import prismaClient from '../services/prisma.js'

const pub = new Redis({
	host: "redis-2cdf200d-chat-anony.a.aivencloud.com",
	port : 24467,
	username : "default",
	password : "AVNS_Jrtayeisi_LzFvfeSRg"
});

const sub = new Redis({
	host: "redis-2cdf200d-chat-anony.a.aivencloud.com",
	port : 24467,
	username : "default",
	password : "AVNS_Jrtayeisi_LzFvfeSRg"
});

class SocketService { 

  	constructor() {

  		console.log("Init Socket Service");;

  		this._io = new Server({
  			cors : {
  				allowedHeaders : ["*"],
  				origin: "*"
  			}
  		});

  		sub.subscribe("MESSAGES")
  	}

	initListeners(){

		const  io = this.io();

		io.on("connect", (socket) => {
			console.log("Socket connected", socket.id)

			socket.on("event:message", async ({message}) => {
				console.log("New Message Received.", message)

        		await pub.publish("MESSAGES", JSON.stringify({ message }));

			})
		})

		//If ANy subcribe get any message on a particular channel,
		//Forwards to all the 
		sub.on("message", async (channel, message) => {
	      if (channel === "MESSAGES") {
	        console.log("new message from redis", message);
	        io.emit("message", message);

	        await prismaClient.message.create({
	        	data : {
	        		text : message
	        	}
	        })
	        // await produceMessage(message);
	        // console.log("Message Produced to  Broker");
	      }
	    });
	}

	io() {
		return this._io;
	}

}


export default SocketService




