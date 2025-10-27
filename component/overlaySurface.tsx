import React from "react";
import { View,type ViewProps,StyleSheet } from "react-native";
type props=ViewProps&{
    elevation:number,
    theme:'light'|'dark',
    children:React.ReactNode;


}
const opacity=[
    0,
    0.05,
    0.07,
    0.08,
    0.09,
    0.1,
    0.11,
    0.12,
    0.13,
    0.14,
    0.15,
    0.16,
    0.17,
    0.18,
    0.19
]
export default function OverlaySurface({style,theme,elevation,children,...rest}:props){
    const overlayOpacity=theme==='dark'?(opacity[elevation]):0;
    return(
        <View style={[{position:'relative',overflow:'hidden'},style]}>
            <View
            pointerEvents="none"
            style={{
                backgroundColor:`rgba(255,255,255,${overlayOpacity})`,
                // position:'absolute'
                ...StyleSheet.absoluteFillObject


            }}
            />
            {children}
        </View>
    )
}
