import React, {useEffect, useState} from 'react';
import {THEMES} from "../StaticData";

function useTheme(initialTheme){
    const [theme, setTheme] = useState(initialTheme);
    const hours = new Date().getHours();
    useEffect(() => {
        if(theme === THEMES.AUTO){
            if(hours >= 7 && hours < 22){
                document.body.className = THEMES.LIGHT_THEME;
            }
            else{
                document.body.className = THEMES.DARK_THEME;
            }
        }
        else{
            document.body.className = theme;
        }
    }, [initialTheme]);

    return [theme, setTheme];
}

export default useTheme;