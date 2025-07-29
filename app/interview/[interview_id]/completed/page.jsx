// "use client";

// import React from "react";
// import styled, { keyframes } from "styled-components";
// import { motion } from "framer-motion";

// const pulse = keyframes`
//   0%, 100% { box-shadow: 0 0 0 0 rgba(0, 200, 100, 0.7); }
//   50% { box-shadow: 0 0 15px 10px rgba(0, 200, 100, 0); }
// `;

// const pulseGlow = keyframes`
//   0%, 100% {
//     box-shadow:
//       0 0 10px 4px #ff0057,
//       0 0 20px 8px #ffbb00,
//       0 0 30px 12px #00ffea,
//       0 0 40px 16px #007bff;
//   }
//   50% {
//     box-shadow:
//       0 0 20px 8px #ff0057,
//       0 0 30px 12px #ffbb00,
//       0 0 40px 16px #00ffea,
//       0 0 50px 20px #007bff;
//   }
// `;

// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #e0eaff, #d7c9f3);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 3rem 1rem;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// `;

// const Card = styled.div`
//   background: rgba(255, 255, 255, 0.85);
//   backdrop-filter: blur(20px);
//   border-radius: 20px;
//   box-shadow: 0 15px 30px rgba(100, 100, 150, 0.15);
//   padding: 3rem 4rem;
//   max-width: 700px;
//   width: 100%;
//   text-align: center;
//   position: relative;

//   @media (max-width: 768px) {
//     padding: 2rem 2rem;
//     max-width: 90vw;
//   }

//   @media (max-width: 400px) {
//     padding: 1.5rem 1.5rem;
//   }
// `;

// const CheckCircle = styled(motion.div)`
//   background-color: #00c864;
//   width: 90px;
//   height: 90px;
//   border-radius: 50%;
//   margin: 0 auto 1.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   animation: ${pulse} 2s ease-in-out infinite;

//   svg {
//     width: 48px;
//     height: 48px;
//     stroke: white;
//     stroke-width: 4;
//     stroke-linecap: round;
//     stroke-linejoin: round;

//     @media (max-width: 400px) {
//       width: 36px;
//       height: 36px;
//     }
//   }
// `;

// const Title = styled(motion.h1)`
//   font-weight: 700;
//   font-size: 2.8rem;
//   color: #222;
//   margin-bottom: 0.5rem;

//   @media (max-width: 768px) {
//     font-size: 2.2rem;
//   }

//   @media (max-width: 400px) {
//     font-size: 1.8rem;
//   }
// `;

// const Subtitle = styled(motion.p)`
//   font-size: 1.2rem;
//   color: #555;
//   margin-bottom: 3rem;

//   @media (max-width: 768px) {
//     font-size: 1rem;
//     margin-bottom: 2rem;
//   }

//   @media (max-width: 400px) {
//     font-size: 0.9rem;
//     margin-bottom: 1.5rem;
//   }
// `;

// const Illustration = styled(motion.div)`
//   width: 100%;
//   height: 240px;
//   border-radius: 25px;
//   margin-bottom: 3rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   animation: ${pulseGlow} 3.5s ease-in-out infinite;

//   img {
//     height: 100%;
//     width: auto;
//     object-fit: cover;
//     border-radius: 25px;
//     user-select: none;
//   }

//   @media (max-width: 768px) {
//     height: 180px;
//   }

//   @media (max-width: 400px) {
//     height: 140px;
//   }
// `;

// const NextSection = styled(motion.div)`
//   margin-top: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const PlaneIcon = styled(motion.div)`
//   margin-bottom: 1rem;
//   svg {
//     width: 48px;
//     height: 48px;
//     stroke: #4a90e2;
//     stroke-width: 2.5;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//     cursor: pointer;

//     @media (max-width: 400px) {
//       width: 36px;
//       height: 36px;
//     }
//   }
// `;

// const NextText = styled(motion.p)`
//   font-size: 1.3rem;
//   color: #333;
//   max-width: 400px;
//   text-align: center;

//   @media (max-width: 768px) {
//     font-size: 1.1rem;
//     max-width: 90vw;
//   }

//   @media (max-width: 400px) {
//     font-size: 1rem;
//   }
// `;

// const Typewriter = ({ text }) => {
//   const [displayed, setDisplayed] = React.useState("");
//   React.useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setDisplayed(text.slice(0, i));
//       i++;
//       if (i > text.length) clearInterval(interval);
//     }, 40);
//     return () => clearInterval(interval);
//   }, [text]);
//   return <>{displayed}</>;
// };

