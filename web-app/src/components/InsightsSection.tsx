import React, { useRef, useState, useEffect } from 'react';

const insights = [
  {
    question: "What is another positive outcome you can imagine happening from AI? What would need to be true for that to happen?",
    answer: (
      <>
        <p>It seems only fitting to discuss these two questions together as their responses pair up quite well. For positive outcomes of AI, there seems to be a shared sentiment across Rural, Suburban, and Urban respondents, all mentioning keywords such as ‘help’, ‘better’, and ‘health’. They also shared ideas about AI as a tool to help with tasks to make life easier for people.</p>
        <p>When analyzing the responses for dangerous outcomes of AI there was some shared sentiment about the threat to jobs as per the introduction of AI. Interestingly, most respondents from rural and suburban settings displayed some concern about threats to privacy, and although this was also mentioned in the urban responses, it was far less prevalent in the latter. Some research shows that the privacy concerns associated with AI and other technologies can affect rural communities more than urban ones, hence possibly explaining this trend in the data. The Sustainability Directory talks about how the close-knit nature of rural communities means possible data breaches or incidents can quickly create a collective grievance for the community [4]. Therefore the privacy dilemmas associated with the integration of AI is more significant in these settings.</p>
      </>
    ),
  },
  {
    question: "What kinds of cultural things would you be most worried about losing in a future with advanced AI?",
    answer: (
      <>
        <p>Answers to this question become more specific to each individual’s understanding and personal fears in a future with advanced AI technologies. To analyze these qualitative responses about culture, we applied sentiment and emotion detection techniques. Each response was scored for overall sentiment polarity, revealing the general positive or negative tone, alongside the intensity of specific emotions (joy, fear, disgust, etc.). By grouping responses according to respondents’ living environments (urban, suburban, rural), we compared emotional tones across these different contexts.</p>
      </>
    ),
  },
];

const culturalResponses = [
  {
    region: 'Rural, Peru',
    text: '“The idioms of our language, I feel that it would be somewhat dehumanizing if AI started using the same words as internet users and deliberately implemented them.”',
    emotions: ['Anger', 'Negative'],
  },
  {
    region: 'Rural, Algeria',
    text: '“I’m worried about losing languages. We come from different cultures and countries. We speak different languages and that’s what makes us special. But with AI being programmed solely in English, we will definitely lose all of that.”',
    emotions: ['Sadness', 'Negative', 'Fear'],
  },
  {
    region: 'Rural, Switzerland',
    text: '“I am worried about literature and art created by AI.”',
    emotions: ['Negative', 'Anticipation'],
  },
  {
    region: 'Urban, Philippines',
    text: '“Individuality. People can lose how they act, look, and speak in pursuit of being \"one\" with other people.”',
    emotions: ['Negative', 'Disgust', 'Fear'],
  },
  {
    region: 'Urban, Germany',
    text: '“The interpersonal aspects. Traditions of drinking, eating, speaking and general get-togethers”',
    emotions: ['Positive', 'Trust'],
  },
];

const CulturalResponsesFlow = ({ responses }: { responses: typeof culturalResponses }) => (
  <div className="flex flex-col gap-8 mt-8">
    {responses.map((resp, idx) => (
      <div key={idx} className="p-6 rounded-xl shadow bg-white border border-blue-200">
        <div className="font-semibold text-blue-800 mb-2">{resp.region}</div>
        <div className="italic text-lg mb-2">{resp.text}</div>
        <div className="text-sm text-gray-600">Emotions: {resp.emotions.join(', ')}</div>
      </div>
    ))}
  </div>
);

const HandDrawnSVGBubble = ({ text, flip }: { text: string, flip?: boolean }) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  words.forEach(word => {
    if ((currentLine + ' ' + word).trim().length > 26) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  });
  if (currentLine) lines.push(currentLine.trim());

  return (
    <svg viewBox="0 0 400 260" width="100%" height="auto" style={{ display: 'block', marginBottom: '2rem' }}>
      <g transform={flip ? 'scale(-1,1) translate(-400,0)' : undefined}>
        <path
          d="M20,80 Q10,30 60,60 Q100,0 200,60 Q300,0 340,80 Q390,140 340,220 Q300,260 200,240 Q100,260 60,220 Q10,180 20,80 Z"
          fill="#bfdbfe"
          stroke="#2563eb"
          strokeWidth="4"
        />
      </g>
      <g fontFamily="'Caveat Brush', cursive" fontSize="24" fill="#2563eb">
        {lines.map((line, i) => (
          <text
            key={i}
            x="50%"
            y={`${90 + i * 32}`}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {line}
          </text>
        ))}
      </g>
    </svg>
  );
};

