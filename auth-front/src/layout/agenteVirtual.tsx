import { Box } from '@mui/material';
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function ChatContainer() {
    useEffect(() => {
        // Sobrescribir las variables CSS de n8n
        const style = document.createElement('style');
        style.innerHTML = `
      :root {
        --chat-message-font-size: 0.8rem !important; /* Reducir tamaño de los mensajes */
        --chat-subtitle-font-size: 0.9rem !important; /* Reducir tamaño del subtítulo */
        --chat-input-font-size: 0.8rem !important;    /* Reducir tamaño del campo de entrada */
        --chat-espaciado: 0.8rem !important;           /* Reducir espaciado */
      }
    `;
        document.head.appendChild(style);

        createChat({
            webhookUrl: 'https://chuanca29.app.n8n.cloud/webhook/99c1419d-07bb-4456-9f98-84042410fe9c/chat',  // Cambia esto con tu URL del webhook
            webhookConfig: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            target: '#n8n-chat',  // El contenedor donde se inyectará el chat
            mode: 'window',  // Modo de ventana
            chatInputKey: 'chatInput',
            chatSessionKey: 'sessionId',
            metadata: {},
            showWelcomeScreen: false,  // No mostrar pantalla de bienvenida si no es necesario
            defaultLanguage: 'en',

            i18n: {
                en: {
                    title: 'VivaBol Agente',
                    subtitle: "Start a chat. We're here to help you 24/7.",
                    footer: '',
                    getStarted: 'New Conversation',
                    inputPlaceholder: 'Type your question..',
                },
            },
        });
    }, []);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 3010,
            }}
        >
            <div id="n8n-chat" style={{ width: '100%', height: '100%' }}></div>
        </Box>
    );
}
