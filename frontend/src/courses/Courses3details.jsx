import React from 'react';

function Course3details() {
  return (
    <div className="px-4">
      <div className="flex flex-col items-start mb-6">
        <span className="text-lg font-semibold text-blue-900">5CS021/HJ1</span>
        <h1 className="text-3xl font-bold text-blue-900">Numerical Methods and Concurrency</h1>
      </div>
      <p className="text-gray-700 text-sm mb-8">5CS021-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">1. Introduction to Numerical Methods</h2>
        <p className="text-gray-700 mt-2">
          Numerical methods involve the development and application of algorithms to solve mathematical problems that are too complex for analytical solutions. In this course, you'll learn how to solve a variety of problems using computational techniques.
        </p>
        <p className="text-gray-700 mt-2">
          The focus is on understanding the theory behind numerical methods and implementing them in <strong>C</strong> to gain hands-on experience.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">2. Root-Finding Algorithms</h2>
        <h3 className="text-lg font-medium text-blue-700">Techniques for Solving Non-Linear Equations</h3>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>Newton-Raphson Method</li>
          <li>Bisection Method</li>
          <li>Secant Method</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Learn how to approximate solutions to equations that don’t have closed-form solutions using iterative methods.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">3. Polynomial Interpolation and Spline Fitting</h2>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>Lagrange Polynomial Interpolation</li>
          <li>Newton’s Divided Difference</li>
          <li>Spline Fitting</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Interpolation methods are key to estimating unknown values and creating smooth curves through given data points. You’ll also learn how to fit splines for more complex data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">4. Numerical Differentiation and Integration</h2>
        <h3 className="text-lg font-medium text-blue-700">Approximation Techniques for Derivatives and Integrals</h3>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>Finite Difference Method</li>
          <li>Trapezoidal Rule</li>
          <li>Simpson’s Rule</li>
        </ul>
        <p className="text-gray-700 mt-2">
          These methods approximate the derivatives and integrals of functions, which is important when an analytical solution is not possible.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">5. Concurrency in Modern Systems</h2>
        <h3 className="text-lg font-medium text-blue-700">Understanding Threads, Locks, and Synchronization</h3>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>Thread Creation and Management</li>
          <li>Critical Sections</li>
          <li>Mutexes and Semaphores</li>
          <li>Deadlock Avoidance Strategies</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Learn how to manage multiple threads in modern operating systems and ensure efficient resource usage and synchronization.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">6. Race Conditions and Thread Safety</h2>
        <p className="text-gray-700 mt-2">
          Understand how to identify and resolve race conditions to ensure that your programs can run reliably in a multi-threaded environment.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">7. Performance Optimization</h2>
        <h3 className="text-lg font-medium text-blue-700">Maximizing Efficiency in Parallel Algorithms</h3>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>Thread Pooling</li>
          <li>Load Balancing</li>
          <li>Performance Profiling</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Learn how to write efficient multi-threaded applications and optimize their performance, especially in parallel computing environments.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">8. Real-World Applications</h2>
        <p className="text-gray-700 mt-2">
          The techniques learned in this course are used in various fields such as:
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>High-performance simulations</li>
          <li>Real-time systems</li>
          <li>Cloud computing</li>
          <li>Scientific computing</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800">9. Assessment and Learning Outcomes</h2>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          <li>Master numerical methods for solving equations and systems of equations</li>
          <li>Understand the theoretical and practical aspects of concurrency</li>
          <li>Develop efficient, thread-safe programs for modern multi-core systems</li>
          <li>Evaluate and optimize performance for concurrent algorithms</li>
        </ul>
        <p className="text-gray-700 mt-2">
          The assessment will include both theoretical and practical components, including programming assignments and a final project.
        </p>
      </section>
    </div>
  );
}

export default Course3details;
