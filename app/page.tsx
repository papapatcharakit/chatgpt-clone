'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import profile_pic from './public/profile/RNI-Films-IMG-742960EF-7ED5-4D1A-B9A4-BC052FACAD08_2.jpg'


export interface ChatLogProps {
  user: string;
  message: string;
}

export interface Models {
  id: string;
}

export default function Home() {

  const ChatMessage = ({ message, user }: ChatLogProps) => {
    return (
      <div className={`chatMessage ${user === "gpt" && "chatGPT"}`}>
        <div className='chatMessageCenter'>
          <div className={`avatar ${user === "gpt" && "chatGPT"}`}>
            {user === "gpt" && <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              strokeWidth={1.5}
              className="h-full w-full"
            >
              <title>{"ChatGPT"}</title>
              <text x={-9999} y={-9999}>
                {"ChatGPT"}
              </text>
              <path
                fill="currentColor"
                d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
              />
            </svg>}
          </div>
          <div className="message">
            {message}
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    getEngines();
  }, [])

  const [input, setInput] = useState("");
  const [currentModel, setCurrentModel] = useState("davinci");
  const [models, setModels] = useState([{ id: "davinci" }, { id: "text-davinci-001" }, { id: "ada" }] as Models[]);
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?",
  }] as ChatLogProps[]);

  function clearChat() {
    setChatLog([]);
  }

  function getEngines() {
    // fetch("http://localhost:3080/models")
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     setModels(data.models)
    //   })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log('submit')
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]
    setInput("");

    setChatLog(chatLogNew)


    const messages = chatLogNew.map((message) => message.message).join("\n")
    const _message = input


    if (currentModel === 'telecom-qa-model') {
      const response = await fetch("https://telecom-qa-yo467gclma-as.a.run.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          // 'mode':'no-cors'
          "Access-Control-Allow-Headers": "Accept"
        },
        body: JSON.stringify({
          text: _message,
        })
      });
      const data = await response.json();
      setChatLog([...chatLogNew, { user: "gpt", message: `${data.answer}` }])

      console.log(data)

    } else {
      try {
        const response = await fetch("https://telecom-qa-yo467gclma-as.a.run.app/generate-text/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: messages,
            engine: currentModel,
          })
        });
        const data = await response.json();
        setChatLog([...chatLogNew, { user: "gpt", message: `${data.generated_text}` }])
      }
      catch (e) {
        console.log(e)
      }

    }


  }

  return (<>
    <main className="text-center flex h-full w-full top-0 bottom-0 right-0 left-0">
      <aside className='sideMenu'>
        <section>
          <div className='sideMenuButton' onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>

          <div className='select'>
            <select

              style={{ width: "100px" }}
              onChange={(e: any) => { setCurrentModel(e.target.value) }}>

              <option key={'telecom-qa-model'} value={'telecom-qa-model'}>{'telecom-qa-model'}</option>

              {
                models?.map((model, index) => (
                  <option key={index} value={model.id}>{model.id}</option>))
              }

            </select>
          </div>
        </section>

        <section>
          <hr />
          <section className='profile'>
            <img className='avatar' src={"profile/IMG_7766.jpg"}>

            </img>
            <p style={{ fontSize: "14px", margin: "auto" }}>Patcharakit Yangdiaw</p>
          </section>
          {/* <hr style={{ marginTop: "16px" }} /> */}
        </section>
      </aside>



      <section className='chatContainer'>

        <section className='chatBox1'>
          <div className='chatLog'>

            {
              chatLog?.map((message, index) => (
                <ChatMessage key={index} {...message} />
              ))
            }
          </div>
        </section>


        <section className='chatBox2'>
          <div className='chatInputHolder'>
            <form onSubmit={handleSubmit}>
              <input
                className='chatInputTextArea'
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
              ></input>
            </form>
          </div>
        </section>

      </section>
    </main>
    </>
  )

}

// export const ChatMessage = ({ message, user }: ChatLogProps) => {
//   return (
//     <div className={`chatMessage ${user === "gpt" && "chatGPT"}`}>
//       <div className='chatMessageCenter'>
//         <div className={`avatar ${user === "gpt" && "chatGPT"}`}>
//           {user === "gpt" && <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width={20}
//             height={20}
//             fill="none"
//             strokeWidth={1.5}
//             className="h-full w-full"
//           >
//             <title>{"ChatGPT"}</title>
//             <text x={-9999} y={-9999}>
//               {"ChatGPT"}
//             </text>
//             <path
//               fill="currentColor"
//               d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
//             />
//           </svg>}
//         </div>
//         <div className="message">
//           {message}
//         </div>
//       </div>
//     </div>
//   )
// }