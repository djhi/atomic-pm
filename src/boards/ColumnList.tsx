import { Stack, StackProps } from "@mui/material";
import { Empty, RecordContextProvider, useRecordContext } from "react-admin";
import { Column } from "./Column";

export const ColumnList = ({ sx, ...props }: StackProps) => {
  const board = useRecordContext();
  if (!board) return null;
  if (board.columns.length === 0) return <Empty />;

  return (
    <Stack
      direction="row"
      minHeight="80vh"
      gap={4}
      sx={{
        overflowX: "auto",
        maxWidth: "98vw",
        flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
        pb: 2,
        ...sx,
      }}
      {...props}
    >
      {board.columns?.map((record: any) => (
        <RecordContextProvider key={record.id} value={record}>
          <Column
            sx={{ width: { xs: "100%", sm: "100%", md: "400px" }, padding: 2 }}
          />
        </RecordContextProvider>
      ))}
    </Stack>
  );
};
