"use client";

import ClockModel from "@/entities/clock/model";
import ClockModeModel from "@/entities/clock-mode/model";
import ClockHandler from "@/entities/clock/handler";
import ClockModeHandler from "@/entities/clock-mode/handler";
import * as SchemeEnv from "scheme-environment";
import { useEffect } from "react";
import { FClock } from "@/features/clock/ui";

export default function Home() {

  useEffect(() => {
    SchemeEnv.create({
      elements: [
        ClockModel,
        ClockModeModel,
      ],
      handlers: [
        ClockHandler,
        ClockModeHandler,
      ],
    });

    const id = SchemeEnv.run();

    return () => {
      clearInterval(id);
    }
  }, []);
  
  return (
    <div>
      <FClock />
    </div>
  );
}
