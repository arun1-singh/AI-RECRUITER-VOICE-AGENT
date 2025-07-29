"use client";

import React from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { ToggleRight, Settings, BellRing, UserCircle, LockKeyhole } from "lucide-react";
import { Switch } from "@headlessui/react";

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff, 0 0 30px #00f2ff;
  }
  50% {
    box-shadow: 0 0 20px #ff00d4, 0 0 30px #ff00d4, 0 0 40px #ff00d4;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top left, #15162c, #0d0f23);
  padding: 4rem 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #f1f5f9;
`;

const SettingsCard = styled(motion.div)`
  width: 100%;
  max-width: 720px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  border: 2px solid #2f3640;
  padding: 2.5rem;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
  animation: ${glow} 5s ease-in-out infinite;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #00f2ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #3b3f58;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: #00f2ff;
  }
`;

const OptionLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

export default function SettingsPage() {
  const [voiceMode, setVoiceMode] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);

  return (
    <Container>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-10"
      >
        AIcruiter — Voice Assistant Settings
      </motion.h1>

      <SettingsCard
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Section>
          <SectionTitle><Settings className="w-5 h-5" /> General Preferences</SectionTitle>

          <Option>
            <OptionLabel>Enable Voice Interaction</OptionLabel>
            <Switch
              checked={voiceMode}
              onChange={setVoiceMode}
              className={`${
                voiceMode ? 'bg-green-500' : 'bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  voiceMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Option>

          <Option>
            <OptionLabel>Dark Mode</OptionLabel>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? 'bg-purple-600' : 'bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Option>
        </Section>

        <Section>
          <SectionTitle><BellRing className="w-5 h-5" /> Notifications</SectionTitle>

          <Option>
            <OptionLabel>Interview Reminders</OptionLabel>
            <Switch
              checked={notifications}
              onChange={setNotifications}
              className={`${
                notifications ? 'bg-cyan-500' : 'bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Option>
        </Section>

        <Section>
          <SectionTitle><UserCircle className="w-5 h-5" /> Profile</SectionTitle>
          <Option>
            <OptionLabel>Change Email / Name</OptionLabel>
            <span className="text-cyan-400 hover:underline cursor-pointer">Edit</span>
          </Option>
          <Option>
            <OptionLabel>Reset Password</OptionLabel>
            <span className="text-cyan-400 hover:underline cursor-pointer">Reset</span>
          </Option>
        </Section>

        <Section>
          <SectionTitle><LockKeyhole className="w-5 h-5" /> Security</SectionTitle>
          <Option>
            <OptionLabel>Two Factor Authentication</OptionLabel>
            <span className="text-green-400">Enabled</span>
          </Option>
        </Section>
      </SettingsCard>
    </Container>
  );
}
