import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const CROSSFADE_DURATION = 0.2;

const DatasetSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const staticImg1Ref = useRef<HTMLImageElement>(null);
  const staticImg2Ref = useRef<HTMLImageElement>(null);
  const [img1TopPx, setImg1TopPx] = useState<number | null>(null);
  const [img2TopPx, setImg2TopPx] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [isAnimated, setIsAnimated] = useState(false);
  const [crossfade, setCrossfade] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.01 && !isAnimated) {
        setCrossfade(true);
        setIsAnimated(true);
        timeout = setTimeout(() => setCrossfade(false), CROSSFADE_DURATION * 1000);
      } else if (v <= 0.01 && isAnimated) {
        setIsAnimated(false);
        setCrossfade(false);
      }
    });
    return () => {
      unsubscribe();
      if (timeout) clearTimeout(timeout);
    };
  }, [scrollYProgress, isAnimated]);

  useLayoutEffect(() => {
    if (!isAnimated && staticImg1Ref.current && staticImg2Ref.current && ref.current) {
      const containerRect = ref.current.getBoundingClientRect();
      const img1Rect = staticImg1Ref.current.getBoundingClientRect();
      const img2Rect = staticImg2Ref.current.getBoundingClientRect();
      setImg1TopPx(img1Rect.top - containerRect.top);
      setImg2TopPx(img2Rect.top - containerRect.top);
    }
  }, [isAnimated]);

  // Animation starts at 0.2 and ends at 0.7 scroll progress
  const ANIMATION_START = 0.2;
  const ANIMATION_END = 0.7;

  const img1Scale = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], [1, 0.4]);
  const img1Left = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], ['50%', '-9%']);
  const img1X = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], ['-50%', '0%']);
  const img1Top = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], [img1TopPx !== null ? `${img1TopPx}px` : '40%', '10%']);
  const img1Opacity = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], [1, 0.85]);

  const img2Scale = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], [1, 0.4]);
  const img2Left = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], ['50%', 'auto']);
  const img2Right = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], ['auto', '-104px']);
  const img2X = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], ['-50%', '0%']);
  const img2Top = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], [img2TopPx !== null ? `${img2TopPx}px` : '60%', '40%']);
  const img2Opacity = useTransform(scrollYProgress, [ANIMATION_START, ANIMATION_END], [1, 0.85]);

  const textOpacity = useTransform(scrollYProgress, [ANIMATION_START + 0.1, ANIMATION_END], [0, 1]);

  return (
    <section className="w-full pt-24 px-4" style={{ backgroundColor: '#FFFAF2' }} ref={ref}>
      <div className="z-30 w-full bg-[#FFFAF2] pt-4">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide text-center uppercase font-sans" style={{ letterSpacing: '0.08em', marginBottom: '20px' }}>
          Dataset
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center z-10">
        <div className="relative w-full flex flex-col items-center justify-center">
          <AnimatePresence>
            {(!isAnimated || crossfade) && (
              <motion.div
                className="flex flex-col items-center gap-12 absolute w-full left-0 top-0"
                initial={{ opacity: 1 }}
                animate={{ opacity: crossfade ? 0 : 1, transition: { duration: CROSSFADE_DURATION } }}
                exit={{ opacity: 0, transition: { duration: CROSSFADE_DURATION } }}
                style={{ zIndex: 1 }}
              >
                <img
                  ref={staticImg1Ref}
                  src="/assets/emotional-tone.png"
                  alt="Emotional Tone Graph"
                  className="max-w-xl rounded-lg shadow-lg"
                />
                <img
                  ref={staticImg2Ref}
                  src="/assets/preference-region.png"
                  alt="Preference by Region Graph"
                  className="max-w-xl rounded-lg shadow-lg"
                />
              </motion.div>
            )}
          </AnimatePresence>
          {isAnimated && (
            <>
              <motion.img
                src="/assets/emotional-tone.png"
                alt="Emotional Tone Graph"
                style={{
                  position: 'absolute',
                  scale: img1Scale,
                  left: img1Left,
                  x: img1X,
                  top: img1Top,
                  opacity: img1Opacity,
                  zIndex: 0,
                  transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="max-w-xl rounded-lg shadow-lg"
              />
              <motion.img
                src="/assets/preference-region.png"
                alt="Preference by Region Graph"
                style={{
                  position: 'absolute',
                  scale: img2Scale,
                  left: img2Left,
                  right: img2Right,
                  x: img2X,
                  top: img2Top,
                  opacity: img2Opacity,
                  zIndex: 0,
                  transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="max-w-xl rounded-lg shadow-lg"
              />
            </>
          )}
          <motion.div
            className="max-w-50rem mx-auto text-gray-900 font-serif text-xl leading-relaxed z-10 bg-[#FFFAF2]"
            style={{ textAlign: 'left', opacity: textOpacity, marginTop: '110px' }}
          >
            <p>
              Inclusive technology comes from research and deliberate effort to understand people’s lives, no matter how different it may be. Therefore, for the Global Dialogues Challenge, we decided to approach the data with all this mind; not only looking at what was said but who was saying it, and from where. We explored the responses of thousands of respondents, paying special attention to how answers varied by region and setting. From urban to rural, the Global North to the Global South, we grouped and analyzed responses to uncover patterns in how people perceived AI.
            </p>
            <p className="mt-6">
              The data we analyzed consisted of thousands of people’s opinions and perspectives on AI. The dataset also included key demographic data, where participants stated where they were from, what urban setting they lived in (i.e, Rural, Suburban, or Urban), what languages they spoke, and more. The survey was conducted in multiple languages and then machine translated into English for analysis, allowing participants to respond in their preferred language.
            </p>
            <p className="mt-6">
              It is important to note that this survey does not serve as a holistic overview of the population as there are more respondents from certain regions or countries than others. For example, 66.1% of the respondents were of an urban setting as opposed to 7.3% who were from a rural background (and the remaining selecting Suburban). This does not directly correlate to the world distribution, as The World bank states 42.8% of the world currently live in a rural setting (as per 2023)<sup className="text-xs align-super">[3]</sup>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DatasetSection; 