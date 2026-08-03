import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export function ScrambleIn({ text, delay = 0, triggered }) {
  const [displayed, setDisplayed] = useState('');
  const frameRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!triggered) { setDisplayed('\u00a0'); return; }
    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        frameRef.current += 0.5;
        const cursor = Math.floor(frameRef.current);
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') { result += ' '; continue; }
          if (i < cursor) { result += text[i]; }
          else if (i < cursor + 3) { result += rand(); }
          else { result += ''; }
        }
        setDisplayed(result);
        if (cursor >= text.length) {
          clearInterval(intervalRef.current);
          setDisplayed(text);
        }
      }, 25);
    }, delay);
    return () => { clearTimeout(startTimeout); clearInterval(intervalRef.current); frameRef.current = 0; };
  }, [triggered, text, delay]);

  return <span>{displayed || '\u00a0'}</span>;
}

export function ScrambleText({ text, isHovered, className = '' }) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      frameRef.current = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        frameRef.current += 1;
        const cursor = Math.floor(frameRef.current / 4);
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') { result += ' '; continue; }
          if (i < cursor) { result += text[i]; }
          else { result += rand(); }
        }
        setDisplayed(result);
        if (cursor >= text.length) {
          clearInterval(intervalRef.current);
          setDisplayed(text);
        }
      }, 25);
    } else {
      clearInterval(intervalRef.current);
      setDisplayed(text);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, text]);

  return <span className={className}>{displayed}</span>;
}

export default ScrambleText;
