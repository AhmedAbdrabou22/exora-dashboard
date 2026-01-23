import { useFormikContext } from "formik";
import Select from "react-select";
import { useFetch } from "../../hooks/useFetch";

type ColorData = {
    id: number | string;
    name_ar: string;
    name_en?: string;
    color_hex?: string;
};

type OptionType = {
    value: number | string;
    label: string;
    colorHex?: string;
};

type SelectColorsProps = {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    onColorChange?: () => void;
};

export default function SelectColors({
    name,
    label,
    required,
    onColorChange,
    placeholder,
}: SelectColorsProps) {
    const { data, isLoading, failureReason } = useFetch<ColorData[]>({
        queryKey: ["colors"],
        endpoint: `colors?per_page=-1`,
    });

    const { values, setFieldValue } =
        useFormikContext<Record<string, unknown>>();

    const options: OptionType[] = (data?.data || []).map((item) => ({
        value: item.id,
        label: item.name,
        colorHex: item.hex_code,
    }));

    // Handle multi-select value
    const selectedValues = Array.isArray(values[name])
        ? options.filter((option) =>
            (values[name] as (number | string)[]).includes(option.value)
        )
        : [];

    const handleChange = (selectedOptions: readonly OptionType[] | null) => {
        const selectedIds = selectedOptions
            ? selectedOptions.map((option) => option.value)
            : [];
        setFieldValue(name, selectedIds);
        onColorChange?.();
    };

    // Custom option component with color preview
    const formatOptionLabel = (option: OptionType) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {option.colorHex && (
                <div
                    style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        backgroundColor: option.colorHex,
                        border: "2px solid #e0e0e0",
                        flexShrink: 0,
                    }}
                />
            )}
            <span>{option.label}</span>
        </div>
    );

    return (
        <div className="flex flex-col gap-1 text-right">
            {label && (
                <label className="text-sm font-medium">
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}

            <Select
                inputId="colors-select"
                value={selectedValues}
                onChange={handleChange}
                options={options}
                isMulti
                isClearable
                isDisabled={!isLoading && !!failureReason}
                isLoading={isLoading}
                placeholder={placeholder || "اختر الألوان"}
                classNamePrefix="react-select"
                noOptionsMessage={() => "لا توجد بيانات"}
                loadingMessage={() => "جاري التحميل..."}
                formatOptionLabel={formatOptionLabel}
                closeMenuOnSelect={false}
            />
        </div>
    );
}