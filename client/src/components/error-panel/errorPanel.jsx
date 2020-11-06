import './errorPanel.scss';

/**
 * Component that display an error message
 * @param {Object} props props of the component
 * @param {Object} props.errorMessage error message to display
 */
const ErrorPanel = (props) => {
  return (
    <div className='error-panel'>
      <img
        src='/error.svg'
        alt='Error icon'
        aria-hidden='true'
        width='120px'
        height='120px'
      />
      <div className='error-message'>{props.errorMessage}</div>
    </div>
  );
};

export default ErrorPanel;
