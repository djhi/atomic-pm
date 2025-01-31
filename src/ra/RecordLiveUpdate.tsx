import { Collapse } from "@mui/material";
import { EventType, useSubscribeToRecord, Warning } from "@react-admin/ra-realtime";
import { useState } from "react";
import { useTranslate } from "react-admin";

export const RecordLiveUpdate = () => {
  const translate = useTranslate();
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updatedDisplayed, setUpdatedDisplayed] = useState(false);

  useSubscribeToRecord((event) => {
    if (event.type === EventType.Updated) {
      setUpdated(true);
      setUpdatedDisplayed(true);
    } else if (event.type === EventType.Deleted) {
      setDeleted(true);
      setUpdated(false);
      setUpdatedDisplayed(true);
    }
  });
  return (
    <Collapse in={deleted || updatedDisplayed}>
      {deleted && (
        <Warning
          message={translate("ra-realtime.notification.record.deleted", {
            _: "This record has been deleted and is no longer available",
          })}
        />
      )}
      {updated && (
        <Warning
          message={translate("ra-realtime.notification.record.updated", {
            _: "This record has been updated by another user",
          })}
          refresh
          onRefresh={(): void => {
            // we want the collapse to happen after the refresh
            // but if we setUpdated(false) right away, the content is empty
            // so we delay the setUpdated(false)
            setUpdatedDisplayed(false);
            setTimeout(() => {
              setUpdated(false);
            }, 500);
          }}
        />
      )}
    </Collapse>
  );
};
