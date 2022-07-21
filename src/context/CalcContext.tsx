import { FC, createContext } from "react";
// ################# CONTEXT TYPE ##################
const CalcContext = createContext<{
  complexNumber: ComplexNumber;
} | null>(null);

// ################# FUNCTIONS TYPES ###################
type ComplexNumber = (first: number, second: number, add: boolean) => number;

export const CalcStore: FC = ({ children }) => {
  // ############################## functions ################################
  // complex тоон дээрх үйлдлүүд...
  const complexNumber: ComplexNumber = (first, second, add) => {
    let result = 0;
    const sq1 = first * first;
    const sq2 = second * second;

    if (add) {
      const valueSq = sq1 + sq2;
      result = Math.sqrt(valueSq);
    } else {
      const valueSq = sq2 - sq1;
      result = Math.sqrt(valueSq);
    }

    return result;
  };

  // ############################## Буцаах утгууд ################################
  return (
    <CalcContext.Provider
      value={{
        complexNumber,
      }}
    >
      {children}
    </CalcContext.Provider>
  );
};

export default CalcContext;
