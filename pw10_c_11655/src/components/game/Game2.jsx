import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Game2.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Game2 = () => {
  const words = ['REACT', 'JAVASCRIPT', 'PROGRAMMING', 'DEVELOPER', 'COMPUTER', 'HANDPHONE', 'PYTHON', 'MACHINE', 'LEARNING', 'FLUTTER', 'DART', 'INFORMATIKA', 'ATMAJAYA'
    , 'WEBSITE'
  ];
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  
  const scrambleWord = (word) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  const getNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord));
    setUserInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toUpperCase() === currentWord) {
      toast.success("Jawaban Benar! 🎉", { 
        position: "top-right", 
        theme: 'dark', 
      });
      setScore(prev => prev + 10);
      setTimeout(getNewWord, 1500);
    } else {
      toast.error("Jawaban Salah! Coba lagi 😢", { 
        position: "top-right", 
        theme: 'dark', 
      });
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  useEffect(() => {
    getNewWord();
  }, []);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Word Scramble</h1>
        <p className="game-score">Score: {score}</p>
      </div>

      <div className="input-section">
        <p className="scrambled-word">{scrambledWord}</p>
        
        <form onSubmit={handleSubmit} className="game-input-section">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="game-input"
            placeholder="Jawaban..."
          />
          
          <div className="game-buttons">
            <button 
              type="submit"
              className="game-button"
            >
              Tebak
            </button>
          
            <button
              type="button"
              onClick={getNewWord}
              className="game-button hint-button"
            >
              Skip Kata
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Game2;