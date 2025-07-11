import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useState, useEffect } from "react";

const HERO_TITLE = "How the World Sees AI Differently";

const TextEffect = () => {
  const [text] = useTypewriter({
    words: [HERO_TITLE],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 9999,
  });

  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (text === HERO_TITLE) {
      setShowCursor(false);
    }
  }, [text]);

  return (
    <>
      {text}
      {showCursor && <Cursor style={{ width: "1px" }} />}
    </>
  );
};

export default TextEffect; 