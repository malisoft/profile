"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HomeIcon, PlusIcon, SettingsIcon, UsersIcon } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "My Profiles",
    href: "/dashboard/profiles",
    icon: UsersIcon,
  },
  {
    title: "Create Profile",
    href: "/dashboard/profiles/new",
    icon: PlusIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2 md:sticky md:top-20">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          passHref
        >
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname === item.href && "bg-primary text-primary-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
