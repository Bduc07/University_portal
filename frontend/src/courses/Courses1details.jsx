// src/courses/Course1details.js
import React from 'react';

function Course1details() {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-8 font-serif text-black">
      <div className="mb-8">
        <span className="text-2xl font-bold text-blue-800">4CS015/HJ1</span>
        <h1 className="text-3xl font-extrabold text-blue-800 mt-2">Fundamentals of Computing</h1>
      </div>
      <p className="text-lg text-gray-700 mb-8">4CS015-OSEAI-HJ1, Assessment Submission Term: 2023/4 OSEAI</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">1. Introduction to Computing</h2>
        <h3 className="text-xl font-semibold text-black mb-2">What is Computing?</h3>
        <p className="text-lg mb-4">
          Computing refers to the use of computers to process and store data, solve problems, and automate tasks.
          It involves both hardware (physical components) and software (programs and instructions).
        </p>

        <h3 className="text-xl font-semibold text-black mb-2">History of Computing</h3>
        <h4 className="text-lg font-semibold text-black mb-2">Early Computers:</h4>
        <p className="text-lg mb-4">Charles Babbage's Analytical Engine: The first concept of a mechanical computer.</p>
        <p className="text-lg mb-4">Alan Turing: Introduced the idea of the Universal Turing Machine, laying the foundation for modern computing.</p>
        <h4 className="text-lg font-semibold text-black mb-2">The Evolution of Computing:</h4>
        <p className="text-lg mb-4">From vacuum tubes to transistors and microprocessors.</p>
        <p className="text-lg mb-4">The rise of personal computers in the 1970s (e.g., Apple I, IBM PCs).</p>
        <p className="text-lg mb-4">The development of graphical user interfaces (GUIs) in the 1980s.</p>

        <h3 className="text-xl font-semibold text-black mb-2">Types of Computers</h3>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Analog Computers: Used for continuous data, e.g., thermometers, speedometers.</li>
          <li>Digital Computers: Process data in discrete values, e.g., modern computers.</li>
          <li>Supercomputers: Extremely powerful computers used for scientific calculations.</li>
          <li>Mainframes: Large, powerful machines used for bulk data processing.</li>
          <li>Minicomputers: Smaller than mainframes but still powerful for specialized tasks.</li>
          <li>Microcomputers: Personal computers (e.g., desktops, laptops).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">2. Computer Hardware</h2>
        <h3 className="text-xl font-semibold text-black mb-2">Basic Components of a Computer</h3>

        <h4 className="text-lg font-semibold text-black mb-2">Central Processing Unit (CPU):</h4>
        <p className="text-lg mb-4">The brain of the computer that carries out instructions from programs. Includes components like ALU (Arithmetic Logic Unit) and Control Unit.</p>
        <p className="text-lg mb-4">Clock Speed: Determines how fast the CPU can execute instructions (measured in GHz).</p>

        <h4 className="text-lg font-semibold text-black mb-2">Memory:</h4>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>RAM (Random Access Memory): Temporary storage for actively used data and instructions. It is volatile (data is lost when the computer is turned off).</li>
          <li>ROM (Read-Only Memory): Permanent memory, typically used for firmware that is not meant to be modified.</li>
          <li>Cache Memory: A small, fast memory unit used to store frequently accessed data.</li>
        </ul>

        <h4 className="text-lg font-semibold text-black mb-2">Storage Devices:</h4>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Hard Disk Drive (HDD): Mechanical storage that stores data on spinning platters.</li>
          <li>Solid State Drive (SSD): Faster than HDDs, uses flash memory for storage.</li>
          <li>Optical Discs: CD/DVD/Blu-ray used for media and data storage.</li>
        </ul>

        <h4 className="text-lg font-semibold text-black mb-2">Input Devices:</h4>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Keyboard, Mouse, Microphone, Camera, Touchpad, etc.</li>
        </ul>

        <h4 className="text-lg font-semibold text-black mb-2">Output Devices:</h4>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Monitor, Printer, Speakers, etc.</li>
        </ul>

        <h4 className="text-lg font-semibold text-black mb-2">Motherboard:</h4>
        <p className="text-lg mb-4">The main circuit board that connects all components.</p>

        <h4 className="text-lg font-semibold text-black mb-2">Power Supply Unit (PSU):</h4>
        <p className="text-lg mb-4">Converts electrical power to usable energy for the computer.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">3. Computer Software</h2>

        <h3 className="text-xl font-semibold text-black mb-2">System Software</h3>
        <h4 className="text-lg font-semibold text-black mb-2">Operating System (OS):</h4>
        <p className="text-lg mb-4">Manages hardware resources and provides services for application programs.</p>
        <p className="text-lg mb-4">Examples: Windows, Linux, macOS.</p>

        <h4 className="text-lg font-semibold text-black mb-2">Device Drivers:</h4>
        <p className="text-lg mb-4">Software that enables the operating system to interact with hardware components (e.g., printer drivers, graphics drivers).</p>

        <h3 className="text-xl font-semibold text-black mb-2">Application Software</h3>
        <h4 className="text-lg font-semibold text-black mb-2">Definition:</h4>
        <p className="text-lg mb-4">Programs designed to perform specific tasks, such as word processing, browsing the web, or playing games.</p>
        <p className="text-lg mb-4">Examples: Microsoft Word, Google Chrome, Photoshop.</p>

        <h3 className="text-xl font-semibold text-black mb-2">Utility Software</h3>
        <h4 className="text-lg font-semibold text-black mb-2">Definition:</h4>
        <p className="text-lg mb-4">Programs that help manage, optimize, and protect the computer.</p>
        <p className="text-lg mb-4">Examples: Antivirus software, disk management tools, backup software.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">4. Data Representation</h2>
        <h3 className="text-xl font-semibold text-black mb-2">Binary Number System</h3>
        <p className="text-lg mb-4">Binary (Base-2): Computers represent data using the binary system, which consists of only two digits: 0 and 1. Each binary digit is called a bit.</p>
        <p className="text-lg mb-4">Byte: A group of 8 bits. One byte can represent 256 different values (0 to 255).</p>

        <h3 className="text-xl font-semibold text-black mb-2">Data Types and Representation</h3>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Integer: Whole numbers represented in binary form.</li>
          <li>Floating Point: Numbers with fractional parts (e.g., 3.14).</li>
          <li>Boolean: Represents true (1) or false (0).</li>
          <li>Character: Represented using ASCII (American Standard Code for Information Interchange) or Unicode.</li>
        </ul>

        <h4 className="text-lg font-semibold text-black mb-2">ASCII:</h4>
        <p className="text-lg mb-4">Encodes 128 characters into 7 bits.</p>

        <h4 className="text-lg font-semibold text-black mb-2">Unicode:</h4>
        <p className="text-lg mb-4">A more comprehensive character encoding system that includes thousands of characters from different languages and symbols.</p>

        <h3 className="text-xl font-semibold text-black mb-2">Number Systems in Computing</h3>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Decimal (Base-10): The standard number system we use in everyday life.</li>
          <li>Hexadecimal (Base-16): Often used in programming to represent large binary numbers more compactly.</li>
          <li>Hexadecimal digits: 0-9 and A-F.</li>
        </ul>

        <h4 className="text-lg font-semibold text-black mb-2">Conversion between binary, decimal, and hexadecimal is crucial in understanding how computers represent data.</h4>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">5. Basic Programming Concepts</h2>

        <h3 className="text-xl font-semibold text-black mb-2">What is Programming?</h3>
        <p className="text-lg mb-4">Programming is the process of creating software using a set of instructions that a computer can execute.</p>

        <h3 className="text-xl font-semibold text-black mb-2">Programming Languages</h3>
        <h4 className="text-lg font-semibold text-black mb-2">High-Level Languages:</h4>
        <p className="text-lg mb-4">Easy for humans to understand (e.g., Python, Java, C).</p>

        <h4 className="text-lg font-semibold text-black mb-2">Low-Level Languages:</h4>
        <p className="text-lg mb-4">Close to machine code, harder for humans to understand (e.g., Assembly, Machine Language).</p>

        <h3 className="text-xl font-semibold text-black mb-2">Algorithms</h3>
        <h4 className="text-lg font-semibold text-black mb-2">Definition:</h4>
        <p className="text-lg mb-4">A set of step-by-step instructions to solve a problem or perform a task.</p>
        <p className="text-lg mb-4">Characteristics: Finiteness, definiteness, input/output, effectiveness.</p>

        <h3 className="text-xl font-semibold text-black mb-2">Control Structures</h3>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Sequencing: Executing statements in the order they appear.</li>
          <li>Selection (Conditionals): Choosing between different paths (e.g., if, else statements).</li>
          <li>Iteration (Loops): Repeating a block of code (e.g., for, while loops).</li>
        </ul>

        <h3 className="text-xl font-semibold text-black mb-2">Variables and Data Types</h3>
        <p className="text-lg mb-4">Variables: Named locations in memory where data is stored.</p>
        <p className="text-lg mb-4">Data Types: Defines the type of value a variable can hold (e.g., Integer, String, Boolean).</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">6. Computer Networks and the Internet</h2>

        <h3 className="text-xl font-semibold text-black mb-2">What is a Computer Network?</h3>
        <p className="text-lg mb-4">A system of interconnected computers that share resources (e.g., LAN (Local Area Network), WAN (Wide Area Network)).</p>

        <h3 className="text-xl font-semibold text-black mb-2">Internet Basics</h3>
        <p className="text-lg mb-4">Internet: A global system of interconnected networks that communicate using the Internet Protocol (IP).</p>
        <p className="text-lg mb-4">Web: A system of information accessed via browsers using the HTTP/HTTPS protocols.</p>

        <h3 className="text-xl font-semibold text-black mb-2">Networking Protocols</h3>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>TCP/IP (Transmission Control Protocol/Internet Protocol): A set of rules for communication between devices on a network.</li>
          <li>HTTP/HTTPS: Protocols for transferring data over the web.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">7. Computer Security and Ethics</h2>

        <h3 className="text-xl font-semibold text-black mb-2">Computer Security</h3>
        <h4 className="text-lg font-semibold text-black mb-2">Threats:</h4>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Viruses, Malware, Phishing, Hacking.</li>
          <li>Denial of Service (DoS) Attacks.</li>
        </ul>

        <h4 className="text-lg font-semibold text-black mb-2">Security Measures:</h4>
        <ul className="list-inside list-disc text-lg mb-4">
          <li>Antivirus Software, Firewalls, Encryption.</li>
          <li>Two-Factor Authentication (2FA).</li>
        </ul>

        <h3 className="text-xl font-semibold text-black mb-2">Ethics in Computing</h3>
        <p className="text-lg mb-4">Computing professionals are responsible for ensuring that the systems they build and maintain are secure, ethical, and respect user privacy.</p>
      </section>
    </div>
  );
}

export default Course1details;