const CulturalResponsesStepper = ({ question, responses }: { question: string; responses: typeof culturalResponses }) => {
  const steps = [
    { type: 'question', content: <div className="question-bubble mb-8"><HandDrawnSVGBubble text={question} /></div> },
    ...responses.map((resp, idx) => ({
      type: 'response',
    content: (
        <div className="p-6 rounded-xl shadow bg-white border border-blue-200">
          <div className="font-semibold text-blue-800 mb-2">{resp.region}</div>
          <div className="italic text-lg mb-2">{resp.text}</div>
          <div className="text-sm text-gray-600">Emotions: {resp.emotions.join(', ')}</div>
        </div>
      )
    }))
  ];

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(idx);
          }
        },
        { root: null, threshold: 0.5 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      {/* Left: description and responses */}
      <div className="w-full">
        <div className="insight-answer prose max-w-none">
          <p>Answers to this question become more specific to each individual’s understanding and personal fears in a future with advanced AI technologies. To analyze these qualitative responses about culture, we applied sentiment and emotion detection techniques. Each response was scored for overall sentiment polarity, revealing the general positive or negative tone, alongside the intensity of specific emotions (joy, fear, disgust, etc.). By grouping responses according to respondents’ living environments (urban, suburban, rural), we compared emotional tones across these different contexts.</p>
          <p style={{marginBottom: '50px'}}>A lot of responses were concerned with the potential loss of language and humanity in a future with advanced AI technology. Rather than seeing the divide in responses between urban settings, it was more interesting to notice how participants from different countries answered these questions. A lot of responses from Asia mentioned the fear of losing the connection to their mother tongue, with English becoming the default language of technology and therefore of AI as well. Responses from Central Europe often mentioned social aspects, related to human bonding and understanding. Rather than creating generalized patterns about what each country was most afraid of losing, this data moreso highlights the broad range of fears people have for a future of unregulated or uncontrolled AI systems.</p>
        </div>
        {/* Responses below the description */}
        <div className="flex flex-col gap-8 mt-20">
          {responses.map((resp, idx) => (
            <div
              key={idx}
              className={`w-[70%] max-w-[300px] mx-auto mb-32 flex flex-col justify-between bg-[#FFFDEB] shadow-xl rounded-lg border border-gray-200 p-6 relative transition-transform duration-300 ${idx % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'}`}
              style={{
                boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 1.5px 4px rgba(0,0,0,0.08)',
              }}
            >
              {/* Tape effect */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-16 h-4 bg-yellow-200 rounded opacity-80 z-10"></div>
              <div className="font-bold text-blue-800 mb-2 tracking-wide" style={{ fontFamily: 'Caveat Brush, cursive', fontSize: '1.2rem' }}>{resp.region}</div>
              <div className="flex-1 flex items-center justify-center">
                <span className="italic text-lg text-gray-800 text-center">{resp.text}</span>
              </div>
              <div className="mt-4 font-bold text-sm text-center pb-1 inline-block w-full" style={{letterSpacing: '0.01em', color: '#7A1EE3', borderBottomColor: '#7A1EE3'}}>
                Emotions: {resp.emotions.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right: sticky question bubble */}
      <div className="w-full flex flex-col items-center">
        <div className="question-bubble sticky top-24 w-full">
          <HandDrawnSVGBubble text={question} />
        </div>
      </div>
    </>
  );
};

const InsightsSection = () => {
  return (
    <section
      className="insights-section py-16 px-4 md:px-16"
      style={{ backgroundColor: '#FFFAF2' }}
    >
      <div className="z-30 w-full bg-[#FFFAF2] pt-4 pb-4">
        <h2
          className="text-5xl md:text-6xl font-extrabold tracking-wide text-center uppercase font-sans text-blue-900"
          style={{ letterSpacing: '0.08em', marginBottom: '40px' }}
        >
          Our Insights
        </h2>
      </div>
      {insights.map((insight, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {idx === 1 ? (
            <CulturalResponsesStepper question={insight.question} responses={culturalResponses} />
          ) : (
            idx % 2 === 0 ? (
              <>
                <div className="question-bubble sticky top-24">
                  <HandDrawnSVGBubble text={insight.question} flip={idx === 0} />
                </div>
                <div className="insight-answer prose max-w-none">
                  {insight.answer}
                </div>
              </>
            ) : (
              <>
                <div className="insight-answer prose max-w-none order-2 md:order-1">
                  {insight.answer}
                </div>
                <div className="question-bubble sticky top-24 self-start order-1 md:order-2">
                  <HandDrawnSVGBubble text={insight.question} />
                </div>
              </>
            )
          )}
        </div>
      ))}
    </section>
  );
};

export default InsightsSection; 