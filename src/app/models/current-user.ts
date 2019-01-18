export class CurrentUser {
  Id: number;
  UserName: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Email: string;
}

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
