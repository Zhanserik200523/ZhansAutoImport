'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import useAuthRedirect from '@/hooks/useAuthRedirect'


const socket = io('http://localhost:8080')

export default function ChatPage() {
    useAuthRedirect()
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [userInfo, setUserInfo] = useState({ name: '', role: '', id: '' })
    const [editingMessageId, setEditingMessageId] = useState(null)
    const [editText, setEditText] = useState('')


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
                    role: data.role || 'user',
                    id: data._id
                }
                setUserInfo(info)
                socket.emit('get_messages', data._id)
            })
    }, [])

    useEffect(() => {
        if (!userInfo.id) return

        const handleHistory = (messages) => setChat(messages)
        const handleReceive = (data) => {
            if (String(data.userId) === String(userInfo.id)) {
                setChat(prev => [...prev, data])
            }
        }
        const handleUpdate = (updatedMsg) => {
            if (String(updatedMsg.userId) === String(userInfo.id)) {
                setChat(prev => prev.map(msg => msg._id === updatedMsg._id ? updatedMsg : msg))
            }
        }
        const handleDelete = (deletedId) => {
            setChat(prev => prev.filter(msg => msg._id !== deletedId))
        }

        socket.on('chat_history', handleHistory)
        socket.on('receive_message', handleReceive)
        socket.on('message_updated', handleUpdate)
        socket.on('message_deleted', handleDelete)

        return () => {
            socket.off('chat_history', handleHistory)
            socket.off('receive_message', handleReceive)
            socket.off('message_updated', handleUpdate)
            socket.off('message_deleted', handleDelete)
        }
    }, [userInfo.id])

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
        setEditingMessageId(null)
        setEditText('')
    }

    const deleteMessage = async (id) => {
        await fetch(`http://localhost:8080/api/messages/${id}`, {
            method: 'DELETE'
        })
    }


    const sendMessage = (e) => {
        e.preventDefault()
        if (!message.trim()) return

        const msg = {
            sender: userInfo.role,
            name: userInfo.name,
            text: message,
            time: new Date().toLocaleTimeString(),
            userId: userInfo.id
        }

        socket.emit('send_message', msg)
        setMessage('')
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Чат с Менеджером</h2>

            <div className="h-96 overflow-y-auto border rounded-xl p-4 mb-4 bg-gray-50 space-y-3">
                {chat.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === userInfo.role ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-xl shadow-sm text-sm ${
                            msg.sender === userInfo.role
                                ? 'bg-blue-100 text-right'
                                : 'bg-green-100 text-left'
                        }`}>
                            {editingMessageId === msg._id ? (
                                <>
                <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border rounded p-1 text-sm mb-2"
                />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={saveEditedMessage}
                                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="text-xs bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="font-semibold text-gray-800">{msg.name}</p>
                                    <p className="text-gray-700">{msg.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {msg.time} {msg.edited && '(изменено)'}
                                    </p>

                                    {msg.sender === 'user' && String(msg.userId) === String(userInfo.id) && (
                                        <div className="flex justify-end gap-2 mt-1">
                                            <button
                                                onClick={() => startEditing(msg)}
                                                className="text-blue-600 text-xs hover:underline"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => deleteMessage(msg._id)}
                                                className="text-red-600 text-xs hover:underline"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите сообщение..."
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow transition"
                >
                    Отправить
                </button>
            </form>
        </div>
    )

}
