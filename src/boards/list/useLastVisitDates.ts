import { useStore } from "react-admin";

export const useLastVisitDates = () =>
  useStore<Record<string, Date>>("boards.visit_dates", {});
