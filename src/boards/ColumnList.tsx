import { Stack, StackProps } from "@mui/material";
import { Empty, RecordContextProvider, useListContext } from "react-admin";
import { Column } from "./Column";

export const ColumnList = ({ sx, ...props }: StackProps) => {
  const { data, error, isPending } = useListContext();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data.length === 0) return <Empty />;

  return (
    <Stack
      direction="row"
      minHeight="80vh"
      gap={2}
      sx={{
        overflowX: "auto",
        maxWidth: "98vw",
        flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
        pb: 2,
        ...sx,
      }}
      {...props}
    >
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Column
            sx={{ width: { xs: "100%", sm: "100%", md: "400px" }, padding: 2 }}
          />
        </RecordContextProvider>
      ))}
    </Stack>
  );
};
