"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  input: string
}

export default function Page() {
  const { sendMessage, messages } = useSocket();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {

    sendMessage(data.input) 

    reset();

  }

  // console.log(messages)
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>        
        <input
            defaultValue=""
            className={classes["chat-input"]}
            placeholder="Message..."
            {...register("input")} 
          />
          <button
            type="submit"
            className={classes["button"]}
          >
            Send
          </button>
      </form>
      <div>
        {messages?.map((e) => (
          <li>{e}</li>
        ))}
      </div>
    </div>
  );
}