import React from 'react'
import { useState } from 'react'
import { CiCircleMore } from 'react-icons/ci'
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { IoIosMore } from 'react-icons/io'
import Modal from './Modal'

const Card = ({ children, text }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`text-${text} px-2 py-1 border rounded-2xl transition-all ${hovered ? 'gradient-item' : ''} hover:text-white`}>
            {children}
        </div>
    )
}

function Footer() {
    const [hovered, setHovered] = useState(false)
    const [modalOpened, setModalOpened] = useState(false)
    return (
        <>
            <div className='flex gap-2 justify-center items-center fixed bottom-0 left-0 right-0 bg-gray-300 text-gray-800 text-center py-4'>
                <Card>
                    <a target='_blank' className='flex gap-1 items-center justify-center' href="https://github.com/Alanpro204/aam-image-generator">
                        <FaGithub />Apoyanos en GitHub
                    </a>
                </Card>
                <div onClick={() => setModalOpened(true)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`cursor-pointer transition-all border rounded-full p-1 text-2xl ${hovered ? 'gradient-item' : ''} hover:text-white`}>
                    <IoIosMore />
                </div>
            </div>
            <Modal isOpen={modalOpened} onClose={() => setModalOpened(false)}>
                <div className='text-2xl'>Gracias por estar aquí</div>
                <p>Sígueme en mis redes sociales para apoyar lo que hago 😁</p>
                <div className='flex flex-wrap gap-2 justify-center items-center mt-2'>
                    <div hidden className='text-blue-700 text-red-700 text-pink-700'></div>
                    <Card>
                        <a target='_blank' className='flex gap-1 items-center justify-center' href="https://github.com/Alanpro204">
                            <FaGithub />GitHub
                        </a>
                    </Card>
                    <Card text={`blue-700`}>
                        <a target='_blank' className='flex gap-1 items-center justify-center' href="https://www.linkedin.com/in/alain-torres-rodr%C3%ADguez-559753339/">
                            <FaLinkedin />LinkedIn
                        </a>
                    </Card>
                    <Card text={`red-700`}>
                        <a target='_blank' className='flex gap-1 items-center justify-center' href="https://www.youtube.com/@alanprodev204">
                            <FaYoutube />YouTube
                        </a>
                    </Card>
                    <Card text={`pink-700`}>
                        <a target='_blank' className='flex gap-1 items-center justify-center' href="https://www.instagram.com/alanpro204/">
                            <FaInstagram />Instagram
                        </a>
                    </Card>
                </div>

            </Modal>
        </>
    )
}

export default Footer