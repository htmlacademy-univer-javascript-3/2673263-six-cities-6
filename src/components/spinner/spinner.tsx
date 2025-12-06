import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <div className="spinner__circle" />
      <p className="spinner__text">Loading offers...</p>
    </div>
  );
}

export default Spinner;
