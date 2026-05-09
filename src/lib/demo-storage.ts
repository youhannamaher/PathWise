"use client";

import { useState, useEffect } from "react";

// Keys
const DEMO_ASSESSMENT_KEY = "pathwise_demo_assessment";
const DEMO_SAVED_PROGRAMS_KEY = "pathwise_demo_saved_programs";
const DEMO_DECISION_BOARD_KEY = "pathwise_demo_decision_board";

export const getDemoAssessment = () => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(DEMO_ASSESSMENT_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveDemoAssessment = (data: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_ASSESSMENT_KEY, JSON.stringify(data));
};

export const getDemoSavedPrograms = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(DEMO_SAVED_PROGRAMS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveDemoProgram = (programId: string) => {
  if (typeof window === "undefined") return;
  const programs = getDemoSavedPrograms();
  if (!programs.includes(programId)) {
    programs.push(programId);
    localStorage.setItem(DEMO_SAVED_PROGRAMS_KEY, JSON.stringify(programs));
  }
};

export const removeDemoProgram = (programId: string) => {
  if (typeof window === "undefined") return;
  let programs = getDemoSavedPrograms();
  programs = programs.filter(id => id !== programId);
  localStorage.setItem(DEMO_SAVED_PROGRAMS_KEY, JSON.stringify(programs));
};

export const getDemoDecisionBoard = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(DEMO_DECISION_BOARD_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveDemoDecisionBoardItem = (item: any) => {
  if (typeof window === "undefined") return;
  let board = getDemoDecisionBoard();
  const existingIndex = board.findIndex((b: any) => b.program_id === item.program_id);
  if (existingIndex >= 0) {
    board[existingIndex] = { ...board[existingIndex], ...item };
  } else {
    board.push(item);
  }
  localStorage.setItem(DEMO_DECISION_BOARD_KEY, JSON.stringify(board));
};

export const isDemoMode = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("pathwise_demo_mode") === "true";
};

export const enableDemoMode = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem("pathwise_demo_mode", "true");
};

export const disableDemoMode = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("pathwise_demo_mode");
  localStorage.removeItem(DEMO_ASSESSMENT_KEY);
  localStorage.removeItem(DEMO_SAVED_PROGRAMS_KEY);
  localStorage.removeItem(DEMO_DECISION_BOARD_KEY);
};
