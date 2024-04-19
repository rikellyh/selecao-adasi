import { ReactNode } from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

interface ButtonLoading extends ButtonProps {
  isLoading?: boolean;
  children: ReactNode;
}

export const ButtonLoading = (props: ButtonLoading) => {
  return (
    <Button {...props}>
      {props.isLoading ? <Spinner size="sm" /> : props.children}
    </Button>
  );
};
