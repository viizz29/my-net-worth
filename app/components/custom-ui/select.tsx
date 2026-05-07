import { LoadingCircleSmall } from "./loading-circles";

export interface SelectOption {
    value: string;
    caption: string;
}

export interface SelectProps {
    name?: string;
    type?: string;
    readonly?: boolean;
    value?: string | number | undefined;
    error?: string | undefined;
    touched?: boolean | undefined;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean | false;
    options: SelectOption[];
    placeholder?: string;
}

const Select: React.FC<SelectProps> = (props) => {
    const fieldId = "id_" + props.name;


    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col gap-1 w-full">
                    <div
                        className={`flex items-center justify-between shadow-lg bg-transparent border rounded border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`}
                    >
                        <div className={props.readonly ? "bg-gray-200 border border-1 border-gray-200 w-full" : "w-full"}>
                            {props.options && props.options.length >= 0 ?
                                (<select
                                    disabled={props.readonly}
                                    required={props.required}
                                    onChange={props.onChange}
                                    value={props?.value}
                                    className={`text-primary p-2 bg-transparent outline-none w-full`}
                                    name={props.name}
                                    id={fieldId}
                                >
                                    <option value="">----Select {props?.placeholder}----</option>
                                    {props.options.map((item, index) => {
                                        return (
                                            <option key={`${item.value}-option-${index}`} value={item.value}>{item.caption}</option>
                                        );
                                    })}
                                </select>
                                ) : (<div className="flex justify-center gap-2">
                                    <LoadingCircleSmall />
                                    <div>
                                        Loading ...
                                    </div>
                                </div>)}
                        </div>

                    </div>

                    <div>
                        {props.touched && props.error && (
                            <div className="text-red-500">{props.error}</div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Select;