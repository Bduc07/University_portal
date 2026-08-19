// src/courses/Course5details.js
import React from 'react';

function Course5details() {
  return (
    <div className="course-details px-4 pb-6">
      <div className="title-container mb-6">
        <span className="course-code text-xl font-bold text-[#1F386B]">5CS037</span>
        <h1 className="text-3xl font-bold text-left text-[#1F386B]">Concepts and Technologies of AI</h1>
      </div>
      <p className="subtitle text-sm text-[#666]">5CS037-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">1. Introduction to AI</h2>
        <h3 className="text-lg font-medium mt-4">What is Artificial Intelligence?</h3>
        <p className="text-sm text-[#666]">
          Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, particularly computer systems. These processes include learning, reasoning, and self-correction.
        </p>

        <h3 className="text-lg font-medium mt-4">Why Study AI?</h3>
        <p className="text-sm text-[#666]">
          AI is rapidly transforming industries by enabling machines to perform tasks that traditionally required human intelligence. It has applications in various fields, including healthcare, finance, robotics, and more.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">2. Machine Learning</h2>
        <h3 className="text-lg font-medium mt-4">What is Machine Learning?</h3>
        <p className="text-sm text-[#666]">
          Machine Learning (ML) is a subset of AI that allows systems to learn from data, improve over time, and make predictions without explicit programming.
        </p>

        <h3 className="text-lg font-medium mt-4">Types of Machine Learning</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Supervised Learning</li>
          <li>Unsupervised Learning</li>
          <li>Reinforcement Learning</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Benefits of Machine Learning</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Improved decision-making through data analysis</li>
          <li>Automation of repetitive tasks</li>
          <li>Enhanced personalization of services</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">3. Deep Learning</h2>
        <h3 className="text-lg font-medium mt-4">What is Deep Learning?</h3>
        <p className="text-sm text-[#666]">
          Deep Learning is a specialized form of machine learning that uses neural networks with many layers to analyze various forms of data, such as images, speech, and text.
        </p>

        <h3 className="text-lg font-medium mt-4">Applications of Deep Learning</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Image recognition</li>
          <li>Natural language processing</li>
          <li>Self-driving cars</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Challenges in Deep Learning</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Data requirements</li>
          <li>Computational power</li>
          <li>Overfitting</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">4. Natural Language Processing (NLP)</h2>
        <h3 className="text-lg font-medium mt-4">What is NLP?</h3>
        <p className="text-sm text-[#666]">
          Natural Language Processing (NLP) is a field of AI that focuses on the interaction between computers and human language, enabling machines to understand, interpret, and generate human language.
        </p>

        <h3 className="text-lg font-medium mt-4">Applications of NLP</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Speech recognition</li>
          <li>Chatbots</li>
          <li>Sentiment analysis</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">5. AI in Real-World Applications</h2>
        <h3 className="text-lg font-medium mt-4">AI in Healthcare</h3>
        <p className="text-sm text-[#666]">
          AI is revolutionizing healthcare by enabling more accurate diagnoses, personalized treatment plans, and improved drug discovery.
        </p>

        <h3 className="text-lg font-medium mt-4">AI in Autonomous Vehicles</h3>
        <p className="text-sm text-[#666]">
          Autonomous vehicles use AI and machine learning to interpret data from sensors, making decisions about speed, direction, and obstacle avoidance in real-time.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">6. Conclusion</h2>
        <p className="text-sm text-[#666]">
          AI is a transformative technology with the potential to change many aspects of our daily lives. By studying AI concepts, machine learning, and deep learning, we can contribute to the development of intelligent systems that improve efficiency, safety, and innovation.
        </p>
      </section>
    </div>
  );
}

export default Course5details;
