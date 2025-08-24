// hooks/useBreakpoint.ts
import { useWindowDimensions } from "react-native";

export type Breakpoint = {
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    width: number;
};

export default function useBreakpoint(): Breakpoint {
    const { width } = useWindowDimensions();

    return {
        sm: width < 640,
        md: width >= 640 && width < 768,
        lg: width >= 768 && width < 1024,
        xl: width >= 1024,
        width,
    };
}
