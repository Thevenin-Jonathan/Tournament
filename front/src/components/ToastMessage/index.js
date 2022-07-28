import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Transition } from 'react-transition-group';

function ToastMessage({ id, message, type }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'REMOVE_TOAST',
        toastId: id,
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'REMOVE_TOAST',
        toastId: id,
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveToast = (toastId) => {
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  };

  return (
    <div
      onClick={() => handleRemoveToast(id)}
      className={`toast ${type}`}
    >
      {message}
      <i className="fa fa-times close-icon" aria-hidden="true" />
    </div>

  );
}

ToastMessage.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ToastMessage;
