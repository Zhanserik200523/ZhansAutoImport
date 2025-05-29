'use client'

import { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import useAuthRedirect from '@/hooks/useAuthRedirect'
const socket = io('http://localhost:8080')

export default function AdminChatPage() {
    useAuthRedirect()
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    const [editingMessageId, setEditingMessageId] = useState(null)
    const [editText, setEditText] = useState('')
    const [adminInfo, setAdminInfo] = useState({ name: '', id: '' })
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chat])
    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (selectedUser && data.userId === selectedUser._id) {
                setChat(prev => [...prev, data])
            }
        })

        socket.on('message_updated', (updatedMsg) => {
            if (selectedUser && updatedMsg.userId === selectedUser._id) {
                setChat(prev => prev.map(msg => msg._id === updatedMsg._id ? updatedMsg : msg))
            }
        })

        socket.on('message_deleted', (deletedId) => {
            setChat(prev => prev.filter(msg => msg._id !== deletedId))
        })

        return () => {
            socket.off('receive_message')
            socket.off('message_updated')
            socket.off('message_deleted')
        }
    }, [selectedUser])


    useEffect(() => {
        fetch('http://localhost:8080/api/messages/users')
            .then(res => res.json())
            .then(setUsers)
    }, [])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        fetch('http://localhost:8080/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                const info = {
                    name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
                    id: data._id
                }
                setAdminInfo(info)
            })
    }, [])
    useEffect(() => {
        if (!selectedUser) return
        fetch(`http://localhost:8080/api/messages/by-user/${selectedUser._id}`)
            .then(res => res.json())
            .then(setChat)
    }, [selectedUser])

    const sendMessage = (e) => {
        e.preventDefault()
        if (!message.trim() || !selectedUser) return

        const msg = {
            sender: 'admin',
            name: adminInfo.name,
            text: message,
            time: new Date().toLocaleTimeString(),
            userId: selectedUser._id
        }

        socket.emit('send_message', msg)
        setMessage('')
    }

    const startEditing = (msg) => {
        setEditingMessageId(msg._id)
        setEditText(msg.text)
    }

    const cancelEditing = () => {
        setEditingMessageId(null)
        setEditText('')
    }

    const saveEditedMessage = async () => {
        const res = await fetch(`http://localhost:8080/api/messages/${editingMessageId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: editText })
        })
        const updated = await res.json()
        setChat(prev => prev.map(msg => msg._id === updated._id ? updated : msg))
        cancelEditing()
    }

    const deleteMessage = async (id) => {
        await fetch(`http://localhost:8080/api/messages/${id}`, {
            method: 'DELETE'
        })
        setChat(prev => prev.filter(msg => msg._id !== id))
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Список пользователей */}
            <aside className="w-1/3 border-r p-4 overflow-y-auto bg-white shadow">
                <h2 className="text-lg font-bold mb-4">Пользователи</h2>
                {users.map(user => (
                    <div
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition ${
                            selectedUser?._id === user._id ? 'bg-blue-100' : ''
                        }`}
                    >
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                ))}
            </aside>

            {/* Чат */}
            <main className="flex-1 flex flex-col p-4 relative bg-gray-50 rounded">
                <h2 className="text-xl font-bold mb-4">
                    {selectedUser ? `Чат с ${selectedUser.firstName}` : 'Выберите пользователя'}
                </h2>

                {/* Чат */}
                <div className="flex-1 overflow-y-auto px-2 space-y-3 mb-4">
                    {chat.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`px-4 py-2 rounded-lg shadow max-w-[75%] md:max-w-[60%] lg:max-w-[50%] break-words text-sm ${
                                msg.sender === 'admin' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
                            }`}>
                                <p className="font-semibold">{msg.name}:</p>
                                <p>{msg.text}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {msg.time}{msg.edited ? ' (изменено)' : ''}
                                </p>
                                {/* Кнопки редактирования и удаления (по желанию) */}
                                {msg.sender !== 'admin' && (
                                    <div className="flex justify-end gap-2 mt-1">
                                        <button onClick={() => startEditing(msg)} className="text-xs text-blue-500">✏️</button>
                                        <button onClick={() => deleteMessage(msg._id)} className="text-xs text-red-500">🗑</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Ввод */}
                {selectedUser && (
                    <form onSubmit={sendMessage} className="flex gap-2 border-t pt-4 bg-white sticky bottom-0 z-10">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Введите сообщение..."
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Отправить
                        </button>
                    </form>
                )}
            </main>

        </div>
    )

}
