import React, { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [justCalculated, setJustCalculated] = useState(false);

  const handleNumber = (num) => {
    if (justCalculated) {
      setDisplay(num);
      setJustCalculated(false);
    } else if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    const symbols = { '/': '÷', '*': '×', '-': '−', '+': '+' };
    const symbol = symbols[op];
    if (justCalculated) {
      setJustCalculated(false);
    }
    const lastChar = display.slice(-1);
    if (['÷', '×', '−', '+'].includes(lastChar)) {
      setDisplay(display.slice(0, -1) + symbol);
    } else {
      setDisplay(display + symbol);
    }
  };

  const calculate = () => {
    try {
      let expression = display
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/−/g, '-');
      const result = Function('"use strict"; return (' + expression + ')')();
      return isFinite(result) ? result : 'Error';
    } catch {
      return 'Error';
    }
  };

  const handleEquals = () => {
    const result = calculate();
    setDisplay(String(result));
    setJustCalculated(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setJustCalculated(false);
  };

  const handleBackspace = () => {
    if (justCalculated) {
      setDisplay('0');
      setJustCalculated(false);
    } else if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    fontSize: '20px',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
  };

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: '#ff9500',
    color: 'white',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: '0 auto',
    }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#333',
        borderRadius: '16px',
      }}>
        <div style={{
          backgroundColor: '#222',
          color: 'white',
          fontSize: '36px',
          padding: '20px',
          textAlign: 'right',
          borderRadius: '8px',
          marginBottom: '10px',
          minWidth: '250px',
          wordBreak: 'break-all',
        }}>
          {display}
        </div>

        <div>
          <button style={buttonStyle} onClick={handleClear}>C</button>
          <button style={buttonStyle} onClick={handleBackspace}>⌫</button>
          <button style={{...buttonStyle, visibility: 'hidden'}}></button>
          <button style={operatorStyle} onClick={() => handleOperator('/')}>÷</button>
        </div>
        <div>
          <button style={buttonStyle} onClick={() => handleNumber('7')}>7</button>
          <button style={buttonStyle} onClick={() => handleNumber('8')}>8</button>
          <button style={buttonStyle} onClick={() => handleNumber('9')}>9</button>
          <button style={operatorStyle} onClick={() => handleOperator('*')}>×</button>
        </div>
        <div>
          <button style={buttonStyle} onClick={() => handleNumber('4')}>4</button>
          <button style={buttonStyle} onClick={() => handleNumber('5')}>5</button>
          <button style={buttonStyle} onClick={() => handleNumber('6')}>6</button>
          <button style={operatorStyle} onClick={() => handleOperator('-')}>−</button>
        </div>
        <div>
          <button style={buttonStyle} onClick={() => handleNumber('1')}>1</button>
          <button style={buttonStyle} onClick={() => handleNumber('2')}>2</button>
          <button style={buttonStyle} onClick={() => handleNumber('3')}>3</button>
          <button style={operatorStyle} onClick={() => handleOperator('+')}>+</button>
        </div>
        <div>
          <button style={{...buttonStyle, width: '130px'}} onClick={() => handleNumber('0')}>0</button>
          <button style={buttonStyle} onClick={() => !display.includes('.') && setDisplay(display + '.')}>.</button>
          <button style={operatorStyle} onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
