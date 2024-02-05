"use client";

import ClockModel from "@/entities/clock/model";
import ClockModeModel from "@/entities/clock-mode/model";
import CommandsCounterModel from "@/entities/commands-counter/model";
import MicroCommandsCounterModel from "@/entities/micro-commands-counter/model";
import ClockHandler from "@/entities/clock/handler";
import ClockModeHandler from "@/entities/clock-mode/handler";
import CommandsCounterHandler from "@/entities/commands-counter/handler";
import MicroCommandsCounterHandler from "@/entities/micro-commands-counter/handler";
import * as SchemeEnv from "scheme-environment";
import { useEffect } from "react";
import { WClock } from "@/widgets/clock/ui";
import { WCommandsCounter } from "@/widgets/commands-counter/ui";
import { WMicroCommandsCounter } from "@/widgets/micro-commands-counter/ui";

export default function Home() {

  useEffect(() => {
    SchemeEnv.create({
      elements: [
        ClockModel,
        ClockModeModel,
        CommandsCounterModel,
        MicroCommandsCounterModel,
      ],
      handlers: [
        ClockHandler,
        ClockModeHandler,
        CommandsCounterHandler,
        MicroCommandsCounterHandler,
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
      <WMicroCommandsCounter />
    </div>
  );
}
