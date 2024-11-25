import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Game1.css';

function Game1() {
    const [showAnswer, setShowAnswer] = useState(false);
    const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
    const [inputValue, setInputValue] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(5);
    const [gameOver, setGameOver] = useState(false);

    function generateRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    const inputNumber = (e) => {
        setInputValue(e.target.value);
    };

    const submit = () => {
        const guess = parseInt(inputValue, 10);

        if (isNaN(guess) || guess < 1 || guess > 10) {
            toast.error("Masukan angka antara 1 dan 10!", { 
                position: "top-right", 
                theme: 'dark', 
            });
            return;
        }

        if (guess === randomNumber) {
            toast.success("Berhasil menebak angka!", { 
                position: "top-right", 
                theme: 'dark', 
            }); 
            setGameOver(true);
        } else {
            const newAttemptsLeft = attemptsLeft - 1;
            setAttemptsLeft(newAttemptsLeft);
            
            if (newAttemptsLeft === 0) {
                setGameOver(true);
                toast.error("Game Over!", { 
                    position: "top-right",
                    theme: 'dark',
                });
            } else {
                toast.warning(
                    guess < randomNumber ? "Tebakan terlalu rendah!" : "Tebakan terlalu tinggi!", 
                    { position: "top-right" }
                );
            }
        }
    };

    const handleShowAnswer = () => {
        setShowAnswer(prev => !prev);
    };

    const resetGame = () => {
        setRandomNumber(generateRandomNumber());
        setInputValue("");
        setAttemptsLeft(5);
        setMessage("");
        setGameOver(false);
        setShowAnswer(false);

        toast.success("Permainan Baru Dimulai!", { 
            position: "top-right", 
            theme: 'dark', 
        });
        return;
    };

    return (
        <div className="game-container">
            <div className="game-header">
                <h1 className="game-title">Tebak Angka Game</h1>
            </div>

            <div className="show">
                <button 
                    className="show-button" 
                    onClick={handleShowAnswer} 
                    disabled={gameOver} 
                    style={{ backgroundColor: 'white' }}
                >
                    <FontAwesomeIcon icon={showAnswer ? faEyeSlash : faEye} /> Show Jawaban
                </button> 
                {showAnswer && (
                    <div className="answer" style={{ display: 'flex', margin: 'auto' }}>
                        <p className="answer-text">{randomNumber}</p>
                    </div>
                )}
            </div>
            
            <div className="subtitle">
                <p className="game-subtitle">Tebak angka antara 1 dan 10</p>
            </div>
            
            <div className="attempts">
                <div className="attempts-count">{attemptsLeft}/5</div>
            </div>
           
            <div className="mb-3">
                <input
                    type="number"
                    value={inputValue}
                    onChange={inputNumber}
                    placeholder="Masukkan Angka 1-10"
                    className="custom-input"
                    disabled={gameOver}
                />
            </div>

            {gameOver ? (
                <button onClick={resetGame} className="submit-button">
                    Coba Lagi
                </button>
            ) : (
                <button
                    onClick={submit}
                    className="submit-button"
                >
                    Tebak Angka
                </button>
            )}

            <div className="attempts">
                {Array.from({ length: 5 }, (_, index) => (
                    <div 
                        key={index} 
                        className={`dot ${index < (5 - attemptsLeft) ? 'active' : ''}`}
                    ></div>
                ))}       
            </div>
        </div>
    );
}

export default Game1;