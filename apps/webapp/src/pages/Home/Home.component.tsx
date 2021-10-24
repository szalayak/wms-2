import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadDemoData, selectDemovalue } from "../../features/demo/demoSlice";

export default function Home() {
  const { t } = useTranslation();
  const apiValue = useAppSelector(selectDemovalue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDemoData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography variant="h1" component="div" gutterBottom>
        {t("app-title")}
      </Typography>
      API Says: {apiValue}
    </React.Fragment>
  );
}
