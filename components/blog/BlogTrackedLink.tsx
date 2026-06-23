"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackBlogEvent, type BlogAnalyticsParams } from "@/lib/blog-analytics";

type Props = {
  href: string;
  eventName: string;
  eventParams?: BlogAnalyticsParams;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

export function BlogTrackedLink({
  href,
  eventName,
  eventParams,
  className,
  children,
  external,
  ...rest
}: Props) {
  const isExternal = external ?? href.startsWith("http");

  const onClick = () => {
    trackBlogEvent(eventName, {
      link_url: href,
      ...eventParams,
    });
  };

  if (isExternal) {
    return (
      <a href={href} className={className} onClick={onClick} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
