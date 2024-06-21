import React, { useState, useEffect } from 'react';
import { evaluate, sin, cos, tan, sqrt, log, pow, exp, factorial, pi, e, random } from 'mathjs';
import Button from './Button';
import Display from './Display';
import ConfettiExplosion from 'react-confetti-explosion';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [memory, setMemory] = useState(null);
  const [degreeMode, setDegreeMode] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Function to handle button clicks
  const handleClick = (label) => {
    switch (label) {
      // Basic arithmetic operations
      case '+':
      case '-':
      case '*':
      case '/':
        setDisplay((prev) => `${prev} ${label} `); // Append operator to display with spaces around it
        break;
      // Evaluate the expression
      case '=':
        try {
          const evaluated = evaluate(display); // Evaluate the expression using mathjs evaluate function
          setDisplay(evaluated.toString()); // Update display with the evaluated result
          if (evaluated === 5 * 6 || evaluated === 6 * 5) {
            setConfetti(true); // Trigger confetti if result involves 5 and 6
            setTimeout(() => setConfetti(false), 1500); // Turn off confetti after 1.5 seconds
          }
        } catch {
          setDisplay('Error'); // Handle evaluation errors
        }
        break;
      // Handle trigonometric functions
      case 'sin':
      case 'cos':
      case 'tan':
        setConfetti(true); // Trigger confetti on trigonometric button click
        setTimeout(() => setConfetti(false), 1500); // Turn off confetti after 1.5 seconds
        setDisplay(prev => `${label}(`); // Update display to show trig function
        break;
      // Handle other functions like square root, factorial, logarithms, etc.
      case 'sqrt':
        setDisplay(prev => `sqrt(${prev})`); // Square root function
        break;
      case 'log':
        setDisplay(prev => `log(${prev})`); // Logarithm function
        break;
      case 'pow':
        setDisplay(prev => `${prev}^`); // Power function
        break;
      case 'exp':
        setDisplay(prev => `exp(${prev})`); // Exponential function
        break;
      case 'factorial':
        setDisplay(prev => `${prev}!`); // Factorial function
        break;
      case 'pi':
        setDisplay(prev => `${prev}${Math.PI}`); // Pi constant
        break;
      case 'e':
        setDisplay(prev => `${prev}${Math.E}`); // Euler's number constant
        break;
      case 'random':
        setDisplay(prev => `${prev}random()`); // Random number function
        break;
      // Handle memory operations, clear operations, etc.
      case 'MC':
        setMemory(null); // Clear memory
        break;
      case 'mr':
        if (memory !== null) setDisplay(memory.toString()); // Recall memory value to display
        break;
      case 'm+':
        if (display !== '') setMemory(prev => (prev !== null ? prev + parseFloat(display) : parseFloat(display))); // Add current value to memory
        break;
      case 'm-':
        if (display !== '') setMemory(prev => (prev !== null ? prev - parseFloat(display) : -parseFloat(display))); // Subtract current value from memory
        break;
      case 'C':
        setDisplay(''); // Clear display
        break;
      case '+/-':
        setDisplay(prev => prev.includes('-') ? prev.replace('-', '') : `-${prev}`); // Toggle sign of current number
        break;
      case '.':
        setDisplay(prev => `${prev}.`); // Decimal point
        break;
      default:
        setDisplay(prev => `${prev}${label}`); // Default behavior for digits and other buttons
    }
  };

  useEffect(() => {
    // Clear confetti after 1.5 seconds
    const timeout = setTimeout(() => {
      setConfetti(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [confetti]); // Run useEffect whenever confetti state changes

  // List of buttons for rendering
  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-',
    '%', '/', '2nd', 'x²', 'x³', 'xʸ', 'ex', '10ˣ',
    '7', '8', '9', '*', '¹/x', '²√x', '²√x', 'yx',
    'ln', 'log', '4', '5', '6', '-', 'x!','sin', 'cos',
    'tan', 'e', 'EE', '1', '2', '3', '+', 'Rad',
    'sinh', 'cosh', 'tanh', 'π','Rand','0','.','='
  ];
  return (
    <div className="calculator">
      {confetti && <ConfettiExplosion />} {/* Show confetti if confetti state is true */}
      <Display value={display || '0'} /> {/* Display component */}
      <div className="button-grid">
        {buttons.map(label => (
          <Button
            key={label}
            label={label}
            onClick={handleClick}
            className={`button ${label === '=' ? 'equals' : ''} ${['+', '-', '*', '/'].includes(label) ? 'operator-button' : ''} ${label === '0' ? 'button-zero' : ''} ${/\d/.test(label) ? 'digit-button' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
