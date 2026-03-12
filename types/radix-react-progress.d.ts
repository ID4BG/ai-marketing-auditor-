declare module "@radix-ui/react-progress" {
  import * as React from "react";

  interface ProgressRootProps extends React.ComponentPropsWithoutRef<"div"> {
    value?: number;
    max?: number;
  }

  interface ProgressIndicatorProps
    extends React.ComponentPropsWithoutRef<"div"> {}

  export const Root: React.ForwardRefExoticComponent<
    ProgressRootProps & React.RefAttributes<HTMLDivElement>
  >;

  export const Indicator: React.ForwardRefExoticComponent<
    ProgressIndicatorProps & React.RefAttributes<HTMLDivElement>
  >;
}
