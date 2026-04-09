import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>['name'];

type Props = {
    name: IconName;
    size?: number;
    color?: string;
};

export default function Icon({name, size = 20, color = '#888'}: Props){
    return <Ionicons name={name} size={size} color={color}/>;
}