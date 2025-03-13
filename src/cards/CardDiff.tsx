import * as React from "react";
import { Link, Popover, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Labeled, NumberField, RaRecord, RecordContextProvider, ReferenceField, TextField, useGetList, useRecordContext } from "react-admin";
import { ReferenceRecordContextProvider, SmartFieldDiff } from "@react-admin/ra-history";
import get from "lodash/get";

export const CardDiff = ({ revision }: { revision: RaRecord }) => {
  const record = useRecordContext();
  const referenceRecords = useGetList("revisions", {
    filter: {
      "date@lt": revision.date,
      recordId: revision.recordId,
      resource: "cards",
    },
    sort: { field: "date", order: "DESC" },
    pagination: { page: 1, perPage: 1 },
  });

  if (!record) return null;
  if (!referenceRecords.data || referenceRecords.data?.length === 0) {
    return (
      <Typography variant="body2" component="span">
        Created the card
      </Typography>
    );
  }
  const referenceRecord = referenceRecords.data[0].data;
  const fields = Object.keys(record).filter(
    (field) => get(record, field) !== get(referenceRecord, field),
  );

  return (
    <Stack gap={1} component="span">
      {fields.map((field) => {
        switch (field) {
          case "column_id":
            return (
              <Labeled source="column_id" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <ReferenceField source="column_id" reference="columns">
                      <TextField
                        source="name"
                        component="span"
                        sx={{ color: "text.secondary" }}
                      />
                    </ReferenceField>
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <ReferenceField source="column_id" reference="columns">
                    <TextField
                      source="name"
                      component="span"
                      sx={{ color: "text.primary" }}
                    />
                  </ReferenceField>
                </Stack>
              </Labeled>
            );
          case "assigned_user_id":
            return (
              <Labeled source="assigned_user_id" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <ReferenceField
                      source="assigned_user_id"
                      reference="profiles"
                      emptyText="Unassigned"
                    >
                      <TextField
                        source="email"
                        component="span"
                        sx={{ color: "text.secondary" }}
                      />
                    </ReferenceField>
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <ReferenceField
                    source="assigned_user_id"
                    reference="profiles"
                    emptyText="Unassigned"
                  >
                    <TextField
                      source="email"
                      component="span"
                      sx={{ color: "text.primary" }}
                    />
                  </ReferenceField>
                </Stack>
              </Labeled>
            );
          case "estimate":
            return (
              <Labeled source="estimate" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <NumberField
                      source="estimate"
                      component="span"
                      sx={{ color: "text.secondary" }}
                    />
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <NumberField
                    source="estimate"
                    component="span"
                    sx={{ color: "text.primary" }}
                  />
                </Stack>
              </Labeled>
            );
          case "title":
            return (
              <Labeled source="title" component="span">
                <Stack direction="row" gap={1} component="span">
                  <RecordContextProvider value={referenceRecord}>
                    <TextField
                      source="title"
                      component="span"
                      sx={{ color: "text.secondary" }}
                    />
                  </RecordContextProvider>
                  <ArrowForwardIcon />
                  <TextField
                    source="title"
                    component="span"
                    sx={{ color: "text.primary" }}
                  />
                </Stack>
              </Labeled>
            );
          case "description":
            return (
              <ReferenceRecordContextProvider value={referenceRecord}>
                <DescriptionDiff />
              </ReferenceRecordContextProvider>
            );
          case "position":
            return null;
          default:
            return (
              <Typography variant="body2" component="span">
                {revision.message}
              </Typography>
            );
        }
      })}
    </Stack>
  );
};

const DescriptionDiff = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Link
        component="button"
        aria-describedby={id}
        onClick={handleClick}
        sx={{ textAlign: "left" }}
      >
        Changed the description
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <SmartFieldDiff
            source="description"
            sx={{
              "& .RaLabeled-label": {
                display: "none",
              },
            }}
          />
        </Typography>
      </Popover>
    </>
  );
};