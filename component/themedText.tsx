// import { useThemeColor } from '@/app-example/hooks/useThemeColor';
import { color } from '@/constant/color';
import { StyleSheet, Text, TextProps } from 'react-native';
import { opacity } from '@/constant/opacityTheme';



type props = TextProps & {
    variant: keyof ReturnType<typeof getStyles>,
    couleur?: keyof typeof color['light'|'dark'],
    theme:"light"|"dark"
}
export function ThemedText({ variant,style,couleur,theme, ...rest }: props) {
        const styles = getStyles(theme);

    return (
        <Text style={[styles[variant??'normal'],style]} {...rest} />
    )
}

const getStyles = (theme:'light'|'dark') => {
    return(
        StyleSheet.create({
            body3: {
                fontSize: 14.5,
                fontWeight: 'bold',
                fontFamily:'sans-serif-light',
                opacity: 0.9,
                color: color[theme].textColor,
            },
            headline: {
                fontSize: 28,
                borderTopStartRadius: 40,
                lineHeight: 32,
                fontWeight: 'bold',
                fontFamily:'sans-serif-medium',
                paddingHorizontal: 16,
                paddingVertical: 8,
                color: 'whitesmoke',
                opacity: opacity[theme].title
            },
            title: {
                fontSize: 13,
                lineHeight: 20,
                color: color[theme].textColor,
                opacity: opacity[theme].header
            },
            normal: {
                fontSize: 14,
                fontWeight: "normal",
                fontFamily:'sans-serif-light',
                // lineHeight: 22,
                color: color[theme].textColor,
                opacity: opacity[theme].normale
            },

            // Nouvelles variantes pour l'affichage des paroles
            parole: {
                fontSize: 14.1,
                fontWeight: "500",
                fontFamily:'sans-serif-light',
                lineHeight: 22,
                color: color[theme].textColor,
                opacity: opacity[theme].normale
            },
            paroleTitle: {
                fontSize: 22,
                lineHeight: 32,
                fontWeight: '200',
                color: color[theme].textColor,
                textAlign: 'center',
                marginBottom: 16,
                opacity: opacity[theme].title
            },
            adminText:{
                fontSize: 14.5,
                fontWeight: 'bold',
                fontFamily:'sans-serif-light',
                opacity: 0.9,
                color:'#808080',
            },
            suppressionText:{
                fontSize: 15,
                fontWeight:'300',
                fontFamily:'sans-serif-light',
                opacity: 0.9,
                color:color[theme].textColor,
            }
        })
    )
}