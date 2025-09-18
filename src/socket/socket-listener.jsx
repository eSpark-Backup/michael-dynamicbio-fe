import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getSocket } from './index';
import {
  NEW_BOND_REQUEST,
  BOND_REQUEST_UPDATED,
  NEW_GROUP_REQUEST,
  GROUP_REQUEST_UPDATED,
  NEW_GROUP_POST_REQUEST,
  GROUP_POST_REQUEST_UPDATED,
  NEW_MESSAGE,
  ONLINE_USERS,
  CHAT_JOINED,
  CHAT_LEFT,
  START_TYPING,
  STOP_TYPING,
  GET_NEW_MESSAGE,
  SEND_NEW_MESSAGE,
  REFETCH_CHATS,
} from './events';
import { eventBus } from '../utils';
import { updateOnlineUser } from '../store/slices/chat';

const SocketListener = () => {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();

    if (user && socket) {
      if (!socket.connected) {
        socket.connect();
      }

      socket.on('connect', () => {
        console.log('✅ Connected to socket server', socket.id);
        socket.emit(CHAT_JOINED);
      });

      socket.on('connect_error', (err) => {
        console.error('❌ Connection error:', err.message);
      });

      socket.on(NEW_BOND_REQUEST, (data) => {
        toast.success(data?.message);
        eventBus.emit('refetchBondData');
        eventBus.emit('refetchnotifications');
      });

      socket.on(BOND_REQUEST_UPDATED, (data) => {
        eventBus.emit('refetchBondData');
        eventBus.emit('refetchnotifications');
        toast.success(data?.message);
      });

      socket.on(NEW_GROUP_REQUEST, (data) => {
        toast.success(data?.message);
        eventBus.emit('refetchnotifications');
      });

      socket.on(GROUP_REQUEST_UPDATED, (data) => {
        toast.success(data?.message);
        eventBus.emit('refetchnotifications');
      });

      socket.on(NEW_GROUP_POST_REQUEST, (data) => {
        toast.success(data?.message);
        eventBus.emit('refetchnotifications');
      });

      socket.on(GROUP_POST_REQUEST_UPDATED, (data) => {
        toast.success(data?.message);
        eventBus.emit('refetchnotifications');
      });

      socket.on(NEW_MESSAGE, (data) => {
        eventBus.emit(GET_NEW_MESSAGE, data);
        if (pathname !== '/cells') {
          toast.success(`${data?.message?.sender?.name} sent you a message`);
        }
      });

      eventBus.on(SEND_NEW_MESSAGE, (data) => {
        socket.emit(NEW_MESSAGE, data);
      });

      socket.on(ONLINE_USERS, (data) => {
        dispatch(updateOnlineUser(data));
      });

      eventBus.on(CHAT_LEFT, () => {
        socket.emit(CHAT_LEFT);
      });

      socket.on(START_TYPING, (data) => {
        eventBus.emit(START_TYPING, data);
      });

      eventBus.on(START_TYPING, (data) => {
        socket.emit(START_TYPING, data);
      });

      socket.on(STOP_TYPING, (data) => {
        eventBus.emit(STOP_TYPING, data);
      });

      eventBus.on(STOP_TYPING, (data) => {
        socket.emit(STOP_TYPING, data);
      });

      socket.on(REFETCH_CHATS, (data) => {
        eventBus.emit(REFETCH_CHATS, data);
      });

      return () => {
        socket.off(NEW_BOND_REQUEST);
        socket.off(BOND_REQUEST_UPDATED);
        socket.off(NEW_GROUP_REQUEST);
        socket.off(GROUP_REQUEST_UPDATED);
        socket.off(NEW_GROUP_POST_REQUEST);
        socket.off(GROUP_POST_REQUEST_UPDATED);
        socket.off(NEW_MESSAGE);
        eventBus.off(SEND_NEW_MESSAGE);
        socket.off(ONLINE_USERS);
        socket.off(CHAT_JOINED);
        eventBus.off(CHAT_LEFT);
        socket.off(START_TYPING);
        eventBus.off(START_TYPING);
        socket.off(STOP_TYPING);
        eventBus.off(STOP_TYPING);
        socket.off(REFETCH_CHATS);
      };
    }
  }, [user, pathname]);

  return null;
};

export default SocketListener;
