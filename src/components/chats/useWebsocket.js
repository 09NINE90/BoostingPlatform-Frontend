import { useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { refreshAccessToken } from 'src/services/authApi.js';
import { store } from 'src/store/store.js';
import { setToken } from 'src/store/slice/authSlice.js';
import { toast } from 'react-toastify';

const useWebSocket = (url, options = {}) => {
    const {
        onMessageReceived,
        onConnect,
        onError,
        maxRetries = 3,
        pingInterval = 30000,
    } = options;

    const stompClientRef = useRef(null);
    const pingIntervalRef = useRef(null);
    const retryCountRef = useRef(0);
    const subscriptionsRef = useRef([]);

    const refreshTokenAndReconnect = useCallback(async () => {
        try {
            const { accessToken } = await refreshAccessToken();
            store.dispatch(setToken(accessToken));
            return accessToken;
        } catch (error) {
            toast.warn('Session expired. Please log in again.');
            throw error;
        }
    }, [store, refreshAccessToken]);

    const disconnect = useCallback(() => {
        // Очистка пинга
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
            pingIntervalRef.current = null;
        }

        // Отписка от всех подписок
        subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
        subscriptionsRef.current = [];

        // Деактивация клиента
        if (stompClientRef.current?.active) {
            stompClientRef.current.deactivate();
            console.log('🛑 STOMP client deactivated');
        }
    }, []);

    const subscribe = useCallback((destination, callback) => {
        if (!stompClientRef.current?.connected) {
            console.warn('Cannot subscribe - connection not established');
            return null;
        }
        const subscription = stompClientRef.current.subscribe(destination, (message) => {
            console.log('Received STOMP message:', message);
            callback(message);
        });

        subscriptionsRef.current.push(subscription);
        return subscription;
    }, []);

    const unsubscribe = useCallback((subscription) => {
        if (!subscription) return;
        subscription.unsubscribe();
        subscriptionsRef.current = subscriptionsRef.current.filter((sub) => sub !== subscription);
    }, []);

    const sendMessage = useCallback((destination, body, headers = {}) => {
        if (!stompClientRef.current?.connected) {
            console.warn('Cannot send message - connection not established');
            return false;
        }
        stompClientRef.current.publish({
            destination,
            body: typeof body === 'string' ? body : JSON.stringify(body),
            headers,
        });
        return true;
    }, []);

    const setupStompClient = useCallback(
        (token) => {
            disconnect();

            stompClientRef.current = new Client({
                brokerURL: `${url}?token=${token}`,
                debug: (str) => console.log('[STOMP]', str),
                reconnectDelay: 5000,
                heartbeatIncoming: 10000,
                heartbeatOutgoing: 10000,
                onConnect: (frame) => {
                    console.log('✅ WebSocket connected!');
                    retryCountRef.current = 0;
                    if (onConnect) onConnect(frame);

                    // Пинг для поддержания соединения
                    pingIntervalRef.current = setInterval(() => {
                        if (stompClientRef.current?.connected) {
                            sendMessage('/app/ping', '');
                        }
                    }, pingInterval);
                },
                onStompError: async (frame) => {
                    console.error('❌ STOMP error:', frame.headers?.message);
                    if (onError) onError(frame);

                    if (retryCountRef.current < maxRetries) {
                        retryCountRef.current += 1;
                        try {
                            const newToken = await refreshTokenAndReconnect();
                            setupStompClient(newToken);
                        } catch (error) {
                            console.error('Failed to refresh token:', error);
                            disconnect();
                        }
                    } else {
                        disconnect();
                    }
                },
                onWebSocketClose: () => {
                    console.log('🔌 WebSocket connection closed');
                    if (pingIntervalRef.current) {
                        clearInterval(pingIntervalRef.current);
                        pingIntervalRef.current = null;
                    }
                    if (onError) onError(new Error('Connection closed'));
                },
                onDisconnect: () => {
                    console.log('🚪 Disconnected from WebSocket');
                    if (pingIntervalRef.current) {
                        clearInterval(pingIntervalRef.current);
                        pingIntervalRef.current = null;
                    }
                },
            });

            stompClientRef.current.onWebSocketError = async (error) => {
                console.error('❌ WebSocket error:', error);
                if (onError) onError(error);

                if (retryCountRef.current < maxRetries) {
                    retryCountRef.current += 1;
                    try {
                        const newToken = await refreshTokenAndReconnect();
                        setupStompClient(newToken);
                    } catch (refreshError) {
                        console.error('Failed to refresh token:', refreshError);
                        disconnect();
                    }
                } else {
                    disconnect();
                }
            };

            stompClientRef.current.activate();
        },
        [url, onConnect, onError, maxRetries, pingInterval, disconnect, refreshTokenAndReconnect, sendMessage]
    );

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    return {
        connect: (token) => setupStompClient(token),
        disconnect,
        subscribe,
        unsubscribe,
        sendMessage,
        isConnected: () => stompClientRef.current?.connected || false,
    };
};

export default useWebSocket;
