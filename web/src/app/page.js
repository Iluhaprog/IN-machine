"use client";

import ClockModel from "@/entities/clock/model";
import ClockModeModel from "@/entities/clock-mode/model";
import CommandsCounterModel from "@/entities/commands-counter/model";
import ClockHandler from "@/entities/clock/handler";
import ClockModeHandler from "@/entities/clock-mode/handler";
import CommandsCounterHandler from "@/entities/commands-counter/handler";
import * as SchemeEnv from "scheme-environment";
import { useEffect } from "react";
import { WClock } from "@/widgets/clock/ui";
import { WCommandsCounter } from "@/widgets/commands-counter/ui";

export default function Home() {

  useEffect(() => {
    SchemeEnv.create({
      elements: [
        ClockModel,
        ClockModeModel,
        CommandsCounterModel,
      ],
      handlers: [
        ClockHandler,
        ClockModeHandler,
        CommandsCounterHandler,
      ],
    });

    const id = SchemeEnv.run();

    return () => {
      clearInterval(id);
    }
  }, []);
  
  return (
    <div>
      <WClock />
      <WCommandsCounter />
    </div>
  );
}
