import React from 'react';

const IntroSection: React.FC = () => (
  <section className="w-full py-12 px-4" style={{ backgroundColor: '#FFFAF2' }}>
    <div className="max-w-50rem mx-auto text-gray-900 font-serif text-xl leading-relaxed">
      <p>
        Artificial Intelligence has been all the rage recently, from classrooms to corporations, political debates to dinner table conversations: everybody is talking about it.
        <span className="block mt-4 italic text-lg text-blue-900">
          Google’s CEO, Sundar Pichai calls it “one of the most profound technologies we are working on, as important or more than fire and electricity”
          <sup className="text-xs align-super">[1]</sup>.
        </span>
        <br />
        There is no doubt that people believe this revolutionary technology is going to bring about massive changes in the world as we know it. But beneath all this chatter, a quieter truth remains: while we are all talking about AI, we are not all talking about the same thing.
      </p>
      <p className="mt-8">
        For some, AI is seen as a helpful tool, something that can simplify tasks or solve real-world problems. For others, it’s a looming threat to jobs, privacy, or even humanity as we know it. In one part of the world, people might imagine AI as a teacher, a doctor, or a friend. In another, it’s still a distant concept, far removed from daily life. What people want from AI can be different due to a number of reasons such as where they live, what they have access to, what they need, and so much more. A rural farmer in Kenya might wish for technology that helps predict the rain for his crops. A teenager in Berlin might want an AI that explains their math homework in their own slang. These aren’t just different perspectives. They’re shaped by different needs, different realities, different lives.
      </p>
    </div>
  </section>
);

export default IntroSection; 