import React from "react";
import Card from "../Card";
import Title from "../Title";
import { TabDailyKanbanStatus } from "./TabTable";

const DailyKanbanStatus = (props) => {
  const { customStyle, header, dailyRequest, dailyIngrogress, dailyDone } =
    props;
  return (
    <Card customStyle={customStyle}>
      <Title name={header} />
      <TabDailyKanbanStatus
        setHeight={customStyle}
        dailyRequest={dailyRequest}
        dailyIngrogress={dailyIngrogress}
        dailyDone={dailyDone}
      />
    </Card>
  );
};

export default DailyKanbanStatus;
