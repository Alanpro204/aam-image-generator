import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Turnstile } from '@marsidev/react-turnstile'
import Footer from './Footer'
import { useRef } from 'react'
import { useEffect } from 'react'
import Imagen from './components/Imagen'

const url = import.meta.env.VITE_APP_URL || "http://localhost:3000/"
const siteKey = import.meta.env.VITE_APP_SITE_KEY

function App() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [generating, setGenerating] = useState(false)

  const [images, setImages] = useState(false)

  const [prompts, setPrompts] = useState([])

  const [token, setToken] = useState(null)
  const handleTurnstileSuccess = (token) => {
    setToken(token);
  };

  const handleTurnstileError = (error) => {
    toast("No pudimos verificar que seas humano", { type: "error" })
  };

  const textareaRef = useRef(null);

  const autoAjustarAltura = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoAjustarAltura(); // Ajustar la altura inicial
  }, []);

  const submit = (data) => {
    setGenerating(true)
    axios.post(
      `${url}generate`,
      {
        prompt: data.prompt,
        token: token
      }
    ).then((response) => {
      const ims = []
      ims.push(response.data[0].result.image)
      ims.push(response.data[1].result.image)
      ims.push(response.data[2].result.image)
      ims.push(response.data[3].result.image)
      setImages(ims)
      const prmpts = []
      prmpts.push(response.data[0].prompt)
      prmpts.push(response.data[1].prompt)
      prmpts.push(response.data[2].prompt)
      prmpts.push(response.data[3].prompt)
      setPrompts(prmpts)
      toast("Imágenes creadas con éxito")
    }).catch((e) => {
      toast("Error al generar, pruebe con otro prompt", { type: "error" })
    }).finally(() => {
      setGenerating(false)
      setToken(null)
    })
  }

  return (
    <div className='mx-4'>
      <section className='w-full flex mx-auto flex-col items-center mt-4'>
        <form className='flex flex-col gap-10' onSubmit={handleSubmit(submit)}>
          <h1 className='text-3xl text-center'>
            <b>
              Generador de Imágenes
            </b>
            <br />
            Flux.1 + Gemini 2.0</h1>
          <div className='flex flex-row-reverse gap-4 flex-wrap justify-center'>
            <div className='grid-cols-2 grid gap-1 outline-2 outline-white rounded-2xl'>
              <Imagen className='mx-auto w-48 h-48 border-0 rounded-tl-2xl' src={`${!images[0] ? "/placeholder.jpg" : `data:image/jpeg;base64,${images[0]}`}`} prompt={prompts[0]} />
              <Imagen className='mx-auto w-48 h-48 border-0 rounded-tr-2xl' src={`${!images[1] ? "/placeholder.jpg" : `data:image/jpeg;base64,${images[1]}`}`} prompt={prompts[1]} />
              <Imagen className='mx-auto w-48 h-48 border-0 rounded-bl-2xl' src={`${!images[2] ? "/placeholder.jpg" : `data:image/jpeg;base64,${images[2]}`}`} prompt={prompts[2]} />
              <Imagen className='mx-auto w-48 h-48 border-0 rounded-br-2xl' src={`${!images[3] ? "/placeholder.jpg" : `data:image/jpeg;base64,${images[3]}`}`} prompt={prompts[3]}/>
            </div>
            <div>
              <div className='flex flex-col gap-1 w-80'>
                <textarea spellCheck={false} placeholder='Describa la imagen que desea generar...' className='bg-white resize-none focus:outline-0 focus:shadow-gray-600 shadow-gray-400 transition-all shadow p-4 rounded-md h-56' {...register("prompt", { required: true })}></textarea>
              </div>
              <div className='w-fit mx-auto flex flex-col gap-2 mt-2'>
                {
                  token ?
                    !generating
                      ?
                      <button className='bg-white hover:bg-gray-100 transition-all w-fit mx-auto px-12 shadow-gray-400 p-2 shadow rounded-md cursor-pointer'>Generar</button>
                      :
                      <button disabled className='w-fit mx-auto px-12 shadow-gray-400 p-2 shadow rounded-md bg-gray-200'>Generando</button>
                    :
                    <>

                      <button disabled className='w-fit mx-auto px-12 shadow-gray-400 p-2 shadow rounded-md bg-gray-200'>Generar</button>
                      <Turnstile
                        className='mt-4 block'
                        siteKey={siteKey}  // Reemplaza con tu Site Key real
                        onSuccess={handleTurnstileSuccess}
                        onError={handleTurnstileError}
                        onExpire={() => {
                          console.log('Turnstile ha expirado.');
                          setToken(null); // Importante:  resetea el token si expira.
                        }}
                        options={{
                          theme: "light"
                        }}
                      />
                    </>
                }
              </div>
            </div>
          </div>
        </form>
      </section>
      <div className='container mx-auto mt-16 mb-8'>
        <h2 className='text-2xl text-center'>Genera imágenes de calidad con Flux.1 y ayuda de Gemini 2.0</h2>
        <p className='mt-4'>
          Hacemos uso del servicio de Workers AI de Cloudflare para entregar imágenes de alta calidad con
          el modelo Flux.1 de BlackForest Labs. Utilizamos la tecnología de Google Gemini 2.0 para mejorar
          los prompts del usuario, logrando así mayor diversidad y calidad en las imágenes generadas.
        </p>
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default App
