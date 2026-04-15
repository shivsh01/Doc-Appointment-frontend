import { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

type CardVariant = "default" | "glass" | "elevated";
type CardPadding = "none" | "sm" | "md" | "lg";

const padMap: Record<CardPadding, string> = {
  none: styles.padNone,
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: ReactNode;
}

export function Card({
  variant = "default",
  padding = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  const classes = [styles.card, styles[variant], padMap[padding], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
