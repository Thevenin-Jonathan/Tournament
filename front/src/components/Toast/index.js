import { useSelector } from 'react-redux';
import ToastMessage from '../ToastMessage';

function Toast() {
  const toasts = useSelector((state) => (state.interface.toasts));

  return (
    <div className="toast-messages">
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          className={`toast ${toast.type}`}
        />
      ))}
    </div>
  );
}

export default Toast;
