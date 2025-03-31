import { useDefaultTitle, useListContext } from "react-admin";

export const BoardListTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <span>{defaultTitle}</span>
      <title>{`${defaultTitle} - ${appTitle}`}</title>
    </>
  );
};