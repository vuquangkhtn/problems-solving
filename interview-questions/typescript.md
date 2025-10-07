## TypeScript

### Generic Type
<!-- id: wU[uW_$?r~, noteType: Basic-66869 -->

Generic type allows us to create a specific type by allowing us to pass types into it as parameters, which are reusable in many different situations Array<ItemType> Promise<ReturnedType> ReadOnly Partial Record<KeyType,ValueType>: key-value

### What are the primitive types in TypeScript?
<!-- id: O.YxF`&i?., noteType: Basic-66869 -->

string, number, boolean

### What is any type, and when to use it?
<!-- id: kn8xBaO07(, noteType: Basic-66869 -->

TypeScript assumes a variable is of type any when you don’t explicitly provide the type, and the compiler cannot infer the type of that variable

### What is void, and when to use the void type?
<!-- id: K&oN:86Sv&, noteType: Basic-66869 -->

The void indicates the absence of type on a variable. It is especially useful in functions that don’t return a value.

### What is an unknown type, and when to use it in TypeScript?
<!-- id: hht^kbbi|a, noteType: Basic-66869 -->

The unknown type is the type-safe counterpart of any type. You can assign anything to the unknown, but the unknown isn’t assignable to anything but itself and any, without narrowing it to a more specific type.

### Note to Create Strongly typed Component Events and Event Handlers
<!-- id: d,FQ@[~uaq, noteType: Basic-66869 -->

- the inline event handler is strongly-typed because TypeScript has cleverly inferred the type - named function event handler is not strongly-typed => explicitly typed by type annotation (tips: hover over the event handler to discover the type annotation)

### "<input type=""text"" onKeyDown={e:React.KeyboardEvent<HTMLInputElement> => console.log(e.key)} /> What is wrong?"
<!-- id: q+B]J_`xvE, noteType: Basic-66869 -->

We must wrap event paramaters by round bracket while we are using type annotation

### declare type for actions and dispatchs of redux-thunk
<!-- id: dsd,r&{3eh, noteType: Basic-66869 -->



### declare enum type
<!-- id: BLXGnxR].3, noteType: Basic-66869 -->
