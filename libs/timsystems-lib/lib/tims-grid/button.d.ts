export interface Button {
    text: string;
    icon: string;
    animation?: string;
    alternateIcon?: string;
}
export interface ButtonDefinition {
    name: string;
    button: Button;
}
