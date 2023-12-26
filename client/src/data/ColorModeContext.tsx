import React from 'react';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

// TODO:  Refactor this into a custom theme provider

// interface ColorModeContextType {
//   colorMode: 'light' | 'dark';
//   toggleColorMode: () => void;
// }

// export const ColorModeContext = createContext<ColorModeContextType>({
//   colorMode: 'dark',
//   toggleColorMode: () => {},
// });

// export const ColorModeProvider = ({ children }: PropsWithChildren<{}>) => {
//   const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

//   const toggleColorMode = useMemo(() => {
//     return () =>
//       setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   }, []);

//   const contextValue = {
//     colorMode,
//     toggleColorMode,
//   };

//   return (
//     <ColorModeContext.Provider value={contextValue}>
//       {children}
//     </ColorModeContext.Provider>
//   );
// };
