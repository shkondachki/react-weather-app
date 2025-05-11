import {createContext, ReactNode, useEffect, useState} from "react";

type Unit = "celsius" | "fahrenheit"

interface DegreeUnitContextProps {
    unit: Unit;
    toggleUnit: () => void;
}

const defaultContext: DegreeUnitContextProps = {
    unit: "celsius",
    toggleUnit: () => {}
}
export const DegreeUnitContext = createContext<DegreeUnitContextProps>(defaultContext);

interface DegreeUnitProviderProps {
    children: ReactNode;
}

export const DegreeUnitProvider: React.FC<DegreeUnitProviderProps> = ( {children} )=>  {
    const [unit, setUnit] = useState<Unit>( () => {
        const savedUnit = localStorage.getItem('degreeUnit') as Unit;
        return savedUnit || "celsius";
    } )

    useEffect(() => {
        localStorage.setItem('degreeUnit', unit)
    }, [unit]);

    const toggleUnit = () => {
        setUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))
    }

    return (
        <DegreeUnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </DegreeUnitContext.Provider>
    )
}