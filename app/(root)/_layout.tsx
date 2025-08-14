import React from "react";
import { AuthMiddleware } from "@/components/common/AuthMiddleware";
import { Slot } from "expo-router";

export default function MainLayout() {
  return (
    <AuthMiddleware>
      <Slot />
    </AuthMiddleware>
  );
}
