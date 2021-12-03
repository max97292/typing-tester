import React, { useEffect, useState } from 'react';
import useCountDown from 'react-countdown-hook';
import './App.css';

const secondsToCount = 15;
const paragraph = `Coding is the best. We are able to build something from scratch. It is literally imagination incarnate. Solving our own problems through coding is one of the coolest things we could do!`;

function findTypos(str1, str2) {
  let typos = [];

  str2.split('').forEach(function (character, index) {
    if (character !== str1.charAt(index)) typos.push(index);
  });

  return typos;
}

export default function App() {
  const [timeLeft, { start, reset }] = useCountDown(secondsToCount * 1000, 100);
  const [typedText, setTypedText] = useState('');
  const [typoIndexes, setTypoIndexes] = useState([]);

  useEffect(() => {
    setTypoIndexes(findTypos(paragraph, typedText));
  }, [typedText]);

  useEffect(() => {
    if (typedText.length === 0) return;
    if (timeLeft !== 0) return;

    const wordsTyped = (typedText.length - typoIndexes.length) / 5;
    const minMultiplier = 60 / secondsToCount;
    const wpm = wordsTyped * minMultiplier;

    alert(`You type at a ${wpm.toFixed(2)} WPM!`);
  }, [timeLeft]);

  function startTimer() {
    setTypedText('');
    start();
  }

  function resetTimer() {
    setTypedText('');
    reset();
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <div className='timer'>{(timeLeft / 1000).toFixed(2)}</div>
        <button className='start' onClick={() => startTimer()}>
          Start
        </button>
        <button className='reset' onClick={() => resetTimer()}>
          Reset
        </button>
      </div>

      <div className='content'>
        <p>
          {paragraph.split('').map((character, index) => {
            let characterClass = '';
            const hasBeenTyped = typedText.length > index;
            if (hasBeenTyped) {
              characterClass = typoIndexes.includes(index)
                ? 'incorrect'
                : 'correct';
            }

            return (
              <span key={index} className={characterClass}>
                {character}
              </span>
            );
          })}
        </p>

        <form>
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            rows='10'
            placeholder='Test your typing skills...'
          />
        </form>
      </div>
    </div>
  );
}
