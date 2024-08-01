import styled from "styled-components"

export type ButtonVariants = "primary" | "secondary" | "danger" | "success" | "warning" | "information"

interface ButtonContainerProps{
    variant: ButtonVariants
}

// template literals
export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    border: 0;
    border-radius: 16px;
    
    margin-right: 15px;

    background-color: ${props => props.theme["green-500"]};
    color: ${props => props.theme.white};
`