// const InterviewComplete = () => {
//   return (
//     <Container>
//       <Card
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <CheckCircle
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           aria-label="Interview completed"
//           role="img"
//         >
//           <svg viewBox="0 0 24 24" fill="none">
//             <polyline points="20 6 9 17 4 12" />
//           </svg>
//         </CheckCircle>

//         <Title
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//         >
//           Interview Completed!
//         </Title>

//         <Subtitle>
//           <Typewriter text="Thank you for participating in the AI-driven interview with AIcruiter" />
//         </Subtitle>

//         <Illustration
//           initial={{ scale: 0.95, opacity: 0.8 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//           aria-label="Interview Illustration"
//           role="img"
//         >
//           <img src="/interview.png" alt="AI Interview Scene" />
//         </Illustration>

//         <NextSection
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.8, duration: 0.8 }}
//         >
//           <PlaneIcon
//             whileHover={{ rotate: 15, scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             aria-label="Next steps paper plane"
//             role="img"
//           >
//             <svg viewBox="0 0 24 24" fill="none">
//               <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
//             </svg>
//           </PlaneIcon>
//           <NextText>
//             The recruiter will review your interview responses and will contact
//             you soon regarding the next steps.
//           </NextText>
//         </NextSection>
//       </Card>
//     </Container>
//   );
// };

// export default InterviewComplete;

"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 200, 100, 0.7); }
  50% { box-shadow: 0 0 15px 10px rgba(0, 200, 100, 0); }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow:
      0 0 10px 4px #ff0057,
      0 0 20px 8px #ffbb00,
      0 0 30px 12px #00ffea,
      0 0 40px 16px #007bff;
  }
  50% {
    box-shadow:
      0 0 20px 8px #ff0057,
      0 0 30px 12px #ffbb00,
      0 0 40px 16px #00ffea,
      0 0 50px 20px #007bff;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eaff, #d7c9f3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(100, 100, 150, 0.15);
  padding: 3rem 4rem;
  max-width: 700px;
  width: 100%;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 2rem;
    max-width: 90vw;
  }

  @media (max-width: 400px) {
    padding: 1.5rem 1.5rem;
  }
`;

const CheckCircle = styled(motion.div)`
  background-color: #00c864;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;

  svg {
    width: 48px;
    height: 48px;
    stroke: white;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;

    @media (max-width: 400px) {
      width: 36px;
      height: 36px;
    }
  }
`;

const Title = styled(motion.h1)`
  font-weight: 700;
  font-size: 2.8rem;
  color: #222;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 400px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 400px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const Illustration = styled(motion.div)`
  width: 100%;
  height: 240px;
  border-radius: 25px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: ${pulseGlow} 3.5s ease-in-out infinite;

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
    border-radius: 25px;
    user-select: none;
  }

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 400px) {
    height: 140px;
  }
`;

const NextSection = styled(motion.div)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlaneIcon = styled(motion.div)`
  margin-bottom: 1rem;
  svg {
    width: 48px;
    height: 48px;
    stroke: #4a90e2;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    cursor: pointer;

    @media (max-width: 400px) {
      width: 36px;
      height: 36px;
    }
  }
`;

const NextText = styled(motion.p)`
  font-size: 1.3rem;
  color: #333;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 90vw;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const Typewriter = ({ text }) => {
  const [displayed, setDisplayed] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return <>{displayed}</>;
};

const InterviewComplete = () => {
  // Toast effect
  React.useEffect(() => {
    toast.success("Feedback generated!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <CheckCircle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-label="Interview completed"
          role="img"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckCircle>

        <Title
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Interview Completed!
        </Title>

        <Subtitle>
          <Typewriter text="Thank you for participating in the AI-driven interview with AIcruiter" />
        </Subtitle>

        <Illustration
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          aria-label="Interview Illustration"
          role="img"
        >
          <img src="/interview.png" alt="AI Interview Scene" />
        </Illustration>

        <NextSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <PlaneIcon
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label="Next steps paper plane"
            role="img"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </PlaneIcon>
          <NextText>
            The recruiter will review your interview responses and will contact
            you soon regarding the next steps.
          </NextText>
        </NextSection>
      </Card>

      {/* Toast notification container */}
      <ToastContainer />
    </Container>
  );
};

export default InterviewComplete;
