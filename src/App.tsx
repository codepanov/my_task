import React from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';

function App() {

  const [submittedValue, setSubmittedValue] = React.useState<string>("");

  const handleSubmit = (value: string) => {
    setSubmittedValue(value);
  };

  return (
    <div className="App">
      <Autocomplete onSubmit={handleSubmit} />
      <p
        style={{
          fontSize: '18px',
          color: '#666'
        }}>
        Submitted value: {submittedValue}
      </p>
    </div>
  );
}

export default App;
