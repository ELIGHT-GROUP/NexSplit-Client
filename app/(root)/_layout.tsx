import React, { useEffect } from "react";
//import { AuthMiddleware } from "@/providers/AuthMiddleware";
import { Slot } from "expo-router";

export default function MainLayout() {
  return (
    //<AuthMiddleware>
    <Slot />
    //</AuthMiddleware>
  );
}
