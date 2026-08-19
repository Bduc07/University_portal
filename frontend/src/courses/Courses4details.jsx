// src/courses/Course4details.js
import React from 'react';

function Course4details() {
  return (
    <div className="course-details px-4 pb-6">
      <div className="title-container mb-6">
        <span className="course-code text-xl font-bold text-[#1F386B]">5CS024/HJ1</span>
        <h1 className="text-3xl font-bold text-left text-[#1F386B]">Collaborative Development</h1>
      </div>
      <p className="subtitle text-sm text-[#666]">5CS024-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">1. Introduction to Collaborative Development</h2>
        <h3 className="text-lg font-medium mt-4">What is Collaborative Development?</h3>
        <p className="text-sm text-[#666]">
          Collaborative Development refers to the practice of working together within a team to build, design, and deliver a software product. This involves collective problem-solving, the sharing of responsibilities, and seamless communication to achieve a common goal.
        </p>

        <h3 className="text-lg font-medium mt-4">Why Collaborative Development?</h3>
        <p className="text-sm text-[#666]">
          In modern software engineering, collaboration is key to success. It allows for pooling diverse skills and knowledge to create high-quality software in less time. Furthermore, it fosters innovation, increases productivity, and ensures that the team learns from each other’s strengths.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">2. Agile Methodology</h2>
        <h3 className="text-lg font-medium mt-4">What is Agile?</h3>
        <p className="text-sm text-[#666]">
          Agile is a project management methodology that emphasizes flexibility, iterative progress, and close collaboration with stakeholders. The core principle of Agile is delivering small, functional pieces of software regularly and continuously improving the product.
        </p>

        <h3 className="text-lg font-medium mt-4">Agile Practices</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Sprint Planning</li>
          <li>Daily Standups</li>
          <li>Retrospectives</li>
          <li>Continuous Integration/Continuous Deployment (CI/CD)</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Benefits of Agile</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Faster time-to-market</li>
          <li>Adaptability to changes</li>
          <li>Improved communication within teams</li>
          <li>Higher customer satisfaction</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">3. Version Control Systems</h2>
        <h3 className="text-lg font-medium mt-4">What is Version Control?</h3>
        <p className="text-sm text-[#666]">
          Version control is a system that allows multiple developers to work on a project simultaneously, keeping track of changes made to the codebase and enabling rollback if necessary.
        </p>

        <h3 className="text-lg font-medium mt-4">Popular Version Control Tools</h3>
        <ul className="list-disc list-inside text-sm text-[#666]">
          <li>Git: A distributed version control system widely used in collaborative development.</li>
          <li>SVN: A centralized version control system.</li>
          <li>Mercurial: Another distributed version control tool.</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Git Workflow</h3>
        <p className="text-sm text-[#666]">
          Developers use Git to track changes, create branches for features or fixes, and merge those changes into the main branch. Common commands include `git clone`, `git commit`, `git pull`, and `git push`.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">4. Communication in Collaborative Development</h2>
        <h3 className="text-lg font-medium mt-4">Effective Communication</h3>
        <p className="text-sm text-[#666]">
          Communication is one of the most important skills in collaborative development. Teams need to have clear channels of communication, using tools like Slack, Microsoft Teams, or emails for discussing features, bugs, and general project status.
        </p>

        <h3 className="text-lg font-medium mt-4">Documentation</h3>
        <p className="text-sm text-[#666]">
          Documenting the project’s progress and decisions made during development ensures that all team members are on the same page and helps onboard new team members quickly.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">5. Tools for Collaborative Development</h2>
        <h3 className="text-lg font-medium mt-4">Project Management Tools</h3>
        <p className="text-sm text-[#666]">
          Tools like JIRA, Trello, and Asana are used to manage tasks, track progress, and allocate responsibilities within the team.
        </p>

        <h3 className="text-lg font-medium mt-4">Code Collaboration Tools</h3>
        <p className="text-sm text-[#666]">
          Platforms like GitHub, GitLab, and Bitbucket allow teams to collaborate on code by providing repositories for code storage, version control, and issue tracking.
        </p>

        <h3 className="text-lg font-medium mt-4">CI/CD Tools</h3>
        <p className="text-sm text-[#666]">
          Continuous Integration and Continuous Deployment tools such as Jenkins, CircleCI, and Travis CI automate the build, testing, and deployment processes, enabling faster delivery of software.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">6. Conclusion</h2>
        <p className="text-sm text-[#666]">
          Collaborative development is a cornerstone of modern software engineering. By leveraging Agile methodologies, version control systems, effective communication, and specialized tools, development teams can work together efficiently to produce high-quality software.
        </p>
        <p className="text-sm text-[#666]">
          The success of a collaborative project ultimately depends on the synergy between team members, their ability to communicate, and the use of best practices in development. These elements combined lead to successful, scalable, and maintainable software.
        </p>
      </section>
    </div>
  );
}

export default Course4details;
