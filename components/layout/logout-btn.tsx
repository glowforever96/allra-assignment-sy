"use client";
import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

export default function LogoutBtn() {
  return (
    <Button size="sm" variant="secondary" onClick={logout}>
      로그아웃
    </Button>
  );
}
