import { useSignalR } from "./SignalRProvider"


export default function Main() {
    const { signalrState: { signalr } } = useSignalR()
  return (
    <>
      <button onClick={()=>signalr.invoke("SendMessage", "user", "msg")}>Send msg</button>
    </>
  )
}