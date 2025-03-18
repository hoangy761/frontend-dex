/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bounce, toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};
type MessageToast = { pending: any; success: any; error: any };

export const showToast = {
  success: (_messages: any, options = {}) => {
    toast.success(_messages, { ...defaultOptions, ...options });
  },
  error: (_messages: any, options = {}) => {
    toast.error(_messages, { ...defaultOptions, ...options });
  },
  info: (_messages: any, options = {}) => {
    toast.info(_messages, { ...defaultOptions, ...options });
  },
  warn: (_messages: any, options = {}) => {
    toast.warn(_messages, { ...defaultOptions, ...options });
  },
  promise: (promise: any, messages: MessageToast, options = {}) => {
    return toast.promise(promise, messages, { ...defaultOptions, ...options });
  },
  loading: (_messages: any, options = {}) => {
    return toast.loading(_messages, { ...defaultOptions, ...options });
  },
  updateSucess: (_id: any, _messages: any, options = {}) => {
    return toast.update(_id, { ...defaultOptions, type: 'success', isLoading: false, ...options, render: _messages });
  },
  updateError: (_id: any, _messages: any, options = {}) => {
    return toast.update(_id, { ...defaultOptions, type: 'error', isLoading: false, ...options, render: _messages });
  },
};

// {
//   type: 'success',
//   isLoading: false,
//   autoClose: 3000,
//   closeOnClick: true,
//   closeButton: true,
// }
