/**
 * WJEC GCSE Computer Science - Unit 1 topic tree (first teaching Sept 2025).
 * Each subtopic: notesHtml (exam-focused), flashcards for key terms.
 */
(function () {
  window.TOPICS = [
    {
      id: "t1",
      number: "1",
      title: "Computer Architecture",
      icon: "",
      subtopics: [
        {
          id: "1-1-components",
          title: "1.1 Components",
          notesHtml: `
            <h3>Von Neumann Architecture</h3>
            <p>Von Neumann Architecture is a design model which is used in modern computers holds both instructions and data. Its key units include: CPU (Central Processing Unit) executes the instructions, Memory (Primary Storage: Random Access Memory stores both instructions and data; Secondary Storage: SSD, HDD store data for retrieval at a later date), Input/Output (Devices such as keyboards, mice, monitors etc.), Buses (Bus system transfers data between components. The address bus, data bus and control bus).</p>
            <h3>The Central Processing Unit (CPU)</h3>
            <p>The CPU is the brain of the Computer. Its purpose is to execute instructions from programs, manage data, perform calculations and control the flow of data.</p>
            <h3>The Control Unit (CU)</h3>
            <p>The control unit directs the operation of the processor by controlling the flow of data between the CPU, memory and peripherals. It decodes the instruction and signals other parts of the CPU to perform actions during the execute phase.</p>
            <h3>Arithmetic and Logic Unit (ALU)</h3>
            <p>The ALU performs all arithmetic, such as, addition and subtraction, and logical comparison operations.</p>
            <h3>Registers</h3>
            <p>Registers are small, fast storage areas inside the CPU that hold data temporarily. The following registers are key to the fetch-decode-execute cycle:</p>
            <ul>
              <li><strong>Program Counter (PC):</strong> Holds the memory address of the next instruction to be fetched. After each fetch, the PC is incremented to point to the next instruction.</li>
              <li><strong>Current Instruction Register (CIR):</strong> Stores the instruction that has just been fetched from memory and is about to be decoded and executed.</li>
              <li><strong>Accumulator (ACC):</strong> Temporarily holds data being used during calculations in the ALU. It also stores the result of the operations performed by the ALU.</li>
              <li><strong>Memory Address Register (MAR):</strong> Holds the memory address of the data or instruction that needs to be fetched from or written to memory.</li>
              <li><strong>Memory Data Register (MDR):</strong> Temporarily stores the data being fetched from or written to memory. It works alongside the MAR. The MDR holds the actual data being transferred to or from the address specified by the MAR.</li>
            </ul>
            <h3>Cache Memory</h3>
            <p>Cache Memory is small, fast memory located in or near the CPU. It stores the frequently used instructions and data to reduce the time needed to access data from the main memory (RAM). It speeds up the fetch process in the cycle. There are three levels of cache: Level 1: The smallest and fastest cache which is located inside the CPU. Level 2: Larger than level 1 but slower. It serves as a bridge between L1 and L3 or main memory (RAM). It can either be located inside the CPU or outside, depending on the architecture of the motherboard. Level 3: Found outside the CPU. It is shared among cores, this cache is larger and slower than L1 and L2 caches, but faster than RAM. It helps improve performance when multiple cores are trying to access the same data.</p>
            <h3>Fetch-Decode-Execute Cycle</h3>
            <p>The Fetch-Decode-Execute cycle is the basic processes of the CPU uses to execute instructions. It involves fetching the instruction from main memory, decoding it, and then executing it. Each part of the cycle is managed by a different component of the CPU.</p>
            <p><strong>The main operations which occur during each phase of the Fetch-Decode-Execute cycle are:</strong></p>
            <ul>
              <li><strong>FETCH:</strong> Load the MAR with the address of the next instruction to be executed. Check if the instruction is in the cache memory. If it is, fetch it directly from the cache. If the instruction is not in the cache, fetch it from main memory into the MDR, then transfer it to the CIR. Store the fetched instruction in the cache. Increment the PC to point to the address of the next instruction.</li>
              <li><strong>DECODE:</strong> The CU translates the instruction in the CIR. The CU determines the required operations and selects the necessary machine resources. Check the cache for any required data. If the data is not in cache, fetch it from main memory into the MDR.</li>
              <li><strong>EXECUTE:</strong> The instruction is executed, which may involve mathematical or logical operations in the ALU, memory access or I/O operations. Use the ACC to store the intermediate results. The MDR may be used to transfer data between the CPU and memory.</li>
            </ul>
            <h3>Factors that affect CPU Performance</h3>
            <p><strong>Clock Speed:</strong> The speed at which the processor operated is called the clock speed. The faster the clock speed, the faster the computer is able to run the fetch-decode-execute cycle. The speed of a processor is measured in Hertz (Hz). If there is a clock speed of 3GHz it can execute 3 billion instructions per second.</p>
            <p><strong>Number of Cores:</strong> A core is an independent processing unit within a CPU. Modern CPUs can have multiple cores, allowing them to perform tasks simultaneously: Dual-core will have 2 cores, Quad-core will have 4 cores, Hexa-core will have 6 cores, Deca-core will have 10 cores. It is possible to get 12, 16, 24 and 64 cores within a CPU.</p>
            <p><strong>Cache Size:</strong> Cache is a type of memory. It stores frequently used data and instructions. Data and instructions are transferred from RAM to the cache memory before they are processed by the processor (CPU). Larger cache sizes reduce the average memory access time. The more frequently accessed data is stored closer to the CPU cores. This allows for faster execution of instructions since the CPU spends less time waiting for data to be fetched from slower main memory.</p>
            <p><strong>Parallel Processing:</strong> More cores enable better multitasking and can significantly improve performance in applications designed for parallel processing.</p>
            <p><strong>Threading:</strong> How much the processor handles and executes multiple sequence of instructions (called Threads) simultaneously. Each thread represents a single sequence of operations that the CPU can execute independently. Single threading can only execute one thread at a time. Multilevel threading allows a single CPU core to manage more than one thread a time, which improves performance in multi-tasking and parallel processing.</p>
            <h3>RISC and CISC Processors</h3>
            <p><strong>Reduced Instruction Set Computer (RISC):</strong> These processors can process a limited number of simple instructions. To complete a more complex task the problem is broken down into a longer list of simpler instructions. Because RISC chips produce less heat and consume less power than CISC, they are ideal for use in mobile phones.</p>
            <p><strong>Complex Instruction Set Computer (CISC):</strong> These can process a large number of complex instructions. This allows the processor to understand and carry out complex tasks with only a few instructions.</p>
            <h3>Other Components</h3>
            <p><strong>Motherboard:</strong> is the main printed circuit board and the central component and connects all other components of the computer. It allows for communication between the CPU, RAM etc.</p>
            <p><strong>PSU:</strong> converts external electrical power into usable power for components, ensuring the system operates effectively and safely.</p>
            <p><strong>Input Devices:</strong> in most instances these are components that allow the user to interact with the computer. For example, keyboard, mouse, camera and microphone.</p>
            <p><strong>Output Devices:</strong> these devices present data from the computer to the user.</p>
            <p><strong>Expansion Slots:</strong> these add additional functionality to the computer by plugging into the expansion slots on the motherboard. They provide extra capabilities for the computer systems.</p>
            <p><strong>Graphics Card:</strong> responsible for rendering images, videos and animations on the monitor. These are essential for gaming, video editing and graphic intensive tasks.</p>
            <p><strong>Sound Card:</strong> manage the input and output of audio signals. They improve the sound quality, receive audio signals from microphones and musical instruments and provide audio for speakers.</p>
            <p><strong>Wired / Wireless NIC:</strong> allows a computer to connect to a network, such as internet or a local area network (LAN). Wired - uses cable, such as ethernet to connect. Wireless - uses Wi-Fi technology to connect without the needs for wires.</p>
            <p><strong>GPU:</strong> responsible for rendering images, videos and animations. Processes graphical data and essential for gaming, video editing or 3D rendering. Integrated or Dedicated.</p>
            <p><strong>Ethernet Ports:</strong> allow for wired network connections, typically used for stable and fast internet or network connectivity.</p>
            <p><strong>Cooling Systems:</strong> provide a way of regulating the temperature of key components, such as the CPU and GPU. This prevents overheating and therefore damage to the components. There are two main types: Liquid Cooling - uses liquid to transfer heat from the components. Air Cooling - uses fans and/or heat sinks to dissipate heat.</p>
          `,
          flashcards: [
            { term: "Von Neumann bottleneck", definition: "The limited bandwidth of the shared bus/memory path between CPU and RAM can limit performance." },
            { term: "Program Counter (PC)", definition: "Holds the address of the next instruction to be fetched." },
            { term: "Accumulator (ACC)", definition: "Stores intermediate arithmetic/logic results inside the CPU." },
            { term: "MAR / MDR", definition: "Memory Address Register holds address; Memory Data Register holds data being read/written." },
            { term: "Cache", definition: "Small, fast memory storing frequently used instructions/data to reduce RAM access delay." },
            { term: "Clock speed", definition: "How many clock cycles the CPU completes per second (e.g. GHz); not the only measure of performance." }
          ]
        },
        {
          id: "1-2-peripheral-devices",
          title: "1.2 Peripheral Devices",
          notesHtml: `
            <h3>Input Devices</h3>
            <p><strong>Input Devices Definition:</strong> Input devices are hardware components that allow users to enter data and control signals into a computer system.</p>
            <p><strong>Common Input Devices:</strong></p>
            <ul>
              <li><strong>Keyboard:</strong> Used for typing text and commands.</li>
              <li><strong>Mouse:</strong> A pointing device that allows users to interact with graphical elements on the screen.</li>
              <li><strong>Scanner:</strong> Converts physical documents and images into digital format.</li>
              <li><strong>Microphone:</strong> Captures audio input useful for voice command and audio recording.</li>
              <li><strong>Touchscreen:</strong> Allows users to interact with a device by touching the screen. The monitor element of a touch screen device is both the input and output component.</li>
              <li><strong>Game Controller:</strong> Allows users to control video games. Game controllers can have a range of input methods, including buttons, motion sensors, joysticks and paddles. Game controllers can also act as an output by receiving haptic feedback through vibrations.</li>
              <li><strong>Sensors:</strong> Used to receive input from environment, such as light, temperature, accelerometer and pressure.</li>
              <li><strong>Other common input devices include:</strong> Barcode Reader, NFC Reader, RFID Reader.</li>
            </ul>
            <h3>Output Devices</h3>
            <p><strong>Output Devices Definition:</strong> Output devices are hardware components that send information from a computer to the user.</p>
            <p><strong>Common Output Devices:</strong></p>
            <ul>
              <li><strong>Monitor:</strong> Displays visual output from the computer.</li>
              <li><strong>Printer:</strong> Produces physical copies of digital documents.</li>
              <li><strong>Speakers:</strong> Output sound from the computer.</li>
              <li><strong>Headphones:</strong> Personal audio output device for outputting sound.</li>
              <li><strong>Projector:</strong> Projects computer visuals onto a larger surface.</li>
              <li><strong>Braille Display:</strong> A device that gives physical feedback in Braille for people who cannot see.</li>
            </ul>
            <h3>Connectivity Ports</h3>
            <p><strong>Connectivity Ports:</strong> allow the computer to interact with external devices and peripherals.</p>
            <p><strong>Universal Serial Bus (USB):</strong> used to connect external devices like, keyboards, mice, headsets and storage devices. USB connectors are assigned letters to indicate type: Type A, Type B, Type C, Type D. USB 1.x, USB 2.0, USB 3.x, USB 4. Every generation allows for faster transmission speeds and power delivery.</p>
            <p><strong>Display Ports:</strong> connect monitors or display devices to the system, providing high-definition video outputs. The main display port are:</p>
            <ul>
              <li><strong>VGA (Video Graphics Array):</strong> Older analogue video port.</li>
              <li><strong>DVI (Digital Video Interference):</strong> supports both analogue and digital video signals.</li>
              <li><strong>HDMI (High-Definition Multimedia Interface):</strong> for video and audio.</li>
              <li><strong>DisplayPort:</strong> Popular for high-resolution displays.</li>
            </ul>
            <p><strong>Audio Ports:</strong> Provide connections for audio input/output devices like headphones, microphones and speakers. Common audio ports include:</p>
            <ul>
              <li><strong>3.5mm connector:</strong> Used for headphones, microphones and speakers.</li>
              <li><strong>S/PDIF/TOSLINK:</strong> For digital audio transmission.</li>
              <li><strong>RCA connector:</strong> commonly used for stereo audio and video connections.</li>
            </ul>
            <p><strong>Wired / Wireless NIC:</strong> allows a computer to connect to a network, such as internet or a local area network (LAN). Wired - uses cable, such as ethernet to connect. Wireless - uses Wi-Fi technology to connect without the needs for wires.</p>
            <p><strong>Ethernet Ports:</strong> allow for wired network connections, typically used for stable and fast internet or network connectivity.</p>
          `,
          flashcards: [
            { term: "Input device", definition: "Hardware that sends data into the computer system for processing." },
            { term: "Output device", definition: "Hardware that presents processed data to the user or environment." },
            { term: "Sensor", definition: "Measures a physical property and converts it to an electrical/digital signal." },
            { term: "Actuator", definition: "Converts a digital control signal into physical movement or change (e.g. motor, valve)." }
          ]
        },
        {
          id: "1-3-storage",
          title: "1.3 Storage",
          notesHtml: `
            <h3>Primary Storage</h3>
            <p><strong>Primary Storage Definition:</strong> Primary storage, also known as main memory, is where data is temporarily stored for quick access by the computer's processor.</p>
            <p><strong>Random Access Memory (RAM):</strong> Stores data and programs that the computer is currently using. Volatile memory, thus data is lost when the power is off. Allows fast read and write operations, enabling smooth multitasking. DRAM (Dynamic RAM) is the most common type of RAM used in Computers. SRAM (Static RAM) is Faster and more expensive than DRAM, used in smaller amounts of cache memory.</p>
            <p><strong>Read-Only Memory (ROM):</strong> Stores essential data that does not change, such as firmware. Non-volatile memory, thus data remains even when the power is off. Used to boot up the computer and perform hardware initialisation.</p>
            <p><strong>Flash Memory:</strong> Stores data in portable devices like USB drives and SSDs. Non-volatile memory. Offers fast access speeds and is durable against physical shocks.</p>
            <p><strong>Cache Memory:</strong> Provides quick access to frequently used data and instructions for the processor. Very fast, smaller than RAM, and located either in or close to the CPU. Temporarily stores copies of data from main memory to speed up processing.</p>
            <p><strong>Virtual Memory:</strong> Extends the computer's RAM by using part of the hard drive as additional memory. Allows more applications to run simultaneously by swapping data in and out of RAM. Slower than actual RAM since it relies on hard disk speed. The process of moving data between RAM and the hard drive is called paging. The operating system breaks down the data into small chunks and manages which pages are in RAM and which are in virtual memory. Thrashing occurs when a computer's virtual memory system overused, causing a significant slowdown in performance. This happens when the system spends more time swapping pages between the RAM and the hard drive than executing actual instructions.</p>
            <h3>Secondary Storage</h3>
            <p><strong>General Characteristics of Secondary Storage Media:</strong></p>
            <ul>
              <li><strong>Capacity:</strong> The amount of data a storage device can hold. It varies widely among different types of storage.</li>
              <li><strong>Durability:</strong> How well a storage medium can withstand physical damage and environmental conditions. Solid state storage is typically more durable than magnetic storage.</li>
              <li><strong>Reliability:</strong> The likelihood that the storage device will perform correctly without failure. Magnetic and optical media can be prone to wear over time.</li>
              <li><strong>Read/Write Speed:</strong> The speed at which data can be read from or written to the storage device. SSDs generally offer faster speeds than HDDs and optical storage.</li>
            </ul>
            <p><strong>Magnetic Storage:</strong> Magnetic storage devices store data using magnets. They have a large storage capacity and are relatively cheap. However, they can be noisy and easily damaged if dropped due to moving parts. Example: External Hard Drive. Uses magnetic fields to store data. Offers large capacity and is cost-effective for extensive data storage. HDDs offer capacities ranging from 500 GB to over 20 TB. HDDs contain moving parts (platters and read/write heads), making them vulnerable to physical damage from drops, shocks, or vibrations. Over time, mechanical components can wear out, especially with constant use. Generally reliable for storing large amounts of data, but they have a higher risk of failure compared to solid-state storage due to moving parts. HDD speeds are dependent on the rotation speeds measured in RPM. HDD and Magnetic tape have faster read/write speeds than optical storage.</p>
            <p><strong>Optical Storage:</strong> Data is stored on a disk using tiny dents. It is read using a laser which scans over the disk. They are easy to store and transport, are easy to use and are long lasting. However they are easily scratched and damaged by the heat. Example: CDs, DVDs, Blu-Ray. Uses laser technology to read and write data. Generally, has lower capacity compared to other storage types. CDs (Compact Discs): Standard capacity is typically 700 MB. DVDs (Digital Versatile Discs): Standard single-layer DVDs hold 4.7 GB, while dual-layer DVDs can hold 8.5 GB. Blu-ray Discs: Single-layer Blu-ray discs can hold 25 GB, and dual-layer discs can hold 50 GB. Optical discs are generally more resistant to environmental factors like humidity and temperature than magnetic media. However, they can be scratched, which may affect data retrieval. Optical storage is considered reliable for long-term storage, as data is less susceptible to magnetic fields compared to magnetic storage. The read/write speeds vary by format, with newer technologies like Blu-ray offering faster performance and greater capacity than traditional CDs and DVDs. However, it is slower than other methods of secondary storage.</p>
            <p><strong>Solid State Storage:</strong> Solid State Drives (SSDs). Uses flash memory technology for data storage. Faster than magnetic drives and more durable, as they have no moving parts. SSDs can range from 128 GB to 4TB for personal devices, with larger capacities available of 100TB or more, but these come at a very high price. SSDs have no moving parts, making them much more durable than HDDs. They are more resilient to drops, shocks and vibrations. SSDs do have a limited number of read/write cycles, but modern SSDs are designed to last for many years. SSDs are highly reliable for storing data, as they don't suffer from mechanical failure like HDDs. SSDs are generally more reliable than HDDs, but data recovery from a failed SSD is often more difficult. SSDs have extremely low latency compared to HDDs, meaning they can access and transfer data almost instantly.</p>
            <p><strong>Cloud Storage:</strong> Services like Google Drive, Dropbox, and iCloud. Stores data on remote servers accessed via the internet. Provides flexibility and accessibility from anywhere with an internet connection, with various subscription plans for different storage needs. This could be considered unlimited, there is scalable options of data capacity, but often at a price, usually through a subscription. Highly durable due to the responsibility of the cloud company to ensure the access of data. This is done through data backup systems. Cloud data is distributed across multiple servers, therefore even if one server fails, users can still access their data from another. This makes cloud storage more reliable than local drives that could fail without warning. This is internet dependent, the read (download) and write (upload) speeds are based on the connection of the individual. As data is transmitted to remote servers, latency is possible and higher than SSD or HDD but is generally not noticeable by the users.</p>
            <h3>Data Storage Units</h3>
            <ul>
              <li><strong>bit:</strong> 1</li>
              <li><strong>nibble:</strong> 4</li>
              <li><strong>byte:</strong> 8, 1</li>
              <li><strong>Kilobyte (KB):</strong> 1024 bytes, 8,192, 1024</li>
              <li><strong>Megabyte (MB):</strong> 1024 KB, 8,388,608, 1,048,576</li>
              <li><strong>Gigabyte (GB):</strong> 1024 MB, 8,589,934,592, 1,073,741,824</li>
              <li><strong>Terabyte (TB):</strong> 1024 GB, 8,796,093,022,208, 1,099,511,627,776</li>
              <li><strong>Petabyte (PB):</strong> 1024 TB, 9,007,199,254,740,992, 1,125,899,906,842,624</li>
            </ul>
            <h3>Storage Calculations</h3>
            <p><strong>For images:</strong> Storage Size = (Width x Height x Bits Per Pixel). Total number of pixels = Multiply the width by the height of the image. Bits Per Pixel = Multiply the bit depth by the number of channels (e.g. For an 8-bit RGB image: Bits Per Pixel = 8 (Red) + 8 (Green) + 8 (Blue) = 24 bits). Total Bits = Multiply the total number of pixels by the bits per pixel. Convert to bytes by dividing by 8. Convert to kilobytes by dividing by 1024. Convert to megabytes by dividing by 1024.</p>
            <p><strong>For sound:</strong> Storage Size = (Sample Rate x Bit Depth x Channels x Duration (seconds)). For example, A stereo (2 channels) audio file with a sample rate of 44.1 kHz (44,100 samples per second), a bit depth of 16 bits and a duration of 3 minutes (180 seconds). Total Bits = 44100 x 16 x 2 x 180 = 254,016,000 bits. Convert to bytes by dividing by 8 = 31,752,000 bytes. Convert to kilobytes by dividing by 1024 = 31,008 KB. Convert to megabytes by dividing by 1024 = 30.2MB.</p>
          `,
          flashcards: [
            { term: "Volatile memory", definition: "Loses contents when power is removed (e.g. RAM)." },
            { term: "Non-volatile memory", definition: "Retains data without power (e.g. ROM, SSD, HDD)." },
            { term: "Random access", definition: "Any location can be reached in similar time (RAM, SSD); contrast sequential tape." },
            { term: "HDD vs SSD", definition: "HDD uses magnetic disks and heads; SSD uses flash chips - SSDs are typically faster and have no moving parts." }
          ]
        }
      ]
    },
    {
      id: "t2",
      number: "2",
      title: "Structure of Systems & Functions",
      icon: "",
      subtopics: [
        {
          id: "2-1-data-types-representation",
          title: "2.1 Data Types & Representation",
          notesHtml: `
            <h3>Data Types</h3>
            <p>Many different data types can be stored on a computer system. The data types which are commonly used are:</p>
            <p><strong>Appropriate use of data types:</strong> The function of data types used in programming. The characteristics of different data types including: Boolean, Character, Integer, Real, String.</p>
            <p><strong>Boolean:</strong> Can only be true or false. Used for logical operations and decision making.</p>
            <p><strong>Character:</strong> A single character such as a letter, digit, or symbol.</p>
            <p><strong>Integer:</strong> Whole numbers without decimal points (e.g., shoe sizes, counts).</p>
            <p><strong>Real:</strong> Numbers with decimal points (e.g., height, measurements).</p>
            <p><strong>String:</strong> A sequence of characters (e.g., names, addresses).</p>
            <h3>Number Systems</h3>
            <p>There are three different number systems that you should be familiar with for Computer Science. They are: Denary, Binary, Hexadecimal. You should also be able to convert between them.</p>
            <p><strong>Denary:</strong> Denary is the number system that we are most familiar with. It is known as a Base 10 or decimal number system. We count in groups of 10. E.g. the number 138 is 1 'hundred', 3 'tens' and 8 'units'. The digits 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 are used.</p>
            <p><strong>Binary:</strong> Binary is a counting system that is used by computers. It is a Base 2 number system. Computers can only store and process Binary digITs, known as bits. A bit is either a 1 or a 0. You may think of these as a light switch, where the switch is either on or off. The digits 0 or 1 are used.</p>
            <p><strong>Hexadecimal:</strong> The third counting system you need to be familiar with is the hexadecimal counting system, known as the Base 16 counting system. The digits 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 are used along with the characters A, B, C, D, E and F represent the numbers 10-15. The digits 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F are used.</p>
            <h3>Binary-Denary Conversions</h3>
            <p>To convert from binary to denary, multiply each bit by its position value (powers of 2) and sum the results. For example, 10001010 = 128 + 8 + 2 = 138.</p>
            <h3>Binary Arithmetic</h3>
            <p>When adding binary numbers together we use the following rules: 0 + 0 = 0, 0 + 1 = 1, 1 + 0 = 1, 1 + 1 = 10 (which is 0 with a carry of 1), 1 + 1 + 1 = 11 (which is 1 with a carry of 1). If there is a carry, add it to the next column.</p>
            <h3>Arithmetic Shift Functions</h3>
            <p>Shifts are a manipulation of bit patterns. A shift involves moving the bits in a specified direction, either left or right, by a specified number of places. Arithmetic shifts are used for division and multiplication.</p>
            <p><strong>Arithmetic Shift Right:</strong> This operation will divide a binary number by 2 at each shift. It works for positive and negative numbers.</p>
            <p><strong>Arithmetic Shift Left:</strong> This operation will multiply a number by 2. At each shift a 0 is added into the right position.</p>
            <h3>Overflow and Underflow</h3>
            <p><strong>Overflow:</strong> Overflow occurs when a number is too large to be stored in the space provided. Consider trying to store the number 28210 in 8 bit binary. Having used all 8 available spaces, I can only store up to 255. So 282 would produce an overflow error.</p>
            <p><strong>Underflow:</strong> Underflow is where a number is too small to be represented in the space provided. We might see this where we try to perform a right shift (division) an a number has aspects that are less than 0.</p>
            <h3>Signed Integers</h3>
            <p><strong>Sign and magnitude:</strong> One bit for sign; two representations of zero; awkward for ALU.</p>
            <p><strong>Two's complement:</strong> Most common; single zero; subtraction via addition; range for n bits: −2^(n−1) to 2^(n−1)−1.</p>
            <h3>Character Sets</h3>
            <p><strong>ASCII:</strong> A character set is the American Standard Code for Information Interchange (ASCII). A character set is a table that maps a character with a unique binary number. It is important that computer systems recognise that characters can be represented differently by other computer systems. In order to allow for data exchange between computer systems, character sets were devised.</p>
            <p><strong>Unicode:</strong> Unicode is a standard character set that has combined and replaced many others (including ASCII). It allows for use of characters from around the world along with emojis.</p>
            <h3>Images</h3>
            <p><strong>Bitmap Images:</strong> Bitmap Images are stored in pixels: Each pixel has a colour value stored as a binary value. Each image will have a bit depth, which impacts on the size and quality of the image. The greater the bit depth the more colour information, detail and greater quality, but also a larger file size.</p>
            <p><strong>Vector Graphics:</strong> Stored using Mathematics. A vector uses mathematical representations of geometrically primitive objects (lines, curves etc.) to represent images. Vector graphics can be scaled up without loss of apparent quality. They are smaller than bitmap graphics in terms of memory. Vectors can be edited easily and are used for graphical designs such as logos and icons.</p>
            <p><strong>Resolution:</strong> Refers to the number of pixels in an image, represented by width and height. The higher the resolution the greater the quality and detail of the images. The higher the resolution the higher the file size.</p>
            <p><strong>Bit Depth:</strong> The number of bits used to represent the colour of each pixel in an image. It specifies how many bits are used to store information about a pixel's color. An 8-bit depth means that 8 bits are allocated per pixel. Allowing for 256 different combinations. The higher the bit depth, the larger the file size and increased quality.</p>
            <p><strong>Colour Depth:</strong> The number of colours that an image can represent - affected by the bit depth. When referred to, this is as "bits per channel" (bpc) E.g 8-bit colour depth for RGB would be 8-bits for R, 8-bits for G, 8-bits for B.</p>
            <h3>Sound</h3>
            <p>Sound can be analogue or digital. When we speak, or play most musical instruments they produce analogue sound. Computers can only use digital sound (stored as 1s and 0s). So sound must be converted from analogue to digital to be stored. The sound waves are sampled at time intervals. The sound sample points are converted to the nearest numerical value.</p>
            <p><strong>Sample:</strong> A single measurement of sound taken at a specific point in time.</p>
            <p><strong>Channels:</strong> The number of audio channels, mono being 1 channel and stereo being 2 channels.</p>
            <p><strong>Sample Rate:</strong> The number of samples of audio carried per second. Measured in Hz or kHz - Also known as the sample frequency.</p>
            <p><strong>Bit Depth:</strong> For audio, this is the number of bits used to record each sample. Higher bit depths allow for more precise representation of a sound's amplitude.</p>
            <p><strong>Bit Rate:</strong> The amount of data processed per second of sound. It is calculated by multiplying the sample rate by the bit depth.</p>
            <p><strong>Sample Quality:</strong> The term used to describe the effect of the sample rate.</p>
            <p><strong>Storage calculation:</strong> Storage Size = (Sample Rate x Bit Depth x Channels x Duration (seconds)).</p>
            <h3>Data Storage Units</h3>
            <p><strong>The relationship between data storage using the base 2 prefixes including (bit, nibble, byte, kilobyte, megabyte, gigabyte, terabyte, petabyte):</strong></p>
            <ul>
              <li><strong>bit:</strong> 1</li>
              <li><strong>nibble:</strong> 4</li>
              <li><strong>byte:</strong> 8, 1</li>
              <li><strong>Kilobyte (KB):</strong> 1024 bytes, 8,192, 1024</li>
              <li><strong>Megabyte (MB):</strong> 1024 KB, 8,388,608, 1,048,576</li>
              <li><strong>Gigabyte (GB):</strong> 1024 MB, 8,589,934,592, 1,073,741,824</li>
              <li><strong>Terabyte (TB):</strong> 1024 GB, 8,796,093,022,208, 1,099,511,627,776</li>
              <li><strong>Petabyte (PB):</strong> 1024 TB, 9,007,199,254,740,992, 1,125,899,906,842,624</li>
            </ul>
          `,
          flashcards: [
            { term: "Two's complement", definition: "Signed integer encoding where negative numbers are represented so that addition works naturally in binary." },
            { term: "Overflow", definition: "When a calculated value exceeds the range representable with the available bits." },
            { term: "Colour depth", definition: "Number of bits used per pixel to encode colour information." },
            { term: "Sample rate", definition: "How many audio samples are taken per second (measured in Hz)." },
            { term: "Bit depth (audio)", definition: "Bits per sample; higher depth reduces quantisation noise and increases file size." }
          ]
        },
        {
          id: "2-2-data-compression",
          title: "2.2 Data Compression",
          notesHtml: `
            <h3>Compression Overview</h3>
            <p>Compression is the process of decreasing a file size but still preserving the data so that it is usable. There are two types of compression techniques:</p>
            <h3>Lossy Compression</h3>
            <p>This method will generally reduce the size by a greater amount but will also reduce the quality. The data removed is often considered less important or detectable by the user. Examples: MP3, JPEG, MPEG. Used when exact reconstruction is not required (e.g., photos, audio, video). Cannot perfectly restore the original data.</p>
            <h3>Lossless Compression</h3>
            <p>This method will maintain the quality but is less likely to reduce the file size by as much. It enables the file to be uncompressed to its original form. Reduces file size by finding non-essential information and redundancies in the data and encoding them more efficiently. Examples: WAV, PNG, BMP, FLAC, ZIP. Needed when exact reconstruction matters (text, programs, PNG, FLAC).</p>
            <h3>Run-Length Encoding (RLE)</h3>
            <p>Replaces runs of identical symbols with count+symbol. Great for simple graphics with large flat areas. For example, AAAABBB would become 4A3B.</p>
            <h3>Huffman Coding</h3>
            <p>Variable-length codes: frequent symbols get shorter codes, building a binary tree from symbol frequencies. Used within formats like JPEG (lossy pipeline) and ZIP (lossless).</p>
            <h3>Compression Calculations</h3>
            <p><strong>Compression ratio:</strong> Compression ratio = original data size / Compressed data size. For example, Original data size = 1000, Compressed data size = 200. Ratio = 1000 / 200 or 10 / 2 or 10:2.</p>
            <p><strong>Calculating the compressed file size based on ratio:</strong> Compressed file size = original file size / Compression ratio. For example, If the original data size is 2000 KB and the compression ratio is 10:2. Compressed file size = 2000 / (10 / 2) = 400KB.</p>
            <p><strong>Calculating the original file size based on ratio:</strong> Original file size = compressed file size x compression ratio. For example, If the original data size is 400 KB and the compression ratio is 10:2. Original file size = 400 x (10 / 2) = 2000 KB.</p>
          `,
          flashcards: [
            { term: "Lossless compression", definition: "Reduces file size without losing any original data; can be decompressed exactly." },
            { term: "Lossy compression", definition: "Removes some data permanently to achieve smaller files; cannot perfectly restore the original." },
            { term: "RLE", definition: "Run-length encoding stores counts of repeated values instead of repeating them." },
            { term: "Huffman coding", definition: "Entropy coding assigning shorter bit patterns to more frequent symbols based on a frequency tree." }
          ]
        },
        {
          id: "2-3-data-file-structures",
          title: "2.3 Data & File Structures",
          notesHtml: `
            <h3>Records</h3>
            <p>This is a data structure that consists of several fields. A field consists of a single data item. This can be any data type. A record would be used when trying to store data about an object or person that might require more than one data type. For example, student information, vehicle information and product information.</p>
            <h3>Arrays</h3>
            <p>Fixed-size indexed collection in memory; random access by index; same data type typically. One-dimensional arrays have a single index; two-dimensional arrays have rows and columns.</p>
            <h3>Files</h3>
            <ul>
              <li><strong>CSV (Comma-Separated Values):</strong> comma-separated values; plain text, interoperable; weak typing, no enforced relationships.</li>
              <li><strong>Flat file:</strong> single table/file; duplication risk; simple queries only.</li>
            </ul>
            <h3>Databases</h3>
            <ul>
              <li>Structured collections with relationships, constraints, indexing, query languages (SQL).</li>
              <li>Reduce redundancy via normalisation; support concurrent access and security rules.</li>
              <li>File management systems support various file systems for compatibility (NTFS, FAT).</li>
              <li>Allow users to create files and folders, store in hierarchical directory structure, open/copy/rename/delete files and folders.</li>
            </ul>
            <h3>Data Structures Selection</h3>
            <p>The design, interpretation and manipulation of data structures including: Records, One-dimensional arrays, Two-dimensional arrays. The selection, identification and justification of appropriate data structures for different situations. The design of files and records appropriate for different applications.</p>
            <p>When selecting appropriate data structures, consider:</p>
            <ul>
              <li>The type of data being stored (numeric, text, mixed)</li>
              <li>The operations needed (search, insert, delete, sort)</li>
              <li>Memory requirements</li>
              <li>Access patterns (random vs sequential)</li>
            </ul>
            <h3>Key Concepts</h3>
            <ul>
              <li><strong>Primary key:</strong> A unique identifier for each row in a table.</li>
              <li><strong>Foreign key:</strong> A field that links to the primary key of another table, establishing relationships.</li>
              <li><strong>Normalisation:</strong> Process of organising data to reduce redundancy and improve data integrity.</li>
            </ul>
          `,
          flashcards: [
            { term: "CSV", definition: "Comma-separated values text format for tabular data; widely used for import/export." },
            { term: "Flat file database", definition: "A single file/table without relational links; simple but can duplicate data." },
            { term: "Relational database", definition: "Data organised in linked tables with keys and relationships, usually queried with SQL." },
            { term: "Primary key", definition: "A unique identifier for each row in a table." }
          ]
        },
        {
          id: "2-4-automated-systems",
          title: "2.4 Automated Systems",
          notesHtml: `
            <p><strong>Automated systems</strong> measure the environment, process rules, and act without continuous human control. They consist of sensors, actuators, and a microprocessor/microcontroller.</p>
            <h3>Components</h3>
            <ul>
              <li><strong>Sensors:</strong> Input transducers (temperature, proximity, light, pressure). Measure physical properties and convert them to electrical/digital signals. Used to receive input from environment, such as light, temperature, accelerometer and pressure.</li>
              <li><strong>Actuators:</strong> Output transducers (motors, heaters, valves). Convert digital control signals into physical movement or change.</li>
              <li><strong>Microprocessor / microcontroller:</strong> Reads sensor data, runs control program, signals actuators. A compact chip integrating CPU, memory, and I/O for embedded control tasks.</li>
            </ul>
            <h3>Feedback</h3>
            <ul>
              <li><strong>Open-loop:</strong> No automatic correction based on output (e.g., timed sprinkler). The system performs actions without measuring the result.</li>
              <li><strong>Closed-loop (feedback):</strong> Output measured and compared to setpoint; adjustments reduce error (thermostat, cruise control). Uses sensor feedback to adjust outputs to meet a target.</li>
            </ul>
            <h3>Embedded Systems</h3>
            <p>Dedicated computer inside a larger product (washing machine, ABS, smart meter) - often real-time, resource-constrained, long-lived. A dedicated computer performing a specific function inside a device or machine.</p>
            <h3>Setpoint</h3>
            <p>The desired value a control system tries to maintain (e.g., target temperature).</p>
            <h3>Control System Examples</h3>
            <ul>
              <li><strong>Greenhouse window control:</strong> Uses OR logic: close windows if wind speed > 12 km/h OR it is raining.</li>
              <li><strong>Sprinkler system:</strong> Uses AND logic: turn on if temperature > 25°C AND it has not rained in 5 days.</li>
            </ul>
            <h3>Logical Operations in Control</h3>
            <p>Logical operations can be used in control systems. For example, a control system that is required to close the windows on a commercial greenhouse when at least one of the following conditions is true: the wind speed rises above 12 km per hour, it is raining. would use the logical operator OR.</p>
            <p>A control system that is required to turn on a sprinkler system in a field when both of the following conditions are true: the temperature rises above 25° Celsius, it has not rained in the last five days. would use the logical operator AND.</p>
            <ul>
              <li><strong>NOT:</strong> Inverts truth value. NOT A = Ā (A bar on top represents NOT).</li>
              <li><strong>AND:</strong> True only if both inputs are true. A AND B = A.B (dot represents AND).</li>
              <li><strong>OR:</strong> True if at least one input is true. A OR B = A + B (plus sign represents OR).</li>
              <li><strong>XOR:</strong> True if exactly one operand is true (inputs are different). A XOR B = A ⊕ B (plus sign in circle represents XOR).</li>
            </ul>
            <div class="callout">Safety & ethics: Fail-safe design, testing, and updates are critical where automated control affects health or infrastructure. Vulnerable users (elderly) need extra safeguards.</div>
          `,
          flashcards: [
            { term: "Embedded system", definition: "A dedicated computer performing a specific function inside a device or machine." },
            { term: "Setpoint", definition: "The desired value a control system tries to maintain (e.g. target temperature)." },
            { term: "Microcontroller", definition: "A compact chip integrating CPU, memory, and I/O for embedded control tasks." }
          ]
        }
      ]
    },
    {
      id: "t3",
      number: "3",
      title: "How Systems Communicate",
      icon: "",
      subtopics: [
        {
          id: "3-1-networks-infrastructure",
          title: "3.1 Networks & Infrastructure",
          notesHtml: `
            <h3>LAN vs WAN</h3>
            <ul>
              <li><strong>LAN</strong> - local area network in a building/site; high speed, private.</li>
              <li><strong>WAN</strong> - wide area network spanning cities/countries; often uses leased lines/ISP links; includes the internet.</li>
            </ul>
            <h3>Architectures</h3>
            <ul>
              <li><strong>Client–server</strong> - central servers provide services; clients request resources; scalable management.</li>
              <li><strong>Peer-to-peer (P2P)</strong> - nodes share roles; resilient but harder to secure/manage.</li>
            </ul>
            <h3>Topologies</h3>
            <ul>
              <li><strong>Star</strong> - devices connect to a central switch; easy to add/remove; central point of failure if core fails.</li>
              <li><strong>Mesh</strong> - multiple interconnections; redundancy (partial mesh common).</li>
              <li><strong>Bus (legacy)</strong> - single backbone; collisions possible; hard to troubleshoot.</li>
            </ul>
            <h3>Hardware</h3>
            <ul>
              <li><strong>Router</strong> - forwards between networks; NAT; chooses paths.</li>
              <li><strong>Switch</strong> - forwards frames within a LAN using MAC addresses.</li>
              <li><strong>NIC</strong> - network interface card/port.</li>
              <li><strong>WAP</strong> - wireless access point connects Wi‑Fi clients to wired LAN.</li>
            </ul>
            <h3>Protocols (examples)</h3>
            <ul>
              <li><strong>TCP/IP</strong> - layered suite; TCP reliable streams; IP addressing & routing.</li>
              <li><strong>HTTP/S</strong> - web; HTTPS adds TLS encryption.</li>
              <li><strong>FTP</strong> - file transfer.</li>
              <li><strong>SMTP / POP / IMAP</strong> - email send/receive.</li>
            </ul>
            <h3>IP & packets</h3>
            <p><strong>Packet switching</strong> - data split into packets with headers; independently routed; reassembled; efficient sharing of links.</p>
            <h3>Cloud</h3>
            <p>On-demand computing/storage over the internet (IaaS/PaaS/SaaS) - elasticity, Opex model, shared responsibility for security.</p>
          `,
          flashcards: [
            { term: "Packet switching", definition: "Data broken into packets that travel independently across a network and are reassembled at the destination." },
            { term: "TCP vs UDP", definition: "TCP is connection-oriented and reliable; UDP is simpler and faster but best-effort delivery." },
            { term: "MAC address", definition: "Hardware-level address on a NIC used for switching within a LAN." },
            { term: "IP address", definition: "Logical network-layer address used to route packets between networks (IPv4/IPv6)." },
            { term: "DNS", definition: "Maps human-readable domain names to IP addresses." }
          ]
        },
        {
          id: "3-2-cybersecurity-privacy",
          title: "3.2 Cybersecurity & Privacy",
          notesHtml: `
            <h3>Threats</h3>
            <ul>
              <li><strong>Malware</strong> - virus, worm, trojan, ransomware, spyware.</li>
              <li><strong>Phishing / social engineering</strong> - tricking users into revealing secrets or installing malware.</li>
              <li><strong>SQL injection</strong> - malicious input alters database queries.</li>
              <li><strong>DDoS</strong> - flood services to deny availability.</li>
              <li><strong>Brute force</strong> - guessing credentials.</li>
            </ul>
            <h3>Prevention & controls</h3>
            <ul>
              <li><strong>Firewall</strong> - filters traffic by rules.</li>
              <li><strong>Encryption</strong> - protects confidentiality/integrity in transit and at rest.</li>
              <li><strong>Authentication</strong> - passwords, MFA, biometrics.</li>
              <li><strong>Access control</strong> - roles, least privilege.</li>
              <li><strong>Backups & DR</strong> - restore after corruption or ransomware.</li>
            </ul>
            <h3>UK/EU legislation (awareness)</h3>
            <ul>
              <li><strong>UK GDPR / Data Protection Act</strong> - lawful processing, rights of individuals, accountability.</li>
              <li><strong>Computer Misuse Act</strong> - unauthorised access/damage to computer systems is an offence.</li>
            </ul>
            <div class="callout">Professional: Security is everyone's responsibility - secure coding, patching, and user training reduce organisational risk.</div>
          `,
          flashcards: [
            { term: "Ransomware", definition: "Malware that encrypts files and demands payment for decryption keys." },
            { term: "Phishing", definition: "Deceptive messages or sites that trick users into giving away sensitive information." },
            { term: "MFA", definition: "Multi-factor authentication combines two or more evidence types (knowledge, possession, inherence)." },
            { term: "Principle of least privilege", definition: "Users/systems get only the minimum access rights needed for their role." }
          ]
        }
      ]
    },
    {
      id: "t4",
      number: "4",
      title: "Algorithms",
      icon: "",
      subtopics: [
        {
          id: "4-1-computational-thinking",
          title: "4.1 Computational Thinking",
          notesHtml: `
            <ul>
              <li><strong>Decomposition</strong> - break a complex problem into smaller sub-problems.</li>
              <li><strong>Abstraction</strong> - hide unnecessary detail; focus on relevant information and interfaces.</li>
              <li><strong>Pattern recognition</strong> - spot similarities to reuse solutions or data structures.</li>
              <li><strong>Algorithmic thinking</strong> - precise step-by-step procedures with inputs, outputs, and control structures.</li>
            </ul>
            <p>These skills underpin modelling problems before coding or designing systems.</p>
          `,
          flashcards: [
            { term: "Decomposition", definition: "Splitting a large problem into smaller, manageable parts." },
            { term: "Abstraction", definition: "Removing irrelevant detail to create a simpler model of a problem or system." },
            { term: "Pattern recognition", definition: "Identifying structures or trends that suggest known solutions." }
          ]
        },
        {
          id: "4-2-searching-algorithms",
          title: "4.2 Searching Algorithms",
          notesHtml: `
            <h3>Linear search</h3>
            <p>Check each element in order until found or end of list. <strong>Time:</strong> O(n) worst case. Works on unsorted data.</p>
            <h3>Binary search</h3>
            <p>Requires <strong>sorted</strong> data. Compare target with middle element; eliminate half each step. <strong>Time:</strong> O(log n).</p>
            <h3>Trace tables</h3>
            <p>Exam-style traces track variables (e.g. low, high, mid, found) step by step - show how the search space shrinks.</p>
          `,
          flashcards: [
            { term: "Linear search", definition: "Sequentially checks each item until the target is found or the list ends." },
            { term: "Binary search precondition", definition: "The list must be sorted before binary search can work correctly." },
            { term: "O(log n)", definition: "Binary search typical efficiency - each step halves the remaining search space." }
          ]
        },
        {
          id: "4-3-sorting-algorithms",
          title: "4.3 Sorting Algorithms",
          notesHtml: `
            <h3>Bubble sort</h3>
            <p>Repeatedly swap adjacent elements if out of order; largest values “bubble” to the end each pass. Simple but slow on large lists - <strong>O(n²)</strong> typical worst case.</p>
            <h3>Merge sort</h3>
            <p>Divide-and-conquer: split list in half, sort halves recursively, <strong>merge</strong> two sorted lists linearly. <strong>O(n log n)</strong> time; needs extra space for merging.</p>
            <h3>Trace tables</h3>
            <p>Show passes/comparisons/swaps (bubble) or recursive splits and merge steps (merge) - practise small lists (e.g. 4 items).</p>
          `,
          flashcards: [
            { term: "Bubble sort", definition: "Repeatedly compares adjacent elements and swaps them if they are in the wrong order." },
            { term: "Merge sort", definition: "Recursively divides the list, sorts halves, and merges sorted sublists." },
            { term: "Stable sort", definition: "Preserves the relative order of equal elements (merge sort can be stable)." }
          ]
        },
        {
          id: "4-4-algorithm-design",
          title: "4.4 Algorithm Design",
          notesHtml: `
            <h3>Pseudocode</h3>
            <p>Language-neutral structured notation (SEQUENCE, SELECTION, ITERATION) - precise enough to implement.</p>
            <h3>Flowcharts</h3>
            <p>Symbols: terminator, process, decision (diamond), input/output; arrows show control flow.</p>
            <h3>Trace tables</h3>
            <p>Columns for variables each step; verify loops and branches against test data (normal, boundary, erroneous).</p>
          `,
          flashcards: [
            { term: "Pseudocode", definition: "Structured informal description of an algorithm without full programming syntax." },
            { term: "Selection", definition: "A control structure that chooses different paths (IF / CASE)." },
            { term: "Iteration", definition: "Repeating steps using loops (FOR, WHILE, REPEAT UNTIL)." }
          ]
        }
      ]
    },
    {
      id: "t5",
      number: "5",
      title: "Software",
      icon: "",
      subtopics: [
        {
          id: "5-1-programming-principles",
          title: "5.1 Programming Principles",
          notesHtml: `
            <ul>
              <li><strong>Variables</strong> - named memory locations whose value can change.</li>
              <li><strong>Constants</strong> - value should not change (readability & safety).</li>
              <li><strong>Data types</strong> - integer, real, string, Boolean, char, arrays/lists.</li>
              <li><strong>Selection</strong> - IF, ELSE, CASE.</li>
              <li><strong>Iteration</strong> - counted loops, condition-controlled loops.</li>
              <li><strong>Arrays</strong> - indexed collections; bounds matter.</li>
              <li><strong>String handling</strong> - length, substring, concatenation, casting issues.</li>
              <li><strong>Subroutines</strong> - procedures (no return) vs functions (return value); parameters, arguments.</li>
              <li><strong>Scope</strong> - local (inside subroutine) vs global (wider visibility) - minimise globals to reduce side effects.</li>
              <li><strong>File handling</strong> - open/read/write/close; handle missing files and errors responsibly.</li>
            </ul>
          `,
          flashcards: [
            { term: "Parameter vs argument", definition: "A parameter is declared in the subroutine signature; an argument is the value passed in at the call site." },
            { term: "Local scope", definition: "Names declared inside a subroutine are only visible within that subroutine." },
            { term: "Procedure", definition: "A subroutine that performs tasks but does not return a value to the caller." }
          ]
        },
        {
          id: "5-2-program-construction",
          title: "5.2 Program Construction",
          notesHtml: `
            <h3>IDE features</h3>
            <p>Editor, syntax highlighting, debugger (breakpoints, step), build/run, static analysis, version control integration.</p>
            <h3>Translators</h3>
            <ul>
              <li><strong>Compiler</strong> - translates entire source to machine/object code before run; optimisation; errors at compile time.</li>
              <li><strong>Interpreter</strong> - translates line/section at runtime; faster edit-test cycle, slower execution often.</li>
              <li><strong>Assembler</strong> - converts assembly mnemonics to machine code (low-level).</li>
            </ul>
            <h3>Errors</h3>
            <ul>
              <li><strong>Syntax</strong> - breaks language rules; caught by translator.</li>
              <li><strong>Runtime</strong> - occurs during execution (e.g. divide by zero).</li>
              <li><strong>Logic</strong> - program runs but wrong results; needs testing & reasoning.</li>
            </ul>
            <h3>Testing strategies</h3>
            <p>Unit, integration, system, regression; use meaningful test data and trace expected vs actual.</p>
          `,
          flashcards: [
            { term: "Syntax error", definition: "Code violates grammar rules of the language; usually prevents compilation/execution start." },
            { term: "Logic error", definition: "Program runs but produces incorrect behaviour due to flawed reasoning." },
            { term: "Compiler", definition: "Translates high-level source code into machine/byte code before the program is executed." }
          ]
        },
        {
          id: "5-3-logical-operations",
          title: "5.3 Logical Operations",
          notesHtml: `
            <h3>Boolean Algebra</h3>
            <p>Boolean Algebra was developed in the mid-19th century by George Boole. It became essential in the creation of digital circuits and computing systems. As these logical operations have become more advanced they have become pivotal to the operation of modern digital devices. Boolean can be used for basic decision making functions in early computers. They are also used for more sophisticated processes found in today's computers.</p>
            <h3>Logical Operators</h3>
            <ul>
              <li><strong>NOT:</strong> Inverts truth value. NOT A = Ā (A bar on top represents NOT).</li>
              <li><strong>AND:</strong> True only if both inputs are true. A AND B = A.B (dot represents AND).</li>
              <li><strong>OR:</strong> True if at least one input is true. A OR B = A + B (plus sign represents OR).</li>
              <li><strong>XOR:</strong> True if exactly one operand is true (inputs are different). A XOR B = A ⊕ B (plus sign in circle represents XOR).</li>
            </ul>
            <h3>Truth Tables</h3>
            <p>Truth tables show all possible input combinations and the resulting output for a logical operation.</p>
            <h3>Applications</h3>
            <ul>
              <li><strong>Control systems:</strong> Use logical operators to make decisions based on sensor inputs.</li>
              <li><strong>Greenhouse example:</strong> Close windows if wind speed > 12 km/h OR it is raining (OR logic).</li>
              <li><strong>Sprinkler example:</strong> Turn on if temperature > 25°C AND it has not rained in 5 days (AND logic).</li>
              <li><strong>Digital circuits:</strong> Logic gates implement these operations in hardware.</li>
            </ul>
            <h3>Boolean Algebra Laws</h3>
            <ul>
              <li><strong>Identity law:</strong> A + 0 = A, A · 1 = A</li>
              <li><strong>Complement law:</strong> A + Ā = 1, A · Ā = 0</li>
              <li><strong>Idempotent law:</strong> A + A = A, A · A = A</li>
              <li><strong>Commutative law:</strong> A + B = B + A, A · B = B · A</li>
              <li><strong>Associative law:</strong> (A + B) + C = A + (B + C), (A · B) · C = A · (B · C)</li>
              <li><strong>Distributive law:</strong> A · (B + C) = A · B + A · C</li>
              <li><strong>De Morgan's laws:</strong> (A + B)' = A' · B', (A · B)' = A' + B'</li>
            </ul>
            <div class="callout">Understanding Boolean algebra is essential for digital circuit design, programming logic, and control systems.</div>
          `,
          flashcards: [
            { term: "Truth table", definition: "Tabulates output of a Boolean expression for every combination of inputs." },
            { term: "XOR", definition: "Exclusive OR - true when inputs differ, false when they are the same." },
            { term: "NAND gate", definition: "Outputs NOT AND; functionally complete - any logic circuit can be built from NANDs alone." }
          ]
        },
        {
          id: "5-4-operating-systems",
          title: "5.4 Operating Systems",
          notesHtml: `
            <h3>Functions</h3>
            <ul>
              <li><strong>Memory management</strong> - allocation, virtual memory, protection.</li>
              <li><strong>Multitasking / scheduling</strong> - CPU time sharing, priorities.</li>
              <li><strong>File management</strong> - directories, permissions, storage abstraction.</li>
              <li><strong>Security</strong> - accounts, authentication hooks, auditing.</li>
              <li><strong>User interface</strong> - GUI windowing, CLI shells.</li>
              <li><strong>Device drivers</strong> - OS modules talking to hardware.</li>
            </ul>
            <h3>Types</h3>
            <ul>
              <li><strong>GUI</strong> - graphical desktops on PCs/mobile.</li>
              <li><strong>CLI</strong> - text commands for power users/scripts.</li>
            </ul>
            <h3>Utility software</h3>
            <p>Disk defragmentation (HDD era), backup tools, antivirus, compression, formatters - assists maintenance, not the core kernel services.</p>
          `,
          flashcards: [
            { term: "Kernel", definition: "Core OS component managing hardware, scheduling, and protected resources." },
            { term: "Virtual memory", definition: "Uses disk space to extend RAM, swapping pages when physical memory is full." },
            { term: "Device driver", definition: "Software allowing the OS to communicate with a specific hardware device." }
          ]
        }
      ]
    },
    {
      id: "t6",
      number: "6",
      title: "Systems Development Life Cycle (SDLC)",
      icon: "",
      subtopics: [
        {
          id: "6-1-development-methodologies",
          title: "6.1 Development Methodologies",
          notesHtml: `
            <h3>System Development Life Cycle (SDLC)</h3>
            <p>The system development life cycle has been covered in previous lessons. Software development is a subset of systems development. The systems DLC (development life cycle) is holistic and comprehensive. It is a model devised to help manage the complexity of building and updating entire systems, which may be an application, a hardware-based appliance, a communication network, or virtually any other computer based project. In addition to hardware, software, and data, a system will involve people in many roles, and the processes that they will control. These roles and processes must also be considered at each phase of the systems DLC to ensure that the final system meets user needs, is scalable, and can be maintained efficiently.</p>
            <h3>SDLC Models</h3>
            <p>Process models describe different approaches to the management of the systems development life cycle. There are four models to consider:</p>
            <h4>Waterfall</h4>
            <p>The 'waterfall' development model is a sequential design process in which developers draft a complete list, or specification, of the client's requirements before system design and implementation begins. The detailed specification ensures that the client knows what to expect during the development process, including the time frame, extent of the system, and cost of the project. One particular advantage of this model arises if employees join the development team, as the detailed specification will help them to develop an understanding of the project in a short period of time. However, if the initial requirements specification for the project are incorrect, the project is highly likely to fail. Other difficulties associated with this sequential model include: It is not possible to back track and change a previously completed stage of the development process. The system is only tested once it is completed, and errors made at an early stage are difficult to correct. Changes in a client's requirements, requested as the project progresses, are difficult to accommodate.</p>
            <p><strong>Strengths:</strong> it uses a clear navigation and structure, this model is intuitive and collaborative with all team members, greater understanding of the requirements from the beginning of the project, documentation is incredibly detailed and therefore staff members can easily step into the project at different points, progress can be easily tracked as each phase has set milestones providing clear indicators of project status and help spot issues early.</p>
            <p><strong>Weaknesses:</strong> difficult to make changes once the project has moved from the beginning steps, this method has limited collaboration with end-user or clients, only effective for smaller projects, working models and testing do not take place until the latter stages, high risk if initial requirements are misunderstood.</p>
            <h4>Agile</h4>
            <p>This combines iterative development with collaboration and continuous improvement. It breaks down projects into smaller cycles (sprints) for incremental development. This model emphasises customer feedback, flexibility, and adaptive planning, in which developers start off with a simple project design as opposed to a detailed requirement specification. Agile development is the most suitable approach when the scope of the new system is not fully defined from the onset. Changes can be made after the initial planning phase, and, if the client requirements change, the system can be re-developed, although the lack of an initial detailed specification can cause difficulties in terms of predicting when the system is delivered without unexpected delays or rework.</p>
            <p><strong>Strengths:</strong> better adapts to change and requirements, limited documentation, making harder for new members to the team, can detect and fix issues and errors earlier, harder to measure progress as progress can happen over different stages at the same time, work closely with the end-user and clients to ensure the system meets the requirements, no full understanding of timescale or costing for system as it is changeable, can have a faster turnaround as not each step needs to be completed before moving on.</p>
            <p><strong>Weaknesses:</strong> harder to measure progress as progress can happen over different stages at the same time, no full understanding of timescale or costing for system as it is changeable, the design and long-term goals can lack cohesion as the process is fragmented.</p>
            <h4>Iterative</h4>
            <p>The iterative model is used when the full set of requirements is not known at the start and is suitable for large and complex projects. It allows for incremental development, where the software is developed and refined through repeated cycles (iterations). One strength of the model is flexibility, as changes can be made after each iteration, allowing for continuous improvement. Risk management is enhanced, with early iterations helping to identify and address risks early in the development process. Regular user feedback during iterations ensures the final product meets user needs, while parallel development allows different parts of the project to be developed simultaneously, speeding up the process. The approach can be resource-intensive, requiring significant resources for planning, designing, and testing each iteration. Managing multiple iterations can be complex, requiring careful coordination. Additionally, continuous changes and additions can lead to scope creep, potentially delaying the project.</p>
            <p><strong>Strengths:</strong> will have frequent feedback and adjustments based on outcomes, testing and requirements, can be both resources and time intensive with lack of timescale, will have an early prototype of solution than can be reviewed, feedback and worked on, has continuous improvement and refinement, can get stuck developing and refining.</p>
            <p><strong>Weaknesses:</strong> can be both resources and time intensive with lack of timescale, can get stuck developing and refining, not predictable, so difficult to discuss development stages with end-users and clients.</p>
            <h4>Spiral</h4>
            <p>The spiral model is used for large, complex, and high-risk projects. It combines elements of both iterative and waterfall models, focusing on risk assessment and reduction through repeated cycles (spirals). This model offers a strong focus on risk management, which makes it ideal for high-risk projects. Its flexibility allows for iterative refinement and the incorporation of user feedback, ensuring the product evolves to meet user needs. Additionally, the model includes comprehensive documentation in each phase, which aids in project tracking and serves as a valuable reference for future work. Regular customer involvement throughout the process ensures the project remains aligned with user expectations. The extensive risk analysis and iterative cycles can make the spiral model costly. Managing the model's complexity requires continuous risk assessment, which can be challenging due to its iterative nature. Moreover, the emphasis on risk management and detailed documentation often results in a time-consuming process, potentially extending the overall project timeline.</p>
            <p><strong>Strengths:</strong> software is produced early in the development process, it is an expensive method as it requires more resources and time, therefore not suitable for smaller projects, provides opportunities for early prototypes or proof-of-concepts, increased risk of scope creep due to ongoing changes and refinements, this methodology is strongest for handling risk management, can have fewer comprehensive documents.</p>
            <p><strong>Weaknesses:</strong> it is an expensive method as it requires more resources and time, therefore not suitable for smaller projects, increased risk of scope creep due to ongoing changes and refinements, can be difficult to estimate timescale on the project due to the iterative element, requires higher level of expertise due to the need to consider the risk management elements, better for larger more complicated systems.</p>
            <div class="callout">Choose methodology based on project size, risk, requirement clarity, and need for flexibility vs structure.</div>
          `,
          flashcards: [
            { term: "Waterfall", definition: "Sequential SDLC model with distinct phases; inflexible to change." },
            { term: "Agile", definition: "Iterative, user-centric development with short sprints and frequent feedback." },
            { term: "Spiral", definition: "Risk-driven SDLC model with repeated cycles and risk analysis." }
          ]
        },
        {
          id: "6-2-sdlc-stages",
          title: "6.2 SDLC Stages",
          notesHtml: `
            <h3>Phases of the Systems Development Life Cycle</h3>
            <p>The systems development life cycle (SDLC) is a defined process followed by system developers. The phases in the process are as shown in the diagram. The process is a cycle, repeating to allow refinements, updates and eventually replacement.</p>
            <h3>1. Scoping and Feasibility</h3>
            <p>This is the first phase of the project where project objectives are defined, alternative solutions are explored, and the project's viability is assessed. It involves gathering requirements, analysing risks, and determining the project's feasibility in terms of cost, resources, and time. A feasibility study is required. This involves the investigation of a problem situation and is used to decide whether a computerised solution is possible. The study should take account of all the relevant factors. The acronym TELOS is often used to refer to the five areas of a feasibility study: Technical: Can it be built? Economic: Will it be cost effective and can it be developed within an agreed budget? Legal: Will it comply with all the laws that may affect it, in the countries where it will be released? Operational: Will it work? Scheduling: Can it be implemented within a given timescale?</p>
            <h3>2. Analysis</h3>
            <p>This phase involves gaining a detailed understanding of requirements, identifying problems, and defining goals. Before a computerised solution to a given problem situation can be designed, there must be a thorough investigation into the problem to identify: the people and data involved, the processing to be carried out, the outputs required. Standard methods of investigation include: consulting documentation to investigate current data storage requirements and data flows, consulting staff/customers who will be using the new system, researching any similar existing systems that are available. Types of Investigation: Questionnaires, Interviews, Observations, Documentation Study.</p>
            <h3>3. Design</h3>
            <p>Using the information produced during the analysis phase, the system developers will need to consider user experience design (UX) and create a system design document (SDD) to provide an overview of the entire system, covering the critical information which is key to the functionality and look of the final system, including: system architecture, database design, data structures, programs and processes, system Interfaces, user interfaces.</p>
            <h3>4. Implementation</h3>
            <p>During this phase the system is developed to meet the requirements identified in the design phase. System implementation will involve: writing the program code for the new system, installing and configuring hardware and interfaces, installing and configuring data structures / the database, allocating tasks and processes, systems integration, bringing together the component subsystems into one system. The output from this phase should be a fully functioning and ready to use version of the new system.</p>
            <h3>5. Testing</h3>
            <p>A new system must be tested to ensure that it works correctly. There are many testing strategies that can be used, but it's important to have an effective test plan that includes tests to be conducted during system development, as well as tests to be performed on the completed system. Test data must be designed to ensure that correct outputs are produced. Tests should cover typical valid data, extreme or boundary valid data, and erroneous or invalid data. Every aspect of the system must be fully tested to ensure that invalid data is rejected, and valid data produces correct outcomes. Erroneous = information that is incorrect, inaccurate or misleading.</p>
            <h3>6. Deployment</h3>
            <p>This is the phase when the new system is installed and made operational. This phase may involve a changeover, moving from an existing system to the new system. Methods that may be used to implement this change, include: Direct changeover: The old system is replaced with the new system with no overlap. Used when the risk of losing data is low or when the new system has additional functions that are needed. Parallel changeover: The old system and new system are run side by side using the same data so that to allow outputs and results can be compared. Pilot changeover: The new system is used in one section of an organisation to check that t runs correctly before being out throughout the organisation. Phased changeover: Parts of the system are deployed and thoroughly tested before the next part of the system is introduced.</p>
            <h3>7. Maintenance</h3>
            <p>Maintenance is required to ensure the system continues to meet user needs. There are three broad categories of maintenance: Perfective maintenance takes place when there is a need to add functionality to the system when certain features were not envisaged during the earlier stages of the life cycle. Perfective maintenance is not a response to errors or faults in the system. Adaptive maintenance takes place when the end user needs the software to be amended to run in a different way, such as on a different operating system or on different hardware or interface with a new app. Corrective maintenance is carried out when the system is not functioning as it should and some change is needed, often resulting in the release of a software update or patch to correct an error not previously identified.</p>
            <h3>Security</h3>
            <p>To be effective, systems often need to move, store, and provide access to sensitive data. Unfortunately, this also makes them prime targets for cyberattacks. If these systems are successfully compromised, the fallout can be damaging and expensive. The very worst outcomes can be avoided if systems are designed and operated with security as a core consideration. Security should therefore be considered throughout the SDLC. Most development teams will include a secure system development specialist who will help to create systems which are resilient to attacks, and easier to manage and update.</p>
            <h3>Professional, Legal, Ethical & Social Considerations</h3>
            <p><strong>Professional:</strong> Developers, systems analysts, and project managers are professionals who provide services in accordance with a set of rules and guidelines set out in a code of conduct. For example, extracts from the four key principles of the British Computer Society's (BCS) Code of Conduct: Public Interest, Professional competence and integrity, Duty to relevant authorities (employer or client), Duty to the profession.</p>
            <p><strong>Professional Considerations related to Industry Standards for Software Development:</strong> Code Quality and Clean Coding: Other developers or teams may need to work on the same code. If the code is clear and well-structured, it's easier to fix bugs, add new features, and avoid mistakes. Developers follow guidelines like using meaningful variable names, proper indentation, and writing comments to explain complex parts of the code. Version Control: Using a system to track changes made to the code over time, like using Git or GitHub helps teams work together on the same project without overwriting each other's work. It also makes it easy to revert to earlier versions of the software if something goes wrong. Testing: Writing tests to check if the software works as expected, like unit tests or integration tests ensures that the code is reliable and helps find bugs early, preventing problems in the final product. Security Practices: Developers must follow best practices, such as encrypting sensitive data, using secure passwords, and regularly updating software to fix vulnerabilities. User-Centred Design: Creating software that is easy to use and meets the needs of its intended users. Developers work with designers and users to ensure the interface is intuitive and accessible. Compliance with Legal Standards: Ensuring that the software complies with laws and regulations, such as data protection laws. Developers must understand relevant legal requirements and ensure that personal data is handled safely and appropriately. Collaboration and Communication: Large software projects often involve many people, including developers, designers, testers, and project managers. Good communication ensures that everyone is on the same page and that the project runs smoothly. Developers should attend team meetings, use collaboration tools and document their work clearly. Performance Optimisation: Ensuring that the software runs efficiently, using the least number of resources as possible, such as memory or processing power. Developers should optimise code to improve speed and reduce the amount of data processed. Continuous Integration and Deployment (CI/CD): A practice where developers integrate code into a shared repository frequently and automatically deploy the software after successful testing. It ensures that the software is always in a working state and allows for quicker releases of new features or bug fixes. Developers use tools to automate testing and deployment and must ensure their code passes all checks before it's integrated. Ethical Considerations: Developers are responsible for how their software is used and must consider the consequences of their work. They should ensure that the software is used for good purposes and doesn't cause harm to individuals or society.</p>
            <p><strong>Legal:</strong> Intellectual Property Rights: Intellectual property (IP) refers to something original that you create, such as an invention, artistic work, or information system. You own IP if you created it yourself, had someone create it for you, or purchased the rights from the original owner. The owner of the IP can sell copies of their work (e.g., the system) to others for use. Other legal considerations may include: Data privacy and protection: Complying with data protection regulations, such as the GDPR and ensuring robust data security. Compliance with industry standards: Adhering to specific regulations relevant to the system, such as Gov.UK's Technology Code of Practice (TCoP), applicable when working on government technology projects.</p>
            <p><strong>Ethical & Social:</strong> Considerations may include: Privacy: Respect user privacy, minimise data collection, and ensure that any data collected is securely stored and protected from unauthorised access. Security: Develop software with robust security measures, including encryption and regular security audits, to protect against data breaches and cyber-attacks. Fairness: Avoid bias and discrimination in algorithms and implement measures to ensure that all users are treated fairly, regardless of their background. Transparency: Be transparent about software functionality, limitations, and risks, providing clear and comprehensive information to users about how the software operates and what data it collects. Discrimination: Preventing biases in algorithms that could lead to discrimination against certain groups. Quality: Ensuring systems are reliable, safe, and meet the quality standards promised to users. Digital divide: Addressing different levels of access to technology and the internet across different socio-economic groups. Accessibility: Make software accessible to users with disabilities by following accessibility standards and guidelines and providing alternative input and output options. Workplace diversity and inclusion: Promoting diversity in development teams and addressing issues of inclusion and representation. Intellectual Property: Respect copyrights and licenses, attribute sources correctly, and ensure that all third-party content used in the software is properly licensed. Environmental Impact: Minimise energy consumption and electronic waste by optimising software for energy efficiency and supporting the recycling and proper disposal of electronic devices. Social Impact: Consider broader societal implications of the software, promoting positive outcomes such as social inclusion, education, and well-being, while mitigating any negative impacts. Accountability: Take responsibility for the ethical implications of the software, promptly addressing and rectifying any issues that arise, and ensuring that there are clear processes for users to report concerns.</p>
            <div class="callout">Security should be considered throughout the SDLC. Most development teams include a secure system development specialist to create systems resilient to attacks.</div>
          `,
          flashcards: [
            { term: "Feasibility study", definition: "Assesses whether a project is worth doing given technical, financial, and legal constraints." },
            { term: "Requirements analysis", definition: "Discovering and documenting what stakeholders need the system to do." },
            { term: "Maintenance", definition: "Changes after release to fix issues, adapt to new environments, or improve quality." }
          ]
        },
        {
          id: "6-3-testing",
          title: "6.3 Testing",
          notesHtml: `
            <h3>Test planning</h3>
            <p>Objectives, scope, resources, schedule, entry/exit criteria, risks.</p>
            <h3>Test data categories</h3>
            <ul>
              <li><strong>Normal (valid)</strong> - typical expected inputs.</li>
              <li><strong>Boundary</strong> - edges of valid ranges (min, max, just inside/outside).</li>
              <li><strong>Erroneous / invalid</strong> - wrong type, empty, extreme - system should reject gracefully.</li>
            </ul>
            <h3>Testing types</h3>
            <ul>
              <li><strong>Alpha</strong> - in-house before release.</li>
              <li><strong>Beta</strong> - limited external users in real environments.</li>
              <li><strong>Acceptance (UAT)</strong> - stakeholders confirm it meets agreed criteria for handover.</li>
            </ul>
          `,
          flashcards: [
            { term: "Boundary test data", definition: "Values at the edges of acceptable ranges to catch off-by-one and limit errors." },
            { term: "Alpha testing", definition: "Internal testing by the development organisation before wider release." },
            { term: "Beta testing", definition: "Controlled testing with external users to find real-world issues." }
          ]
        }
      ]
    }
  ];
})();
