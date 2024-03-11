export type AlertType = "info" | "success" | "error" | "warning";

export interface IAlertBox {
  title: string;
  message: string;
  type?: AlertType;
  alwaysOpen?: boolean;
  destroy?:boolean;
}
