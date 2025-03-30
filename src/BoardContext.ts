import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import { type RaRecord } from "react-admin";

export type BoardContextType = [
  RaRecord | undefined,
  Dispatch<SetStateAction<RaRecord | undefined>>,
];

export const BoardContext = createContext<BoardContextType | null>(null);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};
