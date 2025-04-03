import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type BoardFilterContextType = RegExp | undefined;

export type BoardSetFilterContextType = Dispatch<
  SetStateAction<string | undefined>
>;

export const BoardFilterContext = createContext<BoardFilterContextType | null>(
  null,
);

export const BoardSetFilterContext = createContext<BoardSetFilterContextType | null>(
  null,
);

export const useBoardFilterContext = () => {
  const context = useContext(BoardFilterContext);
  return context;
};

export const useBoardSetFilterContext = () => {
  const context = useContext(BoardSetFilterContext);
  if (!context) {
    throw new Error(
      "useBoardSetFilterContext must be used within a BoardSetFilterContext",
    );
  }
  return context;
};
