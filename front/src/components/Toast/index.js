import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';

function Toast() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => (state.interface.toasts));

  const handleRemoveToast = (toastId) => {
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  };

  return (
    <div className="toast-messages">
      {toasts.map((toast) => (
        <div
          onClick={() => handleRemoveToast(toast.id)}
          key={toast.id}
          className={`toast ${toast.type}`}
        >
          {toast.message}
          <i className="fa fa-times close-icon" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export default Toast;
