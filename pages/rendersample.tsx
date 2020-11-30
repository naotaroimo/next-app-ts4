import { useState, ChangeEvent, useRef } from "react";

const RenderSample = () => {

    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleClick = () => {
        alert(inputRef.current?.value);
    }

    return (
        <div>
            <input type="text" value={value} onChange={handleInputChange} placeholder="useState" />

            <input type="text" ref={inputRef} placeholder="useRef" />
            <button onClick={handleClick}>ref check</button>
            <div>
                <div>
                    useState input is 「{value}」
               </div>
                <div>
                    useRef input is 「{inputRef.current?.value}」
               </div>
            </div>

        </div>
    );
}
export default RenderSample