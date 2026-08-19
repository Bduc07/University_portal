// src/courses/Course2details.js
import React from 'react';

function Course2details() {
  return (
    <div className="course-details px-4 sm:px-8 pb-4">
      <div className="title-container text-left mb-6">
        <span className="course-code text-xl font-bold text-[#1F386B]">4CS020/CM1</span>
        <h1 className="text-3xl font-semibold text-[#1F386B]">Computational Mathematics</h1>
      </div>
      <p className="subtitle text-base text-[#666] mb-6">4CS020-COMP-MATH, Assessment Submission Term: 2023/4 CMATH</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">1. Introduction to Computational Mathematics</h2>
        <p className="text-base text-[#666] mb-4">
          Computational Mathematics blends mathematical theory with the power of computing to solve real-world problems.
          It bridges numerical analysis, algorithms, and data science, offering precise and efficient solutions when pen-and-paper math taps out.
        </p>
        <p className="text-base text-[#666]">
          This course equips students with tools to analyze, model, and solve mathematical problems using computational techniques and programming.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">2. Number Systems and Representation</h2>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Binary, Octal, Decimal & Hexadecimal</h3>
        <ul className="list-disc pl-6 text-[#666] mb-4">
          <li>Understanding conversions between bases</li>
          <li>Floating-point representation & IEEE 754 standard</li>
        </ul>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Errors and Precision</h3>
        <ul className="list-disc pl-6 text-[#666]">
          <li>Rounding Errors</li>
          <li>Truncation Errors</li>
          <li>Machine Epsilon</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">3. Numerical Methods</h2>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Root Finding Techniques</h3>
        <ul className="list-disc pl-6 text-[#666] mb-4">
          <li>Bisection Method</li>
          <li>Newton-Raphson Method</li>
          <li>Secant Method</li>
        </ul>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Linear Systems Solvers</h3>
        <ul className="list-disc pl-6 text-[#666] mb-4">
          <li>Gaussian Elimination</li>
          <li>LU Decomposition</li>
          <li>Iterative Methods: Jacobi & Gauss-Seidel</li>
        </ul>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Interpolation and Approximation</h3>
        <ul className="list-disc pl-6 text-[#666]">
          <li>Lagrange Polynomials</li>
          <li>Newton’s Divided Difference</li>
          <li>Least Squares Method</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">4. Numerical Differentiation and Integration</h2>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Finite Difference Methods</h3>
        <p className="text-base text-[#666] mb-4">
          Approximate the derivative of functions when analytical methods are not feasible.
        </p>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Numerical Integration</h3>
        <ul className="list-disc pl-6 text-[#666]">
          <li>Trapezoidal Rule</li>
          <li>Simpson’s Rule</li>
          <li>Romberg Integration</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">5. Ordinary Differential Equations (ODEs)</h2>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Initial Value Problems</h3>
        <ul className="list-disc pl-6 text-[#666] mb-4">
          <li>Euler’s Method</li>
          <li>Runge-Kutta Methods (2nd & 4th Order)</li>
        </ul>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Stability and Convergence</h3>
        <p className="text-base text-[#666]">
          Understand the reliability and accuracy of ODE solutions across iterations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">6. Computational Tools & Environments</h2>
        <h3 className="text-xl font-semibold text-[#1F386B] mb-2">Languages and Platforms</h3>
        <ul className="list-disc pl-6 text-[#666] mb-4">
          <li>MATLAB</li>
          <li>Python (NumPy, SciPy, Matplotlib)</li>
          <li>Maple or Mathematica</li>
        </ul>
        <p className="text-base text-[#666]">
          Learn to write scripts and functions for numerical operations, data visualization, and algorithm implementation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">7. Applications in Real Life</h2>
        <p className="text-base text-[#666] mb-4">
          Computational math finds its way into engineering simulations, economic forecasting, machine learning, physics models, and medical imaging.
        </p>
        <ul className="list-disc pl-6 text-[#666]">
          <li>Solving structural equations in civil engineering</li>
          <li>Simulating flight dynamics in aerospace</li>
          <li>Optimizing operations research in business</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F386B] mb-4">8. Assessment and Learning Outcomes</h2>
        <ul className="list-disc pl-6 text-[#666] mb-4">
          <li>Understand and apply numerical methods for solving equations</li>
          <li>Analyze computational accuracy and algorithm efficiency</li>
          <li>Use software tools to model and visualize mathematical problems</li>
          <li>Critically evaluate solution techniques based on error and stability</li>
        </ul>
        <p className="text-base text-[#666]">
          You’ll be assessed through a combination of theoretical quizzes, lab-based coding assessments, and a final applied project.
        </p>
      </section>
    </div>
  );
}

export default Course2details;
